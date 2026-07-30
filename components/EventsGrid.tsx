'use client'

import { useState } from 'react'
import { Event } from '@/lib/types'
import EventCard from '@/components/EventCard'
import ScrollReveal from '@/components/ScrollReveal'

const categories = ['All', 'Rugby', 'Golf', 'Adventure', 'Luxury Travel']

export default function EventsGrid({ events }: { events: Event[] }) {
  const [includeVat, setIncludeVat] = useState(false)

  return (
    <>
      {/* Controls row */}
      <div className="flex flex-wrap items-center justify-end gap-4 mb-12">
        {/* VAT toggle */}
        <div className="flex items-center gap-3">
          <span className={`text-xs tracking-[0.15em] uppercase font-semibold transition-colors ${!includeVat ? 'text-ink' : 'text-ink/40'}`}>
            Ex VAT
          </span>
          <button
            onClick={() => setIncludeVat(!includeVat)}
            className="relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none"
            style={{ backgroundColor: includeVat ? '#b8953f' : '#d1d5db' }}
            aria-label="Toggle VAT"
          >
            <span
              className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
              style={{ transform: includeVat ? 'translateX(24px)' : 'translateX(0)' }}
            />
          </button>
          <span className={`text-xs tracking-[0.15em] uppercase font-semibold transition-colors ${includeVat ? 'text-ink' : 'text-ink/40'}`}>
            Inc VAT
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {events.map((event, i) => (
          <ScrollReveal key={event.id} delay={0.07 * (i % 3)}>
            <EventCard event={event} includeVat={includeVat} />
          </ScrollReveal>
        ))}
      </div>
    </>
  )
}
