'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from './CartProvider'
import PromoCode from './PromoCode'
import NoteToOrganisers from './NoteToOrganisers'
import QuantityRow from './QuantityRow'
import SignatureUpgrade from './SignatureUpgrade'
import {
  itemKey,
  itemTotal,
  cartTotal,
  type CartItem,
} from '@/lib/cart'
import {
  CAR_PARKING_PRICE,
  BUS_PARKING_PRICE,
  MAX_CAR_PARKING,
  MAX_BUS_PARKING,
  under16Price,
} from '@/lib/lounge-events'

function Line({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="flex justify-between text-white/70 text-xs">
      <span>{label}</span>
      <span>£{amount.toFixed(2)}</span>
    </div>
  )
}

function BasketRow({ item }: { item: CartItem }) {
  const { updateItem, removeItem } = useCart()
  const key = itemKey(item)

  // QuantityRow takes a setState-style updater so rapid clicks don't drop
  // increments; each field is adapted to patch just its own value.
  const setter = (field: keyof CartItem) => (next: number | ((prev: number) => number)) => {
    const current = item[field] as number
    const value = typeof next === 'function' ? next(current) : next
    updateItem(key, { [field]: value } as Partial<CartItem>)
  }

  return (
    <div className="border border-white/12 bg-white/[0.03] p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-white font-bold text-base leading-tight">{item.eventName}</h3>
          <p className="text-white/60 text-xs mt-1">{item.shortDate}</p>
        </div>
        <button
          type="button"
          onClick={() => removeItem(key)}
          className="text-white/55 hover:text-red-400 text-[0.7rem] uppercase tracking-[0.1em] transition-colors shrink-0 py-2 -my-2 pl-3"
        >
          Remove
        </button>
      </div>

      <div className="h-px bg-white/10" />

      <QuantityRow label="Guests" value={item.adults} onChange={setter('adults')} min={1} max={30} />
      <QuantityRow
        label="Under 16s"
        hint={`15 and under · half price (£${under16Price(item.unitPrice).toFixed(2)})`}
        value={item.under16}
        onChange={setter('under16')}
        max={30}
      />
      <QuantityRow
        label="Car parking"
        hint={`£${CAR_PARKING_PRICE} per car`}
        value={item.carParking}
        onChange={setter('carParking')}
        max={MAX_CAR_PARKING}
      />
      <QuantityRow
        label="Bus parking"
        hint={`£${BUS_PARKING_PRICE} per coach`}
        value={item.busParking}
        onChange={setter('busParking')}
        max={MAX_BUS_PARKING}
      />

      {(item.signatureRoomsAvailable ?? 0) > 0 && (
        <SignatureUpgrade
          roomsAvailable={item.signatureRoomsAvailable ?? 0}
          hotel={item.signatureHotel}
          rooms={item.signatureRooms}
          onChange={setter('signatureRooms')}
          totalGuests={item.adults + item.under16}
        />
      )}

      <div className="h-px bg-white/10" />

      <div className="flex justify-between items-baseline">
        <span className="text-white/70 text-xs uppercase tracking-[0.12em]">Matchday total</span>
        <span className="text-gold font-bold text-lg">£{itemTotal(item).toFixed(2)}</span>
      </div>
    </div>
  )
}

