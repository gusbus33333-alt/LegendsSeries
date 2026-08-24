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
  blurb: string
  cat: 'eng'
}

interface FinalsCard {
  slug: string
  competition: string
  games: GamePair[]
  date: string
  price: string
  priceInc: string
  blurb: string
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
    blurb: 'England host the Wallabies in the 2026 Nations Championship at Allianz Stadium — a rivalry steeped in history.',
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
    blurb: 'The Brave Blossoms bring their explosive attacking rugby to Allianz Stadium under the Saturday evening lights.',
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
    blurb: 'England host the All Blacks in the 2026 Nations Championship at Allianz Stadium — the biggest fixture in world rugby.',
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
    blurb: 'The Nations Cup Finals begin with a Friday double header at Allianz Stadium — two knockout internationals, one epic day.',
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
    blurb: 'Saturday finals at Allianz Stadium — the 5th-place final and the 2nd-place final, two titles decided in one day.',
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
    blurb: 'Grand Final day — the first-ever Nations Cup champion is crowned at Allianz Stadium in the biggest game of the year.',
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

const ORDINALS: Record<string, string> = {
  '1': '1st', '2': '2nd', '3': '3rd', '4': '4th', '5': '5th', '6': '6th',
}

/** 'N6' → 'NORTH 6TH'. Spells the badge codes out so the matchup is unambiguous. */
function sideLabel(code: string): string {
  const side = code.charAt(0).toUpperCase() === 'N' ? 'North' : 'South'
  const position = code.slice(1)
  return `${side} ${ORDINALS[position] ?? position}`.toUpperCase()
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
              <span className="text-white/20 italic text-base font-normal leading-none">v</span>
              <FinalsBadge code={game.south} />
            </div>

            {/* Matchup spelled out — understandable without clicking through */}
            <div className="text-center">
              <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-white/30 mb-1.5">
                {isGrandFinal ? game.label : `Match ${i + 1}`}
              </p>
              <p className="text-white font-bold text-[15px] leading-tight tracking-[0.03em]">
                {sideLabel(game.north)}
                <span className="text-white/30 font-normal italic px-1.5">vs</span>
                {sideLabel(game.south)}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
function vatPrice(exVat: string, includeVat: boolean): string {
  const num = parseFloat(exVat.replace(/[^0-9.]/g, ''))
  if (!includeVat || isNaN(num)) return exVat
  return `£${Math.ceil(num * 1.2).toLocaleString('en-GB')}`
}

export default function FixtureCards() {
  const [filter, setFilter] = useState<Filter>('all')
  // Consumers pay the VAT-inclusive price, so that is what leads. The toggle
  // stays for anyone booking through a business.
  const [includeVat, setIncludeVat] = useState(true)

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
          <p className="text-white/55 text-sm mt-5">
            <span className="text-gold font-semibold">£198 – £300</span> per person, inc VAT
            <span className="text-white/20 mx-3">|</span>
            Capped at <span className="text-gold font-semibold">300</span> places per matchday
          </p>
        </div>

        {/* VAT toggle */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className={`text-xs tracking-[0.15em] uppercase font-semibold transition-colors ${!includeVat ? 'text-white' : 'text-white/40'}`}>
            Ex VAT
          </span>
          <button
            onClick={() => setIncludeVat(!includeVat)}
            className="relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none"
            style={{ backgroundColor: includeVat ? '#b8953f' : '#555' }}
            aria-label="Toggle VAT"
          >
            <span
              className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
              style={{ transform: includeVat ? 'translateX(24px)' : 'translateX(0)' }}
            />
          </button>
          <span className={`text-xs tracking-[0.15em] uppercase font-semibold transition-colors ${includeVat ? 'text-white' : 'text-white/40'}`}>
            Inc VAT
          </span>
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
              className="group relative bg-gradient-to-b from-[#17171a] to-[#121214] border border-gold/28 rounded-[6px] p-8 pb-7 flex flex-col transition-all duration-250 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_18px_40px_rgba(0,0,0,.5)]"
            >
              {/* Competition label */}
              <p className="text-[10px] font-bold tracking-[0.34em] uppercase text-gold text-center mb-5">
                {fixture.competition}
              </p>

              {/* Matchup visual — symmetry earns its place here */}
              <div className="flex items-center justify-center mb-6">
                {fixture.cat === 'eng' ? (
                  <div className="flex items-center gap-4">
                    <TeamBadge icon={fixture.homeIcon} code={fixture.homeCode} />
                    <span className="text-2xl italic font-normal text-white/25">v</span>
                    <TeamBadge icon={fixture.awayIcon} code={fixture.awayCode} />
                  </div>
                ) : (
                  <FinalsMatchup games={fixture.games} />
                )}
              </div>

              {/* Everything below is read, compared and scanned — so it is left-aligned */}
              {fixture.cat === 'eng' && (
                <h3 className="font-bold tracking-[0.03em] uppercase text-[19px] leading-tight text-white">
                  {fixture.title}
                </h3>
              )}

              <p className="text-[12px] text-white/45 tracking-[0.04em] mt-2">
                {fixture.date}
              </p>

              <p className="text-[12px] text-white/35 leading-relaxed mt-3">
                {fixture.blurb}
              </p>

              {/* Price dominates; supporting detail recedes */}
              <div className="border-t border-gold/20 mt-auto pt-5">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <span className="block text-[32px] font-bold text-gold leading-none">
                      {includeVat ? fixture.priceInc.replace(/ inc VAT.*/, '') : fixture.price}
                    </span>
                    <span className="block text-[10px] tracking-[0.12em] text-white/40 mt-1.5">
                      per person &middot; {includeVat ? 'inc VAT' : 'ex VAT'}
                    </span>
                  </div>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-white/30 text-right leading-snug pb-1">
                    {fixture.cat === 'finals' ? 'Two matches' : 'Full day'}
                  </span>
                </div>
              </div>

              {/*
                CTA — its ::after stretches over the whole card so any click
                navigates. Keep filter/transform off this element: either would
                make it the containing block for the ::after and collapse the
                overlay back to the button. Hover uses gradient stops instead.
              */}
              <Link
                href={`/book/${fixture.slug}`}
                className="mt-5 block text-center bg-gradient-to-r from-gold to-[#c9a24b] group-hover:from-[#cda94c] group-hover:to-[#dcb75f] text-ink text-[12px] font-bold tracking-[0.2em] uppercase py-3.5 rounded-[2px] transition-all duration-200 after:absolute after:inset-0 after:content-[''] after:rounded-[6px]"
              >
                More info &amp; booking
              </Link>
            </article>
          ))}
        </div>

