import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  loungeEvents,
  getEventBySlug,
  getOtherEvents,
  buildTimeline,
  included,
} from '@/lib/lounge-events'
import ScrollReveal from '@/components/ScrollReveal'
import CheckoutButton from '@/components/CheckoutButton'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return loungeEvents.map((e) => ({ slug: e.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const event = getEventBySlug(params.slug)
  if (!event) return {}
  return {
    title: `Legends Lounge — ${event.match} | ${event.shortDate}`,
    description: `Reserve your place at the Legends Lounge for ${event.match} on ${event.date}. ${event.priceLabel} per person. Hospitality experience only — match ticket not included.`,
  }
}

export default function BookEventPage({ params }: PageProps) {
  const event = getEventBySlug(params.slug)
  if (!event) notFound()

  const timeline = buildTimeline(event)
  const others = getOtherEvents(event.slug)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] flex flex-col justify-end bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={event.heroPhoto}
            alt={`Legends Lounge — ${event.match}`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/50 to-ink" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-16 pt-36 w-full">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-gold text-[0.6rem] tracking-[0.3em] uppercase font-semibold border border-gold/40 px-3 py-1">
              {event.competition}
            </span>
            {event.isFinals && (
              <span className="bg-gold text-ink text-[0.6rem] tracking-[0.2em] uppercase font-bold px-3 py-1">
                Double Header
              </span>
            )}
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            {event.match}
          </h1>
          <p className="text-white/50 text-base mt-3">
            {event.date}
            {event.ko !== 'TBC' ? ` · Kickoff ${event.ko}` : ''}
          </p>
          {event.games && (
            <div className="flex flex-col sm:flex-row gap-2 mt-3">
              {event.games.map((g) => (
                <span
                  key={g}
                  className="text-white/40 text-xs border border-white/15 px-3 py-1 w-fit"
                >
                  {g}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>



      {/* ── Main content ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* ── Left: content ──────────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-14">

              {/* About */}
              <ScrollReveal>
                <p className="section-label mb-3">The Event</p>
                <h2 className="text-2xl font-bold text-ink mb-4">{event.match}</h2>
                <div className="w-10 h-px bg-gold mb-5" />
                <p className="text-ink/65 text-base leading-relaxed">{event.blurb}</p>
                <p className="text-ink/50 text-sm leading-relaxed mt-4">
                  The Legends Lounge is our exclusive marquee situated{' '}
                  <strong>just 20 metres from Twickenham Stadium</strong>. It&apos;s for genuine
                  rugby fans who have their match ticket and want the full matchday experience — not
                  just the 80 minutes. Hog roast, unlimited drinks, live music and real time with
                  rugby legends, from the build-up right through to post-match.
                </p>
              </ScrollReveal>

              {/* What's included */}
              <ScrollReveal delay={0.05}>
                <p className="section-label mb-3">The Package</p>
                <h2 className="text-2xl font-bold text-ink mb-4">What&apos;s Included</h2>
                <div className="w-10 h-px bg-gold mb-6" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {included.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="flex-shrink-0 text-gold mt-0.5 font-bold">✓</span>
                      <div>
                        <p className="text-ink font-semibold text-sm">{item.label}</p>
                        <p className="text-ink/45 text-xs leading-snug mt-0.5">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* Not included */}
                <div className="mt-6 p-4 border border-ink/15 bg-ink/3">
                  <p className="text-ink/50 text-xs font-semibold tracking-[0.15em] uppercase mb-3">
                    Not Included
                  </p>
                  <ul className="flex flex-col gap-2">
                    <li className="flex items-start gap-2">
                      <span className="text-ink/30 text-xs mt-0.5">✕</span>
                      <p className="text-ink/50 text-xs leading-snug">
                        <strong className="text-ink/70">Match ticket</strong> — not included and
                        we cannot source them. Obtain through official channels before booking.
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ink/30 text-xs mt-0.5">✕</span>
                      <p className="text-ink/50 text-xs leading-snug">
                        <strong className="text-ink/70">Drinks during the match</strong> — the
                        all-inclusive bar closes at the anthems. Drinks available at £5 each for
                        anyone staying in the marquee.
                      </p>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              {/* Timeline */}
              <ScrollReveal delay={0.1}>
                <p className="section-label mb-3">The Day</p>
                <h2 className="text-2xl font-bold text-ink mb-4">Running Order</h2>
                <div className="w-10 h-px bg-gold mb-8" />
                <ol className="flex flex-col">
                  {timeline.map((entry, i) => (
                    <li key={i} className="flex gap-5 relative">
                      {/* vertical line */}
                      {i < timeline.length - 1 && (
                        <div className="absolute left-[2.35rem] top-8 bottom-0 w-px bg-ink/10" />
                      )}
                      {/* time bubble */}
                      <div className="flex flex-col items-center flex-shrink-0 w-16 pt-1">
                        <div className="w-5 h-5 rounded-full border-2 border-gold bg-parchment z-10" />
                        <span className="text-gold font-semibold text-[0.65rem] text-center mt-1 leading-tight">
                          {entry.time}
                        </span>
                      </div>
                      {/* content */}
                      <div className="pb-8">
                        <p className="text-ink font-bold text-sm mb-1">{entry.label}</p>
                        <p className="text-ink/50 text-xs leading-relaxed">
                          {entry.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </ScrollReveal>
            </div>

            {/* ── Right: booking card (sticky) ───────────────────────── */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <ScrollReveal>
                  <div className="bg-ink">
                    {/* Price header */}
                    <div className="p-7 pb-5">
                      <p className="text-white/35 text-[0.65rem] tracking-[0.2em] uppercase mb-1">
                        Price per person
                      </p>
                      <p className="text-gold font-bold text-4xl">{event.priceLabel}</p>
                      <p className="text-white/25 text-xs mt-1">{event.priceExVat} per person</p>
                    </div>

                    <div className="h-px bg-white/10 mx-7" />

                    {/* Date & time info */}
                    <div className="px-7 py-5 flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <span className="text-gold text-sm mt-0.5">📅</span>
                        <div>
                          <p className="text-white/40 text-[0.6rem] uppercase tracking-widest">
                            Date
                          </p>
                          <p className="text-white text-sm font-semibold">{event.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-gold text-sm mt-0.5">🕐</span>
                        <div>
                          <p className="text-white/40 text-[0.6rem] uppercase tracking-widest">
                            Marquee Opens
                          </p>
                          <p className="text-white text-sm font-semibold">{event.openTime}</p>
                        </div>
                      </div>
                      {event.ko !== 'TBC' && (
                        <div className="flex items-start gap-3">
                          <span className="text-gold text-sm mt-0.5">🏉</span>
                          <div>
                            <p className="text-white/40 text-[0.6rem] uppercase tracking-widest">
                              Kickoff
                            </p>
                            <p className="text-white text-sm font-semibold">{event.ko}</p>
                          </div>
                        </div>
                      )}
                      {event.isFinals && event.games && (
                        <div className="flex items-start gap-3">
                          <span className="text-gold text-sm mt-0.5">🏆</span>
                          <div>
                            <p className="text-white/40 text-[0.6rem] uppercase tracking-widest mb-1">
                              Matches
                            </p>
                            {event.games.map((g) => (
                              <p key={g} className="text-white/70 text-xs">
                                {g}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="h-px bg-white/10 mx-7" />

                    {/* CTA */}
                    <div className="p-7 flex flex-col gap-3">
                      <CheckoutButton slug={event.slug} />
                      <Link
                        href="/contact"
                        className="text-center text-white/30 hover:text-gold text-xs tracking-[0.15em] uppercase transition-colors py-1"
                      >
                        Enquire first →
                      </Link>
                    </div>

                    <div className="h-px bg-white/10 mx-7" />

                    {/* Disclaimer */}
                    <div className="px-7 py-5">
                      <p className="text-white/20 text-[0.6rem] leading-relaxed text-center">
                        Hospitality experience only. Match ticket not included. Prices per person
                        inc. VAT.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other events ──────────────────────────────────────────────── */}
      <section className="py-16 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="mb-10">
            <p className="section-label mb-2">Other dates</p>
            <h2 className="text-2xl font-bold text-white">More Legends Lounge Events</h2>
            <div className="gold-rule mt-4" />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((other, i) => (
              <ScrollReveal key={other.slug} delay={0.06 * i}>
                <Link
                  href={`/book/${other.slug}`}
                  className="group flex items-center gap-4 p-4 border border-white/10 hover:border-gold/40 transition-colors"
                >
                  <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden">
                    <Image
                      src={other.cardPhoto}
                      alt={other.match}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/40 text-[0.6rem] uppercase tracking-widest">
                      {other.shortDate}
                    </p>
                    <p className="text-white text-sm font-semibold leading-snug group-hover:text-gold transition-colors truncate">
                      {other.match}
                    </p>
                    <p className="text-gold text-xs mt-0.5">{other.priceLabel}</p>
                  </div>
                  <span className="text-white/20 group-hover:text-gold transition-colors text-sm">
                    →
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/book"
              className="text-white/30 hover:text-gold text-xs tracking-[0.2em] uppercase transition-colors"
            >
              ← Back to all dates
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
