import { NextResponse } from 'next/server'
import { resend } from '@/lib/email'
import { getEventBySlug } from '@/lib/lounge-events'
import { generateTicketPNG } from '@/lib/qr'
import { buildConfirmationEmail } from '@/lib/booking-email'

export async function GET() {
  if (!resend) {
    return NextResponse.json({ error: 'Resend not configured' }, { status: 500 })
  }

  const event = getEventBySlug('england-vs-australia-nov-8')!
  const guests = 2
  const customerName = 'Guy Butterworth'

  const guestBookingRefs: string[] = []
  const attachments: { filename: string; content: Buffer }[] = []

  for (let i = 0; i < guests; i++) {
    const ref = `LS-TEST-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    guestBookingRefs.push(ref)

    const scanUrl = `https://legends-series.com/api/scan/${ref}`
    attachments.push({
      filename: `Legends-Lounge-Guest-${i + 1}-${ref}.png`,
      content: await generateTicketPNG({
        scanUrl,
        bookingRef: ref,
        eventName: event.match,
        eventDate: event.shortDate,
        koTime: event.ko,
        openTime: event.openTime,
        guestNumber: i + 1,
        totalGuests: guests,
        customerName,
      }),
    })
  }

  const bookingRef = guestBookingRefs[0]

  const html = buildConfirmationEmail({
    customerName,
    customerEmail: 'butterworthguy@hotmail.co.uk',
    event,
    guests,
    bookingRef,
    qrDataURL: '',
    totalPaid: '£500.00',
  })

  try {
    const result = await resend.emails.send({
      from: 'Legends Series <noreply@contact.legends-series.com>',
      replyTo: 'info@legends-series.com',
      to: 'butterworthguy@hotmail.co.uk',
      subject: `[TEST] Booking Confirmed — ${event.match} | ${event.shortDate}`,
      html,
      attachments: attachments.map((a) => ({
        filename: a.filename,
        content: a.content,
      })),
    })
    return NextResponse.json({ success: true, result })
  } catch (err) {
    console.error('Test email failed:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
