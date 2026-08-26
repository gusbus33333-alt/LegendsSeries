import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/structured-data'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Personal and post-purchase pages: nothing to offer a search result,
      // and confirmation URLs carry a Stripe session id.
      disallow: ['/api/', '/basket', '/book/confirmation'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
