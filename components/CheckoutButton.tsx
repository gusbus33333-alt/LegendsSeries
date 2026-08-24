'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import PromoCode, { type PromoDiscount } from './PromoCode'
import NoteToOrganisers from './NoteToOrganisers'
import QuantityRow from './QuantityRow'
import {
  CAR_PARKING_PRICE,
  BUS_PARKING_PRICE,
  MAX_CAR_PARKING,
  MAX_BUS_PARKING,
  under16Price,
} from '@/lib/lounge-events'

interface CheckoutButtonProps {
  slug: string
  price: number
  className?: string
}

export default function CheckoutButton({ slug, price, className = '' }: CheckoutButtonProps) {
  const searchParams = useSearchParams()
  const initialGuests = Math.min(30, Math.max(1, Number(searchParams.get('guests')) || 1))
  const [guests, setGuests] = useState(initialGuests)
  const [under16, setUnder16] = useState(0)
  const [carParking, setCarParking] = useState(0)
  const [busParking, setBusParking] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [discount, setDiscount] = useState<PromoDiscount | null>(null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [marketingOptIn, setMarketingOptIn] = useState(false)
  // Stripe caps a metadata value at 500 characters.
  const [note, setNote] = useState('')

  const discountedPrice = discount
    ? discount.percentOff
      ? price * (1 - discount.percentOff / 100)
      : discount.amountOff
        ? Math.max(0, price - discount.amountOff)
        : price
    : price

  // Under 16s are half the adult price; the promo code applies to them too.
  const fullChildPrice = under16Price(price)
  const childPrice = under16Price(discountedPrice)
  const ticketsFull = price * guests + fullChildPrice * under16
  const ticketsTotal = discountedPrice * guests + childPrice * under16
  const discountAmount = ticketsFull - ticketsTotal
  const extrasTotal = carParking * CAR_PARKING_PRICE + busParking * BUS_PARKING_PRICE
  const total = ticketsTotal + extrasTotal
  const hasSaving = discount && discountedPrice < price
  const hasExtras = under16 > 0 || carParking > 0 || busParking > 0

  const handleCheckout = async () => {
    setLoading(true)
    setError('')

    if (!termsAccepted) {
      setError('Please accept the terms and conditions to continue.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          guests,
          under16,
          carParking,
          busParking,
          promoCode: discount?.code || undefined,
          marketingOptIn,
          note: note.trim() || undefined,
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

  return (
    <div className="flex flex-col gap-3">
      {/* Tickets */}
      <QuantityRow label="Guests" value={guests} onChange={setGuests} min={1} max={30} />
      <QuantityRow
        label="Under 16s"
        hint={`15 and under · half price (£${under16Price(price).toFixed(2)})`}
        value={under16}
        onChange={setUnder16}
        max={30}
      />

      <div className="h-px bg-white/10 my-1" />

      {/* Parking */}
      <QuantityRow
        label="Car parking"
        hint={`£${CAR_PARKING_PRICE} per car`}
        value={carParking}
        onChange={setCarParking}
        max={MAX_CAR_PARKING}
      />
      <QuantityRow
        label="Bus parking"
        hint={`£${BUS_PARKING_PRICE} per coach`}
        value={busParking}
        onChange={setBusParking}
        max={MAX_BUS_PARKING}
      />

      {/* Applies to both parking types, so stated once rather than in each hint */}
      <p className="text-white/25 text-[0.55rem] leading-snug -mt-1">
        Must be removed by 9am the morning after the game.
      </p>

      <div className="h-px bg-white/10 my-1" />

      {/* Promo code */}
      <PromoCode
        onApply={setDiscount}
        appliedCode={discount?.code || ''}
        onRemove={() => setDiscount(null)}
      />

      {/* Price summary when discount applied */}
      {/* Itemised once there is anything beyond plain adult tickets */}
      {(hasSaving || hasExtras) && (
        <div className="border border-gold/20 bg-gold/5 px-3 py-2.5 flex flex-col gap-1">
          <div className="flex justify-between text-white/40 text-[0.6rem]">
            <span>{guests} × Guest</span>
            <span>£{(price * guests).toFixed(2)}</span>
          </div>
          {under16 > 0 && (
            <div className="flex justify-between text-white/40 text-[0.6rem]">
              <span>{under16} × Under 16</span>
              <span>£{(fullChildPrice * under16).toFixed(2)}</span>
            </div>
          )}
          {carParking > 0 && (
            <div className="flex justify-between text-white/40 text-[0.6rem]">
              <span>{carParking} × Car parking</span>
              <span>£{(carParking * CAR_PARKING_PRICE).toFixed(2)}</span>
            </div>
          )}
          {busParking > 0 && (
            <div className="flex justify-between text-white/40 text-[0.6rem]">
              <span>{busParking} × Bus parking</span>
              <span>£{(busParking * BUS_PARKING_PRICE).toFixed(2)}</span>
            </div>
          )}
          {hasSaving && (
            <div className="flex justify-between text-[0.6rem]">
              <span className="text-gold">
                Discount{discount.percentOff ? ` (${discount.percentOff}% off)` : ''}
              </span>
              <span className="text-gold">−£{discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="h-px bg-white/10 my-1" />
          <div className="flex justify-between">
            <span className="text-white text-xs font-semibold">Total</span>
            <span className="text-gold text-sm font-bold">£{total.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Note to organisers */}
      <NoteToOrganisers value={note} onChange={setNote} />

      {/* Terms and conditions */}
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

      {/* Marketing opt-in */}
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

      {/* Book now button */}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`btn-gold w-full text-center py-4 text-xs disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      >
        {loading ? 'Redirecting to payment…' : 'Book Now — Secure Payment'}
      </button>

      <p className="text-white/20 text-[0.55rem] text-center leading-relaxed">
        You&apos;ll be redirected to Stripe for secure payment.
      </p>

      {error && (
        <p className="text-red-400 text-xs text-center">{error}</p>
      )}
    </div>
  )
}
