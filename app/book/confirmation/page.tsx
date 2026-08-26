import type { Metadata } from 'next'
import Link from 'next/link'
import { stripe } from '@/lib/stripe'
import { getAdminClient } from '@/lib/supabase/admin'
import { getEventBySlug } from '@/lib/lounge-events'
import ClearBasket from '@/components/ClearBasket'

export const metadata: Metadata = {
  title: 'Booking Confirmed',
  robots: { index: false, follow: false },
}

interface PageProps {
  searchParams: { session_id?: string }
}

interface ConfirmedItem {
  slug: string
  name: string
  date: string
  guests: number
}

/**
 * Confirmation for a basket covering several matchdays. Single-fixture
 * bookings keep their own page at /book/[slug]/confirmation.
 */
export default async function BasketConfirmationPage({ searchParams }: PageProps) {
  const sessionId = searchParams.session_id
  let session = null

  if (sessionId) {
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId)
    } catch {
      // Invalid session — fall through to the generic confirmation.
    }
  }

  // The order is the source of truth for what was bought; Stripe metadata only
  // carries the id.
  const orderId = session?.metadata?.order_id
  let items: ConfirmedItem[] = []

  if (orderId) {
    const supabase = getAdminClient()
    if (supabase) {
      const { data } = await supabase
        .from('order_items')
        .select('event_slug, event_name, adults, under_16')
        .eq('order_id', orderId)
        .order('id', { ascending: true })

      items = (data ?? []).map((row) => ({
        slug: row.event_slug,
        name: row.event_name,
        date: getEventBySlug(row.event_slug)?.date ?? '',
        guests: row.adults + row.under_16,
      }))
    }
  }

  const amountPaid = session?.amount_total
    ? `£${(session.amount_total / 100).toLocaleString('en-GB', { minimumFractionDigits: 2 })}`
    : null
  const customerEmail = session?.customer_details?.email ?? ''
  const totalGuests = items.reduce((n, i) => n + i.guests, 0)

  return (
    <>
      <ClearBasket />
      <section className="min-h-screen flex items-center justify-center bg-ink px-6">
        <div className="max-w-lg w-full text-center flex flex-col items-center gap-8 py-20">
          <div className="w-20 h-20 rounded-full border-2 border-gold flex items-center justify-center">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white mb-3">Booking Confirmed</h1>
            <div className="w-12 h-px bg-gold mx-auto mb-6" />
            <p className="text-white/75 text-base leading-relaxed">
              {items.length > 1 ? (
                <>
                  Thank you for booking{' '}
                  <strong className="text-white">{items.length} Legends Lounge matchdays</strong>.
                  You&apos;ll receive a separate confirmation email for each one, with the passes
                  and running order for that day.
                </>
              ) : (
                <>Thank you for booking the Legends Lounge.</>
              )}
            </p>
          </div>

          {items.length > 0 && (
            <div className="w-full border border-white/10 p-6 flex flex-col gap-4 text-left">
              <p className="text-gold text-[0.65rem] tracking-[0.2em] uppercase font-semibold">
                Your Matchdays
              </p>
              {items.map((item) => (
                <div key={item.slug} className="flex justify-between gap-4 text-sm">
                  <div className="min-w-0">
                    <p className="text-white font-semibold leading-tight">{item.name}</p>
                    {item.date && <p className="text-white/60 text-xs mt-0.5">{item.date}</p>}
                  </div>
                  <span className="text-white/75 shrink-0">
                    {item.guests} {item.guests === 1 ? 'guest' : 'guests'}
                  </span>
                </div>
              ))}

              <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/65">Total guests</span>
                  <span className="text-white">{totalGuests}</span>
                </div>
                {amountPaid && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/65">Amount Paid</span>
                    <span className="text-gold font-bold">{amountPaid}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {customerEmail && (
            <p className="text-white/65 text-sm">
              Confirmations have been sent to{' '}
              <strong className="text-white">{customerEmail}</strong>
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link href="/legends-lounge" className="btn-gold min-w-[180px]">
              Back to Legends Lounge
            </Link>
            <Link href="/legends-lounge#fixtures" className="btn-outline-white min-w-[180px]">
              Book Another Date
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
