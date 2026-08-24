// ─── Legends Lounge — Nations Championship 2026 ──────────────────────────────
// Each event has a `bookingUrl` field.
// Replace the '#' placeholder with your Squarespace product page URL when ready.
// e.g. bookingUrl: 'https://legends-series.squarespace.com/shop/england-vs-japan'

export interface LoungeEvent {
  slug: string
  date: string
  shortDate: string
  dayOfWeek: string
  match: string
  competition: string
  isFinals: boolean
  games?: string[]        // individual match names for double-headers
  finalsKOs?: string[]    // KO times for each final match
  ko: string              // e.g. "16:40" or "TBC"
  openTime: string        // marquee opens
  lastOrders: string      // last orders time
  doorsClose: string      // marquee closes time
  tvGames?: { match: string; time: string; when: 'before' | 'after' }[]
  price: number           // inc. VAT
  priceLabel: string      // "£250 inc VAT"
  priceExVat: string      // "£208 ex VAT"
  bookingUrl: string      // Squarespace product URL — replace '#' when ready
  heroPhoto: string       // /lounge-photos/…
  cardPhoto: string       // /lounge-photos/…
  blurb: string           // short match description for the event page
}

// ─── What's included (shared across all events) ──────────────────────────────
export const included = [
  {
    label: 'Hog Roast & All the Trimmings',
    detail: 'Served from opening throughout the afternoon',
  },
  {
    label: 'Unlimited Premium Bar',
    detail:
      'Lager, bitter, Guinness, cider, wine, prosecco, soft drinks & coffee — all included pre & post-match',
  },
  {
    label: "Hot Butcher's Pie Post-Match",
    detail: 'Served when the bar reopens after the final whistle',
  },
  {
    label: 'Rugby Legends Throughout the Day',
    detail:
      'Q&As, stories and genuine time with legends — not a wave from across the room',
  },
  {
    label: 'Live Music',
    detail:
      'Live band or DJ keeping the atmosphere going from first pint to last orders',
  },
  {
    label: 'Giant Screens — All Internationals',
    detail: "Every match shown live so you don't miss a thing",
  },
  {
    label: 'Charity Donation Included',
    detail: 'Profits donated to LooseHeadz & Wooden Spoon',
  },
]

// ─── Timeline helpers ─────────────────────────────────────────────────────────
function addMinutes(time: string, mins: number): string {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + mins
  const hh = Math.floor(total / 60) % 24
  const mm = total % 60
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}

export interface TimelineEntry {
  time: string
  label: string
  description: string
}

export function buildTimeline(event: LoungeEvent): TimelineEntry[] {
  if (event.isFinals && event.finalsKOs) {
    const ko1 = event.finalsKOs[0]
    const ko1End = addMinutes(ko1, 120)
    const ko2 = event.finalsKOs[1]
    const ko2End = addMinutes(ko2, 120)
    const game1 = event.games?.[0] ?? 'Match 1'
    const game2 = event.games?.[1] ?? 'Match 2'

    return [
      {
        time: event.openTime,
        label: 'Marquee Opens',
        description:
          'Early doors for the big double-header. Bar opens, hog roast serving from the off. Come early — it fills up fast.',
      },
      {
        time: ko1,
        label: `${game1} — Kickoff`,
        description:
          'First match kicks off on all screens. All-inclusive bar open throughout.',
      },
      {
        time: ko1End,
        label: 'First Match Ends',
        description:
          'Live analysis, legends on the mic and music between games. Hog roast and bar still flowing.',
      },
      {
        time: ko2,
        label: `${game2} — Kickoff`,
        description:
          'Second match underway on screens — or head out to the stadium if you have your ticket.',
      },
      {
        time: ko2End,
        label: "Full Time",
        description:
          'Welcome-back drink, all-inclusive bar resumes, post-match entertainment, legends on the mic and hot butcher\'s pie served.',
      },
      {
        time: event.lastOrders,
        label: 'Last Orders',
        description: 'Last orders at the bar. A proper matchday done right.',
      },
      {
        time: event.doorsClose,
        label: 'Marquee Closes',
        description:
          'Till the next time, we say goodbye.',
      },
    ]
  }

  const ko = event.ko !== 'TBC' ? event.ko : '15:00'
  const koEnd = addMinutes(ko, 120)

  const tvBefore = (event.tvGames ?? []).filter((g) => g.when === 'before')
  const tvAfter = (event.tvGames ?? []).filter((g) => g.when === 'after')

  const entries: TimelineEntry[] = [
    {
      time: event.openTime,
      label: 'Marquee Opens',
      description:
        'Bar Opens: Lager, Cider, Bitter & Guinness on draught. Prosecco, white and red wine. Plus tea, coffee, non-alcoholic and soft drinks. Hog roast serving.',
    },
    {
      time: `${event.openTime} – ${ko}`,
      label: 'Legends, Live Music & Great Food',
      description:
        'Rugby legends entertain throughout with Q&As and stories. Live music keeps the atmosphere going. No queues, no overcrowded bars.',
    },
    ...tvBefore.map((g) => ({
      time: g.time,
      label: `${g.match} — Live on Screens`,
      description:
        `${g.match} kicks off on the big screens in the Legends Lounge. All-inclusive bar flowing, hog roast serving.`,
    })),
    {
      time: ko,
      label: `${event.match} Kicks Off`,
      description:
        'Head to your seat with your match ticket — or stay and watch on the big screens in the Legends Lounge. Drinks available at £6 each during the match.',
    },
    {
      time: 'During\nMatch',
      label: 'In the Stadium or Legends Lounge',
      description:
        "Whether you're in your seat or watching in the marquee, the atmosphere is electric.",
    },
    {
      time: koEnd,
      label: "Full Time",
      description:
        'Welcome-back drink, all-inclusive bar resumes, post-match entertainment, legends on the mic and hot butcher\'s pie served.',
    },
    ...tvAfter.map((g) => ({
      time: g.time,
      label: `${g.match} — Live on Screens`,
      description:
        `${g.match} on the big screens. All-inclusive bar still flowing.`,
    })),
    {
      time: event.lastOrders,
      label: 'Last Orders',
      description:
        'Last orders at the bar. A proper matchday done right.',
    },
    {
      time: event.doorsClose,
      label: 'Marquee Closes',
      description:
        'Till the next time, we say goodbye.',
    },
  ]

  return entries
}

