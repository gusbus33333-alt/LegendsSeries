'use client'

import { useState } from 'react'
import ScrollReveal from './ScrollReveal'

interface TimelineItem {
  time: string
  label: string
  description: string
}

const PREVIEW_COUNT = 3

/**
 * Full list on desktop. On mobile the running order is seven near-identical
 * rows on an already long page, so the tail is collapsed behind a toggle.
 */
export default function RunningOrder({ items }: { items: TimelineItem[] }) {
  const [expanded, setExpanded] = useState(false)

  const row = (item: TimelineItem, i: number) => (
    <ScrollReveal key={item.label} delay={0.07 * Math.min(i, 3)}>
      <div className="flex gap-6 py-6 border-b border-ink/8 last:border-0">
        <div className="flex-shrink-0 w-20 sm:w-28 text-right">
          <span className="text-gold font-bold text-sm">{item.time}</span>
        </div>
        <div className="w-px bg-gold/30 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-ink font-semibold text-sm mb-1">{item.label}</p>
          <p className="text-ink/55 text-sm leading-relaxed">{item.description}</p>
        </div>
      </div>
    </ScrollReveal>
  )

  return (
    <div className="flex flex-col">
      {items.slice(0, PREVIEW_COUNT).map(row)}

      {/* `contents` keeps these as direct flex children when shown */}
      <div className={expanded ? 'contents' : 'hidden lg:contents'}>
        {items.slice(PREVIEW_COUNT).map((item, i) => row(item, i + PREVIEW_COUNT))}
      </div>

      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="lg:hidden mt-6 self-start text-gold text-xs tracking-[0.2em] uppercase font-semibold hover:text-gold-dark transition-colors"
        >
          Show the rest of the day →
        </button>
      )}
    </div>
  )
}
