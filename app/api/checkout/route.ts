import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getAdminClient } from '@/lib/supabase/admin'
import {
  getEventBySlug,
  under16Price,
  CAR_PARKING_PRICE,
  BUS_PARKING_PRICE,
  MAX_CAR_PARKING,
  MAX_BUS_PARKING,
  SIGNATURE_ROOM_PRICE,
  SIGNATURE_GUESTS_PER_ROOM,
} from '@/lib/lounge-events'
import { getSignatureAvailability } from '@/lib/signature'
import { teams, followYourTeamPrice } from '@/lib/follow-your-team'

const clamp = (value: unknown, min: number, max: number) =>
  Math.max(min, Math.min(max, parseInt(String(value)) || 0))

/** One basket line after validation against server-side event data. */
interface ResolvedItem {
  slug: string
  eventMatch: string
  eventDate: string
  productName: string
  unitAmount: number
  adults: number
  under16: number
  carParking: number
  busParking: number
  signatureRooms: number
  teamId?: string
  teamName?: string
}

interface RawItem {
  slug?: unknown
  guests?: unknown
  adults?: unknown
  under16?: unknown
  carParking?: unknown
  busParking?: unknown
  signatureRooms?: unknown
  teamId?: unknown
  teamName?: unknown
}

/**
 * Prices and names always come from server-side event data, never from the
 * request — the client only ever chooses a slug and some quantities.
 */
