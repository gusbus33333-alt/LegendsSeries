import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { resend } from '@/lib/email'
import {
  getEventBySlug, under16Price, CAR_PARKING_PRICE, BUS_PARKING_PRICE, SIGNATURE_ROOM_PRICE,
} from '@/lib/lounge-events'
import { buildFollowYourTeamEvent } from '@/lib/follow-your-team'
import { generateTicketPNG } from '@/lib/qr'
import { buildConfirmationEmail } from '@/lib/booking-email'
import { getAdminClient } from '@/lib/supabase/admin'

/** One matchday to fulfil — from an order's items, or from session metadata. */
interface FulfilmentItem {
  /** order_items row id — null on the metadata fallback, which has no order. */
  id: number | null
  slug: string
  adults: number
  under16: number
  carParking: number
  busParking: number
  signatureRooms: number
  teamName?: string
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const parsed = JSON.parse(body)

  // Verify the event is real by retrieving it from Stripe
  let stripeEvent: Stripe.Event
  try {
    stripeEvent = await stripe.events.retrieve(parsed.id)
  } catch (err) {
    console.error('Could not verify event with Stripe:', err)
    return NextResponse.json({ error: 'Unverified event' }, { status: 400 })
  }
  console.log('Webhook verified:', stripeEvent.type)

