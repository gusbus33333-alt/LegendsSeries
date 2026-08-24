// ─── Legends who have actually attended a Legends Lounge event ──────────────
// Distinct from lib/legends.ts, which lists everyone the Series is affiliated
// with. This is attendance, and it is the basis of the headline statistic — so
// every entry here must be someone who was genuinely in the marquee.
//
// Totals are derived from this list, never hardcoded: add the November 2026
// events and the numbers on the page update themselves.

export interface LoungeLegend {
  name: string
  country: string
  /** International caps. Omitted for Sevens and club-career entries. */
  caps?: number
  /** Short credentials, most impressive first. Keep to three at most. */
  honours: string[]
  isLion?: boolean
  /** Given large billing on the page. */
  featured?: boolean
}

export const loungeLegends: LoungeLegend[] = [
  // Featured order is a judgement call on name recognition, not caps.
  { name: 'Jamie Roberts', country: 'Wales', caps: 94, honours: ['British & Irish Lion'], isLion: true, featured: true },
  { name: 'Shane Byrne', country: 'Ireland', caps: 41, honours: ['British & Irish Lion'], isLion: true, featured: true },
  { name: 'Manu Tuilagi', country: 'England', caps: 60, honours: ['British & Irish Lion', 'Rugby World Cup finalist'], isLion: true, featured: true },
  { name: 'Mark “Ronnie” Regan MBE', country: 'England', caps: 46, honours: ['Rugby World Cup winner', 'British & Irish Lion'], isLion: true, featured: true },

  // The rest are listed alphabetically by surname — no implied ranking.
  { name: 'Delon Armitage', country: 'England', caps: 26, honours: ['3× European Champions Cup'] },
  { name: 'Steffon Armitage', country: 'England', caps: 5, honours: ['European Player of the Year', '3× European Cup winner'] },
  { name: 'Jonny Barrett', country: 'England', honours: ['Wasps', 'Adams Park golden era'] },
  { name: 'Fionn Carr', country: 'Ireland', honours: ['Connacht', 'Former all-time leading try scorer'] },
  { name: 'Neil Clark', country: 'England', honours: ['Exeter Chiefs', '187 appearances'] },
  { name: 'Jordan Conroy', country: 'Ireland Sevens', honours: ['Olympian', 'World Rugby Sevens Dream Team'] },
  { name: 'Lee Dickson', country: 'England', caps: 18, honours: ['256 Northampton Saints appearances'] },
  { name: 'Alex Goode', country: 'England', caps: 21, honours: ['6× Premiership winner', '3× European Champions Cup'] },
  { name: 'Jamie Hagan', country: 'Ireland', caps: 1, honours: ['100 Béziers appearances'] },
  { name: 'Rob Henderson', country: 'Ireland', caps: 29, honours: ['British & Irish Lion'], isLion: true },
  { name: 'Dan Leavy', country: 'Ireland', caps: 11, honours: ['Grand Slam winner', 'Champions Cup winner'] },
  { name: 'Leon Lloyd', country: 'England', caps: 5, honours: ['2× Heineken Cup winner', 'Leicester Tigers'] },
  { name: 'Tom May', country: 'England', caps: 2, honours: ['Newcastle Falcons legend', '267 appearances'] },
  { name: 'Mike McCarthy', country: 'Ireland', caps: 19, honours: ['PRO12 winner', 'Leinster'] },
  { name: 'Ollie Phillips', country: 'England Sevens', honours: ['World Rugby Sevens Player of the Year'] },
  { name: 'Devin Toner', country: 'Ireland', caps: 70, honours: ['4× European Champions Cup', '3× Six Nations winner'] },
  { name: 'Dan Tuohy', country: 'Ireland', caps: 11, honours: ['136 Ulster appearances'] },
  { name: 'Ollie Smith', country: 'England', caps: 5, honours: ['British & Irish Lion'], isLion: true },
]

export const totalLoungeLegends = loungeLegends.length
export const totalInternationalCaps = loungeLegends.reduce((sum, l) => sum + (l.caps ?? 0), 0)
export const totalLions = loungeLegends.filter((l) => l.isLion).length

export const featuredLoungeLegends = loungeLegends.filter((l) => l.featured)

/** Surname, ignoring any honorific suffix. 'Mark “Ronnie” Regan MBE' → 'Regan'. */
function surname(name: string): string {
  const parts = name.replace(/\s+(MBE|OBE|CBE)$/i, '').trim().split(/\s+/)
  return parts[parts.length - 1]
}

/**
 * Alphabetical by surname, sorted here rather than by hand so nobody ends up
 * out of order — the list carries no implied ranking.
 */
export const otherLoungeLegends = loungeLegends
  .filter((l) => !l.featured)
  .sort((a, b) => surname(a.name).localeCompare(surname(b.name), 'en'))

/** 'Ireland · 41 caps · British & Irish Lion' — one format for every entry. */
export function credentials(legend: LoungeLegend): string {
  const parts = [legend.country]
  if (legend.caps) parts.push(`${legend.caps} ${legend.caps === 1 ? 'cap' : 'caps'}`)
  return parts.concat(legend.honours).join(' · ')
}

/** Bumped as further events are added, so the caption stays accurate. */
export const LOUNGE_EVENTS_SO_FAR = 'our first two Legends Lounge events'
