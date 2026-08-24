import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Booking Policy',
  description: 'Booking, cancellation, and refund policy for Legends Series events.',
}

export default function BookingPolicyPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 bg-ink">
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-3">Legal</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Booking Policy
          </h1>
          <div className="gold-rule mt-6" />
          <p className="text-white/65 text-sm mt-4">Last updated: 26 July 2026</p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-parchment">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 prose prose-ink prose-lg max-w-none">

          <h2>How to Book</h2>
          <p>
            You can book a Legends Series experience through our website, by email at{' '}
            <a href="mailto:info@legends-series.com">info@legends-series.com</a>, or by phone on
            +44 (0) 7595 217647.
          </p>
          <p>
            Your booking is confirmed only once we have received payment (or an agreed deposit)
            and you have received a written confirmation email. Please check the details carefully
            and notify us of any errors within 48 hours.
          </p>

          <h2>Pricing</h2>
          <ul>
            <li>All prices are quoted in pounds sterling (GBP), per person</li>
            <li>Prices are displayed both excluding and including VAT at the prevailing UK rate (currently 20%)</li>
            <li>The price you pay is the price confirmed in your booking confirmation email</li>
            <li>We reserve the right to correct obvious pricing errors — if this affects your booking, you will be offered the correct price or a full refund</li>
          </ul>

          <h2>What Is Included</h2>
          <p>
            Each event page clearly lists what is included. As a general guide, the Legends Lounge
            matchday experience typically includes:
          </p>
          <ul>
            <li>Entry to the Legends Lounge venue</li>
            <li>All-inclusive food (hog roast and more)</li>
            <li>Unlimited drinks</li>
            <li>Live music and entertainment</li>
            <li>Time with rugby legends</li>
          </ul>
          <p>
            <strong>Unless explicitly stated, bookings do not include:</strong>
          </p>
          <ul>
            <li>Match tickets or entry to the stadium</li>
            <li>Transport to or from the venue</li>
            <li>Accommodation</li>
            <li>Travel insurance</li>
          </ul>

          <h2>Payment Methods</h2>
          <p>
            We accept payment by credit or debit card via Stripe, our secure payment processor.
            We never see, store, or have access to your card details. Stripe is PCI DSS Level 1
            certified — the highest level of payment security in the industry.
          </p>

          <h2>Deposits</h2>
          <p>
            For certain events or group bookings, we may offer a deposit option. Where a deposit is
            accepted:
          </p>
          <ul>
            <li>The deposit amount and balance due date will be clearly stated at the time of booking</li>
            <li>If the outstanding balance is not paid by the due date, we reserve the right to cancel your booking and retain the deposit</li>
            <li>We will send a reminder before the balance due date</li>
          </ul>

          <h2>Group Bookings</h2>
          <p>
            For group bookings of 10 or more guests, please contact us directly for tailored
            pricing and arrangements. Group bookings may be subject to additional terms.
          </p>

          <h2>Cancellation by You</h2>
          <p>
            All cancellations must be submitted in writing to{' '}
            <a href="mailto:info@legends-series.com">info@legends-series.com</a>.
            The cancellation date is the date we receive your written notice.
          </p>
          <table>
            <thead>
              <tr>
                <th>Timeframe</th>
                <th>What you receive</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Within 48 hours of booking</td>
                <td>Full refund to your original payment method</td>
              </tr>
              <tr>
                <td>After 48 hours but more than 30 days before the event</td>
                <td>100% credit towards any future Legends Series event</td>
              </tr>
              <tr>
                <td>Less than 30 days before the event</td>
                <td>No refund or credit</td>
              </tr>
            </tbody>
          </table>
          <p>
            Credits are valid for 12 months from the date of issue and may be applied to any
            Legends Series event. Credits are non-transferable and have no cash value.
          </p>
          <p>
            We strongly recommend purchasing event cancellation insurance to protect yourself
            against unforeseen circumstances.
          </p>

          <h2>Transferring Your Booking</h2>
          <p>
            If you can no longer attend, you may transfer your booking to another person free of
            charge, provided:
          </p>
          <ul>
            <li>You notify us in writing at least 7 days before the event</li>
            <li>You provide the replacement guest&apos;s full name and contact details</li>
            <li>The replacement guest agrees to our Terms &amp; Conditions</li>
          </ul>

          <h2>Cancellation by Us</h2>
          <p>If we need to cancel an event, we will offer you either:</p>
          <ul>
            <li>A full refund of all monies paid; or</li>
            <li>Transfer to an alternative event of equal or greater value</li>
          </ul>
          <p>
            Our liability is limited to the amount paid for the booking. We cannot be held
            responsible for any consequential costs such as travel or accommodation.
          </p>

          <h2>Postponement</h2>
          <p>
            If an event is postponed or rescheduled, your booking will automatically transfer to
            the new date. If you cannot attend the new date, the standard cancellation terms above
            apply, calculated from your cancellation request to the rescheduled date.
          </p>

          <h2>Refund Processing</h2>
          <p>
            Where a refund is due, it will be processed to your original payment method within
            10 working days of the cancellation being confirmed.
          </p>

          <h2>Complaints</h2>
          <p>
            If you are unhappy with any aspect of your booking or experience, please contact us as
            soon as possible at <a href="mailto:info@legends-series.com">info@legends-series.com</a>.
            We take all complaints seriously and will respond within 5 working days.
          </p>

          <h2>Contact</h2>
          <ul>
            <li>Email: <a href="mailto:info@legends-series.com">info@legends-series.com</a></li>
            <li>Phone: +44 (0) 7595 217647</li>
          </ul>
        </div>
      </section>
    </>
  )
}
