'use client'

import { useState, FormEvent } from 'react'
import { createClient } from '@/lib/supabase/client'

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string
  eventSlug: string
  guests: string
  requirements: string
}

interface EventOption {
  slug: string
  title: string
  price: number
  priceDisplay: string
}

interface BookingFormProps {
  defaultEvent?: string
  eventOptions: EventOption[]
}

const initialState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  eventSlug: '',
  guests: '1',
  requirements: '',
}

export default function BookingForm({ defaultEvent, eventOptions }: BookingFormProps) {
  const [form, setForm] = useState<FormState>({ ...initialState, eventSlug: defaultEvent ?? '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const selectedEvent = eventOptions.find((e) => e.slug === form.eventSlug)
  const totalPrice = selectedEvent ? selectedEvent.price * parseInt(form.guests || '1') : null
  const depositAmount = totalPrice ? Math.round(totalPrice * 0.25) : null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    const supabase = createClient()

    const { error } = await supabase.from('bookings').insert({
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone || null,
      event_slug: form.eventSlug || null,
      guests: parseInt(form.guests),
      requirements: form.requirements || null,
      total_price: totalPrice,
      deposit_amount: depositAmount,
    })

    if (error) {
      setErrorMsg(error.message)
      setStatus('error')
      return
    }

    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className="bg-ink p-10 text-center flex flex-col items-center gap-6">
        <div className="w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center">
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-white font-bold text-2xl">Enquiry Received</h3>
        <p className="text-white/50 text-sm max-w-xs leading-relaxed">
          Thank you for your interest. A member of the Legends Series team will be in touch
          within 24 hours to confirm your booking and process your deposit.
        </p>
        <p className="text-gold text-xs tracking-widest uppercase">
          Check your email for confirmation
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-ink/50 text-xs tracking-[0.15em] uppercase" htmlFor="firstName">
            First Name *
          </label>
          <input
            id="firstName" name="firstName" type="text" required
            value={form.firstName} onChange={handleChange}
            className="bg-transparent border border-ink/20 focus:border-gold px-4 py-3 text-ink text-sm outline-none transition-colors placeholder:text-ink/25"
            placeholder="James"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-ink/50 text-xs tracking-[0.15em] uppercase" htmlFor="lastName">
            Last Name *
          </label>
          <input
            id="lastName" name="lastName" type="text" required
            value={form.lastName} onChange={handleChange}
            className="bg-transparent border border-ink/20 focus:border-gold px-4 py-3 text-ink text-sm outline-none transition-colors placeholder:text-ink/25"
            placeholder="Hartley"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-ink/50 text-xs tracking-[0.15em] uppercase" htmlFor="email">
          Email Address *
        </label>
        <input
          id="email" name="email" type="email" required
          value={form.email} onChange={handleChange}
          className="bg-transparent border border-ink/20 focus:border-gold px-4 py-3 text-ink text-sm outline-none transition-colors placeholder:text-ink/25"
          placeholder="james@example.com"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label className="text-ink/50 text-xs tracking-[0.15em] uppercase" htmlFor="phone">
          Phone Number
        </label>
        <input
          id="phone" name="phone" type="tel"
          value={form.phone} onChange={handleChange}
          className="bg-transparent border border-ink/20 focus:border-gold px-4 py-3 text-ink text-sm outline-none transition-colors placeholder:text-ink/25"
          placeholder="+44 7700 900000"
        />
      </div>

      {/* Event */}
      <div className="flex flex-col gap-1.5">
        <label className="text-ink/50 text-xs tracking-[0.15em] uppercase" htmlFor="eventSlug">
          Event of Interest *
        </label>
        <select
          id="eventSlug" name="eventSlug" required
          value={form.eventSlug} onChange={handleChange}
          className="bg-parchment border border-ink/20 focus:border-gold px-4 py-3 text-ink text-sm outline-none transition-colors appearance-none"
        >
          <option value="" disabled>Select an event…</option>
          {eventOptions.map((e) => (
            <option key={e.slug} value={e.slug}>
              {e.title} — {e.priceDisplay}
            </option>
          ))}
        </select>
      </div>

      {/* Guests */}
      <div className="flex flex-col gap-1.5">
        <label className="text-ink/50 text-xs tracking-[0.15em] uppercase" htmlFor="guests">
          Number of Guests *
        </label>
        <select
          id="guests" name="guests"
          value={form.guests} onChange={handleChange}
          className="bg-parchment border border-ink/20 focus:border-gold px-4 py-3 text-ink text-sm outline-none transition-colors appearance-none"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
          ))}
        </select>
      </div>

      {/* Requirements */}
      <div className="flex flex-col gap-1.5">
        <label className="text-ink/50 text-xs tracking-[0.15em] uppercase" htmlFor="requirements">
          Special Requirements
        </label>
        <textarea
          id="requirements" name="requirements" rows={4}
          value={form.requirements} onChange={handleChange}
          className="bg-transparent border border-ink/20 focus:border-gold px-4 py-3 text-ink text-sm outline-none transition-colors resize-none placeholder:text-ink/25"
          placeholder="Dietary requirements, accessibility needs, special occasions…"
        />
      </div>

      {/* Price summary */}
      {totalPrice !== null && selectedEvent && (
        <div className="bg-ink/5 border border-ink/10 p-5 flex flex-col gap-3">
          <p className="text-ink/50 text-xs tracking-[0.15em] uppercase font-semibold">
            Price Summary
          </p>
          <div className="flex justify-between text-sm">
            <span className="text-ink/60">{form.guests} × {selectedEvent.priceDisplay}</span>
            <span className="text-ink font-semibold">£{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-ink/60">25% deposit due today</span>
            <span className="text-gold font-bold">£{depositAmount?.toLocaleString()}</span>
          </div>
          <p className="text-ink/30 text-[0.65rem] leading-relaxed">
            Balance of £{(totalPrice - (depositAmount ?? 0)).toLocaleString()} due 60 days before
            the event. Secure payment powered by Stripe.
          </p>
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <p className="text-red-500 text-xs bg-red-50 border border-red-200 px-4 py-3">
          ⚠ {errorMsg || 'Something went wrong. Please try again.'}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-gold w-full py-4 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting'
          ? 'Sending…'
          : selectedEvent
          ? 'Proceed to Secure Payment →'
          : 'Send Enquiry →'}
      </button>

      <p className="text-ink/30 text-[0.65rem] text-center">
        🔒 Payments secured by Stripe. Your data is encrypted and never stored on our servers.
      </p>
    </form>
  )
}