export default function BasketView() {
  // The code lives on the cart so it survives going back for another matchday.
  const { items, hydrated, clear, promo: discount, setPromo: setDiscount } = useCart()
  const [note, setNote] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [marketingOptIn, setMarketingOptIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const subtotal = cartTotal(items)
  // Extras aren't discounted, so the promo is applied to the ticket value only.
  const ticketValue = items.reduce(
    (sum, i) => sum + i.unitPrice * i.adults + under16Price(i.unitPrice) * i.under16,
    0
  )
  // The 9am note only earns its place once parking is actually in the basket.
  const hasParking = items.some((i) => i.carParking > 0 || i.busParking > 0)
  const discountAmount = discount
    ? discount.percentOff
      ? ticketValue * (discount.percentOff / 100)
      : Math.min(discount.amountOff ?? 0, ticketValue)
    : 0
  const total = subtotal - discountAmount

  const handleCheckout = async () => {
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
          items: items.map((i) => ({
            slug: i.slug,
            adults: i.adults,
            under16: i.under16,
            carParking: i.carParking,
            busParking: i.busParking,
            signatureRooms: i.signatureRooms,
            teamId: i.teamId,
          })),
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
      // The basket is deliberately left intact until payment succeeds — the
      // confirmation page clears it, so an abandoned checkout loses nothing.
      window.location.href = data.url
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (!hydrated) {
    return <p className="text-white/55 text-sm text-center py-20">Loading your basket…</p>
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20 flex flex-col items-center gap-6">
        <p className="text-white/75 text-base">Your basket is empty.</p>
        <Link href="/legends-lounge#fixtures" className="btn-gold min-w-[220px]">
          Browse the fixtures
        </Link>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
      {/* Matchdays */}
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <BasketRow key={itemKey(item)} item={item} />
        ))}
        <div className="flex justify-between items-center pt-1">
          <Link
            href="/legends-lounge#fixtures"
            className="text-gold hover:text-white text-[0.75rem] uppercase tracking-[0.12em] transition-colors py-2 -my-2 pr-3"
          >
            ← Add another matchday
          </Link>
          <button
            type="button"
            onClick={clear}
            className="text-white/55 hover:text-red-400 text-[0.7rem] uppercase tracking-[0.1em] transition-colors py-2 -my-2 pl-3"
          >
            Empty basket
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-ink border border-gold/25 p-6 flex flex-col gap-4 lg:sticky lg:top-28">
        <h2 className="text-gold text-[0.7rem] tracking-[0.25em] uppercase font-semibold">
          Order Summary
        </h2>

        <div className="flex flex-col gap-1.5">
          {items.map((item) => (
            <Line key={itemKey(item)} label={item.shortDate} amount={itemTotal(item)} />
          ))}
        </div>

        <div className="h-px bg-white/10" />

        <PromoCode
          onApply={setDiscount}
          appliedCode={discount?.code || ''}
          onRemove={() => setDiscount(null)}
        />

        {discountAmount > 0 && (
          <div className="flex justify-between text-gold text-xs">
            <span>Discount{discount?.percentOff ? ` (${discount.percentOff}% off)` : ''}</span>
            <span>−£{discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="h-px bg-white/10" />

        <div className="flex justify-between items-baseline">
          <span className="text-white text-sm font-semibold">Total</span>
          <span className="text-gold text-2xl font-bold">£{total.toFixed(2)}</span>
        </div>
        <p className="text-white/60 text-[0.65rem] -mt-2">inc VAT</p>

        {hasParking && (
          <p className="text-white/65 text-[0.65rem] leading-snug">
            Parking must be removed by 9am the morning after the game.
          </p>
        )}

        <NoteToOrganisers value={note} onChange={setNote} id="basket-note" />

        <label className="flex items-start gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => {
              setTermsAccepted(e.target.checked)
              setError('')
            }}
            className="mt-0.5 accent-[#b8953f] w-4 h-4 shrink-0"
          />
          <span className="text-white/75 text-[0.65rem] leading-relaxed group-hover:text-white/90 transition-colors">
            I agree to the{' '}
            <a href="/terms" target="_blank" className="text-gold underline underline-offset-2">
              terms and conditions
            </a>
          </span>
        </label>

        <label className="flex items-start gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={marketingOptIn}
            onChange={(e) => setMarketingOptIn(e.target.checked)}
            className="mt-0.5 accent-[#b8953f] w-4 h-4 shrink-0"
          />
          <span className="text-white/75 text-[0.65rem] leading-relaxed group-hover:text-white/90 transition-colors">
            I&apos;d like early access to future Legends Series events and exclusive offers
          </span>
        </label>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="btn-gold w-full text-center py-4 text-xs disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Redirecting to payment…' : 'Checkout — Secure Payment'}
        </button>

        <p className="text-white/50 text-[0.55rem] text-center leading-relaxed">
          You&apos;ll be redirected to Stripe for secure payment.
        </p>

        {error && <p className="text-red-400 text-xs text-center">{error}</p>}
      </div>
    </div>
  )
}
