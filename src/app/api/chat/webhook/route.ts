import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Check if this is a valid message
    if (payload.message && payload.message.reply_to_message) {
      const originalText = payload.message.reply_to_message.text;
      const adminReplyText = payload.message.text;

      // Extract SessionID using a regular expression
      const match = originalText?.match(/\[SessionID:\s*([a-zA-Z0-9-]+)\]/);

      if (match && match[1]) {
        const sessionId = match[1];

        console.log(`Webhook: Extracted session ${sessionId} from reply.`);

        const dbPayload = {
          session_id: sessionId,
          message: adminReplyText,
          sender: 'admin',
          created_at: new Date().toISOString()
        };

        console.log("Supabase insert payload (Telegram webhook -> db):", dbPayload);

        // Save admin reply to Supabase
        const { data, error } = await supabase.from('chat_messages').insert([dbPayload]).select();

        if (error) {
          console.error("Webhook: Failed to save admin reply to DB", JSON.stringify(error, null, 2));
        } else {
          console.log(`Webhook: Successfully inserted admin reply:`, data);
        }
      }
    }

    // Always return 200 OK to Telegram so it stops retrying the webhook
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    // Still return 200 to Telegram
    return NextResponse.json({ success: true });
  }
}
