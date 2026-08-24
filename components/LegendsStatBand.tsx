import {
  totalLoungeLegends,
  totalInternationalCaps,
  totalLions,
  LOUNGE_EVENTS_SO_FAR,
} from '@/lib/lounge-legends'

const stats = [
  { value: totalLoungeLegends, label: 'Legends' },
  { value: totalInternationalCaps, label: 'International Caps' },
  { value: totalLions, label: 'British & Irish Lions' },
]

/**
 * Headline social proof, placed straight after the fixtures strip: the strip
 * answers when and how much, this answers why it's worth it.
 *
 * Every number is derived from the attendance list, so adding an event updates
 * the page rather than leaving a stale hardcoded figure.
 */
export default function LegendsStatBand() {
  return (
    <section className="bg-ink border-y border-white/10 py-14 lg:py-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center px-4 py-5 sm:py-0 ${
                i > 0 ? 'border-t sm:border-t-0 sm:border-l border-white/10' : ''
              }`}
            >
              <p
                className="text-gold font-bold leading-none"
                style={{ fontSize: 'clamp(46px, 7vw, 76px)' }}
              >
                {stat.value}
              </p>
              <p className="text-white/70 text-[0.6rem] sm:text-[0.65rem] tracking-[0.25em] uppercase mt-3">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-white/80 text-sm">Across {LOUNGE_EVENTS_SO_FAR}.</p>
          {/* Load-bearing: line-ups genuinely vary, and this is what stops a
              guest booking on the expectation of one specific name. */}
          <p className="text-white/60 text-sm mt-2">
            Every matchday line-up is different. These are the legends who&apos;ve joined us so far.
          </p>
        </div>
      </div>
    </section>
  )
}
