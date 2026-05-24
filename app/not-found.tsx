import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="text-center flex flex-col items-center gap-6 max-w-md">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-gold" />
          <span className="text-gold text-xs tracking-[0.4em] uppercase font-semibold">
            Legends Series
          </span>
          <span className="w-8 h-px bg-gold" />
        </div>
        <p className="text-gold font-bold text-7xl">404</p>
        <div className="w-12 h-px bg-gold" />
        <h1 className="text-white font-bold text-2xl">Page Not Found</h1>
        <p className="text-white/50 text-sm leading-relaxed">
          This page has left the field. Head back to the home page to find what you&apos;re looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link href="/events" className="btn-gold">
            View Events
          </Link>
          <Link href="/" className="btn-outline-white">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
