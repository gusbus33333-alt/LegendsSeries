import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import FollowYourTeamCheckout from '@/components/FollowYourTeamCheckout'
import { included } from '@/lib/lounge-events'
import { followYourTeamPriceLabel, followYourTeamPriceExVat } from '@/lib/follow-your-team'

export const metadata: Metadata = {
  title: 'Follow Your Team — Nations Cup Finals Weekend | Legends Series',
  description:
    'Pick your team and follow them through the Nations Cup Finals Weekend at Twickenham. Full Legends Lounge hospitality on the day your team plays. Limited availability.',
}

export default function FollowYourTeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex flex-col justify-between bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/follow-your-team-hero.webp"
            alt="The twelve Nations Cup teams — Follow Your Team at Twickenham"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          {/* Kept light at the top so the badges read, solid at the base for the copy */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-ink" />
        </div>
        {/* Pinned to the top so they clear the team crests in the artwork */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 lg:pt-28 w-full">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-gold text-[0.6rem] tracking-[0.3em] uppercase font-semibold border border-gold/40 px-3 py-1 bg-ink/40 backdrop-blur-sm">
              Nations Cup Finals
            </span>
            <span className="bg-red-600 text-white text-[0.6rem] tracking-[0.2em] uppercase font-bold px-3 py-1">
              Limited Tickets
            </span>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-16 pt-16 w-full">
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight max-w-3xl drop-shadow-lg">
            Follow Your Team
          </h1>
          <p className="text-white/70 text-base mt-3 max-w-xl">
            Pick the team you&apos;re supporting and get full Legends Lounge hospitality on the day they play
            during Finals Weekend at Twickenham.
          </p>
          <p className="text-white/40 text-sm mt-3">
            27th — 29th November 2026
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 lg:py-28 bg-parchment">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">

          {/* Intro */}
          <ScrollReveal>
            <p className="section-label mb-3">The Concept</p>
            <h2 className="text-2xl font-bold text-ink mb-4">Your team. Your day. Your experience.</h2>
            <div className="w-10 h-px bg-gold mb-5" />
            <p className="text-ink/65 text-base leading-relaxed max-w-3xl">
              The Nations Cup Finals Weekend sees all 12 teams compete across three days at Twickenham.
              With a Follow Your Team ticket, you don&apos;t need to guess the schedule — just pick your
              team. Whichever day they play, you&apos;ll have full access to the Legends Lounge with
              everything included: hog roast, unlimited premium drinks, live music, rugby legends
              and every match on the big screens.
            </p>
            <p className="text-ink/45 text-sm leading-relaxed mt-4">
              These are limited-availability tickets. Once they&apos;re gone, they&apos;re gone — and
              they won&apos;t be available on the day. This is for fans who want to lock in their
              Finals Weekend plans now, without waiting for the league table to settle.
            </p>
          </ScrollReveal>

          <div className="h-px bg-ink/10 my-14" />

          {/* Price banner */}
          <ScrollReveal delay={0.05}>
            <div className="bg-ink p-7 mb-14">
              <p className="text-white/35 text-[0.65rem] tracking-[0.2em] uppercase mb-1">
                Price per person
              </p>
              <p className="text-gold font-bold text-4xl">{followYourTeamPriceLabel}</p>
              <p className="text-white/25 text-xs mt-1">{followYourTeamPriceExVat} per person</p>
              <p className="text-white/40 text-xs mt-3 leading-relaxed">
                One full day of Legends Lounge hospitality on the day your team plays.
                Same price as an individual Finals day ticket — but you lock in your spot now.
              </p>
            </div>
          </ScrollReveal>

          {/* Team selector + checkout */}
          <ScrollReveal delay={0.1}>
            <FollowYourTeamCheckout />
          </ScrollReveal>

          <div className="h-px bg-ink/10 my-14" />

          {/* What's included */}
          <ScrollReveal delay={0.15}>
            <p className="section-label mb-3">The Package</p>
            <h2 className="text-2xl font-bold text-ink mb-4">What&apos;s Included</h2>
            <div className="w-10 h-px bg-gold mb-6" />
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {included.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-gold mt-0.5 font-bold">{'✓'}</span>
                  <div>
                    <p className="text-ink font-semibold text-sm">{item.label}</p>
                    <p className="text-ink/45 text-xs leading-snug mt-0.5">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 border border-ink/15 bg-ink/3">
              <p className="text-ink/50 text-xs font-semibold tracking-[0.15em] uppercase mb-3">
                Not Included
              </p>
              <ul className="flex flex-col gap-2">
                <li className="flex items-start gap-2">
                  <span className="text-ink/30 text-xs mt-0.5">{'✕'}</span>
                  <p className="text-ink/50 text-xs leading-snug">
                    <strong className="text-ink/70">Match ticket</strong> — not included and
                    we cannot source them. Obtain through official channels before booking.
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ink/30 text-xs mt-0.5">{'✕'}</span>
                  <p className="text-ink/50 text-xs leading-snug">
                    <strong className="text-ink/70">Drinks during the match</strong> — the
                    all-inclusive bar pauses during the match. Drinks available at £6 each
                    whether you&apos;re in the stadium or watching in the Lounge. All-inclusive
                    service resumes at full time.
                  </p>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Back to finals */}
      <section className="py-12 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-white/30 text-xs mb-4">
            Want to book a specific Finals day instead?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/book/nations-finals-nov-27"
              className="text-white/50 hover:text-gold text-xs tracking-[0.15em] uppercase transition-colors"
            >
              Friday 27 Nov →
            </Link>
            <Link
              href="/book/nations-finals-nov-28"
              className="text-white/50 hover:text-gold text-xs tracking-[0.15em] uppercase transition-colors"
            >
              Saturday 28 Nov →
            </Link>
            <Link
              href="/book/nations-finals-nov-29"
              className="text-white/50 hover:text-gold text-xs tracking-[0.15em] uppercase transition-colors"
            >
              Sunday 29 Nov →
            </Link>
          </div>
          <div className="mt-6">
            <Link
              href="/book"
              className="text-white/30 hover:text-gold text-xs tracking-[0.2em] uppercase transition-colors"
            >
              {'←'} Back to all dates
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
