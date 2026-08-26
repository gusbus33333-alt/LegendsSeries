import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for booking Legends Series events and experiences.',
}

export default function TermsPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 bg-ink">
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-3">Legal</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Terms &amp; Conditions
          </h1>
          <div className="gold-rule mt-6" />
          <p className="text-white/65 text-sm mt-4">Last updated: 25 August 2026</p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-parchment">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 prose prose-ink prose-lg max-w-none">

          <h2>1. About These Terms</h2>
          <p>
            These Terms and Conditions (&quot;Terms&quot;) govern your use of the Legends Series website
            (legends-series.com) and all bookings made through it. By making a booking or using our
            website, you agree to be bound by these Terms.
          </p>
          <p>
            Legends Series (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a trading name of
            Legends Series Ltd, registered in England and Wales. Our contact details are set out in
            Section 17 below.
          </p>

          <h2>2. Our Services</h2>
          <p>
            We provide premium sports hospitality experiences, including but not limited to:
          </p>
          <ul>
            <li>The Legends Lounge — matchday hospitality at or near sporting venues</li>
            <li>Legends Tours — international travel experiences alongside sporting legends</li>
            <li>Bespoke events and private bookings</li>
          </ul>
          <p>
            All experiences are subject to availability. We reserve the right to amend event details
            (such as venue layout, menu, or attending legends) where circumstances require, provided
            the overall nature of the experience is substantially maintained.
          </p>

          <h2>3. Booking and Payment</h2>
          <h3>3.1 Making a Booking</h3>
          <p>
            A booking is confirmed only when we have received full payment or an agreed deposit and
            you have received a written booking confirmation by email. Until that point, no contract
            exists between us.
          </p>

          <h3>3.2 Prices</h3>
          <ul>
            <li>All prices are quoted in pounds sterling (GBP) per person</li>
            <li>Prices are shown both excluding and including VAT at the prevailing rate (currently 20%)</li>
            <li>We reserve the right to correct pricing errors. If we discover an error after you have booked, we will contact you to offer the correct price or a full refund</li>
          </ul>

          <h3>3.3 Payment</h3>
          <ul>
            <li>Payment is processed securely by Stripe. We never see or store your card details</li>
            <li>For certain events, we may offer a deposit option with the balance due by a specified date. If the balance is not paid by the due date, we reserve the right to cancel the booking and retain the deposit</li>
            <li>All payments are non-refundable except as set out in Section 4 below</li>
          </ul>

          <h3>3.4 What Is Included</h3>
          <p>
            Each event listing specifies what is included in the price. Unless explicitly stated,
            bookings do not include:
          </p>
          <ul>
            <li>Match tickets or entry to the sporting venue</li>
            <li>Travel to or from the event</li>
            <li>Accommodation</li>
            <li>Travel insurance</li>
          </ul>

          <h2>4. Cancellation and Refunds</h2>
          <h3>4.1 Cancellation by You</h3>
          <p>
            All cancellations must be made in writing by email to{' '}
            <a href="mailto:info@legends-series.com">info@legends-series.com</a>. The following
            cancellation terms apply:
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
            We strongly recommend you take out appropriate event cancellation or travel insurance
            to cover any losses.
          </p>

          <h3>4.2 Transfer of Booking</h3>
          <p>
            If you cannot attend, you may transfer your booking to another person at no charge,
            provided you notify us in writing at least 7 days before the event. The replacement
            guest must agree to these Terms.
          </p>

          <h3>4.3 Cancellation by Us</h3>
          <p>
            In the unlikely event that we need to cancel an event, we will offer you:
          </p>
          <ul>
            <li>A full refund of all monies paid; or</li>
            <li>The option to transfer your booking to an alternative event of equal or greater value (any difference to be paid or refunded accordingly)</li>
          </ul>
          <p>
            Our liability in the event of cancellation is limited to the amount you have paid for
            the booking. We are not liable for any consequential losses, including but not limited
            to travel, accommodation, or loss of enjoyment.
          </p>

          <h3>4.4 Postponement or Change of Date</h3>
          <p>
            If an event is postponed or rescheduled (for example due to a change in the sporting
            fixture calendar), your booking will automatically transfer to the new date. If you
            cannot attend the rescheduled date, the cancellation terms in Section 4.1 apply based
            on the number of days between your cancellation request and the new event date.
          </p>

          <h2>5. Parking</h2>
          <p>
            Parking is available on site for cars and buses at Allianz Twickenham Stadium, subject
            to availability and to the following conditions.
          </p>
          <h3>5.1 Parking must accompany a Legends Lounge booking</h3>
          <p>
            Parking is sold only as an addition to Legends Lounge tickets for the same matchday. It
            cannot be purchased on its own, and any parking booked without accompanying event
            tickets will be cancelled and refunded.
          </p>
          <h3>5.2 What counts as a car and what counts as a bus</h3>
          <p>
            For parking purposes, a <strong>car</strong> is any vehicle with up to and including
            seven seats. Any vehicle with more than seven seats is treated as a{' '}
            <strong>bus or coach</strong> and must be booked as bus parking. If a vehicle arrives
            that has been booked under the wrong category, we reserve the right to charge the
            difference or to refuse entry.
          </p>
          <h3>5.3 Road closures</h3>
          <p>
            All roads surrounding the stadium close two hours before kick off and for two hours
            after the final whistle. Please plan your arrival and departure accordingly. We cannot
            grant access to or exit from the site during these closures.
          </p>
          <h3>5.4 Vehicles must be removed by 9am the following morning</h3>
          <p>
            All vehicles must be removed from the site by 9am on the morning after the event. This
            allows you to leave your vehicle overnight and travel home safely, but the site must be
            clear the next morning.
          </p>
          <p>
            Any vehicle remaining on site after 9am may be clamped or removed. A release fee of
            £200 applies to any vehicle that is clamped, payable before the vehicle is released.
            Where a vehicle is removed, any recovery and storage costs charged by the operator are
            payable by the vehicle owner.
          </p>
          <h3>5.5 Vehicles are left at your own risk</h3>
          <p>
            Vehicles and their contents are left entirely at the owner&apos;s risk. We do not accept
            liability for loss of or damage to any vehicle or its contents while on site, except
            where such loss or damage is caused by our negligence.
          </p>

          <h2>6. Event Conduct</h2>
          <ul>
            <li>We reserve the right to refuse entry or remove any guest whose behaviour is disruptive, threatening, or excessively intoxicated</li>
            <li>No refund will be given if you are refused entry or removed for breach of this section</li>
            <li>Guests must comply with all venue rules and regulations</li>
            <li>Illegal substances are strictly prohibited. Any guest found in possession will be removed immediately and reported to the police</li>
          </ul>

          <h2>7. Dietary Requirements and Allergies</h2>
          <p>
            You must inform us of any dietary requirements or allergies at the time of booking or no
            later than 7 days before the event. While we will make every reasonable effort to
            accommodate requests, we cannot guarantee a completely allergen-free environment.
          </p>

          <h2>8. Legends and Special Guests</h2>
          <p>
            While we make every effort to ensure advertised legends and special guests attend our
            events, their attendance is subject to their personal and professional commitments. In
            the event that an advertised legend cannot attend, we will endeavour to provide a
            replacement of comparable stature. The non-attendance of a specific individual does not
            entitle you to a refund unless the event is materially different from what was advertised.
          </p>

          <h2>9. Photography and Media</h2>
          <p>
            By attending our events, you consent to being photographed or filmed. These images and
            recordings may be used by Legends Series for marketing, social media, and promotional
            purposes. If you do not wish to be photographed, please inform our events team on
            arrival.
          </p>

          <h2>10. Liability</h2>
          <h3>9.1 Our Liability</h3>
          <ul>
            <li>Nothing in these Terms limits or excludes our liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded by law</li>
            <li>Subject to the above, our total liability to you for any claim arising from or in connection with a booking shall not exceed the total amount you paid for that booking</li>
            <li>We are not liable for any indirect, consequential, or special losses</li>
          </ul>

          <h3>9.2 Your Liability</h3>
          <p>
            You are responsible for any damage caused by you or your guests to the venue, equipment,
            or property during an event. You agree to indemnify us against any claims, losses, or
            expenses arising from your behaviour or that of your guests.
          </p>

          <h2>11. Force Majeure</h2>
          <p>
            We are not liable for any failure to perform our obligations where such failure results
            from circumstances beyond our reasonable control, including but not limited to: acts of
            God, pandemic, government restrictions, terrorism, severe weather, industrial action,
            venue closure, or cancellation of the sporting fixture by the governing body.
          </p>
          <p>
            In such circumstances, we will offer you a credit for a future event or a refund minus
            any costs already incurred on your behalf that cannot be recovered.
          </p>

          <h2>12. Age Restriction</h2>
          <p>
            Our events are for guests aged 18 and over unless otherwise stated. We reserve the right
            to request proof of age and refuse entry to anyone under 18. Alcohol will not be served
            to anyone under 18.
          </p>

          <h2>13. Intellectual Property</h2>
          <p>
            All content on this website — including text, images, logos, and design — is owned by or
            licensed to Legends Series and protected by copyright. You may not reproduce, distribute,
            or use any content without our prior written consent.
          </p>

          <h2>14. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the
            content or practices of those sites and do not endorse them.
          </p>

          <h2>15. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of England and
            Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of
            England and Wales.
          </p>

          <h2>16. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Changes will be posted on this page with
            an updated date. Any bookings made before a change will be governed by the Terms in
            force at the time of booking.
          </p>

          <h2>17. Contact Us</h2>
          <p>For any questions about these Terms, contact us at:</p>
          <ul>
            <li>Email: <a href="mailto:info@legends-series.com">info@legends-series.com</a></li>
            <li>Phone: +44 (0) 7595 217647</li>
          </ul>
        </div>
      </section>
    </>
  )
}
