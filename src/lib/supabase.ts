import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.warn("Supabase credentials not fully configured. Using fallback values.");
}

export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder-key'
);
