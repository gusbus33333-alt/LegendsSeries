import { getAdminClient } from './supabase/admin'

export interface SignatureAvailability {
  eventSlug: string
  hotel: string
  roomsAvailable: number
  pricePP: number
}

/**
 * Live Signature stock. Read server-side so the booking page can render the
 * true remaining count rather than a hard-coded figure that goes stale.
 * Returns an empty map when Supabase is unreachable, which hides the upgrade
 * rather than offering rooms we cannot verify.
 */
export async function getSignatureAvailability(): Promise<Map<string, SignatureAvailability>> {
  const supabase = getAdminClient()
  const map = new Map<string, SignatureAvailability>()
  if (!supabase) return map

  const { data, error } = await supabase
    .from('signature_inventory')
    .select('event_slug, hotel, rooms_total, rooms_sold, price_pp')

  if (error || !data) {
    console.error('Could not load Signature availability:', error)
    return map
  }

  for (const row of data) {
    map.set(row.event_slug, {
      eventSlug: row.event_slug,
      hotel: row.hotel,
      roomsAvailable: Math.max(0, row.rooms_total - row.rooms_sold),
      pricePP: Number(row.price_pp),
    })
  }
  return map
}

export async function getSignatureForEvent(slug: string): Promise<SignatureAvailability | null> {
  const all = await getSignatureAvailability()
  return all.get(slug) ?? null
}
