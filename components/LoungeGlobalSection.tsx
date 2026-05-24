import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from './ScrollReveal'

const loungeFeatures = [
  'Private pre-match reception with rugby legends',
  'Premium 3-course gourmet dining',
  'Unrestricted open bar throughout the event',
  'Category 1 stadium seats — the best in the house',
  'Exclusive post-match legends Q&A session',
  'Keepsake match programme, signed by the legends',
  'Professional group photography',
  'Dedicated concierge from arrival to departure',
]

const globalFeatures = [
  'Bespoke international travel, fully handled',
  'Hand-selected five-star accommodation',
  'On-ground concierge service 24/7',
  'Exclusive stadium and training access',
  'Curated local cultural experiences',
  'Small group sizes — max 50 guests',
  'Private dining with the legends each evening',
  'Memories that will last a lifetime',
]

export default function LoungeGlobalSection() {
  return (
    <section className="py-24 lg:py-32 bg-ink overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <ScrollReveal className="text-center mb-16 lg:mb-20">
          <p className="section-label mb-3 text-gold">Two ways to experience</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Choose Your Adventure
          </h2>
          <div className="flex justify-center mt-5">
            <div className="gold-rule-lg" />
          </div>
        </ScrollReveal>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">

          {/* Legends Lounge */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="relative group overflow-hidden bg-ink border border-white/10 hover:border-gold/40 transition-colors duration-500 p-10 lg:p-12 flex flex-col gap-8 h-full">
              {/* Background image */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=60"
                  alt="Legends Lounge"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-ink/80" />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-px bg-gold" />
                  <p className="text-gold text-xs tracking-[0.3em] uppercase font-semibold">
                    Experience One
                  </p>
                </div>
                <h3 className="text-white font-bold text-3xl lg:text-4xl mt-3 leading-tight">
                  Legends Lounge
                </h3>
                <p className="text-white/50 text-sm mt-4 leading-relaxed max-w-md">
                  The ultimate match-day hospitality. Join us at iconic stadiums across the UK for
                  a full-day premium experience that begins well before kick-off and ends long after
                  the final whistle.
                </p>
              </div>

              <ul className="relative z-10 grid grid-cols-1 gap-3">
                {loungeFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full border border-gold/60 flex items-center justify-center mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    </span>
                    <span className="text-white/60 text-sm leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="relative z-10 mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-white/30 text-xs tracking-widest uppercase">Starting from</p>
                  <p className="text-gold font-bold text-2xl">£165 pp</p>
                </div>
                <Link
                  href="/legends-lounge"
                  className="text-gold text-xs tracking-[0.2em] uppercase font-semibold hover:text-white transition-colors"
                >
                  Explore the Lounge →
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Global Events */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative group overflow-hidden bg-gold/5 border border-gold/20 hover:border-gold/60 transition-colors duration-500 p-10 lg:p-12 flex flex-col gap-8 h-full">
              {/* Background image */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&q=60"
                  alt="Global Events"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-ink/85" />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-px bg-gold" />
                  <p className="text-gold text-xs tracking-[0.3em] uppercase font-semibold">
                    Experience Two
                  </p>
                </div>
                <h3 className="text-white font-bold text-3xl lg:text-4xl mt-3 leading-tight">
                  Global Events
                </h3>
                <p className="text-white/50 text-sm mt-4 leading-relaxed max-w-md">
                  For those who want to take it to another continent. Our bespoke international
                  experiences place you at the world&apos;s greatest sporting events —
                  fully curated, door to door.
                </p>
              </div>

              <ul className="relative z-10 grid grid-cols-1 gap-3">
                {globalFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full border border-gold/60 flex items-center justify-center mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    </span>
                    <span className="text-white/60 text-sm leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="relative z-10 mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-white/30 text-xs tracking-widest uppercase">Starting from</p>
                  <p className="text-gold font-bold text-2xl">£2,200 pp</p>
                </div>
                <Link
                  href="/events"
                  className="text-gold text-xs tracking-[0.2em] uppercase font-semibold hover:text-white transition-colors"
                >
                  View Global Events →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
