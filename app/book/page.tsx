import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { loungeEvents } from '@/lib/lounge-events'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Book Your Place — Legends Lounge Twickenham 2026',
  description:
    'Reserve your place at the Legends Lounge for the Nations Championship at Twickenham. Six dates, from £250 per person inc VAT. Hospitality experience only — match ticket not included.',
}

export default function BookPage() {
  const standardEvents = loungeEvents.filter((e) => !e.isFinals)
  const finalsEvents = loungeEvents.filter((e) => e.isFinals)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/lounge-photos/LLL-238.jpg"
            alt="Legends Lounge — Twickenham"
            fill
            className="object-cover opacity-25"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 to-ink" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-3">Twickenham Stadium — November 2026</p>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            Book Your Place
          </h1>
          <div className="gold-rule mt-6" />
          <p className="text-white/50 text-base mt-6 max-w-xl leading-relaxed">
            Six dates. Six chances to experience the Legends Lounge at the home of English rugby.
            Choose your match below and reserve your place.
          </p>
          {/* Key facts */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 mt-8">
            {[
              { icon: '📍', text: '20 metres from Twickenham Stadium' },
              { icon: '🍺', text: 'Unlimited drinks inc.' },
              { icon: '🏉', text: 'Rugby legends all day' },
              { icon: '🎫', text: 'Match ticket not included' },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-2">
                <span className="text-sm">{f.icon}</span>
                <span className="text-white/55 text-sm">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── Standard matches ──────────────────────────────────────────── */}
      <section className="py-20 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="mb-12">
            <p className="section-label mb-2">November 2026</p>
            <h2 className="text-3xl font-bold text-ink">Nations Championship</h2>
            <div className="gold-rule mt-4" />
            <p className="text-ink/50 text-sm mt-4 max-w-lg">
              Three England home games at Twickenham. £250 per person inc. VAT. Choose your match.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {standardEvents.map((event, i) => (
              <ScrollReveal key={event.slug} delay={0.08 * i}>
                <EventCard event={event} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Finals ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="mb-12">
            <p className="section-label mb-2">27–29 November 2026</p>
            <h2 className="text-3xl font-bold text-white">
              Nations Cup Finals — Double Headers
            </h2>
            <div className="gold-rule mt-4" />
            <p className="text-white/40 text-sm mt-4 max-w-lg">
              Three days of back-to-back finals at Twickenham. Two matches per day — full day
              hospitality from 09:30. £300 per person inc. VAT.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {finalsEvents.map((event, i) => (
              <ScrollReveal key={event.slug} delay={0.08 * i}>
                <FinalsCard event={event} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's included strip ─────────────────────────────────────── */}
      <section className="py-16 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="text-center mb-10">
            <p className="section-label mb-2">Every event includes</p>
            <h2 className="text-2xl font-bold text-ink">The Full Package</h2>
            <div className="flex justify-center mt-4">
              <div className="gold-rule-lg" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🐷', label: 'Hog Roast & Trimmings' },
              { icon: '🍺', label: 'Unlimited Premium Bar' },
              { icon: '🥧', label: "Hot Butcher's Pie Post-Match" },
              { icon: '🏉', label: 'Legends Throughout the Day' },
              { icon: '🎸', label: 'Live Music' },
              { icon: '📺', label: 'All Internationals on Screen' },
              { icon: '💛', label: 'Charity Donation Included' },
              { icon: '📍', label: '20m from the Stadium' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center text-center p-5 border border-ink/10 gap-2"
              >
                <span className="text-2xl">{item.icon}</span>
                <p className="text-ink/70 text-xs tracking-wide leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-ink/30 text-xs mt-6">
            Match tickets are not included. Obtain through official channels before booking.
          </p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-ink">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="text-white/40 text-sm mb-4">
              Questions before you book? We&apos;re happy to help.
            </p>
            <Link href="/contact" className="btn-outline-white">
              Contact Us
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

// ─── Standard match card ──────────────────────────────────────────────────────
function EventCard({ event }: { event: (typeof loungeEvents)[0] }) {
  return (
    <Link href={`/book/${event.slug}`} className="group block bg-ink overflow-hidden">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={event.cardPhoto}
          alt={event.match}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className="text-gold text-[0.6rem] tracking-[0.25em] uppercase font-semibold">
            {event.competition}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-4">
        <div>
          <p className="text-white/40 text-xs tracking-[0.15em] uppercase mb-1">{event.date}</p>
          <h3 className="text-white font-bold text-lg leading-tight group-hover:text-gold transition-colors">
            {event.match}
          </h3>
          <p className="text-white/30 text-xs mt-1">
            Marquee opens {event.openTime} · KO {event.ko}
          </p>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-gold font-bold text-xl">{event.priceLabel}</p>
            <p className="text-white/25 text-[0.6rem]">{event.priceExVat} per person</p>
          </div>
          <span className="text-gold text-sm group-hover:translate-x-1 transition-transform">
            Book →
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── Finals card ──────────────────────────────────────────────────────────────
function FinalsCard({ event }: { event: (typeof loungeEvents)[0] }) {
  return (
    <Link href={`/book/${event.slug}`} className="group block bg-ink/60 border border-white/10 overflow-hidden hover:border-gold/40 transition-colors">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={event.cardPhoto}
          alt={event.match}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
        <div className="absolute top-3 right-3">
          <span className="bg-gold text-ink text-[0.55rem] tracking-[0.2em] uppercase font-bold px-2.5 py-1">
            Double Header
          </span>
        </div>
        <div className="absolute bottom-3 left-4">
          <span className="text-gold text-[0.6rem] tracking-[0.25em] uppercase font-semibold">
            {event.competition}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-3">
        <div>
          <p className="text-white/40 text-xs tracking-[0.15em] uppercase mb-1">{event.date}</p>
          <h3 className="text-white font-bold text-base leading-tight group-hover:text-gold transition-colors">
            {event.match}
          </h3>
        </div>
        {event.games && (
          <ul className="flex flex-col gap-1">
            {event.games.map((g) => (
              <li key={g} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                <span className="text-white/40 text-xs">{g}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-gold font-bold text-xl">{event.priceLabel}</p>
            <p className="text-white/25 text-[0.6rem]">{event.priceExVat} per person</p>
          </div>
          <span className="text-gold text-sm group-hover:translate-x-1 transition-transform">
            Book →
          </span>
        </div>
      </div>
    </Link>
  )
}
