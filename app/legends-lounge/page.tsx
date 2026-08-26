import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import LoungeGallery from '@/components/LoungeGallery'
import FixtureCards from '@/components/FixtureCards'
import BadgeStrip from '@/components/BadgeStrip'
import GoogleReviews from '@/components/GoogleReviews'
import RunningOrder from '@/components/RunningOrder'
import { loungeEvents } from '@/lib/lounge-events'
import SignatureAvailability from '@/components/SignatureAvailability'
import { faqSchema } from '@/lib/structured-data'
import LegendsStatBand from '@/components/LegendsStatBand'
import { featuredLoungeLegends, otherLoungeLegends, credentials } from '@/lib/lounge-legends'

export const metadata: Metadata = {
  title: 'Legends Lounge — Twickenham Nations Championship 2026',
  description:
    'Premium all-inclusive matchday hospitality just 20 metres from Twickenham Stadium. No match ticket required. Hog roast, unlimited drinks, rugby legends and live music — from £250 per person inc VAT.',
}

// England vs Ireland — three Irish legends with guests in the marquee.
const greatDayPhoto = '/lounge-photos/LLL-297.jpg'

// The three that actually sell the day get top billing; the rest support them.
const includedHeadline = [
  {
    label: 'Hog Roast & All the Trimmings',
    detail: 'Carved and served from the moment the marquee opens, right through the afternoon. Veggie options too.',
  },
  {
    label: 'Unlimited Premium Bar',
    detail: 'Lager, bitter, Guinness, cider, wine, prosecco, soft drinks and coffee. Included pre and post-match — not a two-drink token.',
  },
  {
    label: 'Rugby Legends All Day',
    detail: 'Q&As, stories and genuine time with them — not a wave from across the room.',
  },
]

const includedSupporting = [
  { label: 'Hot Butcher\'s Pie', detail: 'Served post-match when the bar reopens' },
  { label: 'Live Music', detail: 'Band or DJ from first pint to last orders' },
  { label: 'Giant Screens', detail: 'Every international shown live' },
  { label: 'Charity Donation', detail: 'A portion of profits to LooseHeadz & Wooden Spoon' },
]

const notIncluded = [
  { item: 'Match ticket', note: 'Not included and we are unable to source them — obtain through your own sources or enjoy the whole day in the marquee.' },
  { item: 'Drinks during the match', note: 'The all-inclusive bar pauses during the match. Drinks available at £6 each for anyone watching in the marquee. All-inclusive service resumes at full time.' },
]

// Timeline based on a standard afternoon kickoff
const timeline = [
  {
    time: '13:30',
    label: 'Marquee Opens',
    description: 'The bar opens serving lager, bitter, Guinness, cider, wine, prosecco, soft drinks and coffee — all included. Hog roast starts serving. Come early, get a good table.',
  },
  {
    time: '13:30 – KO',
    label: 'Legends, Music & Great Food',
    description: 'Rugby legends entertain throughout the afternoon with Q&As, stories and good company. Live music keeps the atmosphere going. No queues, no overcrowded bars, no rushing.',
  },
  {
    time: 'Kickoff',
    label: 'Head to Your Seat or Watch in the Lounge',
    description: 'Head to the stadium with your match ticket — or stay and watch on the big screens in the Legends Lounge. Drinks available at £6 each during the match.',
  },
  {
    time: 'During Match',
    label: 'In the Stadium',
    description: 'You\'re in your seat. The marquee will be waiting — we reopen the bar the moment the final whistle goes.',
  },
  {
    time: 'Full Time',
    label: 'Bar Reopens — Full Service Returns',
    description: 'All-inclusive bar reopens the moment the final whistle goes. Hot butcher\'s pie served. Catch post-match analysis, other Internationals, or just enjoy the atmosphere.',
  },
  {
    time: 'Last Orders',
    label: 'Final Drinks Served',
    description: 'Last orders at the bar. A proper matchday done right — no rushing for the last train, no fighting through crowds.',
  },
  {
    time: 'Close',
    label: 'Marquee Closes',
    description: 'Approximately 3.5 hours after the final whistle. Times vary by match — full schedules confirmed on booking.',
  },
]


