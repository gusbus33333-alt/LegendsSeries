import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'The story behind Legends Series — the team dedicated to creating the world\'s finest sports hospitality experiences.',
}

const values = [
  {
    title: 'Uncompromising Quality',
    description:
      'We never accept good when exceptional is available. Every supplier, every venue, every legend is chosen by the same exacting standard.',
  },
  {
    title: 'Genuine Access',
    description:
      'Our legends aren\'t there to wave from a distance. They eat at your table, answer your questions, and create memories alongside you.',
  },
  {
    title: 'Effortless Experience',
    description:
      'From the moment you book to the moment you leave, every detail is managed. You bring nothing but your appetite for adventure.',
  },
  {
    title: 'Complete Transparency',
    description:
      'No hidden fees, no last-minute surprises. Our pricing is simple, our contracts are clear, and our commitment is absolute.',
  },
]

const milestones = [
  { year: '2018', label: 'Founded in London' },
  { year: '2019', label: 'First international event — Cape Town' },
  { year: '2021', label: '100th event delivered' },
  { year: '2023', label: 'Expanded to 6 countries' },
  { year: '2025', label: '500+ events & counting' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=1600&q=80"
            alt="About Legends Series"
            fill
            className="object-cover opacity-15"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 to-ink" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-3">Our story</p>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            About Legends Series
          </h1>
          <div className="gold-rule mt-6" />
        </div>
      </section>

      {/* Story */}
      <section className="py-24 lg:py-32 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            <ScrollReveal direction="left">
              <p className="section-label mb-3">How it started</p>
              <h2 className="text-4xl font-bold text-ink leading-tight">
                Born from a Passion<br />for Rugby
              </h2>
              <div className="gold-rule mt-5 mb-8" />
              <div className="flex flex-col gap-5 text-ink/65 text-base leading-relaxed">
                <p>
                  Legends Series was founded in 2018 with a single, stubborn conviction: that
                  the most extraordinary sporting experiences in the world were being wasted on
                  empty corporate boxes.
                </p>
                <p>
                  We believed that real rugby fans — the ones who live and breathe the sport —
                  deserved access to the legends they&apos;d cheered for decades. Not a distant
                  sighting from Row Z, but genuine, extended, personal access. Dinner
                  alongside them. Questions answered. Stories shared.
                </p>
                <p>
                  Seven years and 500+ events later, that conviction hasn&apos;t changed. If
                  anything, it&apos;s stronger. The legends have become friends. The guests have
                  become community. And the experiences have become extraordinary in ways we
                  couldn&apos;t have imagined.
                </p>
              </div>
            </ScrollReveal>

            <div className="flex flex-col gap-5">
              <ScrollReveal direction="right" delay={0.1}>
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80"
                    alt="Legends Series at Twickenham"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={0.2}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=900&q=80"
                    alt="Rugby legends at an event"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="text-center mb-16">
            <p className="section-label mb-3">What we stand for</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Our Values
            </h2>
            <div className="flex justify-center mt-5">
              <div className="gold-rule-lg" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10">
            {values.map((value, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div className="bg-ink p-10 lg:p-12 flex flex-col gap-4 hover:bg-ink/70 transition-colors">
                  <span className="text-gold font-bold text-5xl opacity-20">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-white font-bold text-xl">{value.title}</h3>
                  <div className="w-8 h-px bg-gold" />
                  <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="text-center mb-16">
            <p className="section-label mb-3">Since 2018</p>
            <h2 className="text-4xl font-bold text-ink">The Journey</h2>
            <div className="flex justify-center mt-5">
              <div className="gold-rule" />
            </div>
          </ScrollReveal>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {milestones.map((m, i) => (
              <ScrollReveal key={i} delay={0.1 * i} className="flex flex-col items-center text-center gap-2">
                <span className="text-gold font-bold text-3xl">{m.year}</span>
                <div className="w-px h-8 bg-gold/30" />
                <p className="text-ink/60 text-sm">{m.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ink">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Join the Story
            </h2>
            <p className="text-white/50 text-sm mb-8 leading-relaxed max-w-md mx-auto">
              Every event we create adds another chapter. Yours is waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/events" className="btn-gold">View Events</Link>
              <Link href="/contact" className="btn-outline-white">Get in Touch</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
