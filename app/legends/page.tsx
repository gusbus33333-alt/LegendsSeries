import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { legends } from '@/lib/legends'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'The Legends',
  description:
    'Meet the rugby legends at the heart of every Legends Series event. World Cup winners, Lions tourists, and icons of the game — alongside you for the whole experience.',
}

export default function LegendsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1546961342-ea5f62d5a27b?w=1600&q=80"
            alt="Rugby legends"
            fill
            className="object-cover opacity-15"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 to-ink" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-3">The stars of the show</p>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            The Legends
          </h1>
          <div className="gold-rule mt-6" />
          <p className="text-white/50 text-base mt-6 max-w-xl leading-relaxed">
            World Cup winners. Lions tourists. Icons who defined a generation. Each event features
            different legends — confirmed and announced individually per trip. This is the company
            you&apos;ll keep at a Legends Series event.
          </p>
        </div>
      </section>

      {/* Confirmed legends */}
      <section className="py-20 lg:py-24 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <ScrollReveal className="mb-12">
            <p className="section-label mb-3">Confirmed</p>
            <h2 className="text-3xl font-bold text-ink">Featured Legends</h2>
            <div className="gold-rule mt-4" />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {legends.map((legend, i) => (
              <ScrollReveal key={legend.id} delay={0.07 * (i % 4)}>
                <article className="group flex flex-col bg-white border border-ink/8 hover:border-gold/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl overflow-hidden">
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden bg-ink/10">
                    <Image
                      src={legend.image}
                      alt={legend.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-gold text-xs tracking-[0.2em] uppercase font-semibold">
                        {legend.flag} {legend.country}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div>
                      <h2 className="font-bold text-ink text-xl leading-tight">{legend.name}</h2>
                      <p className="text-ink/50 text-xs mt-1 tracking-wide">{legend.position}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gold font-bold text-lg">{legend.caps}</span>
                      <span className="text-ink/40 text-xs uppercase tracking-widest">caps</span>
                    </div>

                    <div className="w-8 h-px bg-gold" />

                    <ul className="flex flex-col gap-1.5 flex-1">
                      {legend.achievements.slice(0, 2).map((a, j) => (
                        <li key={j} className="text-ink/60 text-xs leading-snug flex items-start gap-2">
                          <span className="text-gold mt-0.5 flex-shrink-0">·</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How legends are involved */}
      <section className="py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="text-center mb-14">
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
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Legends Lounge',
                description: 'Entertainment and Q&As with legends throughout the day at our Twickenham marquee. Legends confirmed per match date.',
                link: '/legends-lounge',
                cta: 'View Lounge Dates',
              },
              {
                title: 'Living with Legends Trips',
                description: 'Fully hosted international trips with specific legends named for each event — travelling, dining, and experiencing the whole journey alongside you.',
                link: '/events',
                cta: 'View Events',
              },
              {
                title: 'Custom Group Events',
                description: 'Planning something for a group of 10 or more? We can build a bespoke experience around the legends and sporting moments that matter most to you.',
                link: '/contact',
                cta: 'Enquire Now',
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div className="border border-white/10 p-8 hover:border-gold/30 transition-colors flex flex-col gap-4 h-full">
                  <h3 className="text-gold font-semibold text-base">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1">{item.description}</p>
                  <Link
                    href={item.link}
                    className="text-white/40 hover:text-gold text-xs tracking-[0.2em] uppercase transition-colors"
                  >
                    {item.cta} →
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <ScrollReveal className="py-20 bg-parchment">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-ink/50 text-sm mb-6 max-w-lg mx-auto">
            Legends are confirmed and announced individually for each event.
            Get in touch to find out who&apos;s attending the event you&apos;re interested in.
          </p>
          <Link href="/events" className="btn-gold">
            Browse Events
          </Link>
        </div>
      </ScrollReveal>
    </>
  )
}
