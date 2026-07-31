'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { teams, followYourTeamPrice, finalsMatchdays, type FollowTeam } from '@/lib/follow-your-team'

export default function FollowYourTeamCheckout() {
  const [selectedTeam, setSelectedTeam] = useState<FollowTeam | null>(null)
  const [guests, setGuests] = useState(1)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [marketingOptIn, setMarketingOptIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const checkoutRef = useRef<HTMLDivElement>(null)
  const [checkoutInView, setCheckoutInView] = useState(false)
  // The prompt is portalled to <body>: an ancestor ScrollReveal sets a
  // transform, which would otherwise anchor `position: fixed` to it.
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const scrollToCheckout = () => {
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  // Hide the floating prompt once the booking card is actually on screen.
  useEffect(() => {
    const el = checkoutRef.current
    if (!el) {
      setCheckoutInView(false)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setCheckoutInView(entry.isIntersecting),
      { rootMargin: '-100px 0px -120px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [selectedTeam])

  const northTeams = teams.filter((t) => t.hemisphere === 'north')
  const southTeams = teams.filter((t) => t.hemisphere === 'south')

  const handleCheckout = async () => {
    if (!selectedTeam) {
      setError('Please select your team.')
      return
    }
    if (!termsAccepted) {
      setError('Please accept the terms and conditions to continue.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: 'follow-your-team',
          guests,
          teamId: selectedTeam.id,
          teamName: selectedTeam.name,
          marketingOptIn,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setLoading(false)
        return
      }

      window.location.href = data.url
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  function TeamButton({ team }: { team: FollowTeam }) {
    const isSelected = selectedTeam?.id === team.id
    const isLight = ['#ffffff', '#1a1a1a', '#f2a900', '#6cace4'].includes(team.color)
    return (
      <button
        onClick={() => { setSelectedTeam(team); setError('') }}
        className="group relative flex flex-col items-center gap-2 p-4 border rounded-[4px] transition-all duration-200 overflow-hidden"
        style={{
          borderColor: isSelected ? '#0a0a0b' : '#0a0a0b40',
          backgroundColor: isLight ? `${team.color}70` : `${team.color}33`,
          boxShadow: isSelected ? `0 0 20px ${team.color}40, inset 0 0 30px ${team.color}15` : 'none',
        }}
      >
        {/* Coloured top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-200"
          style={{
            backgroundColor: team.color,
            opacity: isSelected ? 1 : 0,
          }}
        />

        {/* Badge */}
        <div className="relative w-24 h-28 flex-shrink-0">
          <Image
            src={team.badge}
            alt={team.name}
            fill
            className={`object-contain transition-all duration-200 ${isSelected ? 'scale-110' : 'opacity-90 group-hover:opacity-100'}`}
            sizes="96px"
          />
        </div>

        {/* Name */}
        <span className={`text-xs font-bold tracking-[0.15em] uppercase transition-colors ${
          isSelected ? 'text-ink' : 'text-ink/50 group-hover:text-ink/80'
        }`}>
          {team.code}
        </span>
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Team selector */}
      <div>
        <p className="section-label mb-3">Select Your Team</p>
        <h2 className="text-2xl font-bold text-ink mb-2">Who are you supporting?</h2>
        <div className="w-10 h-px bg-gold mb-8" />

        {/* Northern Hemisphere */}
        <p className="text-ink/40 text-[0.6rem] tracking-[0.3em] uppercase font-semibold mb-4">
          Northern Hemisphere
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
          {northTeams.map((team) => (
            <TeamButton key={team.id} team={team} />
          ))}
        </div>

        {/* Southern Hemisphere */}
        <p className="text-ink/40 text-[0.6rem] tracking-[0.3em] uppercase font-semibold mb-4">
          Southern Hemisphere
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {southTeams.map((team) => (
            <TeamButton key={team.id} team={team} />
          ))}
        </div>

      </div>

      {/* How it works */}
      <div>
        <p className="section-label mb-3">How It Works</p>
        <h2 className="text-2xl font-bold text-ink mb-2">One team. One day. Full hospitality.</h2>
        <div className="w-10 h-px bg-gold mb-6" />
        <div className="flex flex-col gap-4">
          {finalsMatchdays.map((day) => (
            <div key={day.slug} className="flex items-center gap-4 p-4 border border-ink/10 bg-ink/[0.02]">
              <div className="flex-shrink-0 w-20 text-center">
                <p className="text-gold font-bold text-sm">{day.shortDay}</p>
              </div>
              <div>
                <p className="text-ink font-semibold text-sm">{day.positions}</p>
                <p className="text-ink/45 text-xs mt-0.5">
                  Your team&apos;s finishing position determines which day they play
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-ink/40 text-xs leading-relaxed mt-4">
          Your team&apos;s final league position determines which day of the Finals Weekend they play.
          Whichever day that falls on, your Follow Your Team ticket gives you full access to the
          Legends Lounge for the entire day — hog roast, unlimited drinks, live music, rugby legends
          and both matches on the big screens.
        </p>
      </div>

      {/* Selected team confirmation + checkout */}
      {selectedTeam && (
        <div
          ref={checkoutRef}
          className="relative overflow-hidden"
          style={{ backgroundColor: '#0a0a0b' }}
        >
          {/* Team colour accent strip */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: selectedTeam.color }}
          />

          <div className="p-7">
            <div className="flex items-center gap-4 mb-5">
              <div className="relative w-16 h-20 flex-shrink-0">
                <Image
                  src={selectedTeam.badge}
                  alt={selectedTeam.name}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="text-white/40 text-[0.6rem] tracking-[0.2em] uppercase">Following</p>
                <p className="text-white font-bold text-lg">{selectedTeam.name}</p>
                <p className="text-xs mt-0.5" style={{ color: selectedTeam.color === '#1a1a1a' || selectedTeam.color === '#ffffff' ? '#b8953f' : selectedTeam.color }}>
                  Finals Weekend · 27–29 Nov 2026
                </p>
              </div>
            </div>

            <div className="h-px bg-white/10 mb-5" />

            <div className="flex flex-col gap-3">
              {/* Guests */}
              <div className="flex items-center justify-between">
                <label className="text-white/40 text-[0.6rem] uppercase tracking-widest">
                  Guests
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="w-7 h-7 border border-white/20 text-white/50 hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center text-sm"
                    disabled={guests <= 1}
                  >
                    −
                  </button>
                  <span className="text-white font-semibold text-sm w-6 text-center">{guests}</span>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(10, g + 1))}
                    className="w-7 h-7 border border-white/20 text-white/50 hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center text-sm"
                    disabled={guests >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="flex justify-between items-baseline">
                <span className="text-white/40 text-[0.6rem] uppercase tracking-widest">Total</span>
                <span className="text-gold font-bold text-xl">
                  £{(followYourTeamPrice * guests).toFixed(2)}
                </span>
              </div>

              <div className="h-px bg-white/10" />

              {/* Limited availability */}
              <div className="flex items-center justify-center gap-2 py-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-400 text-[0.65rem] font-semibold tracking-wide uppercase">
                  Limited availability — once they&apos;re gone, they&apos;re gone
                </span>
              </div>

              <div className="h-px bg-white/10" />

              {/* Terms */}
              <label className="flex items-start gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => { setTermsAccepted(e.target.checked); setError('') }}
                  className="mt-0.5 accent-[#b8953f] w-4 h-4 shrink-0"
                />
                <span className="text-white/50 text-[0.65rem] leading-relaxed group-hover:text-white/70 transition-colors">
                  I agree to the{' '}
                  <a href="/terms" target="_blank" className="text-gold underline underline-offset-2">
                    terms and conditions
                  </a>
                </span>
              </label>

              {/* Marketing */}
              <label className="flex items-start gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={marketingOptIn}
                  onChange={(e) => setMarketingOptIn(e.target.checked)}
                  className="mt-0.5 accent-[#b8953f] w-4 h-4 shrink-0"
                />
                <span className="text-white/50 text-[0.65rem] leading-relaxed group-hover:text-white/70 transition-colors">
                  I&apos;d like early access to future Legends Series events and exclusive offers
                </span>
              </label>

              {/* Book button */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="btn-gold w-full text-center py-4 text-xs disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Redirecting to payment...' : `Follow ${selectedTeam.name} — Book Now`}
              </button>

              <p className="text-white/20 text-[0.55rem] text-center leading-relaxed">
                You&apos;ll be redirected to Stripe for secure payment.
              </p>

              {error && (
                <p className="text-red-400 text-xs text-center">{error}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating prompt — follows you until the booking card is on screen */}
      {mounted && selectedTeam && !checkoutInView && createPortal(
        <button
          onClick={scrollToCheckout}
          className="group fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 pl-3 pr-4 py-2.5 bg-ink border border-white/10 rounded-full shadow-[0_12px_34px_rgba(0,0,0,0.4)] hover:border-gold/50 transition-colors duration-200"
        >
          {/* Team colour dot */}
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${selectedTeam.color}33` }}
          >
            <span className="relative w-5 h-6">
              <Image
                src={selectedTeam.badge}
                alt=""
                fill
                className="object-contain"
                sizes="20px"
              />
            </span>
          </span>

          <span className="flex flex-col items-start leading-tight">
            <span className="text-white/40 text-[0.5rem] tracking-[0.2em] uppercase">
              Following {selectedTeam.name}
            </span>
            <span className="text-white text-[0.7rem] font-bold tracking-[0.1em] uppercase group-hover:text-gold transition-colors">
              Book now
            </span>
          </span>

          <span className="text-gold text-base leading-none animate-bounce motion-reduce:animate-none">
            ↓
          </span>
        </button>,
        document.body
      )}
    </div>
  )
}
