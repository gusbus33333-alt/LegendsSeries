// ─── Legends Lounge — Nations Championship 2026 ──────────────────────────────
// Each event has a `bookingUrl` field.
// Replace the '#' placeholder with your Squarespace product page URL when ready.
// e.g. bookingUrl: 'https://legends-series.squarespace.com/shop/england-vs-japan'

export interface FinalsPair {
  north: string   // e.g. 'N6'
  south: string   // e.g. 'S6'
  label?: string  // e.g. 'Grand Final'
}

export interface LoungeEvent {
  slug: string
  date: string
  shortDate: string
  dayOfWeek: string
  match: string
  competition: string
  venue: string
  isFinals: boolean
  games?: string[]        // individual match names for double-headers
  // ── Fixture-card display ──────────────────────────────────────────────────
  // These drive the cards grid on the Lounge page. They live here so fixture
  // data has one home; the grid used to keep its own duplicate copy.
  homeCode?: string       // England fixtures — badge at /team-icons/{code}.png
  awayCode?: string
  finalsPairs?: FinalsPair[]  // double-headers, e.g. { north: 'N6', south: 'S6' }
  cardBlurb: string       // one-line version of `blurb` for the cards grid
  /** Calendar date as YYYY-MM-DD. Stored explicitly rather than parsed out of
   *  `date`, so search engines and structured data get an unambiguous value. */
  isoDate: string
  /** Hand-written running order. Overrides the generated timeline entirely,
   *  so a matchday with its own schedule reads exactly as written. */
  timeline?: TimelineEntry[]
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
  /** Where to anchor the hero crop, as a CSS object-position. Set per photo
   *  because faces sit at very different heights — a centre crop beheaded
   *  several of them in the short, wide hero. */
  heroFocus?: string
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
    detail: 'A portion of profits donated to LooseHeadz & Wooden Spoon',
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
  // A hand-written order always wins — it carries detail the generator cannot
  // infer, such as which screens carry sound for a concurrent fixture.
  if (event.timeline) return event.timeline

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
    heroFocus: 'center 40%', // crowd faces sit just above centre
    isoDate: '2026-11-08',
    venue: 'Twickenham',
    homeCode: 'eng',
    awayCode: 'aus',
    cardBlurb:
      'England host the Wallabies in the 2026 Nations Championship at Allianz Stadium — a rivalry steeped in history.',
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
    heroFocus: 'center 35%', // band on stage, heads in the upper third
    isoDate: '2026-11-14',
    venue: 'Twickenham',
    homeCode: 'eng',
    awayCode: 'jpn',
    cardBlurb:
      'The Brave Blossoms bring their explosive attacking rugby to Allianz Stadium under the Saturday evening lights.',
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
    heroFocus: 'center 48%', // seated crowd, faces near the middle
    isoDate: '2026-11-21',
    venue: 'Twickenham',
    homeCode: 'eng',
    awayCode: 'nzl',
    cardBlurb:
      'England host the All Blacks in the 2026 Nations Championship at Allianz Stadium — the biggest fixture in world rugby.',
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
    heroFocus: 'center 35%', // three standing figures, heads high in frame
    isoDate: '2026-11-27',
    venue: 'Twickenham',
    finalsPairs: [
      { north: 'N6', south: 'S6' },
      { north: 'N3', south: 'S3' },
    ],
    cardBlurb:
      'The Nations Cup Finals begin with a Friday double header at Allianz Stadium — two knockout internationals, one epic day.',
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
    heroFocus: 'center 40%', // singer's face just above centre
    isoDate: '2026-11-28',
    venue: 'Twickenham',
    finalsPairs: [
      { north: 'N5', south: 'S5' },
      { north: 'N2', south: 'S2' },
    ],
    cardBlurb:
      'Saturday finals at Allianz Stadium — the 5th-place final and the 2nd-place final, two titles decided in one day.',
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
    heroFocus: 'center 48%', // wide crowd, faces around the middle
    isoDate: '2026-11-29',
    venue: 'Twickenham',
    finalsPairs: [
      { north: 'N4', south: 'S4' },
      { north: 'N1', south: 'S1', label: 'Grand Final' },
    ],
    cardBlurb:
      'Grand Final day — the first-ever Nations Cup champion is crowned at Allianz Stadium in the biggest game of the year.',
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
  // ─── Six Nations 2027 ──────────────────────────────────────────────────────
  // Doors and closing follow the same shape as the autumn fixtures: 2h40 before
  // a 15:10 KO, 3h10 before a 16:40 KO, last orders KO+4h, doors close KO+4h20.
  // Running orders use the generic timeline until the per-day ones are written.
  {
    slug: 'england-vs-france-feb-14',
    heroFocus: 'center 35%', // group shot, tallest head near the top
    isoDate: '2027-02-14',
    venue: 'Twickenham',
    homeCode: 'eng',
    awayCode: 'fra',
    cardBlurb:
      'Le Crunch at Allianz Stadium — England host France on Sunday afternoon in the 2027 Six Nations.',
    date: 'Sunday 14th February 2027',
    shortDate: 'Sun 14 Feb',
    dayOfWeek: 'Sunday',
    match: 'England vs France',
    competition: 'Six Nations',
    isFinals: false,
    ko: '15:10',
    openTime: '12:10',
    lastOrders: '19:10',
    doorsClose: '19:30',
    price: 250,
    priceLabel: '£208.33+ (£250 inc VAT)',
    priceExVat: '£208.33 ex VAT',
    bookingUrl: '#',
    heroPhoto: '/lounge-photos/LLL-297.jpg',
    cardPhoto: '/lounge-photos/LLL-318.jpg',
    blurb:
      'Le Crunch. England versus France is one of the great rivalries in world rugby, and the French always travel in numbers. A Sunday afternoon kick-off at Twickenham, with the Legends Lounge open from 12:30 — legends, live music, hog roast and unlimited drinks before you take your seat.',
    timeline: [
      { time: '12:10', label: 'Marquee Opens', description: `Bar Opens: Lager, Cider. Bitter and Guinness on draught. Prosecco, white and red wine. Plus tea, coffee, non-alcoholic and soft drinks. Hog roast serving.` },
      { time: '12:10 – 14:40', label: 'Legends, Live Music and Great Food', description: `Rugby legends entertain throughout with Q&As and stories. Live music keeps the atmosphere going. No queues, no overcrowded bars.` },
      { time: '15:10', label: 'England vs France kicks off', description: `Head to your seat with your match ticket – or stay and watch on the big screens in the Legends Lounge. Drinks available at £6 each during the match.` },
      { time: 'During the\nMatch', label: 'In the Stadium or Legends Lounge', description: `Whether you’re in your seat or watching in the marquee, the atmosphere is electric.` },
      { time: '17:10', label: 'Full Time', description: `Welcome Back drink as you walk in, all-inclusive bar resumes, post-match entertainment, Legends on the mic and a hot butcher’s pie served.` },
      { time: '19:10', label: 'Last Orders', description: `Last Orders at the bar. A proper match day done right.` },
      { time: '19:30', label: 'Marquee Closes', description: `Till the next time we say goodbye.` },
    ],
  },
  {
    slug: 'england-vs-italy-feb-20',
    // A tight two-person portrait cannot fill a 2.88:1 hero band without
    // becoming mostly backdrop, so this uses a wider group scene instead.
    heroFocus: 'center 35%',
    isoDate: '2027-02-20',
    venue: 'Twickenham',
    homeCode: 'eng',
    awayCode: 'ita',
    cardBlurb:
      'Italy at Allianz Stadium under the Saturday evening lights in the 2027 Six Nations.',
    date: 'Saturday 20th February 2027',
    shortDate: 'Sat 20 Feb',
    dayOfWeek: 'Saturday',
    match: 'England vs Italy',
    competition: 'Six Nations',
    isFinals: false,
    ko: '16:40',
    openTime: '13:40',
    lastOrders: '20:40',
    doorsClose: '21:00',
    price: 198,
    priceLabel: '£165+ (£198 inc VAT)',
    priceExVat: '£165 ex VAT',
    bookingUrl: '#',
    heroPhoto: '/lounge-photos/LLL-158.jpg',
    cardPhoto: '/lounge-photos/LLL-027.jpg',
    blurb:
      'The Azzurri at Twickenham on a Saturday evening. Doors open at 13:30 for a full afternoon of build-up before a 16:40 kick-off — the same Legends Lounge hospitality as every other matchday, at the lowest price on the calendar.',
    timeline: [
      { time: '13:40', label: 'Marquee Opens', description: `Bar Opens: Lager, Cider. Bitter and Guinness on draught. Prosecco, white and red wine. Plus tea, coffee, non-alcoholic and soft drinks. Hog roast serving.` },
      { time: '13:40 – 16:10', label: 'Legends, Live Music and Great Food', description: `Rugby legends entertain throughout with Q&As and stories. Live music keeps the atmosphere going. No queues, no overcrowded bars.` },
      { time: '14:10', label: 'Wales vs Ireland kicks off', description: `The match will be shown on all screens. One or two away from the main stage will have low sound. If the match is close, the entertainment will be turned down for the last 15–20 minutes.` },
      { time: '16:40', label: 'England vs Italy kicks off', description: `Head to your seat with your match ticket – or stay and watch on the big screens in the Legends Lounge. Drinks available at £6 each during the match.` },
      { time: 'During the\nMatch', label: 'In the Stadium or Legends Lounge', description: `Whether you’re in your seat or watching in the marquee, the atmosphere is electric.` },
      { time: '18:40', label: 'Full Time', description: `Welcome Back drink as you walk in, all-inclusive bar resumes, post-match entertainment, Legends on the mic and a hot butcher’s pie served.` },
      { time: '20:40', label: 'Last Orders', description: `Last Orders at the bar. A proper match day done right.` },
      { time: '21:00', label: 'Marquee Closes', description: `Till the next time we say goodbye.` },
    ],
  },
  {
    slug: 'england-vs-scotland-super-saturday',
    heroFocus: 'center 45%', // bartender's face slightly above centre
    isoDate: '2027-03-13',
    venue: 'Twickenham',
    homeCode: 'eng',
    awayCode: 'sco',
    cardBlurb:
      'The Calcutta Cup on Super Saturday — the final day of the 2027 Six Nations at Allianz Stadium.',
    // Super Saturday — the closing day of the 2027 Championship.
    date: 'Saturday 13th March 2027',
    shortDate: 'Sat 13 Mar',
    dayOfWeek: 'Saturday',
    match: 'England vs Scotland',
    competition: 'Six Nations',
    isFinals: false,
    ko: '16:40',
    openTime: '13:40',
    lastOrders: '21:50',
    doorsClose: '22:10',
    price: 300,
    priceLabel: '£250+ (£300 inc VAT)',
    priceExVat: '£250 ex VAT',
    bookingUrl: '#',
    heroPhoto: '/lounge-photos/LLL-058.jpg',
    cardPhoto: '/lounge-photos/LLL-209.jpg',
    blurb:
      'The Calcutta Cup on Super Saturday — the final day of the Six Nations, with the championship on the line and every match that matters on the big screens. The Legends Lounge runs all afternoon and into the evening: legends, live music, hog roast and unlimited drinks.',
    timeline: [
      { time: '13:40', label: 'Marquee Opens', description: `Bar Opens: Lager, Cider. Bitter and Guinness on draught. Prosecco, white and red wine. Plus tea, coffee, non-alcoholic and soft drinks. Hog roast serving.` },
      { time: '13:40 – 16:10', label: 'Legends, Live Music and Great Food', description: `Rugby legends entertain throughout with Q&As and stories. Live music keeps the atmosphere going. No queues, no overcrowded bars.` },
      { time: '14:10', label: 'Italy vs Wales kicks off', description: `All screens will show the game. Depending on the state of the match, the sound will be played on side screens or throughout the marquee.` },
      { time: '16:40', label: 'England vs Scotland kicks off', description: `Head to your seat with your match ticket – or stay and watch on the big screens in the Legends Lounge. Drinks available at £6 each during the match.` },
      { time: 'During the\nMatch', label: 'In the Stadium or Legends Lounge', description: `Whether you’re in your seat or watching in the marquee, the atmosphere is electric.` },
      { time: '18:40', label: 'Full Time', description: `Welcome Back drink as you walk in, all-inclusive bar resumes, post-match entertainment, Legends on the mic and a hot butcher’s pie served.` },
      { time: '20:10', label: 'Ireland vs France kicks off', description: `All screens will show the game. Depending on the state of the Championship the sound will be played on side screens or throughout the marquee.` },
      { time: 'Approx\n21:50', label: 'Last Orders', description: `Last Orders at the bar. A proper day of rugby done right. The bar will close at the final whistle of the Ireland vs France game.` },
      { time: 'Approx\n22:10', label: 'Marquee Closes', description: `The Marquee will close 20 minutes after the final whistle of the Ireland vs France game — unless England or Scotland have won the Championship, in which case we stay open for the trophy presentation in the stadium next door. Till the next time we say goodbye.` },
    ],
  },
]

