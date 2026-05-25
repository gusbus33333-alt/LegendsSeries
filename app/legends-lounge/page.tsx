import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Legends Lounge',
  description:
    'Premium all-inclusive matchday hospitality just 20 metres from Twickenham Stadium. No match ticket required. From £165 per person — hog roast, unlimited drinks, rugby legends and live music.',
}

const included = [
  { label: 'Hog Roast & Trimmings', detail: 'Served from 12:30 throughout the afternoon' },
  { label: 'Unlimited Premium Drinks', detail: 'Lager, bitter, Guinness, cider, wine, prosecco & soft drinks (pre & post-match)' },
  { label: 'Hot Butcher\'s Pie', detail: 'Served post-match when the bars reopen' },
  { label: 'Entertainment from Rugby Legends', detail: 'Throughout the day — stories, Q&As, and good company' },
  { label: 'Live Music', detail: 'Live band or DJ throughout the event' },
  { label: 'Giant Screens', detail: 'All Internationals shown, plus the England match live during the game' },
  { label: '5 Hours Pre & Post-Match Access', detail: 'Marquee open from 12:30 until 19:30' },
  { label: 'Charity Donation Included', detail: 'All profits go to LooseHeadz & Wooden Spoon' },
]

const notIncluded = [
  'Match ticket — hospitality experience only',
  'Drinks during the match are charged at £6 each',
]

const timeline = [
  { time: '12:30', label: 'Marquee Opens', description: 'All-inclusive bar serving premium lager, bitter, Guinness, cider, wine, prosecco & soft drinks. Hog roast starts serving.' },
  { time: '12:30–14:50', label: 'Entertainment & Legends', description: 'Live music, entertainment from rugby legends, and a great atmosphere in the marquee. No need to rush — no queues, no crowds.' },
  { time: '15:00', label: 'Bar Closes — Kick Off', description: 'Bar closes at anthems. The Legends Lounge marquee stays open for guests without a match ticket, showing the game on giant screens. Drinks available at £6 each during the match.' },
  { time: '16:40', label: 'Full Service Resumes', description: 'Bars reopen as England finishes. Hot butcher\'s pie served. Catch other Internationals or a rerun of England\'s match on screens around the marquee.' },
  { time: '19:10', label: 'Last Orders', description: 'Final drinks served.' },
  { time: '19:30', label: 'Marquee Closes', description: 'A proper matchday done right.' },
]

const loungeMatches = [
  { date: 'Sunday 8th November 2026', match: 'England vs Australia', price: '£250 inc VAT', type: 'Nations Championship' },
  { date: 'Saturday 14th November 2026', match: 'England vs Japan', price: '£250 inc VAT', type: 'Nations Championship' },
  { date: 'Saturday 21st November 2026', match: 'England vs New Zealand', price: '£250 inc VAT', type: 'Nations Championship' },
  { date: 'Friday 27th November 2026', match: 'Nations Cup Finals Double Header — NH 6 vs SH 6 & NH 3 vs SH 3', price: '£300 inc VAT', type: 'Nations Cup Finals' },
  { date: 'Saturday 28th November 2026', match: 'Nations Cup Finals Double Header — NH 5 vs SH 5 & NH 2 vs SH 2', price: '£300 inc VAT', type: 'Nations Cup Finals' },
  { date: 'Sunday 29th November 2026', match: 'Nations Cup Finals Double Header — NH 4 vs SH 4 & NH 1 vs SH 1', price: '£300 inc VAT', type: 'Nations Cup Finals' },
]

