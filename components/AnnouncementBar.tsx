import Link from 'next/link'

export default function AnnouncementBar() {
  return (
    <div className="bg-gold text-ink relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(0,0,0,0.1) 48px, rgba(0,0,0,0.1) 49px)',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-3.5 flex items-center justify-center gap-3 text-center">
        <span className="text-xs tracking-[0.15em] font-semibold uppercase">
          ⚡ Only 300 Places Available
        </span>
        <span className="hidden sm:inline text-ink/40">·</span>
        <span className="hidden sm:inline text-xs tracking-wide font-medium">
          Nations Championship 2026, Twickenham
        </span>
        <span className="hidden md:inline text-ink/40">|</span>
        <span className="hidden md:inline text-xs tracking-wide font-medium">
          From £165 per person
        </span>
        <span className="hidden lg:inline text-ink/40">|</span>
        <Link
          href="/contact"
          className="hidden lg:inline text-xs tracking-[0.15em] uppercase font-bold hover:underline underline-offset-2 transition-all"
        >
          Book Now →
        </Link>
      </div>
    </div>
  )
}
