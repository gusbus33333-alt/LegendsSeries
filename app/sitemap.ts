import type { MetadataRoute } from 'next'
import { loungeEvents } from '@/lib/lounge-events'
import { events } from '@/lib/events'
import { SITE_URL } from '@/lib/structured-data'

/**
 * Generated from the real data so a new fixture is discoverable the moment it
 * is added — the booking pages were previously findable only by crawling links.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: { path: string; priority: number; freq: MetadataRoute.Sitemap[0]['changeFrequency'] }[] = [
    { path: '/', priority: 1, freq: 'weekly' },
    { path: '/legends-lounge', priority: 0.9, freq: 'weekly' },
    { path: '/book', priority: 0.9, freq: 'weekly' },
    { path: '/events', priority: 0.7, freq: 'monthly' },
    { path: '/legends', priority: 0.7, freq: 'monthly' },
    { path: '/gallery', priority: 0.5, freq: 'monthly' },
    { path: '/reviews', priority: 0.5, freq: 'monthly' },
    { path: '/about', priority: 0.5, freq: 'monthly' },
    { path: '/contact', priority: 0.6, freq: 'monthly' },
    { path: '/booking-policy', priority: 0.2, freq: 'yearly' },
    { path: '/terms', priority: 0.2, freq: 'yearly' },
    { path: '/privacy', priority: 0.2, freq: 'yearly' },
    { path: '/cookies', priority: 0.2, freq: 'yearly' },
  ]

  return [
    ...staticPages.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: page.freq,
      priority: page.priority,
    })),
    // The matchday booking pages — the ones that should rank for a fixture.
    ...loungeEvents.map((event) => ({
      url: `${SITE_URL}/book/${event.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/book/follow-your-team`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...events.map((event) => ({
      url: `${SITE_URL}/events/${event.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
