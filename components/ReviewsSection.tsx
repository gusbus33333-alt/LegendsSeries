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
            <a
              href="https://www.google.com/search?hl=en-GB&gl=uk&q=Legends+Series+Ltd,+Legends+House,+St+Albans+AL3+4PJ&ludocid=4154009846573570384&lsig=AB86z5UQjfRAcadwaEo0LEP_bPjg#lrd=0x48763f822d2ccebb:0x39a601f2527e1950,1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/50 text-xs tracking-[0.15em] hover:text-gold transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              5.0 on Google
            </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {reviews.map((review, i) => (
            <ScrollReveal key={review.id} delay={0.1 * i}>
              <ReviewCard review={review} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-14">
          <Link href="/reviews" className="btn-outline-gold">
            Read All Reviews
          </Link>
          <a
            href="https://www.google.com/search?hl=en-GB&gl=uk&q=Legends+Series+Ltd,+Legends+House,+St+Albans+AL3+4PJ&ludocid=4154009846573570384&lsig=AB86z5UQjfRAcadwaEo0LEP_bPjg#lrd=0x48763f822d2ccebb:0x39a601f2527e1950,1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ink/50 text-sm hover:text-gold transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            See Our Google Reviews
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
