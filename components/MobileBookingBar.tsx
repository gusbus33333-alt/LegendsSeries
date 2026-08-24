'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface MobileBookingBarProps {
  /** Display price, e.g. '£250 inc VAT'. */
  priceLabel: string
  /** id of the booking card to scroll to. */
  targetId: string
}

/**
 * On mobile the booking card stacks below the whole page, so the price and CTA
 * sit several screens down. This keeps both permanently reachable, and hides
 * itself once the real booking card is on screen.
 *
 * Portalled to <body> because ancestor sections apply transforms, which would
 * otherwise anchor `position: fixed` to them rather than the viewport.
 */
export default function MobileBookingBar({ priceLabel, targetId }: MobileBookingBarProps) {
  const [mounted, setMounted] = useState(false)
  const [cardInView, setCardInView] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const card = document.getElementById(targetId)
    if (!card) return
    const observer = new IntersectionObserver(
      ([entry]) => setCardInView(entry.isIntersecting),
      { rootMargin: '0px 0px -120px 0px' }
    )
    observer.observe(card)
    return () => observer.disconnect()
  }, [targetId])

  if (!mounted || cardInView) return null

  return createPortal(
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-ink/95 backdrop-blur-sm border-t border-gold/30 px-4 py-3 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-white/40 text-[0.55rem] tracking-[0.2em] uppercase">Per person</p>
        <p className="text-gold font-bold text-lg leading-tight truncate">{priceLabel}</p>
      </div>
      <button
        type="button"
        onClick={() =>
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        className="btn-gold flex-shrink-0 px-6 py-3 text-[0.7rem]"
      >
        Book Now
      </button>
    </div>,
    document.body
  )
}
