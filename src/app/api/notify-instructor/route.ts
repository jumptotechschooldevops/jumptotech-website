import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { fullName, email, phone } = await req.json();

  const instructorEmail = process.env.INSTRUCTOR_EMAIL;

  // Send notification via Resend (add RESEND_API_KEY to .env.local to enable)
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey && instructorEmail) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "JumpToTech <onboarding@resend.dev>",
        to: instructorEmail,
        subject: "New Student Registration — JumpToTech",
        html: `
          <h2>New student signed up</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p>Log in to <a href="https://supabase.com/dashboard">Supabase</a> to activate their account.</p>
        `,
      }),
    });
  } else {
    console.log(`[notify-instructor] New signup: ${fullName} <${email}> ${phone}`);
  }

  return NextResponse.json({ ok: true });
}
