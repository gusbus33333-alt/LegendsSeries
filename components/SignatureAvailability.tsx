'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Fixture {
  slug: string
  match: string
  shortDate: string
}

interface Stock {
  hotel: string
  roomsAvailable: number
}

/**
 * Reads Signature stock on the client so the Lounge page stays statically
 * generated. A build-time count would be wrong the moment a room sold.
 */
export default function SignatureAvailability({ fixtures }: { fixtures: Fixture[] }) {
  const [stock, setStock] = useState<Record<string, Stock> | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/signature')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) setStock(data)
      })
      .catch(() => {
        if (!cancelled) setStock({})
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (stock === null) {
    return <p className="text-white/50 text-sm">Checking room availability…</p>
  }

  const rows = fixtures.filter((f) => stock[f.slug])

  if (rows.length === 0) {
    return (
      <p className="text-white/60 text-sm">
        Signature availability is confirmed on enquiry —{' '}
        <Link href="/contact" className="text-gold underline underline-offset-2">
          get in touch
        </Link>
        .
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      {rows.map((fixture) => {
        const item = stock[fixture.slug]
        const soldOut = item.roomsAvailable === 0
        return (
          <div key={fixture.slug} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
            <div className="flex items-start justify-between gap-3">
              {/* Sold-out rows recede so the available dates carry the eye */}
              <div className={soldOut ? 'opacity-45' : ''}>
                <p className="text-white font-semibold text-sm">{fixture.match}</p>
                <p className="text-white/65 text-xs mt-0.5">
                  {fixture.shortDate} · {item.hotel}
                </p>
              </div>
              {soldOut ? (
                <span className="flex-shrink-0 text-white/60 text-[0.65rem] font-semibold tracking-[0.15em] uppercase border border-white/15 px-2.5 py-1">
                  Sold out
                </span>
              ) : (
                <Link
                  href={`/book/${fixture.slug}#booking-card`}
                  className="flex-shrink-0 text-gold hover:text-white text-xs font-semibold transition-colors"
                >
                  {item.roomsAvailable} {item.roomsAvailable === 1 ? 'room' : 'rooms'} left →
                </Link>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
