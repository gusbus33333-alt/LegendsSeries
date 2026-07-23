import type { Metadata } from 'next'
import Link from 'next/link'
import { stripe } from '@/lib/stripe'

export const metadata: Metadata = {
  title: 'Booking Confirmed',
}

interface PageProps {
  params: { slug: string }
  searchParams: { session_id?: string }
}

export default async function ConfirmationPage({ params, searchParams }: PageProps) {
  const sessionId = searchParams.session_id
  let session = null

  if (sessionId) {
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId)
    } catch {
      // Invalid session — show generic confirmation
    }
  }

  const eventMatch = session?.metadata?.event_match ?? 'your event'
  const eventDate = session?.metadata?.event_date ?? ''
  const guests = session?.metadata?.guests ?? '1'
  const amountPaid = session?.amount_total
    ? `£${(session.amount_total / 100).toLocaleString()}`
    : null
  const customerEmail = session?.customer_details?.email ?? ''

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-ink px-6">
        <div className="max-w-lg w-full text-center flex flex-col items-center gap-8 py-20">
          {/* Tick */}
          <div className="w-20 h-20 rounded-full border-2 border-gold flex items-center justify-center">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white mb-3">Booking Confirmed</h1>
            <div className="w-12 h-px bg-gold mx-auto mb-6" />
            <p className="text-white/50 text-base leading-relaxed">
              Thank you for booking the Legends Lounge for{' '}
              <strong className="text-white">{eventMatch}</strong>.
              {eventDate && <> We&apos;ll see you on <strong className="text-white">{eventDate}</strong>.</>}
            </p>
          </div>

          {/* Booking details */}
          <div className="w-full border border-white/10 p-6 flex flex-col gap-3 text-left">
            <p className="text-gold text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-1">
              Booking Summary
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Event</span>
              <span className="text-white font-semibold">{eventMatch}</span>
            </div>
            {eventDate && (
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Date</span>
                <span className="text-white">{eventDate}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Guests</span>
              <span className="text-white">{guests}</span>
            </div>
            {amountPaid && (
              <div className="flex justify-between text-sm border-t border-white/10 pt-3 mt-1">
                <span className="text-white/40">Amount Paid</span>
                <span className="text-gold font-bold">{amountPaid}</span>
              </div>
            )}
          </div>

          {customerEmail && (
            <p className="text-white/40 text-sm">
              A confirmation has been sent to <strong className="text-white">{customerEmail}</strong>
            </p>
          )}

          <p className="text-white/30 text-xs leading-relaxed max-w-sm">
            Our team will be in touch within 24 hours with full event details,
            including exact timings and location directions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link href="/legends-lounge" className="btn-gold min-w-[180px]">
              Back to Legends Lounge
            </Link>
            <Link
              href={`/book/${params.slug}`}
              className="btn-outline-white min-w-[180px]"
            >
              Book Another Date
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
