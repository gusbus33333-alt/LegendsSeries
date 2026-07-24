'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { legends, COUNTRY_ORDER } from '@/lib/legends'

const FILTER_LABELS: Record<string, string> = {
  All: 'All',
  England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England',
  Wales: '🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales',
  Ireland: '🇮🇪 Ireland',
  Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland',
  'South Africa': '🇿🇦 South Africa',
  Australia: '🇦🇺 Australia',
  USA: '🇺🇸 USA',
}

const PLAYER_COUNTRIES = ['England', 'Wales', 'Ireland', 'Scotland', 'South Africa', 'Australia', 'USA']

export default function LegendsPage() {
  const [active, setActive] = useState('All')

  const filtered = useMemo(() => {
    if (active === 'All') return legends.filter((l) => PLAYER_COUNTRIES.includes(l.country))
    return legends.filter((l) => l.country === active)
  }, [active])

  // Group filtered legends by country (maintaining COUNTRY_ORDER)
  const groups = useMemo(() => {
    if (active !== 'All') return [{ country: active, items: filtered }]
    return COUNTRY_ORDER.filter((c) => PLAYER_COUNTRIES.includes(c))
      .map((country) => ({
        country,
        items: filtered.filter((l) => l.country === country),
      }))
      .filter((g) => g.items.length > 0)
  }, [active, filtered])

  const filters = ['All', ...PLAYER_COUNTRIES]

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 to-ink" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-3">The stars of the show</p>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            The Legends
          </h1>
          <div className="gold-rule mt-6" />
          <p className="text-white/50 text-base mt-6 max-w-xl leading-relaxed">
            World Cup winners. Lions tourists. Icons who defined a generation.
            Our roster spans four nations and beyond — different legends attend
            different events, each confirmed and announced individually per trip.
          </p>

          {/* Stat bar */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 mt-10">
            <div>
              <span className="text-gold font-bold text-3xl">90+</span>
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase mt-1">Legends on our roster</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <span className="text-gold font-bold text-3xl">4</span>
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase mt-1">Home nations represented</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <span className="text-gold font-bold text-3xl">30+</span>
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase mt-1">British &amp; Irish Lions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="sticky top-16 z-30 bg-ink/95 backdrop-blur border-b border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`flex-shrink-0 px-4 py-1.5 text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-200 rounded-sm ${
                  active === f
                    ? 'bg-gold text-ink'
                    : 'text-white/40 hover:text-white/80'
                }`}
              >
                {FILTER_LABELS[f] ?? f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Directory */}
      <section className="py-16 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {groups.map(({ country, items }) => (
            <div key={country} className="mb-14">
              {/* Country heading */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-6 h-px bg-gold flex-shrink-0" />
                <h2 className="text-ink font-bold text-lg tracking-wide">
                  {FILTER_LABELS[country] ?? country}
                </h2>
                <div className="flex-1 h-px bg-ink/8" />
                <span className="text-ink/30 text-xs tracking-widest uppercase">{items.length} legends</span>
              </div>

              {/* Legend cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {items.map((legend) => (
                  <div
                    key={legend.id}
                    className="bg-white border border-ink/8 hover:border-gold/30 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-ink text-sm leading-snug truncate">
                          {legend.name}
                        </h3>
                        <p className="text-gold text-[0.65rem] tracking-[0.15em] uppercase mt-0.5 font-semibold">
                          {legend.flag} {legend.country}
                        </p>
                      </div>
                      {legend.caps && (
                        <div className="flex-shrink-0 text-right">
                          <span className="text-gold font-bold text-lg leading-none">{legend.caps}</span>
                          <p className="text-ink/30 text-[0.6rem] uppercase tracking-widest">caps</p>
                        </div>
                      )}
                    </div>

                    <div className="w-6 h-px bg-gold/50 my-2.5" />

                    <p className="text-ink/50 text-[0.7rem] leading-relaxed line-clamp-2">
                      {legend.clubs}
                    </p>

                    {legend.achievements && legend.achievements.length > 0 && (
                      <ul className="mt-2 flex flex-col gap-1">
                        {legend.achievements.slice(0, 2).map((a, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[0.65rem] text-ink/50 leading-snug">
                            <span className="text-gold mt-0.5 flex-shrink-0">·</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Charity & Referee section */}
          <div className="mt-8 pt-10 border-t border-ink/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-6 h-px bg-gold flex-shrink-0" />
              <h2 className="text-ink font-bold text-lg tracking-wide">Special Guests & Partners</h2>
              <div className="flex-1 h-px bg-ink/8" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {legends.filter((l) => !PLAYER_COUNTRIES.includes(l.country)).map((l) => (
                <div key={l.id} className="bg-white border border-ink/8 p-4">
                  <h3 className="font-bold text-ink text-sm">{l.name}</h3>
                  <p className="text-gold text-[0.65rem] tracking-[0.15em] uppercase mt-0.5 font-semibold">
                    {l.flag} {l.country}
                  </p>
                  <div className="w-6 h-px bg-gold/50 my-2.5" />
                  <p className="text-ink/50 text-[0.7rem]">{l.clubs}</p>
                  {l.homeLocation && (
                    <p className="text-ink/30 text-[0.65rem] mt-1">{l.homeLocation}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How legends are involved */}
      <section className="py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Genuine access</p>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Not a Wave from a Distance
            </h2>
            <div className="flex justify-center mt-5">
              <div className="gold-rule-lg" />
            </div>
            <p className="text-white/50 text-sm mt-6 max-w-xl mx-auto leading-relaxed">
              Our legends aren&apos;t there to wave from across the room. They&apos;re with you
              throughout — on the flight, at dinner, for Q&As, and sharing stories that never
              make the broadcast. This is the access fans have always deserved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Legends Lounge',
                description:
                  'Entertainment and Q&As with legends throughout the day at our Twickenham marquee. Legends confirmed per match date.',
                link: '/legends-lounge',
                cta: 'View Lounge Dates',
              },
              {
                title: 'Living with Legends Trips',
                description:
                  'Fully hosted international trips with specific legends named for each event — travelling, dining, and experiencing the whole journey alongside you.',
                link: '/events',
                cta: 'View Events',
              },
              {
                title: 'Custom Group Events',
                description:
                  'Planning something for a group of 10 or more? We can build a bespoke experience around the legends and sporting moments that matter most to you.',
                link: '/contact',
                cta: 'Enquire Now',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-white/10 p-8 hover:border-gold/30 transition-colors flex flex-col gap-4 h-full"
              >
                <h3 className="text-gold font-semibold text-base">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1">{item.description}</p>
                <Link
                  href={item.link}
                  className="text-white/40 hover:text-gold text-xs tracking-[0.2em] uppercase transition-colors"
                >
                  {item.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="py-20 bg-parchment">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-ink/50 text-sm mb-6 max-w-lg mx-auto">
            Legends are confirmed and announced individually for each event.
            Get in touch to find out who&apos;s attending the event you&apos;re interested in.
          </p>
          <Link href="/events" className="btn-gold">
            Browse Events
          </Link>
        </div>
      </div>
    </>
  )
}
