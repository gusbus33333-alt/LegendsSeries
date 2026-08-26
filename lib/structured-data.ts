import { LoungeEvent, isoDoorsOpen, isoEnd } from './lounge-events'

export const SITE_URL = 'https://legends-series.com'

/**
 * The marquee itself, not the stadium — this is where guests actually go, and
 * it matches the directions given in the confirmation email.
 */
const venue = {
  '@type': 'Place',
  name: 'Legends Lounge, Twickenham',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Access Self Storage, 30 Rugby Road',
    addressLocality: 'Twickenham',
    addressRegion: 'London',
    postalCode: 'TW1 1DG',
    addressCountry: 'GB',
  },
}

const organizer = {
  '@type': 'Organization',
  name: 'Legends Series',
  url: SITE_URL,
}

/**
 * Organization markup for the site as a whole. Only claims that are verifiable
 * on the site itself — no invented awards, ratings or social profiles.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Legends Series',
    legalName: 'Legends Series Ltd',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'Premium rugby hospitality at Twickenham. The Legends Lounge offers full matchday hospitality alongside former international players, with an all-inclusive bar, hog roast and live entertainment.',
    email: 'info@legends-series.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Twickenham',
      addressRegion: 'London',
      addressCountry: 'GB',
    },
    areaServed: 'GB',
  }
}

/**
 * One matchday as a schema.org Event. This is what puts the date, venue and
 * price into search results, and it is the most machine-readable statement of
 * what is on sale — which is equally what an assistant reads.
 *
 * `startDate` is doors-open rather than kick-off: the hospitality is the
 * product, and it begins when the marquee opens.
 */
export function eventSchema(event: LoungeEvent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Legends Lounge — ${event.match}`,
    description: event.blurb,
    startDate: isoDoorsOpen(event),
    endDate: isoEnd(event),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: venue,
    organizer,
    performer: organizer,
    image: [`${SITE_URL}${event.heroPhoto}`, `${SITE_URL}${event.cardPhoto}`],
    url: `${SITE_URL}/book/${event.slug}`,
    offers: {
      '@type': 'Offer',
      name: 'Legends Lounge hospitality',
      price: event.price,
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/book/${event.slug}`,
      validFrom: '2026-01-01T00:00:00+00:00',
      // Stated plainly because it is the most common pre-purchase question.
      description: 'Hospitality only — a match ticket is not included.',
    },
    isAccessibleForFree: false,
    maximumAttendeeCapacity: 450,
  }
}

/** Question/answer pairs already shown on the page, marked up for search. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  }
}
