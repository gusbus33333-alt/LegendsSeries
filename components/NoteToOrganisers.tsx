'use client'

import { useState } from 'react'

interface NoteToOrganisersProps {
  value: string
  onChange: (value: string) => void
  /** Unique per form so the label/textarea pairing stays valid on a page with more than one. */
  id?: string
}

/**
 * Collapsed by default and revealed on click, matching PromoCode — the note is
 * optional, so it shouldn't add weight to the booking box until it's wanted.
 * Capped at 500 characters because that is Stripe's metadata value limit.
 */
export default function NoteToOrganisers({ value, onChange, id = 'note' }: NoteToOrganisersProps) {
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-white/80 hover:text-gold text-[0.75rem] tracking-[0.1em] uppercase transition-colors text-left"
      >
        Note to organisers / special requests?
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      <textarea
        id={id}
        name="note"
        rows={3}
        maxLength={500}
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rugby club affiliation, dietary requirements, accessibility needs or any other requests."
        className="bg-white/5 border border-white/15 text-white text-xs px-3 py-2.5 placeholder:text-white/45 focus:border-gold focus:outline-none transition-colors resize-none"
      />
      <div className="flex justify-end">
        <span className="text-white/45 text-[0.55rem]">{value.length}/500</span>
      </div>
    </div>
  )
}