// ─── Event data ───────────────────────────────────────────────────────────────
export const loungeEvents: LoungeEvent[] = [
  {
    slug: 'england-vs-australia-nov-8',
    date: 'Sunday 8th November 2026',
    shortDate: 'Sun 8 Nov',
    dayOfWeek: 'Sunday',
    match: 'England vs Australia',
    competition: 'Nations Championship',
    isFinals: false,
    ko: '15:10',
    openTime: '12:30',
    lastOrders: '19:10',
    doorsClose: '19:30',
    price: 250,
    priceLabel: '£208.33+ (£250 inc VAT)',
    priceExVat: '£208.33 ex VAT',
    bookingUrl: '#', // TODO: Replace with your Squarespace product URL
    heroPhoto: '/lounge-photos/LLL-238.jpg',
    cardPhoto: '/lounge-photos/LLL-158.jpg',
    blurb:
      'The Wallabies at Twickenham — a fixture steeped in history and guaranteed to deliver. Australia always travel with a passionate following, and the home crowd will be in full voice. Three hours of legends, live music and unlimited drinks before kick-off. Be in your seat for 15:10.',
  },
  {
    slug: 'england-vs-japan-nov-14',
    date: 'Saturday 14th November 2026',
    shortDate: 'Sat 14 Nov',
    dayOfWeek: 'Saturday',
    match: 'England vs Japan',
    competition: 'Nations Championship',
    isFinals: false,
    ko: '16:40',
    openTime: '13:30',
    lastOrders: '20:40',
    doorsClose: '21:00',
    tvGames: [
      { match: 'Wales vs New Zealand', time: '14:10', when: 'before' },
      { match: 'Ireland vs Fiji', time: '20:10', when: 'after' },
    ],
    price: 198,
    priceLabel: '£165+ (£198 inc VAT)',
    priceExVat: '£165 ex VAT',
    bookingUrl: '#', // TODO: Replace with your Squarespace product URL
    heroPhoto: '/lounge-photos/LLL-004.jpg',
    cardPhoto: '/lounge-photos/LLL-256.jpg',
    blurb:
      "Japan's Brave Blossoms have evolved into one of rugby's most exciting sides. They travel in numbers, they play attacking rugby, and they never know when they're beaten. An evening kick-off at Twickenham — one of the great atmospheres in world sport. Doors open at 13:30 for a full build-up to a 16:40 KO.",
  },
  {
    slug: 'england-vs-new-zealand-nov-21',
    date: 'Saturday 21st November 2026',
    shortDate: 'Sat 21 Nov',
    dayOfWeek: 'Saturday',
    match: 'England vs New Zealand',
    competition: 'Nations Championship',
    isFinals: false,
    ko: '14:10',
    openTime: '11:30',
    lastOrders: '18:40',
    doorsClose: '19:00',
    tvGames: [
      { match: 'Ireland vs South Africa', time: '16:40', when: 'after' },
    ],
    price: 250,
    priceLabel: '£208.33+ (£250 inc VAT)',
    priceExVat: '£208.33 ex VAT',
    bookingUrl: '#', // TODO: Replace with your Squarespace product URL
    heroPhoto: '/lounge-photos/LLL-195.jpg',
    cardPhoto: '/lounge-photos/LLL-095.jpg',
    blurb:
      "The biggest fixture in world rugby. The All Blacks at Twickenham — the haka, the atmosphere, the history. This is the game every rugby fan needs to experience once. Be in the Lounge from 11:30 and let us look after the build-up properly.",
  },
  {
    slug: 'nations-finals-nov-27',
    date: 'Friday 27th November 2026',
    shortDate: 'Fri 27 Nov',
    dayOfWeek: 'Friday',
    match: 'Nations Cup Finals — Double Header',
    competition: 'Nations Cup Finals',
    isFinals: true,
    games: ['North 6 vs South 6', 'North 3 vs South 3'],
    finalsKOs: ['16:40', '20:10'],
    ko: '16:40',
    openTime: '15:00',
    lastOrders: '23:00',
    doorsClose: '23:30',
    price: 300,
    priceLabel: '£250+ (£300 inc VAT)',
    priceExVat: '£250 ex VAT',
    bookingUrl: '#', // TODO: Replace with your Squarespace product URL
    heroPhoto: '/lounge-photos/LLL-262.jpg',
    cardPhoto: '/lounge-photos/LLL-284.jpg',
    blurb:
      "Day one of the Nations Cup Finals — two full internationals in one day at Twickenham. The Lounge runs all evening with legends, live music, hog roast and unlimited drinks from the first whistle to the last. This is what the new tournament has been building towards.",
  },
  {
    slug: 'nations-finals-nov-28',
    date: 'Saturday 28th November 2026',
    shortDate: 'Sat 28 Nov',
    dayOfWeek: 'Saturday',
    match: 'Nations Cup Finals — Double Header',
    competition: 'Nations Cup Finals',
    isFinals: true,
    games: ['North 5 vs South 5', 'North 2 vs South 2'],
    finalsKOs: ['13:10', '16:40'],
    ko: '13:10',
    openTime: '11:30',
    lastOrders: '20:00',
    doorsClose: '20:30',
    price: 300,
    priceLabel: '£250+ (£300 inc VAT)',
    priceExVat: '£250 ex VAT',
    bookingUrl: '#', // TODO: Replace with your Squarespace product URL
    heroPhoto: '/lounge-photos/LLL-416.jpg',
    cardPhoto: '/lounge-photos/LLL-371.jpg',
    blurb:
      "The semi-finals of the Nations Cup — four teams, two games, one incredible day at Twickenham. The Legends Lounge runs from morning to night: full day hospitality, all matches on screen, legends throughout.",
  },
  {
    slug: 'nations-finals-nov-29',
    date: 'Sunday 29th November 2026',
    shortDate: 'Sun 29 Nov',
    dayOfWeek: 'Sunday',
    match: 'Nations Cup Finals — Double Header',
    competition: 'Nations Cup Finals',
    isFinals: true,
    games: ['North 4 vs South 4', 'North 1 vs South 1 — Grand Final'],
    finalsKOs: ['13:10', '16:40'],
    ko: '13:10',
    openTime: '11:30',
    lastOrders: '20:00',
    doorsClose: '20:30',
    price: 300,
    priceLabel: '£250+ (£300 inc VAT)',
    priceExVat: '£250 ex VAT',
    bookingUrl: '#', // TODO: Replace with your Squarespace product URL
    heroPhoto: '/lounge-photos/LLL-388.jpg',
    cardPhoto: '/lounge-photos/LLL-416.jpg',
    blurb:
      "Finals day. The Nations Cup Grand Final crowns the first-ever Nations Champion — and it's happening at Twickenham. Two matches, the biggest occasion in the new rugby calendar, and the full Legends Lounge treatment all day long. The one not to miss.",
  },
]

export function getEventBySlug(slug: string): LoungeEvent | undefined {
  return loungeEvents.find((e) => e.slug === slug)
}

export function getOtherEvents(slug: string): LoungeEvent[] {
  return loungeEvents.filter((e) => e.slug !== slug)
}

// ─── Optional extras (same on every matchday, prices inc VAT) ────────────────
export const CAR_PARKING_PRICE = 40
export const BUS_PARKING_PRICE = 150
export const MAX_CAR_PARKING = 10
export const MAX_BUS_PARKING = 5

/** Under 16s (15 and under) pay half the adult price. */
export const UNDER_16_RATE = 0.5

/** Half price, rounded to the penny so Stripe gets a clean integer of pence. */
export function under16Price(adultPrice: number): number {
  return Math.round(adultPrice * UNDER_16_RATE * 100) / 100
}
