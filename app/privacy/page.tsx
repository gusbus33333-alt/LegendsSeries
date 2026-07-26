import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Legends Series collects, uses and protects your personal data.',
}

export default function PrivacyPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 bg-ink">
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-3">Legal</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Privacy Policy
          </h1>
          <div className="gold-rule mt-6" />
          <p className="text-white/40 text-sm mt-4">Last updated: 26 July 2026</p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-parchment">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 prose prose-ink prose-lg max-w-none">

          <h2>1. Who We Are</h2>
          <p>
            Legends Series (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a premium sports hospitality company
            registered in England and Wales. Our registered address is available on request by emailing{' '}
            <a href="mailto:info@legends-series.com">info@legends-series.com</a>.
          </p>
          <p>
            We are the data controller responsible for your personal data under the UK General Data
            Protection Regulation (UK GDPR) and the Data Protection Act 2018.
          </p>

          <h2>2. What Data We Collect</h2>
          <p>We may collect and process the following personal data:</p>
          <ul>
            <li><strong>Identity data:</strong> first name, last name</li>
            <li><strong>Contact data:</strong> email address, telephone number, postal address</li>
            <li><strong>Booking data:</strong> event selections, guest numbers, dietary requirements, special requests</li>
            <li><strong>Payment data:</strong> processed securely by Stripe — we never see or store your full card number, CVV or expiry date</li>
            <li><strong>Technical data:</strong> IP address, browser type, device information, pages visited, referring URL</li>
            <li><strong>Communication data:</strong> records of correspondence if you contact us by email, phone or social media</li>
          </ul>

          <h2>3. How We Collect Your Data</h2>
          <ul>
            <li><strong>Directly from you:</strong> when you fill in a booking or enquiry form, email us, call us, or message us on social media</li>
            <li><strong>Automatically:</strong> when you browse our website, via cookies and similar technologies (see our <a href="/cookies">Cookie Policy</a>)</li>
            <li><strong>From third parties:</strong> payment confirmation from Stripe; analytics data from Vercel</li>
          </ul>

          <h2>4. Why We Use Your Data (Legal Basis)</h2>
          <table>
            <thead>
              <tr>
                <th>Purpose</th>
                <th>Legal basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Process your booking and take payment</td>
                <td>Performance of a contract</td>
              </tr>
              <tr>
                <td>Send booking confirmations and event updates</td>
                <td>Performance of a contract</td>
              </tr>
              <tr>
                <td>Respond to your enquiries</td>
                <td>Legitimate interest</td>
              </tr>
              <tr>
                <td>Send marketing emails about future events</td>
                <td>Consent (you can opt out at any time)</td>
              </tr>
              <tr>
                <td>Improve our website and services</td>
                <td>Legitimate interest</td>
              </tr>
              <tr>
                <td>Comply with legal or regulatory obligations</td>
                <td>Legal obligation</td>
              </tr>
            </tbody>
          </table>

          <h2>5. Who We Share Your Data With</h2>
          <p>We may share your personal data with:</p>
          <ul>
            <li><strong>Stripe:</strong> to process payments securely</li>
            <li><strong>Supabase:</strong> our database provider, which stores booking records</li>
            <li><strong>Vercel:</strong> our website hosting provider</li>
            <li><strong>Email service providers:</strong> to send booking confirmations and, where you have consented, marketing communications</li>
            <li><strong>Event venues and partners:</strong> where necessary to fulfil your booking (e.g. dietary requirements shared with catering)</li>
            <li><strong>Legal or regulatory authorities:</strong> where required by law</li>
          </ul>
          <p>
            We do not sell your personal data to any third party. We do not share your data with
            any third party for their own marketing purposes.
          </p>

          <h2>6. International Transfers</h2>
          <p>
            Some of our service providers (Stripe, Supabase, Vercel) may process data outside the UK.
            Where this occurs, we ensure appropriate safeguards are in place, including Standard
            Contractual Clauses approved by the ICO, or reliance on adequacy decisions.
          </p>

          <h2>7. How Long We Keep Your Data</h2>
          <ul>
            <li><strong>Booking records:</strong> 6 years from the date of the event (in line with HMRC requirements)</li>
            <li><strong>Enquiry data:</strong> 2 years from last contact</li>
            <li><strong>Marketing consent records:</strong> until you withdraw consent</li>
            <li><strong>Website analytics:</strong> 26 months (aggregated and anonymised)</li>
          </ul>

          <h2>8. Your Rights</h2>
          <p>Under UK GDPR, you have the right to:</p>
          <ul>
            <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
            <li><strong>Rectification</strong> — ask us to correct inaccurate or incomplete data</li>
            <li><strong>Erasure</strong> — ask us to delete your data (where we have no ongoing legal reason to retain it)</li>
            <li><strong>Restrict processing</strong> — ask us to limit how we use your data</li>
            <li><strong>Data portability</strong> — request your data in a structured, machine-readable format</li>
            <li><strong>Object</strong> — object to processing based on legitimate interests or for direct marketing</li>
            <li><strong>Withdraw consent</strong> — where processing is based on consent, withdraw it at any time</li>
          </ul>
          <p>
            To exercise any of these rights, email us at{' '}
            <a href="mailto:info@legends-series.com">info@legends-series.com</a>. We will respond
            within one month.
          </p>

          <h2>9. Data Security</h2>
          <p>
            We take appropriate technical and organisational measures to protect your personal data,
            including:
          </p>
          <ul>
            <li>All data transmitted via our website is encrypted using TLS/SSL</li>
            <li>Payment processing is handled entirely by Stripe, a PCI DSS Level 1 certified provider — the highest level of payment security certification</li>
            <li>Database access is protected by row-level security policies and restricted API keys</li>
            <li>We use two-factor authentication on all administrative accounts</li>
          </ul>

          <h2>10. Cookies</h2>
          <p>
            Our website uses cookies and similar technologies. For full details, see our{' '}
            <a href="/cookies">Cookie Policy</a>.
          </p>

          <h2>11. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites (e.g. Instagram, TikTok, Facebook).
            We are not responsible for the privacy practices of those sites. We encourage you to read
            their privacy policies before providing any personal data.
          </p>

          <h2>12. Children</h2>
          <p>
            Our services are not directed at individuals under the age of 18. We do not knowingly
            collect personal data from children. If you believe we have collected data from a minor,
            please contact us immediately.
          </p>

          <h2>13. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this
            page with an updated &quot;Last updated&quot; date. We encourage you to review this page
            periodically.
          </p>

          <h2>14. Complaints</h2>
          <p>
            If you are unhappy with how we handle your data, you have the right to lodge a complaint
            with the Information Commissioner&apos;s Office (ICO):
          </p>
          <ul>
            <li>Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a></li>
            <li>Telephone: 0303 123 1113</li>
          </ul>

          <h2>15. Contact Us</h2>
          <p>
            For any questions about this Privacy Policy or your personal data, contact us at:
          </p>
          <ul>
            <li>Email: <a href="mailto:info@legends-series.com">info@legends-series.com</a></li>
            <li>Phone: +44 (0) 7595 217647</li>
          </ul>
        </div>
      </section>
    </>
  )
}
