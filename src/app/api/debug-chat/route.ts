import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload = {
      session_id: 'test-session-debug-api',
      message: 'This is a test message from debug API',
      sender: 'user', // strictly using 'sender'
      created_at: new Date().toISOString()
    };

    console.log("=== DEBUG API: ATTEMPTING INSERT ===");
    console.log("URL Configured?", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("Service Key Configured?", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
    console.log("Payload:", payload);

    const { data, error } = await supabase
      .from('chat_messages')
      .insert([payload])
      .select();

    if (error) {
      console.error("=== DEBUG API: INSERT ERROR ===", JSON.stringify(error, null, 2));
      return NextResponse.json({ success: false, error, details: JSON.stringify(error) });
    }

    console.log("=== DEBUG API: INSERT SUCCESS ===", data);
    return NextResponse.json({ success: true, data });

  } catch (err: unknown) {
    console.error("=== DEBUG API: EXCEPTION ===", err);
    return NextResponse.json({ success: false, exception: err instanceof Error ? err.message : String(err) });
  }
}
