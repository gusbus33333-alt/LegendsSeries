'use client'

import { useState } from 'react'

// Defined with the cart, re-exported here so existing importers are unchanged.
export type { PromoDiscount } from '@/lib/cart'
import type { PromoDiscount } from '@/lib/cart'

interface PromoCodeProps {
  onApply: (discount: PromoDiscount) => void
  appliedCode: string
  onRemove: () => void
}

export default function PromoCode({ onApply, appliedCode, onRemove }: PromoCodeProps) {
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (appliedCode) {
    return (
      <div className="flex items-center justify-between bg-gold/10 border border-gold/30 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-gold text-xs font-semibold tracking-wide uppercase">{appliedCode}</span>
          <span className="text-white/65 text-[0.6rem]">applied</span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="text-white/55 hover:text-white/85 text-xs transition-colors"
        >
          Remove
        </button>
      </div>
    )
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-white/80 hover:text-gold text-[0.75rem] tracking-[0.1em] uppercase transition-colors text-left"
      >
        Have a promo code?
      </button>
    )
  }

  const handleApply = async () => {
    const trimmed = code.trim()
    if (!trimmed) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/validate-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: trimmed }),
      })
      const data = await res.json()

      if (!data.valid) {
        setError(data.error || 'Invalid code')
        setLoading(false)
        return
      }

      onApply({
        code: trimmed,
        percentOff: data.percentOff,
        amountOff: data.amountOff,
      })
    } catch {
      setError('Could not validate code')
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => { setCode(e.target.value.toUpperCase()); setError('') }}
          placeholder="Enter code"
          className="flex-1 min-w-0 bg-white/5 border border-white/15 text-white text-xs px-3 py-2 placeholder:text-white/45 focus:border-gold focus:outline-none transition-colors tracking-wide uppercase"
          onKeyDown={(e) => { if (e.key === 'Enter') handleApply() }}
        />
        <button
          type="button"
          onClick={handleApply}
          disabled={!code.trim() || loading}
          className="shrink-0 whitespace-nowrap px-4 py-2 border border-gold/40 text-gold text-[0.6rem] tracking-widest uppercase hover:bg-gold hover:text-ink transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {loading ? '...' : 'Apply'}
        </button>
      </div>
      {error && <p className="text-red-400 text-[0.6rem]">{error}</p>}
    </div>
  )
}
