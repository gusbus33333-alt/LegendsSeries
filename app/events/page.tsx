import type { Metadata } from 'next'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { DbEvent } from '@/lib/supabase/types'
import EventsGrid from '@/components/EventsGrid'

export const metadata: Metadata = {
  title: 'Upcoming Events',
  description:
    'Browse all Legends Series sporting events — from Twickenham match-day hospitality to international golf and adventure travel. From £165 per person.',
}

// Revalidate every 60 seconds so new events appear promptly
export const revalidate = 60

// Map DB row → the shape EventCard expects
function toEvent(row: DbEvent) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle ?? '',
    location: row.location,
    country: row.country,
    flag: row.flag ?? '',
    date: row.date ?? '',
    dateRange: row.date_range ?? '',
    price: row.price,
    priceDisplay: row.price_display,
    capacity: row.capacity ?? 0,
    spotsLeft: row.spots_left ?? 999,
    featured: row.featured,
    image: row.image ?? '',
    category: (row.category ?? 'rugby') as 'rugby' | 'golf' | 'adventure' | 'luxury-travel',
    description: row.description ?? '',
    highlights: row.highlights ?? [],
    legends: row.legends ?? [],
    included: row.included ?? [],
  }
}

export default async function EventsPage() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('featured', { ascending: false })
    .order('price', { ascending: true })

  const events = (data ?? [])
    .map(toEvent)
    .filter((e) => !e.title.toLowerCase().includes('lounge'))

  return (
    <>
      {/* Page hero */}
      <section className="relative pt-32 pb-20 bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1551524164-687a55dd1126?w=1600&q=80"
            alt="Legends Tours"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 to-ink" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-3">The full calendar</p>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            Upcoming Events
          </h1>
          <div className="gold-rule mt-6" />
          <p className="text-white/50 text-base mt-6 max-w-xl leading-relaxed">
            From private jets and Cresta Runs to week-long odysseys alongside rugby&apos;s
            greatest legends — every Legends Series tour is extraordinary.
          </p>

          {error && (
            <p className="mt-4 text-red-400 text-sm">
              Could not load events: {error.message}
            </p>
          )}
        </div>
      </section>

      {/* Events grid */}
      <section className="py-20 lg:py-24 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <EventsGrid events={events} />
        </div>
      </section>
    </>
  )
}