// ─── Fixture-card display helpers ────────────────────────────────────────────
// Derived from the event rather than stored, so a fixture can never disagree
// with its own card.

/** 'England vs Australia' → 'England v Australia' (the cards use the short v). */
export function cardTitle(event: LoungeEvent): string {
  return event.match.replace(/\s+vs\s+/i, ' v ')
}

/** 'Sunday 8th November 2026' → 'Sunday 8 November 2026 · Twickenham' */
export function cardDateLine(event: LoungeEvent): string {
  return `${event.date.replace(/(\d+)(st|nd|rd|th)/, '$1')} · ${event.venue}`
}

/** '£250' — the headline inc-VAT figure, no suffix. */
export function priceInc(event: LoungeEvent): string {
  return `£${event.price.toLocaleString('en-GB')}`
}

/** '£208.33+' — the ex-VAT figure as shown when the VAT toggle is off. */
export function priceEx(event: LoungeEvent): string {
  return `${event.priceExVat.replace(/ ex VAT$/, '')}+`
}

const ORDINALS: Record<string, string> = {
  '1': '1st', '2': '2nd', '3': '3rd', '4': '4th', '5': '5th', '6': '6th',
}

/** 'N6' → 'NORTH 6TH'. Spells the badge codes out so the matchup is unambiguous. */
export function sideLabel(code: string): string {
  const side = code.charAt(0).toUpperCase() === 'N' ? 'North' : 'South'
  const position = code.slice(1)
  return `${side} ${ORDINALS[position] ?? position}`.toUpperCase()
}

