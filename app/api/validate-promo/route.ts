import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ valid: false, error: 'No code provided' })
    }

    const codes = await stripe.promotionCodes.list({
      code: code.trim().toUpperCase(),
      active: true,
      limit: 1,
      expand: ['data.coupon'],
    })

    if (codes.data.length === 0) {
      return NextResponse.json({ valid: false, error: 'Invalid promo code' })
    }

    const promo = codes.data[0]
    const coupon = promo.coupon

    return NextResponse.json({
      valid: true,
      id: promo.id,
      percentOff: coupon.percent_off ?? null,
      amountOff: coupon.amount_off ? coupon.amount_off / 100 : null,
    })
  } catch {
    return NextResponse.json({ valid: false, error: 'Could not validate code' })
  }
}
