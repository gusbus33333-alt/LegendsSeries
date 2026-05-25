import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Legends Lounge — Twickenham Nations Championship 2026',
  description:
    'Premium all-inclusive matchday hospitality just 20 metres from Twickenham Stadium. No match ticket required. Hog roast, unlimited drinks, rugby legends and live music — from £250 per person inc VAT.',
}

const included = [
  { label: 'Hog Roast & All the Trimmings', detail: 'Served from opening throughout the afternoon' },
  { label: 'Unlimited Premium Bar', detail: 'Lager, bitter, Guinness, cider, wine, prosecco, soft drinks & coffee — all included pre & post-match' },
  { label: 'Hot Butcher\'s Pie', detail: 'Served post-match when the bar reopens after the final whistle' },
  { label: 'Rugby Legends Throughout the Day', detail: 'Q&As, stories, and genuine time with legends — not a wave from across the room' },
  { label: 'Live Music', detail: 'Live band or DJ keeping the atmosphere going from first pint to last orders' },
  { label: 'Giant Screens — All Internationals', detail: 'Every match shown live, including England\'s game for guests without a match ticket' },
  { label: 'Charity Donation Included', detail: 'All profits donated to LooseHeadz & Wooden Spoon' },
]

const notIncluded = [
  { item: 'Match ticket', note: 'Not included and we are unable to source them — obtain yours through official channels (RFU / Twickenham) before booking.' },
  { item: 'Drinks during the match', note: 'The all-inclusive bar closes at the anthems while you\'re in the stadium. Drinks available at £6 each during the match for anyone remaining in the marquee.' },
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
    time: 'Anthems',
    label: 'Bar Closes — Into the Stadium',
    description: 'The all-inclusive bar closes at the anthems. Head into the stadium and enjoy the match with your ticket. The marquee stays open on reduced service (drinks at £6 each) for anyone who stays.',
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

const loungeMatches = [
  {
    date: 'Sunday 8th November 2026',
    match: 'England vs Australia',
    games: null,
    price: '£250 inc VAT',
    type: 'Nations Championship',
    finals: false,
  },
  {
    date: 'Saturday 14th November 2026',
    match: 'England vs Japan',
    games: null,
    price: '£250 inc VAT',
    type: 'Nations Championship',
    finals: false,
  },
  {
    date: 'Saturday 21st November 2026',
    match: 'England vs New Zealand',
    games: null,
    price: '£250 inc VAT',
    type: 'Nations Championship',
    finals: false,
  },
  {
    date: 'Friday 27th November 2026',
    match: 'Nations Cup Finals — Double Header',
    games: ['North 6 vs South 6', 'North 3 vs South 3'],
    price: '£300 inc VAT',
    type: 'Nations Cup Finals',
    finals: true,
  },
  {
    date: 'Saturday 28th November 2026',
    match: 'Nations Cup Finals — Double Header',
    games: ['North 5 vs South 5', 'North 2 vs South 2'],
    price: '£300 inc VAT',
    type: 'Nations Cup Finals',
    finals: true,
  },
  {
    date: 'Sunday 29th November 2026',
    match: 'Nations Cup Finals — Double Header',
    games: ['North 4 vs South 4', 'North 1 vs South 1 — Grand Final'],
    price: '£300 inc VAT',
    type: 'Nations Cup Finals',
    finals: true,
  },
]

export default function LegendsLoungePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex flex-col justify-end bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&q=80"
            alt="Legends Lounge at Twickenham"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-ink/95" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-36 w-full">
          <p className="section-label mb-3">Twickenham Stadium — November 2026</p>
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight max-w-3xl">
            The Legends<br /><span className="text-gold">Lounge</span>
          </h1>
          <div className="gold-rule mt-6" />
          <p className="text-white/70 text-lg mt-6 max-w-xl leading-relaxed">
            Premium all-inclusive hospitality just 20 metres from Twickenham Stadium.
            For true fans who already have their match ticket and want the full day done properly.
          </p>
          {/* Key facts strip */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-8 mb-8">
            {[
              { icon: '📍', text: '20 metres from the stadium' },
              { icon: '🍺', text: 'Unlimited drinks included' },
              { icon: '🏉', text: 'Rugby legends throughout' },
              { icon: '🎫', text: 'Match ticket not included' },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-2">
                <span className="text-sm">{f.icon}</span>
                <span className="text-white/60 text-sm">{f.text}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="btn-gold">
              Book Your Place
            </Link>
            <a href="#matches" className="btn-outline-white">
              View Dates &amp; Prices
            </a>
          </div>
        </div>
      </section>

      {/* Match ticket notice */}
      <div className="bg-gold text-ink py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-sm text-center font-semibold">
            🎫 Match tickets are <span className="underline">not included</span> and we are unable to source them for you — you&apos;ll need to obtain your own through official channels (RFU / Twickenham).
          </p>
        </div>
      </div>

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
              <p className="text-ink/65 text-base leading-relaxed mb-5">
                The Legends Lounge is our exclusive marquee situated just <strong className="text-ink">20 metres from Twickenham Stadium</strong>.
                It&apos;s for genuine rugby fans who have their match ticket and want the full matchday
                experience — not just the 80 minutes. Hog roast, unlimited drinks, live music and
                real time with rugby legends, from the build-up right through to post-match.
              </p>
              <p className="text-ink/65 text-base leading-relaxed mb-5">
                The marquee opens around 3 hours before kickoff. The all-inclusive bar runs until
                the anthems, then you head to your seat. Post-match, come straight back — the bar
                reopens the moment the final whistle goes, with a hot butcher&apos;s pie and all
                other Internationals showing on the screens.
              </p>
              <p className="text-ink/65 text-base leading-relaxed mb-8">
                Think of it as the perfect middle ground: not a crowded pub, not a £600 corporate
                package. Proper rugby atmosphere, proper food, proper company — built around your
                match ticket, not instead of it.
              </p>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-6">
                <div className="border-l-2 border-gold pl-4">
                  <p className="text-ink font-bold text-2xl">20m</p>
                  <p className="text-ink/40 text-xs uppercase tracking-widest">From the stadium</p>
                </div>
                <div className="border-l-2 border-gold pl-4">
                  <p className="text-ink font-bold text-2xl">5hrs+</p>
                  <p className="text-ink/40 text-xs uppercase tracking-widest">Of hospitality</p>
                </div>
                <div className="border-l-2 border-gold pl-4">
                  <p className="text-ink font-bold text-2xl">300</p>
                  <p className="text-ink/40 text-xs uppercase tracking-widest">Places this season</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <div className="relative">
                <div className="relative h-96 lg:h-[520px] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80"
                    alt="Hospitality marquee atmosphere"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 -z-10" />
                {/* Bring your own ticket badge */}
                <div className="absolute top-6 left-6 bg-ink/90 border border-gold/50 px-4 py-2">
                  <p className="text-gold text-xs font-semibold tracking-wider uppercase">Bring Your Own Match Ticket</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 bg-ink border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              {
                heading: 'The Ultimate Build-Up',
                copy: "Arrive early and make the most of every hour. Hog roast, unlimited drinks and rugby legends from the moment you walk in — long before the crowds arrive.",
              },
              {
                heading: 'Head to Your Seat',
                copy: "When the anthems start, head into the stadium with your match ticket. The marquee will be waiting for you the moment the final whistle goes.",
              },
              {
                heading: 'The Best Post-Match in Rugby',
                copy: "Don't rush for the train. Come straight back to a full bar, a hot butcher's pie, and all the post-match analysis and other Internationals on our screens.",
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div className="p-8 border border-white/10 hover:border-gold/30 transition-colors h-full flex flex-col gap-3">
                  <h3 className="text-gold font-semibold text-base">{item.heading}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.copy}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="text-center mb-14">
            <p className="section-label mb-3">Everything covered</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              What&apos;s Included
            </h2>
            <div className="flex justify-center mt-5">
              <div className="gold-rule-lg" />
            </div>
            <p className="text-white/40 text-sm mt-4 max-w-md mx-auto">All at one price — no hidden extras, no upsells, no nasty surprises.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {included.map((item, i) => (
              <ScrollReveal key={i} delay={0.07 * (i % 2)}>
                <div className="flex items-start gap-4 p-6 border border-white/10 hover:border-gold/30 transition-colors">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full border border-gold/60 flex items-center justify-center mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-gold" />
                  </span>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.label}</p>
                    <p className="text-white/40 text-xs mt-0.5 leading-snug">{item.detail}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Not included */}
          <ScrollReveal>
            <div className="border border-white/10 p-6">
              <p className="text-white/60 text-xs tracking-[0.2em] uppercase font-semibold mb-4">Not Included — Worth Knowing</p>
              <div className="flex flex-col gap-4">
                {notIncluded.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-white/30 mt-0.5 flex-shrink-0 text-sm">—</span>
                    <div>
                      <p className="text-white/70 text-sm font-medium">{item.item}</p>
                      <p className="text-white/40 text-xs mt-0.5 leading-snug">{item.note}</p>
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
            <p className="text-ink/40 text-sm mt-4">
              Times are indicative based on a standard afternoon kickoff and vary per match.
              Full confirmed schedules are sent on booking.
            </p>
          </ScrollReveal>

          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <ScrollReveal key={i} delay={0.07 * i}>
                <div className="flex gap-6 py-6 border-b border-ink/8 last:border-0">
                  <div className="flex-shrink-0 w-28 text-right">
                    <span className="text-gold font-bold text-sm">{item.time}</span>
                  </div>
                  <div className="w-px bg-gold/30 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-ink font-semibold text-sm mb-1">{item.label}</p>
                    <p className="text-ink/55 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nations Championship explainer */}
      <section className="py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="text-center mb-12">
            <p className="section-label mb-3">About the tournament</p>
            <h2 className="text-4xl font-bold text-white leading-tight">
              The Nations Championship 2026
            </h2>
            <div className="flex justify-center mt-5">
              <div className="gold-rule-lg" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <ScrollReveal direction="left">
              <p className="text-white/60 text-base leading-relaxed mb-4">
                The Nations Championship is rugby&apos;s new global competition — bringing together
                the Six Nations, Rugby Championship, and other Tier 1 nations for the first time.
                England host Australia, Japan and New Zealand at Twickenham in November, with the
                finals staged over three consecutive days at the end of the month.
              </p>
              <p className="text-white/60 text-base leading-relaxed">
                The three finals weekends are double-header days — two full international matches
                per day at Twickenham. That means six world-class internationals in just three days,
                all shown live on our screens throughout the Legends Lounge.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.1}>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '6', label: 'Dates at Twickenham' },
                  { value: '9', label: 'International matches shown' },
                  { value: '3', label: 'Finals double-header days' },
                ].map((s) => (
                  <div key={s.label} className="border border-white/10 p-5 text-center">
                    <p className="text-gold font-bold text-3xl">{s.value}</p>
                    <p className="text-white/40 text-xs mt-1 leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Matches & pricing */}
      <section id="matches" className="py-24 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="mb-12">
            <p className="section-label mb-3">All six dates</p>
            <h2 className="text-4xl font-bold text-ink">Dates &amp; Pricing</h2>
            <div className="gold-rule mt-5" />
            <p className="text-ink/50 text-sm mt-4">All prices include VAT. Match tickets are not included.</p>
          </ScrollReveal>

          {/* Group 1: Nations Championship matches */}
          <div className="mb-6">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-ink/40 mb-3 ml-1">England Home Matches</p>
            <div className="flex flex-col gap-3">
              {loungeMatches.filter(m => !m.finals).map((match, i) => (
                <ScrollReveal key={i} delay={0.07 * i}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-ink/8 hover:border-gold/40 transition-colors group">
                    <div className="flex-1">
                      <span className="text-gold text-[0.6rem] tracking-[0.2em] uppercase font-semibold">{match.type}</span>
                      <p className="text-ink font-bold text-lg mt-1">{match.match}</p>
                      <p className="text-ink/40 text-xs mt-0.5">{match.date} · Twickenham Stadium</p>
                    </div>
                    <div className="flex items-center gap-6 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-ink/30 text-xs tracking-widest uppercase">per person</p>
                        <p className="text-gold font-bold text-2xl">{match.price}</p>
                      </div>
                      <Link href="/contact" className="btn-gold text-xs py-2.5 px-5">
                        Book
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Group 2: Finals double headers */}
          <div>
            <div className="flex items-center gap-3 mb-3 ml-1">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-ink/40">Nations Cup Finals — Double Headers</p>
              <div className="flex-1 h-px bg-ink/8" />
              <span className="text-[0.6rem] font-semibold tracking-wider uppercase text-gold bg-gold/10 border border-gold/20 px-2 py-0.5">2 Matches Per Day</span>
            </div>
            <p className="text-ink/50 text-sm mb-4 ml-1">
              Three consecutive days of finals at Twickenham — two full internationals per day.
              Watch both games live on our screens, included with your Legends Lounge ticket.
            </p>
            <div className="flex flex-col gap-3">
              {loungeMatches.filter(m => m.finals).map((match, i) => (
                <ScrollReveal key={i} delay={0.07 * i}>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-6 bg-white border border-gold/15 hover:border-gold/40 transition-colors">
                    <div className="flex-1">
                      <span className="text-gold text-[0.6rem] tracking-[0.2em] uppercase font-semibold">{match.type}</span>
                      <p className="text-ink font-bold text-lg mt-1">{match.match}</p>
                      <p className="text-ink/40 text-xs mt-0.5 mb-3">{match.date} · Twickenham Stadium</p>
                      {match.games && (
                        <div className="flex flex-col gap-1.5">
                          {match.games.map((g, gi) => (
                            <div key={gi} className="flex items-center gap-2">
                              <span className="text-gold text-xs">Match {gi + 1}:</span>
                              <span className="text-ink/60 text-xs">{g}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-6 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-ink/30 text-xs tracking-widest uppercase">per person</p>
                        <p className="text-gold font-bold text-2xl">{match.price}</p>
                        <p className="text-ink/30 text-[0.6rem] mt-0.5">2 matches included</p>
                      </div>
                      <Link href="/contact" className="btn-gold text-xs py-2.5 px-5">
                        Book
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal className="mt-8">
            <div className="border border-ink/15 p-6 flex flex-col sm:flex-row gap-4 items-start">
              <div className="flex-1">
                <p className="text-ink font-semibold text-sm">Expanding to Edinburgh, Dublin &amp; Cardiff</p>
                <p className="text-ink/50 text-sm mt-1">
                  We&apos;re in discussions to bring the Legends Lounge to more home nations venues.
                  If you&apos;re able to help or want to be first to know, get in touch.
                </p>
              </div>
              <a href="mailto:info@legends-series.com" className="btn-outline-gold text-xs py-2.5 flex-shrink-0">
                Get In Touch
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

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
              <p className="text-white/60 text-base leading-relaxed mb-8">
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
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-gold">
                Enquire About Signature
              </Link>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <div className="bg-white/5 border border-gold/30 p-8 lg:p-10">
                <p className="text-gold text-xs tracking-[0.25em] uppercase font-semibold mb-6">Signature Availability</p>
                <div className="flex flex-col gap-5">
                  {[
                    { match: 'England vs Australia', date: '8 Nov', hotel: 'Radisson Red, Twickenham', rooms: '7 rooms remaining' },
                    { match: 'England vs New Zealand', date: '21 Nov', hotel: 'Radisson Red, Twickenham', rooms: '8 rooms remaining' },
                    { match: 'Nations Cup Finals Double Header', date: '28 Nov', hotel: 'The Lensbury Resort', rooms: '12 rooms remaining' },
                    { match: 'Nations Cup Finals Double Header', date: '29 Nov', hotel: 'The Lensbury Resort', rooms: '12 rooms remaining' },
                  ].map((item, i) => (
                    <div key={i} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-white font-semibold text-sm">{item.match}</p>
                          <p className="text-white/40 text-xs mt-0.5">{item.date} Nov · {item.hotel}</p>
                        </div>
                        <span className="flex-shrink-0 text-gold text-xs font-semibold">{item.rooms}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-white/25 text-xs mt-6 leading-relaxed border-t border-white/10 pt-4">
                  Six Nations 2027 packages also available — England vs France (14 Feb),
                  England vs Italy (20 Feb), England vs Scotland (13 Mar). Enquire for details.
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
            <p className="text-ink/40 text-xs tracking-[0.3em] uppercase font-semibold mb-4">Giving Back</p>
            <p className="text-ink/65 text-sm leading-relaxed max-w-xl mx-auto mb-6">
              All profits from the Legends Lounge are donated to our charity partners.
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

      {/* Final CTA */}
      <section className="py-20 bg-ink">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <p className="section-label mb-4">Only 300 places this season</p>
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Ready to Book Your Place?
            </h2>
            <div className="flex justify-center mb-6">
              <div className="gold-rule" />
            </div>
            <p className="text-white/50 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Get in touch and our team will confirm availability and next steps within 24 hours.
              No hard sell — if a date is sold out, we&apos;ll tell you straight.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-gold min-w-[180px]">
                Enquire Now
              </Link>
              <a href="tel:+447595217647" className="btn-outline-white min-w-[180px]">
                Call / WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
