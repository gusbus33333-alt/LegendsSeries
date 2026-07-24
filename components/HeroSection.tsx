'use client'

import Link from 'next/link'
import Image from 'next/image'

const items = [
  { delay: '0.3s' },
  { delay: '0.45s' },
  { delay: '0.6s' },
  { delay: '0.75s' },
  { delay: '0.9s' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col" aria-label="Hero">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1920&q=80"
          alt="Cape Town Stadium with Table Mountain"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/30 via-transparent to-transparent" />
      </div>

      {/* Gold grain texture overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 lg:px-10 pt-28 pb-12">
        <div className="flex flex-col items-center max-w-5xl">
          {/* Eyebrow label */}
          <div className="hero-fade-in flex items-center gap-3 mb-8" style={{ animationDelay: items[0].delay }}>
            <span className="w-8 h-px bg-gold" />
            <span className="text-white text-xs tracking-[0.4em] uppercase font-semibold">
              Extraordinary Sporting Experiences
            </span>
            <span className="w-8 h-px bg-gold" />
          </div>

          {/* Main headline */}
          <h1
            className="hero-fade-in text-white font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight text-shadow-lg"
            style={{ animationDelay: items[1].delay }}
          >
            Beyond the
            <br />
            <span className="text-gold italic">Final</span> Whistle
          </h1>

          {/* Subheading */}
          <p
            className="hero-fade-in text-white/80 text-base sm:text-lg lg:text-xl max-w-xl mt-8 leading-relaxed font-normal"
            style={{ animationDelay: items[2].delay }}
          >
            Premium hospitality, exclusive access and unforgettable journeys alongside
            the sporting legends you admire.
          </p>

          {/* CTA buttons */}
          <div
            className="hero-fade-in flex flex-col sm:flex-row items-center gap-4 mt-10"
            style={{ animationDelay: items[3].delay }}
          >
            <Link href="/legends-lounge" className="btn-gold min-w-[220px]">
              View Legends Lounge
            </Link>
            <Link href="/events" className="btn-outline-white min-w-[220px]">
              Legends Tours
            </Link>
          </div>

          {/* Trust signals */}
          <div
            className="hero-fade-in flex items-center justify-center flex-wrap gap-x-6 gap-y-2 mt-12 text-white/80 text-[0.6rem] sm:text-xs tracking-widest uppercase"
            style={{ animationDelay: items[4].delay }}
          >
            <span>Twickenham</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>Cape Town</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>Dubai</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>St. Moritz</span>
          </div>
        </div>
      </div>
    </section>
  )
}
