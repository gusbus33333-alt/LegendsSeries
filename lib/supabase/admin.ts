import { createClient } from '@supabase/supabase-js'

/**
 * Service-role client for server routes only — it bypasses RLS, so it must
 * never be imported into a client component. Returns null when the env vars
 * are absent so a missing key degrades rather than crashes the request.
 */
export function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, {
    global: {
      // Next.js patches global fetch with its own cache in the App Router, so
      // supabase-js reads were being served stale — live stock read as the
      // figure from the first request. Opt every query out explicitly.
      fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
    },
  })
}
