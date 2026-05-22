import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

const ADMIN_PASSWORD = 'JumpToTech2026Admin!'

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: { users }, error: authError } = await supabaseAdmin.auth.admin.listUsers({
    perPage: 1000,
  })

  if (authError) {
    return Response.json({ error: authError.message }, { status: 500 })
  }

  const { data: profiles, error: profilesError } = await supabaseAdmin
    .from('profiles')
    .select('*')

  if (profilesError) {
    return Response.json({ error: profilesError.message }, { status: 500 })
  }

  const profileMap = new Map((profiles ?? []).map((p: Record<string, unknown>) => [p.id, p]))

  const students = users.map((user) => {
    const profile = profileMap.get(user.id) as Record<string, unknown> | undefined
    return {
      id: user.id,
      email: user.email ?? '',
      full_name: profile?.full_name ?? user.user_metadata?.full_name ?? '',
      phone: profile?.phone ?? user.user_metadata?.phone ?? '',
      experience_level: profile?.experience_level ?? '',
      how_heard: profile?.how_heard ?? '',
      created_at: profile?.created_at ?? user.created_at,
      last_sign_in_at: user.last_sign_in_at ?? null,
      status: user.confirmed_at ? 'active' : 'pending',
    }
  })

  return Response.json({ students, total: students.length })
}
