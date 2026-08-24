'use client'

import type { Dispatch, SetStateAction } from 'react'

interface QuantityRowProps {
  label: string
  /** Small note under the label, e.g. pricing or eligibility. */
  hint?: string
  value: number
  /** A setState function — updates go through an updater so rapid clicks don't
   *  each read the same stale value and drop increments. */
  onChange: Dispatch<SetStateAction<number>>
  min?: number
  max?: number
}

/**
 * Shared stepper used for guests and the optional extras, so every row on the
 * booking box behaves and looks the same.
 */
export default function QuantityRow({
  label,
  hint,
  value,
  onChange,
  min = 0,
  max = 30,
}: QuantityRowProps) {
  const step = (delta: number) =>
    onChange((prev) => Math.min(max, Math.max(min, prev + delta)))

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-white/40 text-[0.6rem] uppercase tracking-widest">{label}</p>
        {hint && <p className="text-white/25 text-[0.55rem] mt-0.5 leading-snug">{hint}</p>}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="w-7 h-7 border border-white/20 text-white/50 hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center text-sm disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/20 disabled:hover:text-white/50"
        >
          −
        </button>
        <span className="text-white font-semibold text-sm w-6 text-center">{value}</span>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="w-7 h-7 border border-white/20 text-white/50 hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center text-sm disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/20 disabled:hover:text-white/50"
        >
          +
        </button>
      </div>
    </div>
  )
}
