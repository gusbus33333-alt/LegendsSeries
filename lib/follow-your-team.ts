import type { LoungeEvent } from './lounge-events'

export interface FollowTeam {
  id: string
  name: string
  code: string
  badge: string
  color: string
  hemisphere: 'north' | 'south'
}

export const teams: FollowTeam[] = [
  { id: 'england', name: 'England', code: 'ENG', badge: '/team-icons-black/eng.webp', color: '#ffffff', hemisphere: 'north' },
  { id: 'france', name: 'France', code: 'FRA', badge: '/team-icons-black/fra.webp', color: '#002395', hemisphere: 'north' },
  { id: 'ireland', name: 'Ireland', code: 'IRE', badge: '/team-icons-black/ire.webp', color: '#169b62', hemisphere: 'north' },
  { id: 'italy', name: 'Italy', code: 'ITA', badge: '/team-icons-black/ita.webp', color: '#0066b3', hemisphere: 'north' },
  { id: 'scotland', name: 'Scotland', code: 'SCO', badge: '/team-icons-black/sco.webp', color: '#1a237e', hemisphere: 'north' },
  { id: 'wales', name: 'Wales', code: 'WAL', badge: '/team-icons-black/wal.webp', color: '#d4213d', hemisphere: 'north' },
  { id: 'argentina', name: 'Argentina', code: 'ARG', badge: '/team-icons-black/arg.webp', color: '#6cace4', hemisphere: 'south' },
  { id: 'australia', name: 'Australia', code: 'AUS', badge: '/team-icons-black/aus.webp', color: '#f2a900', hemisphere: 'south' },
  { id: 'fiji', name: 'Fiji', code: 'FIJ', badge: '/team-icons-black/fij.webp', color: '#ffffff', hemisphere: 'south' },
  { id: 'japan', name: 'Japan', code: 'JPN', badge: '/team-icons-black/jpn.webp', color: '#cc0033', hemisphere: 'south' },
  { id: 'new-zealand', name: 'New Zealand', code: 'NZL', badge: '/team-icons-black/nzl.webp', color: '#1a1a1a', hemisphere: 'south' },
  { id: 'south-africa', name: 'South Africa', code: 'RSA', badge: '/team-icons-black/rsa.webp', color: '#007a4d', hemisphere: 'south' },
]

export const followYourTeamPrice = 300
export const followYourTeamPriceLabel = '£250+ (£300 inc VAT)'
export const followYourTeamPriceExVat = '£250 ex VAT'

/**
 * Follow Your Team isn't tied to a single matchday — the team's final league
 * position decides which of the three Finals days they play. This shapes the
 * booking as a LoungeEvent so it flows through the existing confirmation
 * pipeline, with times left TBC because each day runs to a different schedule.
 */
export function buildFollowYourTeamEvent(teamName: string): LoungeEvent {
  return {
    slug: 'follow-your-team',
    date: '27th–29th November 2026',
    shortDate: '27–29 Nov',
    dayOfWeek: 'TBC',
    match: `Follow Your Team — ${teamName}`,
    competition: 'Nations Cup Finals',
    isFinals: false,
    ko: 'TBC',
    openTime: 'TBC',
    lastOrders: 'TBC',
    doorsClose: 'TBC',
    price: followYourTeamPrice,
    priceLabel: followYourTeamPriceLabel,
    priceExVat: followYourTeamPriceExVat,
    bookingUrl: '/book/follow-your-team',
    heroPhoto: '/lounge-photos/LLL-262.jpg',
    cardPhoto: '/lounge-photos/LLL-284.jpg',
    blurb: `Full Legends Lounge hospitality on the day ${teamName} play during Finals Weekend.`,
  }
}

export const finalsMatchdays = [
  { day: 'Friday 27th November 2026', shortDay: 'Fri 27 Nov', positions: '6th & 3rd place', slug: 'nations-finals-nov-27' },
  { day: 'Saturday 28th November 2026', shortDay: 'Sat 28 Nov', positions: '5th & 2nd place', slug: 'nations-finals-nov-28' },
  { day: 'Sunday 29th November 2026', shortDay: 'Sun 29 Nov', positions: '4th & 1st place (Grand Final)', slug: 'nations-finals-nov-29' },
]