// Split once here so the strip below reads as two championships rather than
// one long run of dates.
const championshipFixtures = loungeEvents.filter((e) => e.competition !== 'Six Nations')
const sixNationsFixtures = loungeEvents.filter((e) => e.competition === 'Six Nations')

// Hoisted out of the JSX so the FAQ schema is generated from exactly what the
// page shows — one source, no chance of the markup drifting from the answers.
const faqs: { q: string; a: React.ReactNode }[] = [
              { q: 'Does the Legends Lounge include a match ticket?', a: 'No — the Legends Lounge is a hospitality-only experience. You\'ll need to obtain your own match ticket through official channels (RFU / Twickenham). Our marquee is open during the match and shows the game live on giant screens for those without a ticket.' },
              { q: 'Can you source match tickets for me?', a: 'Unfortunately we are unable to source match tickets. We recommend purchasing directly through the RFU or Twickenham Stadium box office well in advance, as matches do sell out.' },
              { q: 'What happens if I don\'t have a match ticket?', a: 'You\'re still welcome. The marquee stays open throughout the match with every game shown live on giant screens. Many of our guests choose to stay in the Lounge for the full day without attending the match itself.' },
              { q: 'What\'s included in the price?', a: 'Unlimited drinks (beer, wine, prosecco, soft drinks and coffee), hog roast, hot butcher\'s pie post-match, live music and rugby legends throughout the day. Drinks during the match are £6 each. Merchandise and bottles of spirits are available to buy separately.' },
              { q: 'Can I bring children?', a: 'Yes. Under 16s (15 and under) are half price and can be added when you book. The Lounge is a lively rugby crowd rather than a family venue, but children are welcome with an accompanying adult.' },
              { q: 'Is there parking?', a: 'Car parking is £40 and coach parking is £150, both added at checkout. Roads around the stadium close roughly 2 hours before kick-off, so arrive early.' },
              { q: 'Is there a dress code?', a: 'No formal dress code. Most guests wear rugby shirts, smart casual or club kit. Come as you would to the match — the marquee is heated but bring a coat for moving between the Lounge and the stadium.' },
              { q: 'What happens if the match is postponed or moved?', a: 'If the fixture is rescheduled, your booking moves with it to the new date. If you can\'t make the new date, get in touch and we\'ll sort it out — full details are in our booking policy.' },
              { q: 'Is the bar open all day?', a: 'The all-inclusive bar is open from arrival until kickoff. During the match, drinks are available at £6 each — whether you\'re watching in the stadium or on the big screens in the Lounge. All-inclusive service resumes at full time.' },
              {
                q: 'Which legends will be at my event?',
                a: (
                  <>
                    We announce the legends for each event closer to the time. Follow us on social
                    media or sign up to our mailing list to be the first to know. Check out the{' '}
                    <Link href="/legends" className="text-gold underline underline-offset-2 hover:text-gold-dark transition-colors">
                      Legends page
                    </Link>{' '}
                    to see which legends we are affiliated with.
                  </>
                ),
              },
              { q: 'How many people can attend?', a: 'The Legends Lounge is capped at 450 guests per match to keep the atmosphere right. Once a date is sold out, it\'s gone — we don\'t oversell.' },
]

/** Only the plain-text answers can be marked up; one answer is JSX. */
const faqSchemaEntries = faqs
  .filter((f): f is { q: string; a: string } => typeof f.a === 'string')
  .map((f) => ({ q: f.q, a: f.a }))

