import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import GoogleReviews from '@/components/GoogleReviews'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Guest Reviews',
  description:
    'Read real Google reviews from Legends Series guests. 100% five-star reviews across all events worldwide.',
}

export default function ReviewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1480099225005-2513c8947aec?w=1600&q=80"
            alt="Crowd celebrating"
            fill
            className="object-cover opacity-15"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 to-ink" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-3">Don&apos;t take our word for it</p>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            Guest Reviews
          </h1>
          <div className="gold-rule mt-6" />
          <p className="text-white/50 text-base mt-5 max-w-lg leading-relaxed">
            Real reviews from real guests, pulled directly from Google.
          </p>
        </div>
      </section>

      {/* Google Reviews widget */}
      <section className="py-20 lg:py-24 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <GoogleReviews />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ink border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to write your own story?
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md mx-auto">
              Every one of these reviews started with someone clicking &apos;Book Now&apos;.
              Yours could be next.
            </p>
            <Link href="/events" className="btn-gold">View Upcoming Events</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
