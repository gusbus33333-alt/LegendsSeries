import Link from 'next/link'
import Image from 'next/image'
import { Event } from '@/lib/types'

interface EventCardProps {
  event: Event
  variant?: 'featured' | 'default' | 'compact'
}

export default function EventCard({ event, variant = 'default' }: EventCardProps) {
  if (variant === 'featured') {
    return (
      <Link
        href={`/events/${event.slug}`}
        className="group relative flex flex-col overflow-hidden bg-ink card-hover block h-full"
      >
        {/* Image */}
        <div className="relative h-72 lg:h-[400px] overflow-hidden flex-shrink-0">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

          {/* Featured badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-gold text-ink text-[0.6rem] tracking-[0.25em] uppercase font-bold px-3 py-1">
              Featured Event
            </span>
          </div>

          {/* Spots left */}
          {event.spotsLeft <= 20 && (
            <div className="absolute top-4 right-4">
              <span className="bg-white/10 backdrop-blur-sm text-white border border-white/20 text-[0.6rem] tracking-[0.15em] uppercase font-semibold px-3 py-1">
                {event.spotsLeft} spots left
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-7 lg:p-8 bg-ink">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="section-label mb-2">{event.location}</p>
              <h3 className="text-white font-bold text-2xl lg:text-3xl leading-tight">
                {event.title}
              </h3>
              <p className="text-white/50 text-sm mt-1.5">{event.dateRange}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-white/40 text-xs tracking-widest uppercase">From</p>
              <p className="text-gold font-bold text-2xl">{event.priceDisplay}</p>
            </div>
          </div>

          <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">
            {event.description.slice(0, 140)}...
          </p>

          {/* Legends attending */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-white/30 text-xs tracking-widest uppercase">With</span>
            {event.legends.slice(0, 2).map((legend, i) => (
              <span key={i} className="text-gold text-xs font-semibold">
                {legend}{i < Math.min(event.legends.length, 2) - 1 ? ',' : ''}
              </span>
            ))}
            {event.legends.length > 2 && (
              <span className="text-white/30 text-xs">+{event.legends.length - 2} more</span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="btn-gold flex-1 text-center text-xs">
              Book Now
            </span>
            <span className="text-white/30 text-xs tracking-widest uppercase hover:text-gold transition-colors">
              Learn more →
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group relative overflow-hidden bg-ink card-hover block"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />

        {/* Category */}
        <div className="absolute top-3 left-3">
          <span className="bg-ink/60 backdrop-blur-sm text-white/70 text-[0.55rem] tracking-[0.2em] uppercase font-semibold px-2.5 py-1 border border-white/10">
            {event.category.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 bg-ink">
        <p className="section-label text-[0.6rem] mb-1.5">{event.flag} {event.location}</p>
        <h3 className="text-white font-bold text-lg leading-tight mb-1">{event.title}</h3>
        <p className="text-white/40 text-xs mb-4">{event.date}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/30 text-[0.6rem] tracking-widest uppercase">From</p>
            <p className="text-gold font-bold text-lg">{event.priceDisplay}</p>
          </div>
          <span className="text-white/30 text-xs tracking-widest group-hover:text-gold transition-colors">
            View →
          </span>
        </div>
      </div>

      {/* Gold bottom line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </Link>
  )
}
