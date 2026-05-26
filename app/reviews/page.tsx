import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { DbReview } from '@/lib/supabase/types'
import ReviewCard from '@/components/ReviewCard'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Guest Reviews',
  description:
    'Read unfiltered reviews from Legends Series guests. 100% five-star reviews across all events worldwide.',
}

export const revalidate = 60

function toReview(row: DbReview) {
  return {
    id: row.id,
    author: row.author,
    location: row.location ?? '',
    event: row.event ?? '',
    rating: row.rating,
    quote: row.quote,
    date: row.date ?? '',
  }
}

export default async function ReviewsPage() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const reviews = (data ?? []).map(toReview)

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

          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white font-bold text-2xl">5.0</span>
            <span className="text-white/40 text-sm">·</span>
            <span className="text-white/50 text-sm">{reviews.length} verified reviews</span>
          </div>

          {error && (
            <p className="mt-4 text-red-400 text-sm">Could not load reviews: {error.message}</p>
          )}
        </div>
      </section>

      {/* Reviews grid */}
      <section className="py-20 lg:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {reviews.map((review, i) => (
              <ScrollReveal key={review.id} delay={0.08 * (i % 3)}>
                <ReviewCard review={review} variant="dark" />
              </ScrollReveal>
            ))}
          </div>
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
