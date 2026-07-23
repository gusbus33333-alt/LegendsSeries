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
  ko: string              // e.g. "16:40" or "TBC"
  openTime: string        // marquee opens
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
  if (event.isFinals) {
    return [
      {
        time: event.openTime,
        label: 'Marquee Opens',
        description:
          'Early doors for the big double-header. Bar opens, hog roast serving from the off. Come early — it fills up fast.',
      },
      {
        time: 'Match 1 KO',
        label: 'First Final Underway',
        description:
          'First final kicks off on all screens. All-inclusive bar open throughout.',
      },
      {
        time: 'Between Matches',
        label: 'Legends Back On Stage',
        description:
          'Live analysis, legends on the mic and music while you enjoy the hog roast.',
      },
      {
        time: 'Match 2 KO',
        label: 'Second Final Underway',
        description:
          'Second final on the screens — or head out to the stadium if you have your ticket.',
      },
      {
        time: 'Full Time',
        label: "Bar Reopens — Butcher's Pie Served",
        description:
          'All-inclusive bar back on the moment the final whistle goes. Hot butcher\'s pie served. Soak it all in.',
      },
      {
        time: 'Close',
        label: 'Marquee Closes',
        description:
          'A full day of world-class rugby, celebrated properly. Exact closing time confirmed on booking.',
      },
    ]
  }

  const ko = event.ko !== 'TBC' ? event.ko : '15:00'

  return [
    {
      time: event.openTime,
      label: 'Marquee Opens',
      description:
        'Bar opens. Lager, Guinness, wine, soft drinks — all included. Hog roast serving. Get in early for the best table.',
    },
    {
      time: `${event.openTime} – KO`,
      label: 'Legends, Live Music & Great Food',
      description:
        'Rugby legends entertain throughout with Q&As and stories. Live music keeps the atmosphere going. No queues, no overcrowded bars.',
    },
    {
      time: `${ko} (Anthems)`,
      label: 'Bar Closes — Head to Your Seat',
      description:
        'The all-inclusive bar closes at the anthems. Head in with your match ticket. The marquee stays open on reduced service (drinks £5 each) for anyone staying.',
    },
    {
      time: 'During Match',
      label: 'In the Stadium',
      description:
        "You're in your seat. The marquee is waiting — we reopen the bar the moment the final whistle goes.",
    },
    {
      time: addMinutes(ko, 110),
      label: "Bar Reopens — Butcher's Pie Served",
      description:
        'All-inclusive bar back on immediately at full time. Hot butcher\'s pie served. Post-match analysis and other Internationals on all screens.',
    },
    {
      time: addMinutes(ko, 200),
      label: 'Last Orders',
      description:
        'Last orders at the bar. A proper matchday done right.',
    },
    {
      time: addMinutes(ko, 230),
      label: 'Marquee Closes',
      description:
        'Approximately 3.5 hours after the final whistle. Exact times confirmed on booking.',
    },
  ]
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
    ko: '14:00',
    openTime: '11:00',
    price: 250,
    priceLabel: '£208.33+ (£250 inc VAT)',
    priceExVat: '£208.33 ex VAT',
    bookingUrl: '#', // TODO: Replace with your Squarespace product URL
    heroPhoto: '/lounge-photos/LLL-027.jpg',
    cardPhoto: '/lounge-photos/LLL-256.jpg',
    blurb:
      'The Wallabies at Twickenham — a fixture steeped in history and guaranteed to deliver. Australia always travel with a passionate following, and the home crowd will be in full voice. Three hours of legends, live music and unlimited drinks before kick-off. Be in your seat for 14:00.',
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
    price: 198,
    priceLabel: '£165+ (£198 inc VAT)',
    priceExVat: '£165 ex VAT',
    bookingUrl: '#', // TODO: Replace with your Squarespace product URL
    heroPhoto: '/lounge-photos/LLL-058.jpg',
    cardPhoto: '/lounge-photos/LLL-004.jpg',
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
    ko: '15:00',
    openTime: '12:00',
    price: 250,
    priceLabel: '£208.33+ (£250 inc VAT)',
    priceExVat: '£208.33 ex VAT',
    bookingUrl: '#', // TODO: Replace with your Squarespace product URL
    heroPhoto: '/lounge-photos/LLL-148.jpg',
    cardPhoto: '/lounge-photos/LLL-095.jpg',
    blurb:
      "The biggest fixture in world rugby. The All Blacks at Twickenham — the haka, the atmosphere, the history. This is the game every rugby fan needs to experience once. Be in the Lounge from noon and let us look after the build-up properly.",
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
    ko: 'TBC',
    openTime: '09:30',
    price: 300,
    priceLabel: '£250+ (£300 inc VAT)',
    priceExVat: '£250 ex VAT',
    bookingUrl: '#', // TODO: Replace with your Squarespace product URL
    heroPhoto: '/lounge-photos/LLL-262.jpg',
    cardPhoto: '/lounge-photos/LLL-284.jpg',
    blurb:
      "Day one of the Nations Cup Finals — two full internationals in one day at Twickenham. The Lounge runs all day with legends, live music, hog roast and unlimited drinks from the first whistle to the last. This is what the new tournament has been building towards.",
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
    ko: 'TBC',
    openTime: '09:30',
    price: 300,
    priceLabel: '£250+ (£300 inc VAT)',
    priceExVat: '£250 ex VAT',
    bookingUrl: '#', // TODO: Replace with your Squarespace product URL
    heroPhoto: '/lounge-photos/LLL-297.jpg',
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
    ko: 'TBC',
    openTime: '09:30',
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
