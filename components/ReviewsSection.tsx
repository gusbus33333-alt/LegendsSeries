import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { DbReview } from '@/lib/supabase/types'
import ReviewCard from './ReviewCard'
import ScrollReveal from './ScrollReveal'
import { Review } from '@/lib/types'

function toReview(row: DbReview): Review {
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

export default async function ReviewsSection() {
  const supabase = createClient()
  const { data } = await supabase
    .from('reviews')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3)

  const reviews = (data ?? []).map(toReview)

  return (
    <section className="py-24 lg:py-32 bg-parchment">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="section-label mb-3">What our guests say</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-ink leading-tight">
              Unfiltered Reviews
            </h2>
            <div className="gold-rule mt-5" />
          </div>
          <div className="flex flex-col sm:items-end gap-1 flex-shrink-0">
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-ink/50 text-xs tracking-[0.15em]">5.0 · 100% five-star reviews</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {reviews.map((review, i) => (
            <ScrollReveal key={review.id} delay={0.1 * i}>
              <ReviewCard review={review} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="flex justify-center mt-14">
          <Link href="/reviews" className="btn-outline-gold">
            Read All Reviews
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
