import { NextRequest, NextResponse } from 'next/server'
import { getSignatureAvailability } from '@/lib/signature'

// Stock changes as rooms sell, so this must never be cached.
export const dynamic = 'force-dynamic'

/**
 * Live Signature availability. The booking pages are statically generated, so
 * the count rendered at build time goes stale the moment a room sells — the
 * client re-reads it from here on mount.
 *
 * Read-only and already public on the Lounge page, so no auth is needed.
 */
export async function GET(req: NextRequest) {
  const slugs = req.nextUrl.searchParams.get('slugs')
  const all = await getSignatureAvailability()

  const wanted = slugs
    ? slugs.split(',').map((s) => s.trim()).filter(Boolean)
    : Array.from(all.keys())

  const result: Record<string, { hotel: string; roomsAvailable: number }> = {}
  for (const slug of wanted) {
    const row = all.get(slug)
    // Absent means the upgrade isn't offered for that matchday at all.
    if (row) result[slug] = { hotel: row.hotel, roomsAvailable: row.roomsAvailable }
  }

  return NextResponse.json(result, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
