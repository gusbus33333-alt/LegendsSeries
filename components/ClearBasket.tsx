'use client'

import { useEffect } from 'react'
import { useCart } from './CartProvider'

/**
 * Empties the basket once payment has succeeded. Deliberately not done at
 * redirect time — if the customer abandons Stripe and comes back, their
 * basket is still there.
 */
export default function ClearBasket() {
  const { clear, hydrated, items } = useCart()

  useEffect(() => {
    if (hydrated && items.length > 0) clear()
  }, [hydrated, items.length, clear])

  return null
}
