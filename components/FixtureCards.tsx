'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Filter = 'all' | 'eng' | 'finals'

interface GamePair {
  north: string   // e.g. 'N6'
  south: string   // e.g. 'S6'
  label?: string  // e.g. 'Grand Final'
}

interface EnglandCard {
  slug: string
  competition: string
  title: string
  date: string
  price: string
  priceInc: string
  homeIcon: string
  homeCode: string
  awayIcon: string
  awayCode: string
  cat: 'eng'
}

interface FinalsCard {
  slug: string
  competition: string
  games: GamePair[]
  date: string
  price: string
  priceInc: string
  cat: 'finals'
}

type FixtureCard = EnglandCard | FinalsCard

const fixtures: FixtureCard[] = [
  {
    slug: 'england-vs-australia-nov-8',
    competition: 'Nations Championship',
    title: 'England v Australia',
    date: 'Sunday 8 November 2026 · Twickenham',
    price: '£208.33+',
    priceInc: '£250 inc VAT',
    homeIcon: '/team-icons/eng.png',
    homeCode: 'ENG',
    awayIcon: '/team-icons/aus.png',
    awayCode: 'AUS',
    cat: 'eng',
  },
  {
    slug: 'england-vs-japan-nov-14',
    competition: 'Nations Championship',
    title: 'England v Japan',
    date: 'Saturday 14 November 2026 · Twickenham',
    price: '£165+',
    priceInc: '£198 inc VAT',
    homeIcon: '/team-icons/eng.png',
    homeCode: 'ENG',
    awayIcon: '/team-icons/jpn.png',
    awayCode: 'JPN',
    cat: 'eng',
  },
  {
    slug: 'england-vs-new-zealand-nov-21',
    competition: 'Nations Championship',
    title: 'England v New Zealand',
    date: 'Saturday 21 November 2026 · Twickenham',
    price: '£208.33+',
    priceInc: '£250 inc VAT',
    homeIcon: '/team-icons/eng.png',
    homeCode: 'ENG',
    awayIcon: '/team-icons/nzl.png',
    awayCode: 'NZL',
    cat: 'eng',
  },
  {
    slug: 'nations-finals-nov-27',
    competition: 'Nations Cup Finals · Double Header',
    games: [
      { north: 'N6', south: 'S6' },
      { north: 'N3', south: 'S3' },
    ],
    date: 'Friday 27 November 2026 · Twickenham',
    price: '£250+',
    priceInc: '£300 inc VAT',
    cat: 'finals',
  },
  {
    slug: 'nations-finals-nov-28',
    competition: 'Nations Cup Finals · Double Header',
    games: [
      { north: 'N5', south: 'S5' },
      { north: 'N2', south: 'S2' },
    ],
    date: 'Saturday 28 November 2026 · Twickenham',
    price: '£250+',
    priceInc: '£300 inc VAT',
    cat: 'finals',
  },
  {
    slug: 'nations-finals-nov-29',
    competition: 'Nations Cup Finals · Double Header',
    games: [
      { north: 'N4', south: 'S4' },
      { north: 'N1', south: 'S1', label: 'Grand Final' },
    ],
    date: 'Sunday 29 November 2026 · Twickenham',
    price: '£250+',
    priceInc: '£300 inc VAT',
    cat: 'finals',
  },
]

// ── Team badge (England matches) ──────────────────────────────────────────────
function TeamBadge({ icon, code }: { icon: string; code: string }) {
  return (
    <div className="w-[90px] h-[118px] relative flex-shrink-0">
      <Image src={icon} alt={code} fill className="object-contain" sizes="90px" />
    </div>
  )
}

// ── Finals badge (image-based) ────────────────────────────────────────────────
function FinalsBadge({ code }: { code: string }) {
  const file = `/team-icons/${code.toLowerCase()}_badge.png`
  return (
    <div className="w-[78px] h-[102px] relative flex-shrink-0">
      <Image src={file} alt={code} fill className="object-contain" sizes="78px" />
    </div>
  )
}

