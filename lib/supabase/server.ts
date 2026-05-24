import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Server-side client — no auth cookies needed (public-only access)
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