        {/* Follow Your Team — sits under the Finals double headers it solves for */}
        {(filter === 'all' || filter === 'finals') && (
          <div className="mt-10">
            <Link
              href="/book/follow-your-team"
              className="group block bg-gradient-to-r from-[#17171a] to-[#121214] border border-gold/40 rounded-[6px] p-8 transition-all duration-250 hover:-translate-y-1 hover:border-gold/70 hover:shadow-[0_18px_40px_rgba(0,0,0,.5)]"
            >
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                    <span className="text-gold text-[0.6rem] tracking-[0.3em] uppercase font-semibold border border-gold/40 px-3 py-1">
                      Nations Cup Finals
                    </span>
                    <span className="bg-red-600 text-white text-[0.6rem] tracking-[0.2em] uppercase font-bold px-3 py-1">
                      Limited
                    </span>
                  </div>
                  <p className="text-white font-bold text-xl lg:text-2xl tracking-tight">
                    Follow Your Team
                  </p>
                  <p className="text-white/55 text-sm mt-2 leading-relaxed max-w-xl">
                    As you aren&apos;t sure which day your team will play currently, pick this package
                    and select your team to visit on the day they play.
                  </p>
                  <p className="text-white/35 text-xs mt-2 leading-relaxed max-w-xl">
                    It takes the guessing out of where they finish — pick your team now and
                    we&apos;ll confirm your day as soon as the fixtures are set.
                  </p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2">
                  <span className="text-gold text-[22px] font-bold">{includeVat ? '£300' : '£250+'}</span>
                  <span className="text-white/35 text-[10px] tracking-[0.12em]">{includeVat ? 'inc VAT' : 'ex VAT'}<br />per person</span>
                </div>
                <span className="text-gold text-2xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
