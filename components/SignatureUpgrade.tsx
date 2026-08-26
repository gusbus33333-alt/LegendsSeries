'use client'

import type { Dispatch, SetStateAction } from 'react'
import QuantityRow from './QuantityRow'
import {
  SIGNATURE_PRICE_PP,
  SIGNATURE_ROOM_PRICE,
  SIGNATURE_GUESTS_PER_ROOM,
} from '@/lib/lounge-events'

interface SignatureUpgradeProps {
  /** Live remaining rooms for this matchday. Zero hides the upgrade entirely. */
  roomsAvailable: number
  hotel?: string
  rooms: number
  onChange: Dispatch<SetStateAction<number>>
  /** Adults + under 16s on this matchday — rooms cannot exceed the party. */
  totalGuests: number
}

/**
 * Rooms are twin/double, so the upgrade is sold two guests at a time. Offering
 * rooms rather than people makes that structural rather than a rule the
 * customer has to remember — an odd party is pointed at the enquiry form.
 */
export default function SignatureUpgrade({
  roomsAvailable,
  hotel,
  rooms,
  onChange,
  totalGuests,
}: SignatureUpgradeProps) {
  // Nothing to sell — say nothing rather than show a sold-out row on every card.
  if (roomsAvailable <= 0) return null

  const maxByParty = Math.floor(totalGuests / SIGNATURE_GUESTS_PER_ROOM)
  const max = Math.min(roomsAvailable, maxByParty)
  const coveredGuests = rooms * SIGNATURE_GUESTS_PER_ROOM
  const oddGuestOut = totalGuests % SIGNATURE_GUESTS_PER_ROOM === 1

  return (
    <div className="border border-gold/25 bg-gold/[0.04] px-3 py-3 flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-gold text-[0.7rem] uppercase tracking-widest font-semibold">
          Signature Upgrade
        </p>
        <span className="text-white/70 text-[0.6rem] whitespace-nowrap">
          {roomsAvailable} {roomsAvailable === 1 ? 'room' : 'rooms'} left
        </span>
      </div>

      <p className="text-white/70 text-[0.65rem] leading-snug">
        Luxury hotel stay{hotel ? ` at ${hotel}` : ''}, private player meet &amp; greet and gifts.
        £{SIGNATURE_PRICE_PP} per person — one room sleeps {SIGNATURE_GUESTS_PER_ROOM}
        {' '}(£{SIGNATURE_ROOM_PRICE.toLocaleString('en-GB')} per room).
      </p>

      {max > 0 ? (
        <>
          <QuantityRow
            label="Rooms"
            hint={
              rooms > 0
                ? `${coveredGuests} of your ${totalGuests} guests upgraded`
                : `Sleeps ${SIGNATURE_GUESTS_PER_ROOM} per room`
            }
            value={rooms}
            onChange={onChange}
            max={max}
          />
          {oddGuestOut && rooms > 0 && (
            <p className="text-white/65 text-[0.65rem] leading-snug">
              Rooms are twin or double, so one guest is left over.{' '}
              <a href="/contact" className="text-gold underline underline-offset-2">
                Enquire
              </a>{' '}
              and we&apos;ll see what we can do.
            </p>
          )}
        </>
      ) : (
        <p className="text-white/65 text-[0.65rem] leading-snug">
          Add at least {SIGNATURE_GUESTS_PER_ROOM} guests to book a Signature room, or{' '}
          <a href="/contact" className="text-gold underline underline-offset-2">
            enquire
          </a>{' '}
          about a single.
        </p>
      )}
    </div>
  )
}
