import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getEventBySlug, events } from '@/lib/events'
import ScrollReveal from '@/components/ScrollReveal'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const event = getEventBySlug(params.slug)
  if (!event) return {}
  return {
    title: event.title,
    description: event.description,
  }
}

export default function EventPage({ params }: PageProps) {
  const event = getEventBySlug(params.slug)
  if (!event) notFound()

  return (
    <>
      {/* Hero */}
      <section className="relative pt-0 min-h-[65vh] flex flex-col justify-end bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-16 pt-36 w-full">
          <p className="section-label mb-3">
            {event.flag} {event.location}
          </p>
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight max-w-3xl">
            {event.title}
          </h1>
          <p className="text-white/60 text-lg mt-3">{event.subtitle}</p>
          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <span className="text-white/40 text-sm">{event.dateRange}</span>
            <span className="text-white/20">·</span>
            <span className="text-white/40 text-sm">Up to {event.capacity} guests</span>
            {event.spotsLeft <= 20 && (
              <>
                <span className="text-white/20">·</span>
                <span className="text-gold text-sm font-semibold">
                  Only {event.spotsLeft} spots remaining
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Main content */}
            <div className="lg:col-span-2 flex flex-col gap-12">

              {/* Description */}
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-ink mb-4">The Experience</h2>
                <div className="w-12 h-px bg-gold mb-6" />
                <p className="text-ink/70 text-base leading-relaxed">{event.description}</p>
              </ScrollReveal>

              {/* Highlights */}
              <ScrollReveal delay={0.1}>
                <h2 className="text-2xl font-bold text-ink mb-4">What&apos;s Included</h2>
                <div className="w-12 h-px bg-gold mb-6" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full border border-gold/50 flex items-center justify-center mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-gold" />
                      </span>
                      <span className="text-ink/70 text-sm leading-snug">{h}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              {/* Legends attending */}
              <ScrollReveal delay={0.15}>
                <h2 className="text-2xl font-bold text-ink mb-4">Legends Attending</h2>
                <div className="w-12 h-px bg-gold mb-6" />
                <div className="flex flex-wrap gap-3">
                  {event.legends.map((legend, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-ink text-gold text-xs tracking-[0.15em] uppercase font-semibold"
                    >
                      {legend}
                    </span>
                  ))}
                </div>
                <p className="text-ink/40 text-xs mt-4">
                  Legend lineup subject to availability. Substitutions of equivalent stature may apply.
                </p>
              </ScrollReveal>
            </div>

            {/* Booking sidebar */}
            <div className="lg:col-span-1">
              <ScrollReveal className="sticky top-28">
                <div className="bg-ink p-8 flex flex-col gap-6">
                  {/* Price */}
                  <div>
                    <p className="text-white/40 text-xs tracking-widest uppercase">Price per person</p>
                    <p className="text-gold font-bold text-4xl mt-1">{event.priceDisplay}</p>
                    {event.spotsLeft <= 20 && (
                      <p className="text-white/50 text-xs mt-2">
                        ⚡ Only {event.spotsLeft} places remaining
                      </p>
                    )}
                  </div>

                  <div className="w-full h-px bg-white/10" />

                  {/* Included */}
                  <div>
                    <p className="text-gold text-xs tracking-[0.2em] uppercase font-semibold mb-3">
                      Package includes
                    </p>
                    <ul className="flex flex-col gap-2">
                      {event.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-gold mt-0.5">✓</span>
                          <span className="text-white/60 text-xs leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-full h-px bg-white/10" />

                  {/* CTA */}
                  <Link
                    href={`/contact?event=${event.slug}`}
                    className="btn-gold w-full text-center text-xs py-4"
                  >
                    Reserve Your Place
                  </Link>
                  <Link
                    href="/contact"
                    className="text-center text-white/30 text-xs tracking-widest uppercase hover:text-gold transition-colors"
                  >
                    Enquire first →
                  </Link>

                  <p className="text-white/20 text-[0.65rem] text-center leading-relaxed">
                    Secure your place with a 25% deposit. Balance due 60 days before event.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="pb-16 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Link
            href="/events"
            className="text-ink/40 hover:text-gold text-xs tracking-[0.2em] uppercase transition-colors"
          >
            ← Back to all events
          </Link>
        </div>
      </section>
    </>
  )
}
