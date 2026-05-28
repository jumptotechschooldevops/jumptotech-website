import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      return NextResponse.json({ success: true, warning: "Telegram not configured" });
    }

    // Attempt to pull updates from Telegram using long polling endpoint
    // This will fail with 409 Conflict if a webhook is active, which is fine.
    const getUpdatesUrl = `https://api.telegram.org/bot${botToken}/getUpdates`;
    const tgRes = await fetch(getUpdatesUrl);

    if (tgRes.ok) {
      const tgData = await tgRes.json();
      if (tgData.ok && tgData.result && tgData.result.length > 0) {
        let maxUpdateId = 0;

        for (const update of tgData.result) {
          if (update.update_id > maxUpdateId) {
            maxUpdateId = update.update_id;
          }

          if (update.message && update.message.reply_to_message) {
            const originalText = update.message.reply_to_message.text;
            const adminReplyText = update.message.text;

            const match = originalText?.match(/\[SessionID:\s*([a-zA-Z0-9-]+)\]/);
            if (match && match[1]) {
              const replySessionId = match[1];

              // Prevent duplicate insertions
              const { data: existing } = await supabase
                .from('chat_messages')
                .select('id')
                .eq('session_id', replySessionId)
                .eq('sender_type', 'admin')
                .eq('message', adminReplyText)
                .limit(1);

              if (!existing || existing.length === 0) {
                await supabase.from('chat_messages').insert([{
                  session_id: replySessionId,
                  name: 'Admin',
                  message: adminReplyText,
                  sender_type: 'admin',
                  created_at: new Date(update.message.date * 1000).toISOString()
                }]);
              }
            }
          }
        }

        // Acknowledge updates to clear Telegram's queue
        if (maxUpdateId > 0) {
          await fetch(`https://api.telegram.org/bot${botToken}/getUpdates?offset=${maxUpdateId + 1}`);
        }
      }
    }

    // Fetch and return the latest messages for this session
    if (sessionId) {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (!error && data) {
        return NextResponse.json({ success: true, messages: data });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json({ success: false, error: "Sync failed" }, { status: 500 });
  }
}
