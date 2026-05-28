import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// We must create a service role client to insert data from the secure API route
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const { sessionId, message, email, studentName, timestamp } = await req.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // 1. Save to Supabase
    if (sessionId) {
      const payload = {
        session_id: sessionId,
        sender: 'user',
        message: message,
        created_at: timestamp || new Date().toISOString()
      };

      console.log("Supabase insert payload (website -> db):", payload);

      const { data: dbData, error: dbError } = await supabase.from('chat_messages').insert([payload]).select();

      if (dbError) {
        console.error("Failed to save message to Supabase:", JSON.stringify(dbError, null, 2));
      } else {
        console.log("Supabase insert successful (website -> db):", dbData);
      }
    } else {
      console.error("Missing sessionId in /api/chat/route.ts");
    }

    if (!botToken || !chatId) {
      console.warn("Telegram credentials not configured. Skipping Telegram notification.");
      return NextResponse.json({ success: true, warning: "Telegram not configured" });
    }

    const nameStr = studentName ? `Name: ${studentName}\n` : "";
    const emailStr = email ? `Email: ${email}\n` : "";
    const sessionStr = sessionId ? `[SessionID: ${sessionId}]\n` : "";
    const timeStr = timestamp ? `Time: ${new Date(timestamp).toLocaleString()}\n` : "";

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const text = `New message from JumpToTech Chatbot:\n\n${sessionStr}${nameStr}${emailStr}${timeStr}\nMessage: ${message}`;

    const res = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
      }),
    });

    if (!res.ok) {
      console.error("Failed to send message to Telegram:", await res.text());
      return NextResponse.json({ success: false, error: "Failed to send to Telegram" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
