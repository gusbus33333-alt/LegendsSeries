import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { resend } from '@/lib/email'
import { getEventBySlug } from '@/lib/lounge-events'
import { generateQRDataURL, generateTicketPNG } from '@/lib/qr'
import { buildConfirmationEmail } from '@/lib/booking-email'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
  }

  let stripeEvent: Stripe.Event

  try {
    stripeEvent = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object as Stripe.Checkout.Session

    const slug = session.metadata?.event_slug
    const guests = parseInt(session.metadata?.guests || '1')
    const customerEmail = session.customer_details?.email
    const customerName = session.customer_details?.name || 'Guest'

    if (!slug || !customerEmail) {
      console.error('Missing metadata or customer email', { slug, customerEmail })
      return NextResponse.json({ received: true })
    }

    const event = getEventBySlug(slug)
    if (!event) {
      console.error('Event not found for slug:', slug)
      return NextResponse.json({ received: true })
    }

    const totalPaid = session.amount_total
      ? `£${(session.amount_total / 100).toFixed(2)}`
      : event.priceLabel

    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://legends-series.com'
      const supabase = getSupabase()

      const guestBookingRefs: string[] = []
      const attachments: { filename: string; content: Buffer }[] = []

      for (let i = 0; i < guests; i++) {
        const ref = `LS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
        guestBookingRefs.push(ref)

        const scanUrl = `${siteUrl}/api/scan/${ref}`
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
            customerName: customerName,
          }),
        })

        if (supabase) {
          await supabase.from('bookings').insert({
            booking_ref: ref,
            event_slug: slug,
            event_name: event.match,
            customer_name: customerName,
            customer_email: customerEmail,
            guest_number: i + 1,
            guests,
            total_paid: totalPaid,
            scanned_at: null,
          })
        }
      }

      const bookingRef = guestBookingRefs[0]

      const html = buildConfirmationEmail({
        customerName,
        customerEmail,
        event,
        guests,
        bookingRef,
        qrDataURL: '',
        totalPaid,
      })

      if (resend) {
        await resend.emails.send({
          from: 'Legends Series <noreply@contact.legends-series.com>',
          replyTo: 'info@legends-series.com',
          to: customerEmail,
          subject: `Booking Confirmed — ${event.match} | ${event.shortDate}`,
          html,
          attachments: attachments.map((a) => ({
            filename: a.filename,
            content: a.content,
          })),
        })
        console.log(`Confirmation email sent to ${customerEmail} for ${event.match} (${guests} QR codes)`)
      } else {
        console.warn('Resend not configured — skipping email send')
      }
    } catch (err) {
      console.error('Failed to send confirmation email:', err)
    }
  }

  return NextResponse.json({ received: true })
}