  if (stripeEvent.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true })
  }

  const session = stripeEvent.data.object as Stripe.Checkout.Session
  const customerEmail = session.customer_details?.email
  const customerName = session.customer_details?.name || 'Guest'
  const customerPhone = session.customer_details?.phone || null
  const orderId = session.metadata?.order_id || null

  if (!customerEmail) {
    console.error('Missing customer email on session', session.id)
    return NextResponse.json({ received: true })
  }

  const supabase = getAdminClient()

  // ── Work out what was bought ────────────────────────────────────────────────
  // A basket is rebuilt from its order row. Sessions created before baskets
  // existed — and any order whose items failed to save — fall back to the
  // original single-event metadata, so nothing in flight is stranded.
  let items: FulfilmentItem[] = []
  // Every line in the order, including any already fulfilled — needed to split
  // the order-level discount correctly even on a retry.
  let allItems: FulfilmentItem[] = []

  if (orderId && supabase) {
    // Stripe retries webhooks; fulfilling twice would send duplicate tickets.
    const { data: order } = await supabase
      .from('orders')
      .select('status')
      .eq('id', orderId)
      .single()

    if (order?.status === 'fulfilled') {
      console.log('Order already fulfilled, skipping:', orderId)
      return NextResponse.json({ received: true })
    }

    const { data: orderItems } = await supabase
      .from('order_items')
      .select('id, event_slug, adults, under_16, car_parking, bus_parking, signature_rooms, team_name, fulfilled_at')
      .eq('order_id', orderId)
      .order('id', { ascending: true })

    if (orderItems && orderItems.length > 0) {
      // Already-fulfilled matchdays are dropped here, so a retry after a
      // partial failure resumes instead of re-sending tickets that landed.
      const outstanding = orderItems.filter((row) => row.fulfilled_at === null)

      if (outstanding.length === 0) {
        // Everything is already done — return before the metadata fallback
        // below, which would otherwise re-fulfil the first matchday.
        console.log('All order items already fulfilled, skipping:', orderId)
        return NextResponse.json({ received: true })
      }

      const toItem = (row: typeof orderItems[number]): FulfilmentItem => ({
        id: row.id,
        slug: row.event_slug,
        adults: row.adults,
        under16: row.under_16,
        carParking: row.car_parking,
        busParking: row.bus_parking,
        signatureRooms: row.signature_rooms ?? 0,
        teamName: row.team_name ?? undefined,
      })
      allItems = orderItems.map(toItem)
      items = outstanding.map((row) => ({
        id: row.id,
        slug: row.event_slug,
        adults: row.adults,
        under16: row.under_16,
        carParking: row.car_parking,
        busParking: row.bus_parking,
        signatureRooms: row.signature_rooms ?? 0,
        teamName: row.team_name ?? undefined,
      }))
    }
  }

  if (items.length === 0) {
    const slug = session.metadata?.event_slug
    if (!slug) {
      console.error('No order items and no event_slug on session', session.id)
      return NextResponse.json({ received: true })
    }
    const guests = parseInt(session.metadata?.guests || '1')
    const adults = parseInt(session.metadata?.adults || String(guests))
    items = [
      {
        id: null,
        slug,
        adults,
        under16: parseInt(session.metadata?.under_16 || '0'),
        carParking: parseInt(session.metadata?.car_parking || '0'),
        busParking: parseInt(session.metadata?.bus_parking || '0'),
        signatureRooms: parseInt(session.metadata?.signature_rooms || '0'),
        teamName: session.metadata?.team_name || undefined,
      },
    ]
    allItems = items
  }

  // ── Order-level payment details ─────────────────────────────────────────────
  const orderTotal = session.amount_total ? `£${(session.amount_total / 100).toFixed(2)}` : null
  const discount = session.total_details?.amount_discount
    ? `£${(session.total_details.amount_discount / 100).toFixed(2)}`
    : null
  const vatAmount = session.amount_total
    ? `£${(session.amount_total / 100 / 6).toFixed(2)}`
    : null

  let promoCode = session.metadata?.promo_code || null
  if (!promoCode && stripe) {
    try {
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['total_details.breakdown'],
      })
      const discounts = (fullSession as any).total_details?.breakdown?.discounts
      if (discounts?.[0]?.discount?.promotion_code) {
        const pc = await stripe.promotionCodes.retrieve(discounts[0].discount.promotion_code)
        promoCode = pc.code
      }
    } catch {
      /* metadata fallback is fine */
    }
  }

  const customerNote = session.metadata?.customer_note || undefined
  const marketingOptIn = session.metadata?.marketing_opt_in === 'yes'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://legends-series.com'
  const isBasket = allItems.length > 1

  // ── Split the discount across the matchdays ─────────────────────────────────
  // Stripe discounts the order as a whole. Without apportioning it, a basket's
  // confirmation email showed the list price rather than what was paid, and
  // every booking row recorded the entire order discount — so two matchdays
  // looked like they had each received the full amount off.
  const grossPence = (item: FulfilmentItem): number => {
    const ev =
      item.slug === 'follow-your-team'
        ? buildFollowYourTeamEvent(item.teamName || 'Your Team')
        : getEventBySlug(item.slug)
    if (!ev) return 0
    return Math.round(
      (ev.price * item.adults +
        under16Price(ev.price) * item.under16 +
        item.carParking * CAR_PARKING_PRICE +
        item.busParking * BUS_PARKING_PRICE +
        item.signatureRooms * SIGNATURE_ROOM_PRICE) *
        100
    )
  }

  const discountPence = session.total_details?.amount_discount ?? 0
  const keyOf = (item: FulfilmentItem, index: number) => String(item.id ?? `fallback-${index}`)

  const grossByKey = new Map<string, number>()
  allItems.forEach((item, i) => grossByKey.set(keyOf(item, i), grossPence(item)))
  const grossTotal = Array.from(grossByKey.values()).reduce((a, b) => a + b, 0)

  // Proportional to each matchday's value, with the last line absorbing the
  // rounding remainder so the shares add up to the discount exactly.
  const discountByKey = new Map<string, number>()
  const keys = Array.from(grossByKey.keys())
  let allocated = 0
  keys.forEach((key, i) => {
    const share =
      i === keys.length - 1
        ? discountPence - allocated
        : grossTotal > 0
          ? Math.round((discountPence * (grossByKey.get(key) ?? 0)) / grossTotal)
          : 0
    allocated += share
    discountByKey.set(key, share)
  })

  // ── Fulfil each matchday ────────────────────────────────────────────────────
  // Deliberately one email per matchday rather than one combined email: each
  // carries its own timeline, directions and passes, so on the day the customer
  // opens the email for that fixture and everything in it is correct.
  // A transient failure must return non-2xx so Stripe retries; a permanent one
  // (an event slug we no longer recognise) must not, or it would retry forever.
  let transientFailure = false

  for (let loopIndex = 0; loopIndex < items.length; loopIndex++) {
    const item = items[loopIndex]
    try {
      const followTeam = item.slug === 'follow-your-team' ? item.teamName || 'Your Team' : undefined
      const event = followTeam ? buildFollowYourTeamEvent(followTeam) : getEventBySlug(item.slug)

      if (!event) {
        // Not retryable — retrying cannot make an unknown slug resolve.
        console.error('Event not found for slug:', item.slug)
        continue
      }

      const guests = item.adults + item.under16

      // Stock is claimed here rather than at checkout: rooms are only spoken
      // for once money has actually changed hands. The claim is atomic, so a
      // simultaneous buyer cannot take the same last room.
      if (item.signatureRooms > 0 && supabase) {
        const { error: claimError } = await supabase.rpc('claim_signature_rooms', {
          p_event_slug: item.slug,
          p_rooms: item.signatureRooms,
        })
        if (claimError) {
          // The customer has already paid, so the booking still goes ahead —
          // this is a stock problem for the team to resolve, not a reason to
          // withhold a confirmation. Logged loudly so it is noticed.
          console.error(
            `SIGNATURE OVERSOLD — ${item.signatureRooms} room(s) for ${item.slug} ` +
            `on session ${session.id}; contact the customer.`,
            claimError,
          )
        }
      }

      // What was actually paid for this matchday: its own value less its share
      // of any order-level discount. A single-fixture order takes the session
      // total directly, which is Stripe's own authoritative figure.
      const key = keyOf(item, loopIndex)
      const itemDiscountPence = discountByKey.get(key) ?? 0
      const itemPaidPence = Math.max(0, (grossByKey.get(key) ?? 0) - itemDiscountPence)

      const itemTotal = isBasket
        ? `£${(itemPaidPence / 100).toFixed(2)}`
        : orderTotal ?? event.priceLabel
      const itemDiscount = isBasket
        ? itemDiscountPence > 0
          ? `£${(itemDiscountPence / 100).toFixed(2)}`
          : null
        : discount
      // Prices are VAT-inclusive, so VAT is the gross sixth and net is the
      // remainder — computed this way round so net + VAT always equals the
      // amount charged, with no rounding penny adrift.
      const vatBasePence = isBasket ? itemPaidPence : session.amount_total ?? itemPaidPence
      const vatPence = Math.round(vatBasePence / 6)
      const itemVat = `£${(vatPence / 100).toFixed(2)}`
      const itemNet = `£${((vatBasePence - vatPence) / 100).toFixed(2)}`

      const guestBookingRefs: string[] = []
      const attachments: { filename: string; content: Buffer }[] = []

      for (let i = 0; i < guests; i++) {
        const ref = `LS-${Date.now().toString(36).toUpperCase()}-${Math.random()
          .toString(36)
          .substring(2, 6)
          .toUpperCase()}`
        guestBookingRefs.push(ref)

        attachments.push({
          filename: `Legends-Lounge-${event.shortDate.replace(/\s+/g, '-')}-Guest-${i + 1}-${ref}.png`,
          content: await generateTicketPNG({
            scanUrl: `${siteUrl}/api/scan/${ref}`,
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

      // Allocated by a database trigger inside the insert's own transaction,
      // so the numbering is sequential with no gaps. Read back for the invoice.
      let invoiceNumber: string | null = null

      if (supabase) {
        const { data: inserted, error: insertError } = await supabase
          .from('bookings')
          .insert({
            booking_ref: guestBookingRefs[0],
            guest_refs: guestBookingRefs,
            order_id: orderId,
            event_slug: item.slug,
            event_name: event.match,
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone,
            guests,
            total_paid: itemTotal,
            promo_code: promoCode,
            discount_amount: itemDiscount,
            vat_amount: itemVat,
            marketing_opt_in: marketingOptIn,
            customer_note: customerNote || null,
            adults: item.adults,
            under_16: item.under16,
            car_parking: item.carParking,
            bus_parking: item.busParking,
            signature_rooms: item.signatureRooms,
          })
          .select('invoice_number')
          .single()

        if (insertError) {
          console.error('Could not save booking:', insertError)
        } else {
          invoiceNumber = inserted?.invoice_number ?? null
        }
      }

      const html = buildConfirmationEmail({
        customerName,
        customerEmail,
        event,
        guests,
        bookingRef: guestBookingRefs[0],
        qrDataURL: '',
        totalPaid: itemTotal,
        followTeam,
        customerNote,
        adults: item.adults,
        under16: item.under16,
        carParking: item.carParking,
        busParking: item.busParking,
        signatureRooms: item.signatureRooms,
        discountAmount: itemDiscount,
        promoCode,
        netAmount: itemNet,
        vatAmount: itemVat,
        invoiceNumber,
      })

      if (resend) {
        await resend.emails.send({
          from: 'Legends Series <noreply@contact.legends-series.com>',
          replyTo: 'info@legends-series.com',
          to: customerEmail,
          subject: followTeam
            ? `Booking Confirmed — Follow ${followTeam} | Finals Weekend 2026`
            : `Booking Confirmed — ${event.match} | ${event.shortDate}`,
          html,
          attachments: attachments.map((a) => ({ filename: a.filename, content: a.content })),
        })
        console.log(
          `Confirmation sent to ${customerEmail} for ${event.match} (${guests} QR codes)`
        )
      } else {
        console.warn('Resend not configured — skipping email send')
      }

      // Marked only once the row is written and the email is away, so a retry
      // can never skip a matchday that didn't actually reach the customer.
      if (supabase && item.id !== null) {
        await supabase
          .from('order_items')
          .update({ fulfilled_at: new Date().toISOString() })
          .eq('id', item.id)
      }
    } catch (err) {
      // One failed matchday must not abandon the rest of the basket — the
      // others still go out, and Stripe's retry picks this one up.
      console.error(`Failed to fulfil ${item.slug}:`, err)
      transientFailure = true
    }
  }

  if (transientFailure) {
    // Non-2xx asks Stripe to retry. Fulfilled matchdays are already marked, so
    // the retry resumes with only what is outstanding.
    console.error('Order partially fulfilled, asking Stripe to retry:', orderId)
    return NextResponse.json({ error: 'Partial fulfilment' }, { status: 500 })
  }

  if (orderId && supabase) {
    await supabase
      .from('orders')
      .update({
        status: 'fulfilled',
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        total_paid: orderTotal,
        promo_code: promoCode,
      })
      .eq('id', orderId)
  }

  return NextResponse.json({ received: true })
}
