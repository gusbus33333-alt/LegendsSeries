import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Legends Series creates exclusive, once-in-a-lifetime events connecting fans directly with sporting legends — creating incredible memories whilst supporting grassroots rugby.',
}

const values = [
  {
    title: 'Fans Live the Game',
    description:
      'Fans don\'t just watch the game — they live it. We create rare access, authentic connections, and legendary hospitality around the world\'s biggest sporting moments.',
  },
  {
    title: 'Legends Continue to Inspire',
    description:
      'For our legends, it\'s a chance to reconnect with the passion that defined their careers — a new chapter where their legacy continues and their presence still inspires.',
  },
  {
    title: 'Community at the Core',
    description:
      'This is community. Where admiration meets authenticity, and where the game\'s past fuels unforgettable experiences in the present.',
  },
  {
    title: 'Sport for Good',
    description:
      'Every event supports charities relevant to that sport and the legends involved — from mental health in rugby to funding projects for disabled and disadvantaged children.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?w=1600&q=80"
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
          <p className="text-white/50 text-base mt-6 max-w-xl leading-relaxed">
            Front Row to a Great Experience — Where Legends, Sport &amp; Fun Times Come Together
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 lg:py-32 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            <ScrollReveal direction="left">
              <p className="section-label mb-3">Our Vision</p>
              <h2 className="text-4xl font-bold text-ink leading-tight">
                Once-in-a-Lifetime<br />Access to Sporting Icons
              </h2>
              <div className="gold-rule mt-5 mb-8" />
              <div className="flex flex-col gap-5 text-ink/65 text-base leading-relaxed">
                <p>
                  We create exclusive, once-in-a-lifetime events that connect fans directly
                  with sporting legends — creating incredible memories whilst supporting the
                  grassroots future of the game.
                </p>
                <p>
                  Fans cherish the chance to connect with the heroes who shaped unforgettable
                  moments on the field. Whether it&apos;s sharing stories, enjoying exclusive
                  hospitality, or simply spending time with greatness — these experiences
                  create memories that last a lifetime.
                </p>
                <p>
                  Our team brings proven international rugby hospitality experience, including
                  leading all hospitality operations for the 2025 British &amp; Irish Legends
                  Tour to Australia — delivering premium experiences for sponsors, partners,
                  and travelling supporters across multiple fixtures and venues.
                </p>
              </div>
            </ScrollReveal>

            <div className="flex flex-col gap-5">
              <ScrollReveal direction="right" delay={0.1}>
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src="/about-founders.jpg"
                    alt="Guy and Chris Butterworth at the 2025 B&I Lions 2nd Test"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
                <p className="text-ink/40 text-xs mt-2 italic leading-relaxed">
                  Attending the 2nd Test of the 2025 B&amp;I Lions tour against the Wallabies with the B&amp;I Legends and my son
                </p>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={0.2}>
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src="/about-team.jpg"
                    alt="Chris, Guy and Lewis Butterworth at the Legends Lounge"
                    fill
                    className="object-cover object-top"
                    sizes="50vw"
                  />
                </div>
                <p className="text-ink/40 text-xs mt-2 italic leading-relaxed">
                  Me and my two sons at the first Twickenham Legends Lounge event
                </p>
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

      {/* Mission & Charity */}
      <section className="py-24 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal direction="left">
              <p className="section-label mb-3">Mission</p>
              <h2 className="text-4xl font-bold text-ink leading-tight">
                Leveraging Sport<br />for Good
              </h2>
              <div className="gold-rule mt-5 mb-8" />
              <div className="flex flex-col gap-5 text-ink/65 text-sm leading-relaxed">
                <p>
                  Our mission is to leverage the power of sport to create a positive impact,
                  transcending the game to serve a greater purpose. Through our events, we
                  generate funds to support charities relevant to the focus of the event and
                  the legends involved.
                </p>
                <p>
                  Our business model provides a dual benefit: it gives fans unparalleled access
                  to their sporting heroes while offering retired players a new way to earn an
                  income and ease into their post-playing careers.
                </p>
                <p>
                  We are committed to building a network of retired players who continue to be
                  a positive influence — both for their fans and for the grassroots clubs that
                  helped them get their start.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <p className="section-label mb-3">Charitable Impact</p>
              <h2 className="text-4xl font-bold text-ink leading-tight">
                Rugby Events Support
              </h2>
              <div className="gold-rule mt-5 mb-8" />
              <div className="flex flex-col gap-6">
                <div className="border border-ink/15 p-7">
                  <p className="text-gold font-bold text-lg mb-2">LooseHeadz</p>
                  <p className="text-ink/60 text-sm leading-relaxed">
                    Working to destigmatise mental health within the rugby community and beyond —
                    creating a culture where players, coaches and fans feel able to talk openly.
                  </p>
                </div>
                <div className="border border-ink/15 p-7">
                  <p className="text-gold font-bold text-lg mb-2">Wooden Spoon</p>
                  <p className="text-ink/60 text-sm leading-relaxed">
                    The children&apos;s charity of rugby — funding life-changing projects for
                    disabled and disadvantaged children and young people across the UK and Ireland.
                  </p>
                </div>
                <p className="text-ink/40 text-xs leading-relaxed">
                  Charity partners vary by event — each event supports organisations most
                  relevant to the sport and the legends involved.
                </p>
              </div>
            </ScrollReveal>
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
