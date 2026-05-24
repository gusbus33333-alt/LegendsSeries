import Link from 'next/link'
import { events } from '@/lib/events'
import EventCard from './EventCard'
import ScrollReveal from './ScrollReveal'

export default function FeaturedEvents() {
  const featured = events.find((e) => e.featured)!
  const rest = events.filter((e) => !e.featured)

  return (
    <section className="py-24 lg:py-32 bg-parchment" id="events">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="section-label mb-3">On the calendar</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-ink leading-tight">
              Upcoming Events
            </h2>
            <div className="gold-rule mt-5" />
          </div>
          <Link
            href="/events"
            className="text-xs tracking-[0.2em] uppercase font-semibold text-ink/50 hover:text-gold transition-colors flex items-center gap-2 flex-shrink-0"
          >
            View all events <span className="text-gold">→</span>
          </Link>
        </ScrollReveal>

        {/* Editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">

          {/* Featured card — spans 2 columns */}
          <ScrollReveal className="lg:col-span-2" delay={0.05}>
            <EventCard event={featured} variant="featured" />
          </ScrollReveal>

          {/* Two stacked cards on the right */}
          <div className="flex flex-col gap-4 lg:gap-5">
            <ScrollReveal delay={0.15}>
              <EventCard event={rest[0]} />
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <EventCard event={rest[1]} />
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom row — 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mt-4 lg:mt-5">
          {rest.slice(2, 6).map((event, i) => (
            <ScrollReveal key={event.id} delay={0.1 * i}>
              <EventCard event={event} />
            </ScrollReveal>
          ))}
        </div>

        {/* CTA row */}
        <ScrollReveal className="flex justify-center mt-14">
          <Link href="/events" className="btn-outline-gold">
            Browse All Experiences
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
