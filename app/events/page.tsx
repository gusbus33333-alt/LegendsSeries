import type { Metadata } from 'next'
import Image from 'next/image'
import { events } from '@/lib/events'
import EventCard from '@/components/EventCard'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Upcoming Events',
  description:
    'Browse all Legends Series sporting events — from Twickenham match-day hospitality to international golf and adventure travel. From £165 per person.',
}

const categories = ['All', 'Rugby', 'Golf', 'Adventure', 'Luxury Travel']

export default function EventsPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative pt-32 pb-20 bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1544568100-847a948585b9?w=1600&q=80"
            alt="Rugby event"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 to-ink" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-3">The full calendar</p>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            Upcoming Events
          </h1>
          <div className="gold-rule mt-6" />
          <p className="text-white/50 text-base mt-6 max-w-xl leading-relaxed">
            From intimate Twickenham lounge experiences to private jets, Cresta Runs, and
            week-long odysseys — every Legends Series event is extraordinary.
          </p>
        </div>
      </section>

      {/* Events grid */}
      <section className="py-20 lg:py-24 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Filter tabs — visual only */}
          <ScrollReveal className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`px-5 py-2 text-xs tracking-[0.2em] uppercase font-semibold border transition-all duration-200 ${
                  i === 0
                    ? 'bg-gold border-gold text-ink'
                    : 'border-ink/20 text-ink/50 hover:border-gold hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {events.map((event, i) => (
              <ScrollReveal key={event.id} delay={0.07 * (i % 3)}>
                <EventCard event={event} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
