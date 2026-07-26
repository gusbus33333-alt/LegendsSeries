import { NextRequest, NextResponse } from 'next/server'
import { getEventBySlug } from '@/lib/lounge-events'
import { generateQRDataURL } from '@/lib/qr'
import { buildConfirmationEmail } from '@/lib/booking-email'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || 'england-vs-japan-nov-14'
  const event = getEventBySlug(slug)

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
    totalPaid: '£396.00',
  })

  return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } })
}