function resolveItem(
  raw: RawItem,
  signature: Map<string, { hotel: string; roomsAvailable: number }>,
): ResolvedItem | { error: string } {
  const slug = String(raw.slug ?? '')
  // `guests` is the legacy field name for the adult count.
  const adults = clamp(raw.adults ?? raw.guests, 1, 30)
  const under16 = clamp(raw.under16, 0, 30)
  const carParking = clamp(raw.carParking, 0, MAX_CAR_PARKING)
  const busParking = clamp(raw.busParking, 0, MAX_BUS_PARKING)

  // Parking is an add-on to a matchday, never a product on its own. The UI
  // cannot produce a ticketless line, but the rule is enforced here too so a
  // hand-made request is rejected rather than silently charged for a ticket.
  const requestedTickets = clamp(raw.adults ?? raw.guests, 0, 30) + under16
  if (carParking + busParking > 0 && requestedTickets === 0) {
    return { error: 'Parking can only be booked alongside Legends Lounge tickets' }
  }

  // Signature is sold by the room, each covering two guests. Stock and the
  // guest ceiling are both checked here — the client is never trusted with
  // either, and a room that sold while the basket sat open is caught now.
  const signatureRooms = clamp(raw.signatureRooms, 0, 20)
  if (signatureRooms > 0) {
    const stock = signature.get(slug)
    if (!stock || stock.roomsAvailable < signatureRooms) {
      return {
        error: stock
          ? `Only ${stock.roomsAvailable} Signature room${stock.roomsAvailable === 1 ? '' : 's'} left for this matchday`
          : 'The Signature upgrade is not available for this matchday',
      }
    }
    if (signatureRooms * SIGNATURE_GUESTS_PER_ROOM > adults + under16) {
      return { error: 'Signature rooms cannot cover more guests than you have booked' }
    }
  }

  if (slug === 'follow-your-team') {
    const team = teams.find((t) => t.id === String(raw.teamId ?? ''))
    if (!team) return { error: 'Team not found' }
    return {
      slug,
      eventMatch: `Follow Your Team — ${team.name}`,
      eventDate: '27th–29th November 2026',
      productName: `Follow Your Team — ${team.name}`,
      unitAmount: followYourTeamPrice * 100,
      adults,
      under16,
      carParking,
      busParking,
      // Follow Your Team has no confirmed hotel night yet, so no Signature.
      signatureRooms: 0,
      teamId: team.id,
      teamName: team.name,
    }
  }

  const event = getEventBySlug(slug)
  if (!event) return { error: `Event not found: ${slug}` }
  return {
    slug,
    eventMatch: event.match,
    eventDate: event.date,
    productName: `Legends Lounge — ${event.match}`,
    unitAmount: event.price * 100,
    adults,
    under16,
    carParking,
    busParking,
    signatureRooms,
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { promoCode, marketingOptIn, note } = body

    // Accepts either a basket (`items`) or the original single-event shape, so
    // a checkout started before this shipped still completes.
    const rawItems: RawItem[] =
      Array.isArray(body.items) && body.items.length > 0 ? body.items : [body]

    if (rawItems.length > 10) {
      return NextResponse.json({ error: 'Too many items in basket' }, { status: 400 })
    }

    // Fetched once for the whole basket rather than per line.
    const signature = await getSignatureAvailability()

    const resolved: ResolvedItem[] = []
    for (const raw of rawItems) {
      const item = resolveItem(raw, signature)
      if ('error' in item) {
        return NextResponse.json({ error: item.error }, { status: 404 })
      }
      resolved.push(item)
    }

    // Stripe rejects a metadata value over 500 characters.
    const customerNote = typeof note === 'string' ? note.trim().slice(0, 500) : ''

    // Each ticket type and extra is its own line so the Stripe receipt itemises them.
    const lineItem = (name: string, description: string, pence: number, quantity: number) => ({
      price_data: {
        currency: 'gbp',
        unit_amount: pence,
        product_data: { name, description },
      },
      quantity,
    })

    const line_items = resolved.flatMap((item) => {
      const childAmount = Math.round(under16Price(item.unitAmount / 100) * 100)
      const guestLabel = `${item.adults} ${item.adults === 1 ? 'guest' : 'guests'}`
      return [
        lineItem(item.productName, `${item.eventDate} · ${guestLabel}`, item.unitAmount, item.adults),
        ...(item.under16 > 0
          ? [lineItem(
              `${item.productName} — Under 16`,
              `${item.eventDate} · 15 and under · half price`,
              childAmount,
              item.under16,
            )]
          : []),
        ...(item.carParking > 0
          ? [lineItem('Car Parking', `${item.eventDate} · matchday car parking`, CAR_PARKING_PRICE * 100, item.carParking)]
          : []),
        ...(item.busParking > 0
          ? [lineItem('Bus Parking', `${item.eventDate} · matchday coach parking`, BUS_PARKING_PRICE * 100, item.busParking)]
          : []),
        ...(item.signatureRooms > 0
          ? [lineItem(
              'Legends Lounge Signature — Upgrade',
              `${item.eventDate} · hotel room for ${SIGNATURE_GUESTS_PER_ROOM} guests, meet & greet and gifts`,
              SIGNATURE_ROOM_PRICE * 100,
              item.signatureRooms,
            )]
          : []),
      ]
    })

    // The order is written before redirecting so the webhook can rebuild the
    // basket from one id — Stripe metadata is flat strings capped at 500
    // characters and cannot carry a multi-event basket reliably.
    const supabase = getAdminClient()
    let orderId: string | null = null

    if (supabase) {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          status: 'pending',
          promo_code: promoCode || null,
          customer_note: customerNote || null,
          marketing_opt_in: !!marketingOptIn,
        })
        .select('id')
        .single()

      if (orderError) {
        console.error('Could not create order:', orderError)
      } else {
        orderId = order.id
        const { error: itemsError } = await supabase.from('order_items').insert(
          resolved.map((item) => ({
            order_id: order.id,
            event_slug: item.slug,
            event_name: item.eventMatch,
            team_name: item.teamName ?? null,
            adults: item.adults,
            under_16: item.under16,
            car_parking: item.carParking,
            bus_parking: item.busParking,
            signature_rooms: item.signatureRooms,
            unit_price: item.unitAmount / 100,
          }))
        )
        if (itemsError) {
          // Without items the webhook cannot rebuild the basket, so fall back
          // to the single-event metadata path rather than a half-written order.
          console.error('Could not create order items:', itemsError)
          orderId = null
        }
      }
    }

    // A basket has no single fixture to return to, so multi-event orders use
    // the standalone confirmation route.
    const first = resolved[0]
    const isSingle = resolved.length === 1
    const successPath = isSingle ? `/book/${first.slug}/confirmation` : '/book/confirmation'
    const cancelPath = isSingle ? `/book/${first.slug}` : '/basket'

    const totalGuests = resolved.reduce((n, i) => n + i.adults + i.under16, 0)

    const sessionParams: Record<string, unknown> = {
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      ...(await (async () => {
        if (promoCode) {
          try {
            const codes = await stripe.promotionCodes.list({ code: promoCode, active: true, limit: 1 })
            if (codes.data.length > 0) {
              return { discounts: [{ promotion_code: codes.data[0].id }] }
            }
          } catch {
            /* fall through to allow_promotion_codes */
          }
        }
        return { allow_promotion_codes: true }
      })()),
      phone_number_collection: { enabled: true },
      customer_creation: 'always',
      metadata: {
        // The webhook rebuilds the basket from this id. Everything below it is
        // retained so a single-event order behaves exactly as it did before.
        ...(orderId ? { order_id: orderId } : {}),
        item_count: String(resolved.length),
        event_slug: first.slug,
        event_match: isSingle ? first.eventMatch : `${resolved.length} matchdays`,
        event_date: isSingle ? first.eventDate : 'Multiple dates',
        // `guests` is every attendee needing a pass, so the webhook's QR loop
        // covers under 16s too. The breakdown is kept alongside it.
        guests: String(isSingle ? first.adults + first.under16 : totalGuests),
        adults: String(first.adults),
        under_16: String(first.under16),
        car_parking: String(first.carParking),
        bus_parking: String(first.busParking),
        signature_rooms: String(first.signatureRooms),
        ...(first.teamId ? { team_id: first.teamId, team_name: first.teamName! } : {}),
        ...(promoCode ? { promo_code: promoCode } : {}),
        ...(customerNote ? { customer_note: customerNote } : {}),
        marketing_opt_in: marketingOptIn ? 'yes' : 'no',
      },
      success_url: `${req.nextUrl.origin}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}${cancelPath}`,
    }

    const session = await stripe.checkout.sessions.create(
      sessionParams as Parameters<typeof stripe.checkout.sessions.create>[0]
    )

    if (supabase && orderId) {
      await supabase.from('orders').update({ stripe_session_id: session.id }).eq('id', orderId)
    }

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
