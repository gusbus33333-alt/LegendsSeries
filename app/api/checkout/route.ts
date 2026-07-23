import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getEventBySlug } from '@/lib/lounge-events'

export async function POST(req: NextRequest) {
  try {
    const { slug, guests, promoCode } = await req.json()

    const event = getEventBySlug(slug)
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    const guestCount = Math.max(1, Math.min(10, parseInt(guests) || 1))
    const unitAmount = event.price * 100 // Stripe uses pence

    const sessionParams: Record<string, unknown> = {
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            unit_amount: unitAmount,
            product_data: {
              name: `Legends Lounge — ${event.match}`,
              description: `${event.date} · ${guestCount} ${guestCount === 1 ? 'guest' : 'guests'}`,
            },
          },
          quantity: guestCount,
        },
      ],
      allow_promotion_codes: true,
      customer_creation: 'always',
      metadata: {
        event_slug: slug,
        event_match: event.match,
        event_date: event.date,
        guests: String(guestCount),
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
