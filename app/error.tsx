'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

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
        <h1 className="text-white font-bold text-3xl">Something went wrong</h1>
        <div className="w-12 h-px bg-gold" />
        <p className="text-white/50 text-sm leading-relaxed">
          We encountered an unexpected error. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button onClick={reset} className="btn-gold">
            Try Again
          </button>
          <Link href="/" className="btn-outline-white">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
