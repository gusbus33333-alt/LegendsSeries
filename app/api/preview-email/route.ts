import { NextRequest, NextResponse } from 'next/server'
import { getEventBySlug } from '@/lib/lounge-events'
import { buildFollowYourTeamEvent } from '@/lib/follow-your-team'
import { generateQRDataURL } from '@/lib/qr'
import { buildConfirmationEmail } from '@/lib/booking-email'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || 'england-vs-japan-nov-14'

  // ?slug=follow-your-team&team=Wales
  const followTeam = slug === 'follow-your-team'
    ? req.nextUrl.searchParams.get('team') || 'Wales'
    : undefined

  const event = followTeam ? buildFollowYourTeamEvent(followTeam) : getEventBySlug(slug)

  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 })
  }

  const bookingRef = 'LS-TEST-ABCD'
  const scanUrl = `${req.nextUrl.origin}/api/scan/${bookingRef}`
  const qrDataURL = await generateQRDataURL(scanUrl)

  const html = buildConfirmationEmail({
    customerName: 'Damian Gallagher',
    customerEmail: 'test@example.com',
    event,
    guests: 2,
    bookingRef,
    qrDataURL,
    totalPaid: followTeam ? '£600.00' : '£396.00',
    followTeam,
    customerNote: req.nextUrl.searchParams.get('note') || undefined,
  })

  return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } })
}
