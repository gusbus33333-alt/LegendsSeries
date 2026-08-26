'use client'

import Link from 'next/link'
import { useCart } from './CartProvider'
import { cartTicketCount } from '@/lib/cart'

/**
 * Hidden entirely while the basket is empty — an always-visible empty basket
 * is noise on a site where most people book a single matchday.
 */
export default function BasketLink({ onNavigate }: { onNavigate?: () => void }) {
  const { items, hydrated } = useCart()

  // Rendering before hydration would flash a zero count on every page load.
  if (!hydrated || items.length === 0) return null

  const tickets = cartTicketCount(items)

  return (
    <Link
      href="/basket"
      onClick={onNavigate}
      className="relative flex items-center gap-2 px-4 py-2.5 border border-gold/50 text-gold hover:bg-gold hover:text-ink text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300"
    >
      Basket
      <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-gold text-ink text-[0.65rem] font-bold">
        {tickets}
      </span>
    </Link>
  )
}
