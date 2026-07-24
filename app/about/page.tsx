import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Legends Series is a premium sports hospitality and travel company, bringing fans closer to the sporting icons they admire through exclusive experiences.',
}

const values = [
  {
    title: 'Fans First',
    description:
      'Everything we do begins with the fan. From your first enquiry to the moment you return home, our goal is to deliver an experience that exceeds expectations.',
  },
  {
    title: 'Authentic Access',
    description:
      "The best moments aren’t staged — they’re genuine. We create opportunities for real conversations, shared experiences and unforgettable memories with sporting legends.",
  },
  {
    title: 'Supporting Legends',
    description:
      'We believe sporting legends still have so much to offer. Our experiences provide meaningful opportunities for former players to remain involved in the sports they helped shape while continuing to inspire future generations.',
  },
  {
    title: 'Sport for Good',
    description:
      'We believe sport has the power to make a lasting difference. Every event supports charities and grassroots initiatives connected to the sport and the legends involved, helping leave a positive legacy beyond the event itself.',
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
          <p className="section-label mb-3">Our Story</p>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            About Legends Series
          </h1>
          <div className="gold-rule mt-6" />
          <p className="text-white/50 text-base mt-6 max-w-xl leading-relaxed italic"
             style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(18px, 2vw, 22px)' }}>
            More Than Hospitality. Extraordinary Sporting Experiences.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 lg:py-32 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            <ScrollReveal direction="left">
              <p className="section-label mb-3">Our Story</p>
              <h2 className="text-4xl font-bold text-ink leading-tight">
                Bringing Fans Closer<br />to Sporting Greatness
              </h2>
              <div className="gold-rule mt-5 mb-8" />
              <div className="flex flex-col gap-5 text-ink/65 text-base leading-relaxed">
                <p>
                  Sport has an incredible ability to bring people together. The memories that
                  last longest aren&apos;t always what happens during the match — they&apos;re the
                  conversations afterwards, the stories shared with heroes, and the friendships
                  made along the way.
                </p>
                <p>
                  Legends Series was founded to make those moments possible.
                </p>
                <p>
                  After playing a pivotal role in delivering hospitality for the 2025 British
                  &amp; Irish Legends Tour to Australia, founder Chris Butterworth saw first-hand
                  the impact that exceptional hospitality and genuine access to sporting legends
                  could have on fans. It inspired a simple vision: to create experiences that go
                  far beyond the final whistle.
                </p>
                <p>
                  Today, Legends Series brings supporters closer to the sporting icons they admire
                  through premium matchday hospitality, luxury international tours and exclusive
                  events that simply can&apos;t be replicated elsewhere.
                </p>
                <p>
                  Every event is carefully curated, every guest is personally looked after and
                  every experience is designed to create memories that last a lifetime.
                </p>
              </div>
            </ScrollReveal>

            <div className="flex flex-col gap-5">
              <ScrollReveal direction="right" delay={0.1}>
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src="/about-founders.jpg"
                    alt="Delivering hospitality during the 2025 British & Irish Legends Tour to Australia"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
                <p className="text-ink/40 text-xs mt-2 italic leading-relaxed">
                  Chris Butterworth attending the Second Test in Melbourne alongside British &amp; Irish
                  Legends, partners and travelling supporters.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={0.2}>
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src="/about-team.jpg"
                    alt="The inaugural Legends Lounge at Twickenham"
                    fill
                    className="object-cover object-top"
                    sizes="50vw"
                  />
                </div>
                <p className="text-ink/40 text-xs mt-2 italic leading-relaxed">
                  Welcoming guests to the first Legends Lounge experience, bringing fans together
                  with rugby legends for an unforgettable matchday.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 lg:py-32 bg-ink">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <p className="section-label mb-3">Our Vision</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Bringing Fans Closer to<br />Sporting Greatness
            </h2>
            <div className="flex justify-center mt-5 mb-8">
              <div className="gold-rule" />
            </div>
            <div className="flex flex-col gap-5 text-white/50 text-base leading-relaxed">
              <p>
                We believe the greatest sporting memories are created through genuine human connection.
              </p>
              <p>
                Legends Series exists to give fans access to the people who inspired them — not
                simply from the stands, but around the dinner table, inside exclusive hospitality
                lounges and on unforgettable journeys around the world.
              </p>
              <p>
                Every experience is built on authenticity, creating moments where stories are
                shared, friendships are formed and legends continue to inspire long after their
                playing careers have ended.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tagline */}
      <section className="py-16 bg-parchment">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <p className="text-ink/60 text-lg leading-relaxed italic"
               style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(20px, 2.5vw, 26px)' }}>
              Whether you&apos;re enjoying all-inclusive hospitality just moments from the stadium,
              travelling overseas alongside sporting legends or hearing stories that have never
              been told before, our aim is simple:
            </p>
            <p className="text-ink font-bold text-xl mt-6 italic"
               style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(22px, 3vw, 30px)' }}>
              To create memories you&apos;ll talk about for the rest of your life.
            </p>
          </ScrollReveal>
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
              <p className="section-label mb-3">Our Mission</p>
              <h2 className="text-4xl font-bold text-ink leading-tight">
                Leveraging Sport<br />for Good
              </h2>
              <div className="gold-rule mt-5 mb-8" />
              <div className="flex flex-col gap-5 text-ink/65 text-base leading-relaxed">
                <p>
                  Our mission is to harness the power of sport to create unforgettable experiences
                  while making a meaningful impact beyond the game.
                </p>
                <p>
                  By bringing fans closer to sporting legends, we create experiences that celebrate
                  the people, stories and communities that make sport so special.
                </p>
                <p>
                  At the same time, our events provide former players with opportunities to continue
                  sharing their passion and experience after retirement, while supporting charitable
                  organisations and grassroots sport to help inspire the next generation.
                </p>
                <p className="text-ink/50 italic">
                  For us, success isn&apos;t measured solely by the events we host — it&apos;s measured
                  by the memories we create, the people we bring together and the positive impact we
                  leave behind.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <p className="section-label mb-3">Our Charity Partners</p>
              <h2 className="text-4xl font-bold text-ink leading-tight">
                Creating a Lasting Impact
              </h2>
              <div className="gold-rule mt-5 mb-8" />
              <p className="text-ink/60 text-base leading-relaxed mb-6">
                Every Legends Series event supports organisations connected to the sport and
                the legends involved. For our rugby events, we&apos;re proud to support:
              </p>
              <div className="flex flex-col gap-6">
                <div className="border border-ink/15 p-7">
                  <p className="text-gold font-bold text-lg mb-2">LooseHeadz</p>
                  <p className="text-ink/60 text-sm leading-relaxed">
                    Working to tackle the stigma surrounding mental health in rugby by encouraging
                    players, coaches and supporters to speak openly and support one another.
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
                  As Legends Series continues to grow across different sports, we&apos;ll continue
                  to partner with charities that reflect the values of each event and help
                  strengthen the communities at the heart of sport.
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
