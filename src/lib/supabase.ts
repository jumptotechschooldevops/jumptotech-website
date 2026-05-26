export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signOut: async () => {},
    signInWithPassword: async (opts: unknown) => ({ error: null }),
    signUp: async (opts: unknown) => ({ data: { user: { id: "mock" } }, error: null }),
    resetPasswordForEmail: async (email: string, opts?: unknown) => ({ error: null })
  },
  from: (table?: string) => ({
    upsert: async (data: unknown) => ({ error: null }),
    select: (cols?: string) => ({
      eq: (key: string, val: string) => ({
        order: (key: string, opts?: unknown) => Promise.resolve({ data: [], error: null })
      })
    })
  }),
  channel: (name: string) => ({
    on: (type: string, filter: unknown, callback: unknown) => ({ subscribe: () => {} }),
    subscribe: () => {}
  }),
  removeChannel: async (chan: unknown) => {}
};
