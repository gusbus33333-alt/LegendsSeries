'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

interface CheckoutButtonProps {
  slug: string
  className?: string
}

export default function CheckoutButton({ slug, className = '' }: CheckoutButtonProps) {
  const searchParams = useSearchParams()
  const initialGuests = Math.min(30, Math.max(1, Number(searchParams.get('guests')) || 1))
  const [guests, setGuests] = useState(initialGuests)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, guests }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setLoading(false)
        return
      }

      window.location.href = data.url
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Guest selector */}
      <div className="flex items-center justify-between">
        <label className="text-white/40 text-[0.6rem] uppercase tracking-widest">
          Guests
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            className="w-7 h-7 border border-white/20 text-white/50 hover:border-gold hover:text-gold transition-colors flex items-center justify-center text-sm"
            disabled={guests <= 1}
          >
            −
          </button>
          <span className="text-white font-semibold text-sm w-6 text-center">{guests}</span>
          <button
            type="button"
            onClick={() => setGuests((g) => Math.min(10, g + 1))}
            className="w-7 h-7 border border-white/20 text-white/50 hover:border-gold hover:text-gold transition-colors flex items-center justify-center text-sm"
            disabled={guests >= 30}
          >
            +
          </button>
        </div>
      </div>

      {/* Book now button */}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`btn-gold w-full text-center py-4 text-xs disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      >
        {loading ? 'Redirecting to payment…' : 'Book Now — Secure Payment'}
      </button>

      <p className="text-white/20 text-[0.55rem] text-center leading-relaxed">
        You&apos;ll be redirected to Stripe for secure payment. Promo codes can be applied at checkout.
      </p>

      {error && (
        <p className="text-red-400 text-xs text-center">{error}</p>
      )}
    </div>
  )
}