// ── Double-header matchup block ───────────────────────────────────────────────
function FinalsMatchup({ games }: { games: GamePair[] }) {
  return (
    <div className="w-full flex flex-col gap-3">
      {games.map((game, i) => {
        const isGrandFinal = !!game.label
        return (
          <div key={i} className="flex flex-col gap-2">
            {/* Divider + label between games */}
            {i > 0 && (
              <div className="flex items-center gap-2 my-1">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/20" />
                <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-white/20">then</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/20" />
              </div>
            )}

            {/* Matchup row */}
            <div className="relative flex items-center justify-center gap-3">
              {/* Grand Final ribbon */}
              {isGrandFinal && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gold text-ink text-[7px] font-bold tracking-[0.25em] uppercase whitespace-nowrap">
                  Grand Final
                </div>
              )}
              <FinalsBadge code={game.north} />
              <span className="text-white/20 italic text-base font-light leading-none">v</span>
              <FinalsBadge code={game.south} />
            </div>

            {/* Game label */}
            <p className="text-center text-[9px] font-semibold tracking-[0.22em] uppercase text-white/30">
              {isGrandFinal ? game.label : `Match ${i + 1}`}
            </p>
          </div>
        )
      })}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function FixtureCards() {
  const [filter, setFilter] = useState<Filter>('all')

  const chips: { value: Filter; label: string }[] = [
    { value: 'all', label: 'All fixtures' },
    { value: 'eng', label: 'England internationals' },
    { value: 'finals', label: 'Finals weekend' },
  ]

  const visible = filter === 'all' ? fixtures : fixtures.filter((f) => f.cat === filter)

  return (
    <section className="py-24 bg-[#0a0a0b]" id="fixtures">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section head */}
        <div className="text-center mb-8">
          <p className="text-[11px] font-bold tracking-[0.5em] uppercase text-gold mb-4">The Fixtures</p>
          <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-[0.06em] text-white">
            Six matchdays. One lounge.
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-5 mb-4" />
          <p className="text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
            Every England international and all three Nations Cup Finals double headers, hosted at the
            Legends Lounge moments from the stadium.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2.5 justify-center flex-wrap mb-12">
          {chips.map((chip) => (
            <button
              key={chip.value}
              onClick={() => setFilter(chip.value)}
              className={`px-5 py-2.5 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase border transition-all duration-200 ${
                filter === chip.value
                  ? 'bg-gold border-gold text-ink'
                  : 'bg-transparent border-gold/28 text-white/50 hover:text-white hover:border-gold/60'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((fixture) => (
            <article
              key={fixture.slug}
              className="bg-gradient-to-b from-[#17171a] to-[#121214] border border-gold/28 rounded-[6px] p-8 pb-7 flex flex-col transition-all duration-250 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_18px_40px_rgba(0,0,0,.5)]"
            >
              {/* Competition label */}
              <p className="text-[10px] font-bold tracking-[0.34em] uppercase text-gold text-center mb-5">
                {fixture.competition}
              </p>

              {/* Matchup visual */}
              <div className="flex items-center justify-center mb-5">
                {fixture.cat === 'eng' ? (
                  <div className="flex items-center gap-4">
                    <TeamBadge icon={fixture.homeIcon} code={fixture.homeCode} />
                    <span className="text-2xl italic font-light text-white/25">v</span>
                    <TeamBadge icon={fixture.awayIcon} code={fixture.awayCode} />
                  </div>
                ) : (
                  <FinalsMatchup games={fixture.games} />
                )}
              </div>

              {/* Match title (England only) */}
              {fixture.cat === 'eng' && (
                <p className="text-center font-bold tracking-[0.05em] uppercase text-[17px] leading-tight text-white">
                  {fixture.title}
                </p>
              )}

              <p className="text-center text-[12px] text-white/35 tracking-[0.04em] mt-1.5">
                {fixture.date}
              </p>

              {/* Meta */}
              <div className="flex items-baseline justify-between border-t border-gold/20 mt-6 pt-5">
                <div>
                  <span className="text-[22px] font-bold text-gold/90 leading-none">{fixture.price}</span>
                  <span className="block text-[10px] tracking-[0.12em] text-white/35 mt-1">
                    {fixture.priceInc} per person
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.16em] uppercase text-gold">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  Limited places
                </div>
              </div>

              {/* CTA */}
              <Link
                href={`/book/${fixture.slug}`}
                className="mt-5 block text-center bg-gradient-to-r from-gold to-[#c9a24b] text-ink text-[12px] font-bold tracking-[0.2em] uppercase py-3.5 rounded-[2px] transition-all duration-200 hover:brightness-110 hover:-translate-y-px"
              >
                More info &amp; booking
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
