import { Review } from '@/lib/types'

interface ReviewCardProps {
  review: Review
  variant?: 'default' | 'dark'
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? 'text-gold' : 'text-white/20'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewCard({ review, variant = 'default' }: ReviewCardProps) {
  const isDark = variant === 'dark'

  return (
    <article
      className={`flex flex-col gap-6 p-8 lg:p-10 border transition-all duration-500 hover:-translate-y-1 ${
        isDark
          ? 'bg-ink/50 border-white/10 hover:border-gold/30'
          : 'bg-white border-ink/8 hover:border-gold/40 hover:shadow-xl'
      }`}
    >
      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Quote */}
      <blockquote className="flex-1">
        {/* Opening marks */}
        <span className={`block font-serif text-4xl leading-none mb-3 ${isDark ? 'text-gold/30' : 'text-gold/40'}`}>
          &ldquo;
        </span>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-ink/70'}`}>
          {review.quote}
        </p>
      </blockquote>

      {/* Author */}
      <footer>
        <div className={`w-8 h-px mb-4 ${isDark ? 'bg-white/20' : 'bg-ink/15'}`} />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-ink'}`}>
              {review.author}
            </p>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-white/40' : 'text-ink/40'}`}>
              {review.location}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gold text-[0.65rem] tracking-[0.15em] uppercase font-semibold">
              {review.event.split(',')[0]}
            </p>
            <p className={`text-[0.65rem] mt-0.5 ${isDark ? 'text-white/30' : 'text-ink/30'}`}>
              {review.date}
            </p>
          </div>
        </div>
      </footer>
    </article>
  )
}
