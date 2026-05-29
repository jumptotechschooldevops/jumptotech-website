import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  // Let's use the Authorization header set by frontend using useAuth to pass token.
  // Actually, wait, useAuth just holds the state on the client. Next.js api routes should use the token from headers.
  const authHeader = request.headers.get('authorization')

  if (!authHeader) {
     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.replace('Bearer ', '')
  const { data: { user } } = await supabase.auth.getUser(token)

  if (!user || user.email !== "aisalkynaidarova8@gmail.com") {
     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: { users }, error: authError } = await supabaseAdmin.auth.admin.listUsers({
    perPage: 1000,
  })

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 })
  }

  const { data: profiles, error: profilesError } = await supabaseAdmin
    .from('profiles')
    .select('*')

  if (profilesError) {
    return NextResponse.json({ error: profilesError.message }, { status: 500 })
  }

  const profileMap = new Map((profiles ?? []).map((p: Record<string, unknown>) => [p.id, p]))

  const students = users.map((u) => {
    const profile = profileMap.get(u.id) as Record<string, unknown> | undefined
    return {
      id: u.id,
      email: u.email ?? '',
      full_name: profile?.full_name ?? u.user_metadata?.full_name ?? '',
      phone: profile?.phone ?? u.user_metadata?.phone ?? '',
      experience_level: profile?.experience_level ?? '',
      how_heard: profile?.how_heard ?? '',
      created_at: profile?.created_at ?? u.created_at,
      last_sign_in_at: u.last_sign_in_at ?? null,
      status: u.confirmed_at ? 'active' : 'pending',
    }
  })

  return NextResponse.json({ students, total: students.length })
}
