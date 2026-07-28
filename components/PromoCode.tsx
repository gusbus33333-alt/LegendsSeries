'use client'

import { useState } from 'react'

interface PromoCodeProps {
  onApply: (code: string) => void
  appliedCode: string
  onRemove: () => void
}

export default function PromoCode({ onApply, appliedCode, onRemove }: PromoCodeProps) {
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState('')

  if (appliedCode) {
    return (
      <div className="flex items-center justify-between bg-gold/10 border border-gold/30 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-gold text-xs font-semibold tracking-wide uppercase">{appliedCode}</span>
          <span className="text-white/40 text-[0.6rem]">applied</span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="text-white/30 hover:text-white/60 text-xs transition-colors"
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
        className="text-white/30 hover:text-white/50 text-[0.65rem] tracking-[0.1em] uppercase transition-colors text-left"
      >
        Have a promo code?
      </button>
    )
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder="Enter code"
        className="flex-1 bg-white/5 border border-white/15 text-white text-xs px-3 py-2 placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors tracking-wide uppercase"
      />
      <button
        type="button"
        onClick={() => {
          if (code.trim()) onApply(code.trim())
        }}
        disabled={!code.trim()}
        className="px-4 py-2 border border-gold/40 text-gold text-[0.6rem] tracking-widest uppercase hover:bg-gold hover:text-ink transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Apply
      </button>
    </div>
  )
}