/** ISO 8601 start, e.g. '2026-11-08T15:10:00+00:00'. Every fixture is in GMT. */
export function isoStart(event: LoungeEvent): string {
  const time = /^\d{2}:\d{2}$/.test(event.ko) ? event.ko : '12:00'
  return `${event.isoDate}T${time}:00+00:00`
}

/** Doors-open time, used as the schema.org event start where it makes sense. */
export function isoDoorsOpen(event: LoungeEvent): string {
  const time = /^\d{2}:\d{2}$/.test(event.openTime) ? event.openTime : '12:00'
  return `${event.isoDate}T${time}:00+00:00`
}

/** Marquee close, which is when the hospitality actually ends. */
export function isoEnd(event: LoungeEvent): string {
  const time = /^\d{2}:\d{2}$/.test(event.doorsClose) ? event.doorsClose : '22:00'
  return `${event.isoDate}T${time}:00+00:00`
}

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

// ─── Legends Lounge Signature upgrade ────────────────────────────────────────
/** Added on top of the matchday ticket price, per person. */
export const SIGNATURE_PRICE_PP = 600

/** Hotel rooms are twin/double, so the upgrade is sold two guests at a time. */
export const SIGNATURE_GUESTS_PER_ROOM = 2

/** What one room costs — both of its guests. */
export const SIGNATURE_ROOM_PRICE = SIGNATURE_PRICE_PP * SIGNATURE_GUESTS_PER_ROOM

/** Under 16s (15 and under) pay half the adult price. */
export const UNDER_16_RATE = 0.5

/** Half price, rounded to the penny so Stripe gets a clean integer of pence. */
export function under16Price(adultPrice: number): number {
  return Math.round(adultPrice * UNDER_16_RATE * 100) / 100
}