export default function LegendsLoungePage() {
  return (
    <>
      {/* The questions people actually ask before booking, marked up so they
          can surface directly in search results. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqSchemaEntries)) }}
      />
      {/* ── Hero ──────────────────────────────────────────────────────────
          Centred by design: this is the brand statement. Its job is to answer
          what it is, where it is, and roughly what it costs, above the fold. */}
      <section className="relative min-h-[100svh] flex items-center justify-center bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/lounge-photos/LLL-284.jpg"
            alt="Delon Armitage and Manu Tuilagi at the Legends Lounge"
            fill
            className="object-cover opacity-35"
            priority
            sizes="100vw"
          />
          {/* Keeps the faces readable up top and hands off cleanly to the section below */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/60 to-ink" />
        </div>

        <div className="relative z-10 text-center px-6 pt-28 pb-8 max-w-4xl mx-auto">
          <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.4em] sm:tracking-[0.5em] uppercase mb-6" style={{ color: '#e8c878' }}>
            Twickenham &middot; November 2026
          </p>

          <h1
            className="font-bold uppercase leading-[0.95] tracking-[0.04em] text-white"
            style={{ fontSize: 'clamp(44px, 9vw, 96px)' }}
          >
            Legends Lounge
          </h1>

          <p
            className="italic mt-5"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(21px, 2.8vw, 30px)',
              color: '#e8c878',
            }}
          >
            All-inclusive matchday hospitality
          </p>

          <p className="text-white/90 text-sm sm:text-base leading-relaxed mt-4 max-w-xl mx-auto">
            A private marquee 20 metres from Twickenham Stadium. Hog roast, unlimited bar,
            rugby legends and live music — from the build-up right through to last orders.
          </p>

          <div className="mt-10 flex gap-3 sm:gap-4 justify-center flex-wrap">
            <a href="#fixtures" className="btn-gold min-w-[190px]">
              Book Now
            </a>
            <a href="#included" className="btn-outline-white min-w-[190px]">
              What&apos;s Included
            </a>
          </div>

        </div>
      </section>


      <BadgeStrip />

      {/* ── Matchday strip ────────────────────────────────────────────────
          "Can I do that date?" is the first, disqualifying question. This
          answers it immediately; the full cards further down still do the
          selling, and keep their adjacency to the Signature upgrade. */}
      <section className="bg-ink border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-baseline justify-between gap-4 mb-5">
            <div>
              {/* section-label's 0.35em tracking wraps this to 3 lines on a phone */}
              <p className="text-gold text-[0.65rem] sm:text-xs tracking-[0.15em] sm:tracking-[0.35em] uppercase font-semibold">
                Fixtures &amp; Dates
              </p>
              {/* The most common pre-purchase question, answered next to the prices */}
              <p className="text-white/60 text-[0.65rem] tracking-[0.1em] uppercase mt-1.5">
                Hospitality only &middot; Match ticket not required
              </p>
            </div>
            <a
              href="#fixtures"
              className="text-white/65 hover:text-gold text-[0.65rem] tracking-[0.15em] uppercase transition-colors whitespace-nowrap"
            >
              Full details ↓
            </a>
          </div>

          {/* Grouped by championship, each with its own grid. Dividers are drawn
              on the cells rather than as a gap over a lit container, so a row
              that doesn't fill leaves nothing behind — the old version showed
              grey blocks where the last row ran short. */}
          {[
            { heading: 'Nations Championship 2026', events: championshipFixtures },
            { heading: 'Six Nations 2027', events: sixNationsFixtures },
          ].map((group, i) => (
            <div key={group.heading} className={i > 0 ? 'mt-8' : ''}>
              <div className="flex items-center gap-3 mb-3">
                <p className="text-white/80 text-[0.6rem] tracking-[0.22em] uppercase font-semibold whitespace-nowrap">
                  {group.heading}
                </p>
                <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-l border-t border-white/10">
                {group.events.map((event) => (
                  <Link
                    key={event.slug}
                    href={`/book/${event.slug}`}
                    className="group bg-ink hover:bg-white/[0.04] border-r border-b border-white/10 px-4 py-4 transition-colors flex flex-col h-full"
                  >
                    <p className="text-gold text-[0.6rem] tracking-[0.18em] uppercase font-semibold">
                      {event.shortDate}
                    </p>
                    <p className="text-white group-hover:text-gold text-[13px] font-semibold leading-snug mt-1.5 transition-colors">
                      {event.isFinals ? `Finals — ${event.dayOfWeek}` : event.match}
                    </p>
                    {/* mt-auto keeps prices on one baseline when a fixture name wraps */}
                    <p className="text-white/70 text-xs mt-auto pt-2">£{event.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The strip answers when and how much; this answers why it's worth it */}
      <LegendsStatBand />

      {/* What it is */}
      <section className="py-24 lg:py-32 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <ScrollReveal direction="left">
              <p className="section-label mb-3">For the true fan</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-ink leading-tight">
                A Great Day Out,<br />Done Properly
              </h2>
              <div className="gold-rule mt-5 mb-8" />
              <p className="text-ink/80 text-base leading-relaxed mb-8">
                The Legends Lounge is our exclusive marquee situated just 20 metres from Twickenham
                Stadium. It&rsquo;s where the matchday starts — and where it carries on after the final
                whistle. Enjoy a hog roast, unlimited drinks, live music and time with rugby legends,
                all just steps from the stadium.
              </p>

              <p className="text-ink/80 text-base leading-relaxed mb-8">
                Think of it as the perfect middle ground: not a crowded pub jostling at the bar,
                not a £1,500 corporate package. Proper rugby atmosphere, proper food, proper
                company — built around your match ticket, not instead of it.
              </p>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-6">
                <div className="border-l-2 border-gold pl-4">
                  <p className="text-ink font-bold text-2xl">20 metres</p>
                  <p className="text-ink/65 text-xs uppercase tracking-widest">From the stadium</p>
                </div>
                <div className="border-l-2 border-gold pl-4">
                  <p className="text-ink font-bold text-2xl">5hrs+</p>
                  <p className="text-ink/65 text-xs uppercase tracking-widest">Of hospitality</p>
                </div>
                <div className="border-l-2 border-gold pl-4">
                  <p className="text-ink font-bold text-2xl">450</p>
                  <p className="text-ink/65 text-xs uppercase tracking-widest">Places per matchday</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <div className="relative">
                {/* Taller on small screens so the overlaid caption doesn't crowd the group */}
                <div className="relative h-[460px] sm:h-[500px] lg:h-[520px] overflow-hidden">
                  <Image
                    src={greatDayPhoto}
                    alt="England vs Ireland — three Irish legends with guests in the Legends Lounge"
                    fill
                    className="object-cover"
                    /* Single column below lg, so it fills the width there — a flat
                       50vw under-requests the source and the image gets upscaled. */
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    quality={85}
                  />

                  {/* Scrim so the caption stays legible over a busy photo */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/75 to-transparent" />

                  {/* Caption — headline, then the tally, then the names quietest of all */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7">
                    <p className="text-white font-bold text-lg lg:text-xl leading-tight">
                      England vs Ireland
                    </p>
                    <p className="text-white/90 text-sm mt-1.5">
                      3 Irish Legends — 130 international caps — 4 happy guests
                    </p>
                    <p className="text-white/70 text-xs tracking-[0.12em] mt-2.5">
                      Devin Toner &middot; Shane Byrne &middot; Mike McCarthy
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Who you'll be drinking with ────────────────────────────────────
          Deliberately breaks the eyebrow/heading/rule pattern used elsewhere,
          and evidences past attendance instead of only promising a line-up. */}
      <section className="py-20 lg:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <ScrollReveal direction="left" className="lg:col-span-5">
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                Who you&apos;ll be
                <span className="block text-gold">drinking with</span>
              </h2>
              <p className="text-white/80 text-base leading-relaxed mt-6">
                Not a wave from across the room. Legends spend the day in the marquee —
                Q&amp;As, stories, photos, and a pint with whoever wants one.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mt-4">
                These are legends who have joined us in the Lounge before. Each event&apos;s
                line-up is confirmed closer to the day.
              </p>
              <Link
                href="/legends"
                className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.2em] uppercase font-semibold mt-7 hover:text-gold-dark transition-colors"
              >
                See all our legends
                <span aria-hidden="true">→</span>
              </Link>
            </ScrollReveal>

            <div className="lg:col-span-7">
              {/* Featured: the four with the biggest names and honours */}
              <div className="flex flex-col">
                {featuredLoungeLegends.map((legend, i) => (
                  <ScrollReveal key={legend.name} delay={0.05 * i}>
                    <div className="py-5 border-b border-white/10">
                      <p className="text-white font-bold text-xl lg:text-2xl leading-tight">
                        {legend.name}
                      </p>
                      <p className="text-white/70 text-sm mt-1.5">{credentials(legend)}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* The rest behind a dropdown — full credentials, not just caps.
                  Native details/summary, matching the FAQ pattern below. */}
              <ScrollReveal delay={0.1}>
                <details className="group mt-2">
                  <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden border-b border-white/10">
                    <span className="text-gold text-xs tracking-[0.2em] uppercase font-semibold group-hover:text-gold-dark transition-colors">
                      And {otherLoungeLegends.length} more who&apos;ve joined us
                    </span>
                    <span className="relative flex-shrink-0 w-3 h-3">
                      <span className="absolute inset-x-0 top-1/2 h-px bg-gold -translate-y-1/2" />
                      <span className="absolute inset-y-0 left-1/2 w-px bg-gold -translate-x-1/2 transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>

                  <div className="flex flex-col">
                    {otherLoungeLegends.map((legend) => (
                      <div key={legend.name} className="py-3.5 border-b border-white/5">
                        <p className="text-white font-semibold text-[15px] leading-tight">
                          {legend.name}
                        </p>
                        <p className="text-white/65 text-xs mt-1">{credentials(legend)}</p>
                      </div>
                    ))}
                  </div>
                </details>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Proof before the ask — real photography from previous events */}
      <LoungeGallery />

      {/* What's included */}
      <section id="included" className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Left-aligned header: this section is scanned, not admired */}
          <ScrollReveal className="mb-14">
            <p className="section-label mb-3">Everything covered</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              What&apos;s Included
            </h2>
            <div className="gold-rule-lg mt-5" />
          </ScrollReveal>

          {/* Headline inclusions — deliberately dominant */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 mb-px">
            {includedHeadline.map((item, i) => (
              <ScrollReveal key={item.label} delay={0.07 * i}>
                <div className="h-full bg-ink p-8 lg:p-10 flex flex-col">
                  <span className="text-gold/50 text-xs font-bold tracking-[0.3em] mb-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-white font-bold text-xl lg:text-2xl leading-tight mb-3">
                    {item.label}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Supporting inclusions — present, but not competing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 mb-10">
            {includedSupporting.map((item, i) => (
              <ScrollReveal key={item.label} delay={0.05 * i}>
                <div className="h-full bg-ink px-6 py-6">
                  <div className="flex items-baseline gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                    <p className="text-white font-semibold text-sm">{item.label}</p>
                  </div>
                  <p className="text-white/60 text-xs mt-1.5 leading-snug pl-[14px]">{item.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Not included */}
          <ScrollReveal>
            <div className="border border-white/10 p-6">
              <p className="text-white/85 text-xs tracking-[0.2em] uppercase font-semibold mb-4">Not Included — Worth Knowing</p>
              <div className="flex flex-col gap-4">
                {notIncluded.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-white/55 mt-0.5 flex-shrink-0 text-sm">—</span>
                    <div>
                      <p className="text-white/90 text-sm font-medium">{item.item}</p>
                      <p className="text-white/65 text-xs mt-0.5 leading-snug">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32 bg-parchment">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="text-center mb-14">
            <p className="section-label mb-3">Your day at the Lounge</p>
            <h2 className="text-4xl font-bold text-ink leading-tight">
              The Running Order
            </h2>
            <div className="flex justify-center mt-5">
              <div className="gold-rule" />
            </div>
            <p className="text-ink/65 text-sm mt-4">
              Times are indicative based on a standard afternoon kick-off and vary per match.
              Full confirmed schedules are seen on each individual booking page.
            </p>
          </ScrollReveal>

          <RunningOrder items={timeline} />
        </div>
      </section>

      {/* Reassurance immediately before the price and the ask */}
      <section className="pb-24 bg-parchment">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="text-center mb-10">
            <p className="section-label mb-3">From people who came</p>
            <h2 className="text-3xl font-bold text-ink leading-tight">
              What Our Guests Say
            </h2>
            <div className="flex justify-center mt-5">
              <div className="gold-rule" />
            </div>
          </ScrollReveal>
          {/* Height reserved: the widget loads lazily and would otherwise push
              the fixtures section down, shifting the #fixtures anchor target. */}
          <div className="min-h-[520px] sm:min-h-[480px]">
            <GoogleReviews />
          </div>
        </div>
      </section>

      {/* Now they know what it is and what happens — show dates, prices, book */}
      <FixtureCards />

      {/* Signature upgrade */}
      <section className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <ScrollReveal direction="left">
              <p className="section-label mb-3">Premium upgrade</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Legends Lounge<br /><span className="text-gold">Signature</span>
              </h2>
              <div className="gold-rule mt-5 mb-8" />
              <p className="text-white/85 text-base leading-relaxed mb-8">
                Everything in the standard Legends Lounge, plus a luxury hotel stay,
                a player meet &amp; greet, and exclusive gifts. Available at the
                Radisson Red Hotel (inside Twickenham Stadium) or The Lensbury Resort.
                Limited rooms available per match.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  'Legends Lounge full day hospitality — all included',
                  'Luxury hotel — Radisson Red (in the Stadium) or The Lensbury Resort',
                  'Private player meet & greet',
                  'Legends Series polo shirt & gilet',
                  'Limited edition bottle of gin',
                  'Reserved table with hostess service',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-white/90 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              {/* Not a button: the availability list alongside already links each
                  date to its booking page, and #fixtures sits further up this
                  same page — so a CTA here only scrolled people backwards. */}
              <p className="border-l-2 border-gold pl-4 text-white/85 text-sm leading-relaxed">
                Signature is added at checkout. Pick your matchday from the availability
                list, then choose your rooms in the booking box — £600 per person, with
                each room sleeping two.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <div className="bg-white/5 border border-gold/30 p-8 lg:p-10">
                <p className="text-gold text-xs tracking-[0.25em] uppercase font-semibold mb-6">Signature Availability</p>
                <SignatureAvailability
                  fixtures={loungeEvents.map((e) => ({
                    slug: e.slug,
                    match: e.match,
                    shortDate: e.shortDate,
                  }))}
                />
                <p className="text-white/60 text-xs mt-6 leading-relaxed border-t border-white/10 pt-4">
                  Rooms are twin or double and are added to any matchday booking at
                  £600 per person.
                </p>
                <Link
                  href="/contact"
                  className="btn-gold w-full text-center mt-5 py-3.5 text-[0.7rem]"
                >
                  Enquire About Signature
                </Link>
                <p className="text-white/55 text-[0.65rem] text-center mt-3 leading-relaxed">
                  Booking an odd number, a single room or a large group? Talk to us.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Charities */}
      <section className="py-16 bg-parchment border-t border-ink/8">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <p className="text-ink/65 text-xs tracking-[0.3em] uppercase font-semibold mb-4">Giving Back</p>
            <p className="text-ink/80 text-sm leading-relaxed max-w-xl mx-auto mb-6">
              A portion of profits from the Legends Lounge is donated to our charity partners.
              <strong className="text-ink"> LooseHeadz</strong> works to destigmatise mental health in rugby,
              and <strong className="text-ink">Wooden Spoon</strong> funds life-changing projects for disabled and disadvantaged children.
              Your day out does good.
            </p>
            <div className="flex items-center justify-center gap-8">
              <span className="text-gold font-semibold text-sm">LooseHeadz — Mental Health in Rugby</span>
              <span className="w-1 h-1 rounded-full bg-gold" />
              <span className="text-gold font-semibold text-sm">Wooden Spoon — Children&apos;s Charity</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-ink border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="mb-12">
            <p className="section-label mb-3">Good to know</p>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Frequently Asked Questions
            </h2>
            <div className="gold-rule mt-5" />
          </ScrollReveal>

          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={0.04 * i}>
                {/* Native details/summary: accessible, keyboard-operable, no JS */}
                <details className="group border-b border-white/10">
                  <summary className="flex items-start justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:text-gold transition-colors">
                    <h3 className="text-white group-hover:text-gold transition-colors font-semibold text-[15px] leading-snug">
                      {faq.q}
                    </h3>
                    <span className="relative flex-shrink-0 w-3 h-3 mt-1.5">
                      <span className="absolute inset-x-0 top-1/2 h-px bg-gold -translate-y-1/2" />
                      <span className="absolute inset-y-0 left-1/2 w-px bg-gold -translate-x-1/2 transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>
                  <p className="text-white/75 text-sm leading-relaxed pb-6 pr-10 max-w-3xl">
                    {faq.a}
                  </p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-ink">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <p className="section-label mb-4">450 places per matchday</p>
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Ready to Book Your Place?
            </h2>
            <div className="flex justify-center mb-6">
              <div className="gold-rule" />
            </div>
            <p className="text-white/75 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Book online in a couple of minutes and your confirmation and entry passes
              arrive straight away.
            </p>
            <div className="flex justify-center">
              <a href="#fixtures" className="btn-gold min-w-[190px]">
                Book Now
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
