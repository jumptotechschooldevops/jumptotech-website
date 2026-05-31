import { createClient } from '@supabase/supabase-js';

// Lazily initialize the Supabase client so it doesn't break the Next.js build
// when environment variables are unavailable in CI.
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export const supabase = new Proxy(createClient('https://placeholder.supabase.co', 'placeholder'), {
  get(target, prop) {
    if (!supabaseInstance) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!url || !key) {
        throw new Error(
          "Supabase credentials not fully configured. NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in the environment."
        );
      }

      supabaseInstance = createClient(url, key);
    }

    return (supabaseInstance as ReturnType<typeof createClient>)[prop as keyof ReturnType<typeof createClient>];
  }
});
