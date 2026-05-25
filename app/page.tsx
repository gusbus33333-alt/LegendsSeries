import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import AnnouncementBar from '@/components/AnnouncementBar'
import FeaturedEvents from '@/components/FeaturedEvents'
import LoungeGlobalSection from '@/components/LoungeGlobalSection'
import ReviewsSection from '@/components/ReviewsSection'
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
      <AnnouncementBar />
      <FeaturedEvents />
      <LoungeGlobalSection />

      {/* Social proof / trust band */}
      <section className="py-16 bg-parchment border-y border-ink/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-center">
            {[
              { value: '£165', label: 'Legends Lounge from' },
              { value: '£0', label: 'Hidden fees — ever' },
              { value: '100%', label: 'Five-star reviews' },
              { value: '6+', label: 'Countries & counting' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <span className="text-3xl font-bold text-ink">{item.value}</span>
                <span className="text-ink/40 text-xs tracking-[0.2em] uppercase">{item.label}</span>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <ReviewsSection />

      {/* Final CTA band */}
      <section className="relative py-28 lg:py-36 overflow-hidden bg-ink">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=1600&q=80"
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
              dates across November. All-inclusive hospitality from £165pp. No match ticket required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-gold min-w-[200px]">
                Reserve Your Place
              </Link>
              <Link href="/events" className="btn-outline-white min-w-[200px]">
                View All Events
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
