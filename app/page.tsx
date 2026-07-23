import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import GoogleReviews from '@/components/GoogleReviews'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Legends Series — Play & Party Alongside Your Heroes',
  description:
    "Premium sports hospitality at the world's greatest events — from £165 per person. Play golf and party alongside rugby's all-time legends at Twickenham, Cape Town, Dubai, and beyond.",
}

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Two experiences */}
      <section className="py-24 lg:py-32 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="text-center mb-16">
            <p className="section-label mb-3 text-gold">Two ways to experience</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Choose Your Adventure
            </h2>
            <div className="flex justify-center mt-5">
              <div className="gold-rule-lg" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Legends Lounge */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="relative group overflow-hidden border border-white/10 hover:border-gold/40 transition-all duration-500 p-10 lg:p-14 flex flex-col h-full min-h-[420px]">
                <div className="absolute inset-0 opacity-15 group-hover:opacity-20 transition-opacity duration-500">
                  <Image
                    src="/lounge-photos/LLL-027.jpg"
                    alt="Legends Lounge"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-ink/80" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-px bg-gold" />
                    <p className="text-gold text-xs tracking-[0.3em] uppercase font-semibold">
                      Twickenham
                    </p>
                  </div>
                  <h3 className="text-white font-bold text-3xl lg:text-4xl leading-tight">
                    Legends Lounge
                  </h3>
                  <p className="text-white/50 text-sm sm:text-base mt-5 leading-relaxed max-w-md">
                    All-inclusive matchday hospitality 20 metres from Twickenham — hog roast,
                    unlimited drinks, live music and genuine time with rugby legends. Six dates
                    across the Nations Championship 2026.
                  </p>
                  <div className="mt-auto pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Link href="/legends-lounge" className="btn-gold min-w-[200px]">
                      Explore the Lounge
                    </Link>
                    <span className="text-white/30 text-xs tracking-widest uppercase">
                      From £165+ pp
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Living with Legends */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative group overflow-hidden border border-gold/20 hover:border-gold/60 transition-all duration-500 p-10 lg:p-14 flex flex-col h-full min-h-[420px]">
                <div className="absolute inset-0 opacity-15 group-hover:opacity-20 transition-opacity duration-500">
                  <Image
                    src="https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&q=60"
                    alt="Living with Legends"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-ink/85" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-px bg-gold" />
                    <p className="text-gold text-xs tracking-[0.3em] uppercase font-semibold">
                      Worldwide
                    </p>
                  </div>
                  <h3 className="text-white font-bold text-3xl lg:text-4xl leading-tight">
                    Living with Legends
                  </h3>
                  <p className="text-white/50 text-sm sm:text-base mt-5 leading-relaxed max-w-md">
                    Fully hosted trips to the world&apos;s greatest sporting events — alongside
                    professional legends for the entire journey. Golf, rugby, culture and adventure
                    in Cape Town, Dubai, St Moritz and beyond.
                  </p>
                  <div className="mt-auto pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Link href="/events" className="btn-gold min-w-[200px]">
                      View Trips
                    </Link>
                    <span className="text-white/30 text-xs tracking-widest uppercase">
                      From £2,200 pp
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats ticker */}
      <section className="py-5 bg-ink border-y border-gold/15 overflow-hidden">
        <div
          className="flex gap-12"
          style={{
            width: 'max-content',
            animation: 'marquee 30s linear infinite',
          }}
        >
          {[...Array(2)].map((_, loop) =>
            [
              { value: '£165+', label: 'Legends Lounge from' },
              { value: '£0', label: 'Hidden fees — ever' },
              { value: '100%', label: 'Five-star reviews' },
              { value: '6+', label: 'Countries & counting' },
              { value: '300', label: 'Max guests per event' },
              { value: '5★', label: 'Average rating' },
            ].map((item, i) => (
              <div key={`${loop}-${i}`} className="flex items-center gap-3 flex-shrink-0">
                <span className="text-gold font-bold text-xl tracking-tight">{item.value}</span>
                <span className="text-white/40 text-[0.6rem] tracking-[0.2em] uppercase whitespace-nowrap">
                  {item.label}
                </span>
                <span className="w-1 h-1 rounded-full bg-gold/30 ml-3" />
              </div>
            ))
          )}
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-24 lg:py-32 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="text-center mb-14">
            <p className="section-label mb-3">What our guests say</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-ink leading-tight">
              Real Reviews
            </h2>
            <div className="flex justify-center mt-5">
              <div className="gold-rule" />
            </div>
          </ScrollReveal>
          <GoogleReviews />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-28 lg:py-36 overflow-hidden bg-ink">
        <div className="absolute inset-0 z-0">
          <Image
            src="/lounge-photos/LLL-262.jpg"
            alt="Match day atmosphere"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-ink/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <p className="section-label mb-4">Don&apos;t miss out</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Only 300 Places<br />
              <span className="text-gold">Available</span> This Season
            </h2>
            <div className="flex justify-center mb-8">
              <div className="gold-rule-lg" />
            </div>
            <p className="text-white/50 text-base lg:text-lg max-w-xl mx-auto leading-relaxed mb-10">
              Legends Lounge at Twickenham returns for the Nations Championship 2026 — six
              dates across November. All-inclusive hospitality from £165pp.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/legends-lounge" className="btn-gold min-w-[200px]">
                Legends Lounge
              </Link>
              <Link href="/events" className="btn-outline-white min-w-[200px]">
                Legends Tours
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
