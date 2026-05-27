import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, email, studentName, timestamp } = await req.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn("Telegram credentials not configured. Skipping Telegram notification.");
      return NextResponse.json({ success: true, warning: "Telegram not configured" });
    }

    const nameStr = studentName ? `Name: ${studentName}\n` : "";
    const emailStr = email ? `Email: ${email}\n` : "";
    const timeStr = timestamp ? `Time: ${new Date(timestamp).toLocaleString()}\n` : "";

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const text = `New message from JumpToTech Chatbot:\n\n${nameStr}${emailStr}${timeStr}\nMessage: ${message}`;

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
