import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getEventBySlug } from '@/lib/lounge-events'
import { teams, followYourTeamPrice } from '@/lib/follow-your-team'

export async function POST(req: NextRequest) {
  try {
    const { slug, guests, promoCode, marketingOptIn, teamId, teamName } = await req.json()

    const guestCount = Math.max(1, Math.min(10, parseInt(guests) || 1))

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

    const sessionParams: Record<string, unknown> = {
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            unit_amount: unitAmount,
            product_data: {
              name: productName,
              description: productDescription,
            },
          },
          quantity: guestCount,
        },
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
        guests: String(guestCount),
        ...(teamId ? { team_id: teamId, team_name: teamName } : {}),
        ...(promoCode ? { promo_code: promoCode } : {}),
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
