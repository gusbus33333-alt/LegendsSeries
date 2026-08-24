import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import {
  getEventBySlug,
  under16Price,
  CAR_PARKING_PRICE,
  BUS_PARKING_PRICE,
  MAX_CAR_PARKING,
  MAX_BUS_PARKING,
} from '@/lib/lounge-events'
import { teams, followYourTeamPrice } from '@/lib/follow-your-team'

const clamp = (value: unknown, min: number, max: number) =>
  Math.max(min, Math.min(max, parseInt(String(value)) || 0))

export async function POST(req: NextRequest) {
  try {
    const {
      slug, guests, promoCode, marketingOptIn, teamId, teamName, note,
      under16, carParking, busParking,
    } = await req.json()

    // Stripe rejects a metadata value over 500 characters.
    const customerNote = typeof note === 'string' ? note.trim().slice(0, 500) : ''

    const guestCount = clamp(guests, 1, 30)
    const under16Count = clamp(under16, 0, 30)
    const carCount = clamp(carParking, 0, MAX_CAR_PARKING)
    const busCount = clamp(busParking, 0, MAX_BUS_PARKING)

    let productName: string
    let productDescription: string
    let unitAmount: number
    let eventSlug: string
    let eventMatch: string
    let eventDate: string

    if (slug === 'follow-your-team') {
      const team = teams.find((t) => t.id === teamId)
      if (!team) {
        return NextResponse.json({ error: 'Team not found' }, { status: 404 })
      }
      productName = `Follow Your Team — ${team.name}`
      productDescription = `Nations Cup Finals Weekend · ${guestCount} ${guestCount === 1 ? 'guest' : 'guests'}`
      unitAmount = followYourTeamPrice * 100
      eventSlug = 'follow-your-team'
      eventMatch = `Follow Your Team — ${team.name}`
      eventDate = '27th–29th November 2026'
    } else {
      const event = getEventBySlug(slug)
      if (!event) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 })
      }
      productName = `Legends Lounge — ${event.match}`
      productDescription = `${event.date} · ${guestCount} ${guestCount === 1 ? 'guest' : 'guests'}`
      unitAmount = event.price * 100
      eventSlug = slug
      eventMatch = event.match
      eventDate = event.date
    }

    // Each ticket type and extra is its own line so the Stripe receipt itemises them.
    const lineItem = (name: string, description: string, pence: number, quantity: number) => ({
      price_data: {
        currency: 'gbp',
        unit_amount: pence,
        product_data: { name, description },
      },
      quantity,
    })

    const childAmount = Math.round(under16Price(unitAmount / 100) * 100)

    const sessionParams: Record<string, unknown> = {
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        lineItem(productName, productDescription, unitAmount, guestCount),
        ...(under16Count > 0
          ? [lineItem(
              `${productName} — Under 16`,
              `${eventDate} · 15 and under · half price`,
              childAmount,
              under16Count,
            )]
          : []),
        ...(carCount > 0
          ? [lineItem('Car Parking', `${eventDate} · matchday car parking`, CAR_PARKING_PRICE * 100, carCount)]
          : []),
        ...(busCount > 0
          ? [lineItem('Bus Parking', `${eventDate} · matchday coach parking`, BUS_PARKING_PRICE * 100, busCount)]
          : []),
      ],
      ...await (async () => {
        if (promoCode) {
          try {
            const codes = await stripe.promotionCodes.list({ code: promoCode, active: true, limit: 1 })
            if (codes.data.length > 0) {
              return { discounts: [{ promotion_code: codes.data[0].id }] }
            }
          } catch { /* fall through to allow_promotion_codes */ }
        }
        return { allow_promotion_codes: true }
      })(),
      phone_number_collection: { enabled: true },
      customer_creation: 'always',
      metadata: {
        event_slug: eventSlug,
        event_match: eventMatch,
        event_date: eventDate,
        // `guests` is every attendee needing a pass, so the webhook's QR loop
        // covers under 16s too. The breakdown is kept alongside it.
        guests: String(guestCount + under16Count),
        adults: String(guestCount),
        under_16: String(under16Count),
        car_parking: String(carCount),
        bus_parking: String(busCount),
        ...(teamId ? { team_id: teamId, team_name: teamName } : {}),
        ...(promoCode ? { promo_code: promoCode } : {}),
        ...(customerNote ? { customer_note: customerNote } : {}),
        marketing_opt_in: marketingOptIn ? 'yes' : 'no',
      },
      success_url: `${req.nextUrl.origin}/book/${slug}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/book/${slug}`,
    }

    const session = await stripe.checkout.sessions.create(
      sessionParams as Parameters<typeof stripe.checkout.sessions.create>[0]
    )

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
