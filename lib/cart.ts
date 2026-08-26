import {
  CAR_PARKING_PRICE,
  BUS_PARKING_PRICE,
  SIGNATURE_ROOM_PRICE,
  under16Price,
} from './lounge-events'

/**
 * One matchday in the basket. Quantities live here rather than on the event so
 * the same fixture can be re-priced or removed without touching event data.
 */
export interface CartItem {
  slug: string
  /** Denormalised for display so the basket renders without a data lookup. */
  eventName: string
  shortDate: string
  /** Adult price inc VAT. Under 16s derive from it. */
  unitPrice: number
  adults: number
  under16: number
  carParking: number
  busParking: number
  /** Signature upgrade rooms, each sleeping two guests. */
  signatureRooms: number
  /** Stock at the time it was added — re-checked server-side at checkout, so a
   *  room selling while the basket sits open is caught before payment. */
  signatureRoomsAvailable?: number
  signatureHotel?: string
  /** Follow Your Team only — the matchday is confirmed later. */
  teamId?: string
  teamName?: string
}

/**
 * Two Follow Your Team lines for different teams are genuinely different
 * purchases, so the team forms part of the identity alongside the slug.
 */
export function itemKey(item: Pick<CartItem, 'slug' | 'teamId'>): string {
  return item.teamId ? `${item.slug}:${item.teamId}` : item.slug
}

export function itemTickets(item: CartItem): number {
  return item.adults + item.under16
}

export function itemTotal(item: CartItem): number {
  return (
    item.unitPrice * item.adults +
    under16Price(item.unitPrice) * item.under16 +
    item.carParking * CAR_PARKING_PRICE +
    item.busParking * BUS_PARKING_PRICE +
    item.signatureRooms * SIGNATURE_ROOM_PRICE
  )
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + itemTotal(item), 0)
}

/** Total attendees across the basket — what the header badge counts. */
export function cartTicketCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + itemTickets(item), 0)
}
