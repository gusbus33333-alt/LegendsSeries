import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { legends } from '@/lib/legends'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'The Legends',
  description:
    "Meet the rugby legends at the heart of every Legends Series event. World Cup winners, Lions tourists, and icons of the game — all available to you.",
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
            World Cup winners. Lions tourists. Icons who defined a generation of rugby. This is the
            company you&apos;ll keep at a Legends Series event.
          </p>
        </div>
      </section>

      {/* Legends grid */}
      <section className="py-20 lg:py-24 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
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

          {/* CTA */}
          <ScrollReveal className="mt-16 text-center">
            <p className="text-ink/50 text-sm mb-6 max-w-lg mx-auto">
              Our legend lineup varies by event. Each package is confirmed with the attending legends
              listed clearly.
            </p>
            <Link href="/events" className="btn-gold">
              Browse Events With Legends
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
