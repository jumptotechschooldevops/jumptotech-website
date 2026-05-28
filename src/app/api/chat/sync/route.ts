import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    console.log(`[SYNC] Sync requested for sessionId: ${sessionId}`);

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      console.warn("[SYNC] Telegram not configured. Skipping getUpdates.");
      return NextResponse.json({ success: true, warning: "Telegram not configured" });
    }

    const getUpdatesUrl = `https://api.telegram.org/bot${botToken}/getUpdates`;
    const tgRes = await fetch(getUpdatesUrl);

    if (tgRes.ok) {
      const tgData = await tgRes.json();

      if (!tgData.ok) {
         console.error(`[SYNC] Telegram API returned ok=false:`, JSON.stringify(tgData));
      } else if (tgData.result && tgData.result.length > 0) {
        console.log(`[SYNC] Found ${tgData.result.length} updates from Telegram.`);
        let maxUpdateId = 0;

        for (const update of tgData.result) {
          console.log(`[SYNC] Processing update ID: ${update.update_id}`);
          console.log(`[SYNC] FULL UPDATE:`, JSON.stringify(update, null, 2));
          console.log(`[SYNC] update.message.text:`, update?.message?.text);
          console.log(`[SYNC] reply_to_message:`, JSON.stringify(update?.message?.reply_to_message, null, 2));

          if (update.update_id > maxUpdateId) {
            maxUpdateId = update.update_id;
          }

          if (!update.message) {
            console.log(`[SYNC] Update ${update.update_id} has no message. Skipped.`);
            continue;
          }

          // TEMPORARILY DISABLED: Do not require reply_to_message. Accept ANY text message from Telegram.
          const adminReplyText = update.message.text || update.message.caption || "";

          if (!adminReplyText) {
             console.log(`[SYNC] No text/caption found in update ${update.update_id}. Skipped.`);
             continue;
          }

          const originalText = update.message.reply_to_message?.text || update.message.reply_to_message?.caption || "";

          console.log(`[SYNC] originalText:`, originalText);
          console.log(`[SYNC] adminReplyText:`, adminReplyText);

          const match =
            originalText?.match(/\[SessionID:\s*([^\]]+)\]/i) ||
            originalText?.match(/SessionID[:\s]+([a-zA-Z0-9-]+)/i);

          let replySessionId = sessionId; // ALWAYS fallback to current polling session ID

          if (match && match[1]) {
            replySessionId = match[1].trim();
            console.log(`[SYNC] Match success. Extracted SessionID: ${replySessionId}`);
          } else {
             console.log(`[SYNC] Regex match failed or no reply_to_message. Using fallback sessionId: ${replySessionId}`);
          }

          const { data: existing, error: selectErr } = await supabase
            .from('chat_messages')
            .select('id')
            .eq('session_id', replySessionId)
            .eq('sender', 'admin')
            .eq('message', adminReplyText)
            .limit(1);

          if (selectErr) {
             console.error(`[SYNC] Select error during deduplication:`, JSON.stringify(selectErr));
          }

          if (!existing || existing.length === 0) {
            console.log(`[SYNC] No duplicate found. Preparing to insert admin reply.`);
            const payload = {
              session_id: replySessionId,
              message: adminReplyText,
              sender: 'admin',
              created_at: new Date(update.message.date * 1000).toISOString()
            };

            console.log(`[SYNC] Supabase insert payload:`, JSON.stringify(payload));

            const { data: insertData, error: insertError } = await supabase
                .from('chat_messages')
                .insert([payload])
                .select();

            if (insertError) {
              console.error(`[SYNC] Failed to save admin reply:`, JSON.stringify(insertError, null, 2));
            } else {
              console.log(`[SYNC] Successfully inserted admin reply:`, JSON.stringify(insertData));
            }
          } else {
             console.log(`[SYNC] Duplicate admin reply found. Skipped inserting.`);
          }
        }

        // TEMPORARILY DISABLED: Aggressive Telegram queue clearing offset
        // if (maxUpdateId > 0) {
        //   console.log(`[SYNC] Clearing Telegram queue offset=${maxUpdateId + 1}`);
        //   await fetch(`https://api.telegram.org/bot${botToken}/getUpdates?offset=${maxUpdateId + 1}`);
        // }

      } else {
         console.log(`[SYNC] Telegram API returned 0 updates.`);
      }
    } else {
        console.error(`[SYNC] Fetch to Telegram getUpdates failed with status ${tgRes.status}`);
    }

    // Fetch latest messages
    if (sessionId) {
      console.log(`[SYNC] Fetching latest messages for sessionId: ${sessionId}`);
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) {
         console.error(`[SYNC] Fetch messages error:`, JSON.stringify(error));
      } else {
         return NextResponse.json({ success: true, messages: data });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error(`[SYNC] Uncaught Exception:`, error instanceof Error ? error.message : String(error));
    return NextResponse.json({ success: false, error: "Sync failed" }, { status: 500 });
  }
}
