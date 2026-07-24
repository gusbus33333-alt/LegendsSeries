'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const loungeEvents = [
  { label: 'England vs Australia — Sun 8 Nov', slug: 'england-vs-australia-nov-8' },
  { label: 'England vs Japan — Sat 14 Nov', slug: 'england-vs-japan-nov-14' },
  { label: 'England vs New Zealand — Sat 21 Nov', slug: 'england-vs-new-zealand-nov-21' },
  { label: 'Nations Cup Finals — Fri 27 Nov', slug: 'nations-finals-nov-27' },
  { label: 'Nations Cup Finals — Sat 28 Nov', slug: 'nations-finals-nov-28' },
  { label: 'Nations Cup Finals — Sun 29 Nov', slug: 'nations-finals-nov-29' },
]

const toursEvents = [
  { label: 'SA Rugby Experience — Cape Town', slug: 'sa-rugby-experience-cape-town' },
  { label: 'Cresta Run — St. Moritz', slug: 'cresta-run-st-moritz' },
  { label: 'Orient Express Journey', slug: 'orient-express-rugby-journey' },
  { label: 'Bethpage Black Golf — New York', slug: 'bethpage-black-golf' },
  { label: 'Golf National — Paris', slug: 'golf-national-paris' },
  { label: 'Dubai Sevens', slug: 'dubai-7s-hospitality' },
]

function CustomSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
}: {
  label: string
  placeholder: string
  options: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = options.find((o) => o.value === value)

  return (
    <div className="sm:flex-1" ref={ref}>
      <label className="text-white/30 text-[0.55rem] uppercase tracking-widest block mb-1.5">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setOpen(!open)}
          className={`w-full bg-white/5 border text-left text-sm px-3 py-2.5 transition-colors flex items-center justify-between ${
            disabled
              ? 'border-white/10 opacity-30 cursor-not-allowed'
              : open
              ? 'border-gold'
              : 'border-white/10 hover:border-gold/40 cursor-pointer'
          }`}
        >
          <span className={selected ? 'text-white' : 'text-white/35'}>
            {selected?.label || placeholder}
          </span>
          <svg width="10" height="10" viewBox="0 0 12 12" className={`ml-2 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}>
            <path fill="#9A7940" d="M6 8L1 3h10z" />
          </svg>
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 border border-gold/20 bg-[#141414] shadow-2xl shadow-black/50 max-h-[240px] overflow-y-auto">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                  opt.value === value
                    ? 'text-gold bg-white/5'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ExperienceFinder() {
  const router = useRouter()
  const [type, setType] = useState('')
  const [event, setEvent] = useState('')
  const [guests, setGuests] = useState(2)

  const events = type === 'lounge'
    ? loungeEvents.map((e) => ({ label: e.label, value: e.slug }))
    : type === 'tours'
    ? toursEvents.map((e) => ({ label: e.label, value: e.slug }))
    : []

  const handleFind = () => {
    if (!event) return
    const path = type === 'lounge' ? `/book/${event}` : `/events/${event}`
    router.push(`${path}?guests=${guests}`)
  }

  return (
    <div className="bg-ink/80 backdrop-blur-sm border border-gold/15 px-6 py-5 lg:px-8 lg:py-6">
      <h3 className="text-white/90 text-xs tracking-[0.2em] uppercase font-semibold text-center mb-5">
        Quickly Find the Experience for You
      </h3>

      <div className="flex flex-col sm:flex-row sm:items-end gap-3">
        <CustomSelect
          label="Experience"
          placeholder="Legends Lounge or Tours"
          options={[
            { label: 'Legends Lounge', value: 'lounge' },
            { label: 'Legends Tours', value: 'tours' },
          ]}
          value={type}
          onChange={(v) => { setType(v); setEvent('') }}
        />

        <CustomSelect
          label="Event"
          placeholder={type ? 'Select event' : 'Choose experience first'}
          options={events}
          value={event}
          onChange={setEvent}
          disabled={!type}
        />

        <div className="sm:w-[120px]">
          <label className="text-white/30 text-[0.55rem] uppercase tracking-widest block mb-1.5">
            Guests
          </label>
          <div className="flex items-center border border-white/10 bg-white/5 h-[38px]">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              disabled={guests <= 1}
              className="w-9 h-full text-white/40 hover:text-gold transition-colors disabled:opacity-30 text-sm"
            >
              −
            </button>
            <span className="flex-1 text-center text-white font-semibold text-sm">{guests}</span>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(30, g + 1))}
              disabled={guests >= 30}
              className="w-9 h-full text-white/40 hover:text-gold transition-colors disabled:opacity-30 text-sm"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleFind}
          disabled={!event}
          className="btn-gold text-center py-2.5 px-8 text-[0.65rem] disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap"
        >
          Find Experience
        </button>
      </div>
    </div>
  )
}