export default function LegendsLoungePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col justify-end bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&q=80"
            alt="Legends Lounge at Twickenham"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-36 w-full">
          <p className="section-label mb-3">Twickenham Stadium — November 2026</p>
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight max-w-3xl">
            The Legends<br /><span className="text-gold">Lounge</span>
          </h1>
          <div className="gold-rule mt-6" />
          <p className="text-white/60 text-lg mt-6 max-w-xl leading-relaxed">
            Premium all-inclusive hospitality just 20 metres from Twickenham Stadium.
            The perfect blend between overcrowded pubs and expensive official hospitality —
            no match ticket required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/contact" className="btn-gold">
              Book Your Place
            </Link>
            <a href="#matches" className="btn-outline-white">
              View Dates & Prices
            </a>
          </div>
        </div>
      </section>

      {/* Important notice */}
      <div className="bg-gold/10 border-y border-gold/30 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-ink text-sm text-center">
            <span className="font-semibold text-gold">Please note:</span> The Legends Lounge is a hospitality experience only — <span className="font-semibold">match tickets are not included</span>. Our marquee is open for guests without a ticket and shows the match live on giant screens.
          </p>
        </div>
      </div>

      {/* What it is */}
      <section className="py-24 lg:py-32 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <p className="section-label mb-3">What is the Legends Lounge?</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-ink leading-tight">
                A Great Day Out,<br />Done Properly
              </h2>
              <div className="gold-rule mt-5 mb-8" />
              <p className="text-ink/60 text-base leading-relaxed mb-5">
                The Legends Lounge is our exclusive marquee just 20 metres from Twickenham
                Stadium. We open at 12:30 and serve hog roast and unlimited drinks until
                kick-off — then stay open during the match for anyone without a ticket,
                showing the game live on giant screens.
              </p>
              <p className="text-ink/60 text-base leading-relaxed mb-5">
                Post-match, the bar opens again with a hot butcher&apos;s pie and a full bar,
                while other Internationals play on our screens. Rugby legends entertain
                throughout the day with stories and Q&As. Live music keeps the atmosphere
                going from first pint to last orders.
              </p>
              <p className="text-ink/60 text-base leading-relaxed mb-8">
                Built by a team with proven international rugby hospitality experience —
                including leading all hospitality operations for the 2025 British &amp; Irish
                Legends Tour to Australia.
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-ink/40 text-xs tracking-widest uppercase">From only</p>
                  <p className="text-gold font-bold text-3xl">£165 pp</p>
                  <p className="text-ink/40 text-xs">(£198 inc VAT)</p>
                </div>
                <Link href="/contact" className="btn-gold">
                  Book Now
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <div className="relative">
                <div className="relative h-96 lg:h-[500px] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80"
                    alt="Hospitality marquee atmosphere"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 -z-10" />
              </div>
            </ScrollReveal>
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
              <p className="text-gold text-xs tracking-[0.2em] uppercase font-semibold mb-4">Not Included</p>
              <ul className="flex flex-col gap-2">
                {notIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/50 text-sm">
                    <span className="text-white/30 mt-0.5 flex-shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
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
            <p className="text-ink/50 text-sm mt-4">(Times shown are indicative for a 15:10 kick-off)</p>
          </ScrollReveal>

          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <ScrollReveal key={i} delay={0.08 * i}>
                <div className="flex gap-6 py-6 border-b border-ink/8 last:border-0">
                  <div className="flex-shrink-0 w-24 text-right">
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
                Elevate your experience with our Signature package — everything in the
                standard Legends Lounge plus a luxury hotel stay, player meet &amp; greet,
                and exclusive gifts. Available at the Radisson Red Hotel in Twickenham
                Stadium or The Lensbury Resort.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  'Luxury hotel — Radisson Red (in the Stadium) or The Lensbury Resort',
                  'Player meet & greet',
                  'Legends Series polo shirt & gilet',
                  'Limited edition bottle of gin',
                  'Reserved table with hostess service',
                  'Unlimited premium drinks',
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
                <div className="flex flex-col gap-4">
                  {[
                    { match: 'England vs Australia, 8 Nov', hotel: 'Radisson Red, Twickenham', rooms: '7 rooms' },
                    { match: 'England vs New Zealand, 21 Nov', hotel: 'Radisson Red, Twickenham', rooms: '8 rooms' },
                    { match: 'Nations Cup Finals Double Header, 28 Nov', hotel: 'The Lensbury Resort', rooms: '12 rooms' },
                    { match: 'Nations Cup Finals Double Header, 29 Nov', hotel: 'The Lensbury Resort', rooms: '12 rooms' },
                  ].map((item, i) => (
                    <div key={i} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                      <p className="text-white font-semibold text-sm">{item.match}</p>
                      <p className="text-white/40 text-xs mt-0.5">{item.hotel} · {item.rooms} available</p>
                    </div>
                  ))}
                </div>
                <p className="text-white/30 text-xs mt-6 leading-relaxed">
                  Six Nations 2027 packages also available — England vs France (14 Feb),
                  England vs Italy (20 Feb), England vs Scotland (13 Mar).
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Matches & pricing */}
      <section id="matches" className="py-24 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="mb-12">
            <p className="section-label mb-3">Nations Championship 2026</p>
            <h2 className="text-4xl font-bold text-ink">Dates &amp; Pricing</h2>
            <div className="gold-rule mt-5" />
          </ScrollReveal>

          <div className="flex flex-col gap-3">
            {loungeMatches.map((match, i) => (
              <ScrollReveal key={i} delay={0.07 * i}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-ink/8 hover:border-gold/40 transition-colors">
                  <div>
                    <span className="text-gold text-[0.65rem] tracking-[0.2em] uppercase font-semibold">{match.type}</span>
                    <p className="text-ink font-bold text-base mt-1">{match.match}</p>
                    <p className="text-ink/50 text-xs mt-0.5">{match.date}</p>
                  </div>
                  <div className="flex items-center gap-6 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-ink/40 text-xs tracking-widest uppercase">Price</p>
                      <p className="text-gold font-bold text-xl">{match.price}</p>
                    </div>
                    <Link href="/contact" className="btn-gold text-xs py-2.5 px-5">
                      Book
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-8">
            <div className="border border-ink/15 p-6 flex flex-col sm:flex-row gap-4 items-start">
              <div className="flex-1">
                <p className="text-ink font-semibold text-sm">Expanding to Edinburgh, Dublin &amp; Cardiff</p>
                <p className="text-ink/50 text-sm mt-1">
                  We&apos;re in discussions to bring the Legends Lounge to more home nations venues.
                  If you&apos;re able to help, get in touch.
                </p>
              </div>
              <a href="mailto:info@legends-series.com" className="btn-outline-gold text-xs py-2.5 flex-shrink-0">
                Get In Touch
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Charities */}
      <section className="py-16 bg-ink border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase font-semibold mb-4">Giving Back</p>
            <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-6">
              All profits from the Legends Lounge are donated to our charity partners —
              LooseHeadz, which works to destigmatise mental health in rugby, and Wooden
              Spoon, which funds life-changing projects for disabled and disadvantaged children.
            </p>
            <div className="flex items-center justify-center gap-8">
              <span className="text-gold font-semibold text-sm">LooseHeadz</span>
              <span className="w-1 h-1 rounded-full bg-gold" />
              <span className="text-gold font-semibold text-sm">Wooden Spoon</span>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
