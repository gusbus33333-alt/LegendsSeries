import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { events } from '@/lib/events'
import EventCard from '@/components/EventCard'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Legends Lounge',
  description:
    'The Legends Lounge — Legends Series flagship match-day hospitality experience. Premium dining, open bar, and exclusive access to rugby legends. From £165 per person.',
}

const timeline = [
  {
    time: '12:00',
    label: 'Arrival & Welcome',
    description: 'Arrive at the Legends Lounge to a champagne reception. Meet the Legends Series team and your rugby heroes.',
  },
  {
    time: '13:00',
    label: 'Gourmet Lunch',
    description: 'Sit down to a premium three-course lunch, paired wines, and an open bar. Legends join you at your table.',
  },
  {
    time: '14:30',
    label: 'Q&A & Signing Session',
    description: 'An exclusive moderated Q&A session with the legends. Time for photographs, autographs, and stories.',
  },
  {
    time: '15:00',
    label: 'Match Kick-Off',
    description: 'Take your Category 1 seats as the action begins. The best view in the stadium — guaranteed.',
  },
  {
    time: '17:30',
    label: 'Post-Match Reception',
    description: 'Return to the Lounge to celebrate (or commiserate) with the legends over premium drinks and canapes.',
  },
]

const loungeEvents = events.filter((e) => e.category === 'rugby').slice(0, 3)

export default function LegendsLoungePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col justify-end bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80"
            alt="Legends Lounge hospitality"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-36 w-full">
          <p className="section-label mb-3">Our signature experience</p>
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight max-w-3xl">
            The Legends<br /><span className="text-gold">Lounge</span>
          </h1>
          <div className="gold-rule mt-6" />
          <p className="text-white/60 text-lg mt-6 max-w-lg leading-relaxed">
            The most prestigious match-day hospitality in British rugby — right in the heart
            of the action.
          </p>
        </div>
      </section>

      {/* The experience */}
      <section className="py-24 lg:py-32 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <p className="section-label mb-3">What to expect</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-ink leading-tight">
                A Day Unlike<br />Any Other
              </h2>
              <div className="gold-rule mt-5 mb-8" />
              <p className="text-ink/60 text-base leading-relaxed mb-6">
                The Legends Lounge isn&apos;t just hospitality — it&apos;s an experience so
                carefully considered that guests consistently describe it as the finest day
                of their year. From the moment you arrive, every detail is managed so you
                can simply enjoy the extraordinary.
              </p>
              <p className="text-ink/60 text-base leading-relaxed mb-8">
                Gourmet dining alongside World Cup winners. Category 1 seats for the match.
                A post-match reception that stretches long into the evening. This is what
                &apos;premium&apos; actually means.
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-ink/40 text-xs tracking-widest uppercase">Starting from</p>
                  <p className="text-gold font-bold text-3xl">£165 pp</p>
                </div>
                <Link href="/contact" className="btn-gold ml-6">
                  Book the Lounge
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <div className="relative">
                <div className="relative h-96 lg:h-[500px] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80"
                    alt="The Legends Lounge at Twickenham"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
                {/* Gold frame detail */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 -z-10" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="text-center mb-16">
            <p className="section-label mb-3">Your day in the Lounge</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              The Running Order
            </h2>
            <div className="flex justify-center mt-5">
              <div className="gold-rule-lg" />
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-gold/20 transform -translate-x-1/2 hidden lg:block" />

            <div className="flex flex-col gap-0">
              {timeline.map((item, i) => (
                <ScrollReveal key={i} delay={0.1 * i}>
                  <div className={`relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 py-8 ${
                    i % 2 === 0 ? 'lg:text-right' : ''
                  }`}>
                    {/* Left side */}
                    <div className={i % 2 === 0 ? 'order-1' : 'order-1 lg:order-2'}>
                      <p className="text-gold font-bold text-3xl mb-1">{item.time}</p>
                      <h3 className="text-white font-bold text-lg mb-2">{item.label}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                    </div>

                    {/* Dot */}
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold border-2 border-ink" />

                    {/* Empty right */}
                    <div className={i % 2 === 0 ? 'order-2' : 'order-2 lg:order-1'} />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lounge events */}
      <section className="py-24 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="flex items-end justify-between gap-6 mb-12">
            <div>
              <p className="section-label mb-3">Book your place</p>
              <h2 className="text-4xl font-bold text-ink">Lounge Events</h2>
              <div className="gold-rule mt-4" />
            </div>
            <Link href="/events" className="text-xs tracking-[0.2em] uppercase font-semibold text-ink/40 hover:text-gold transition-colors">
              View all →
            </Link>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {loungeEvents.map((event, i) => (
              <ScrollReveal key={event.id} delay={0.1 * i}>
                <EventCard event={event} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
