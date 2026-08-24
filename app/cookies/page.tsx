import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How Legends Series uses cookies and similar technologies on our website.',
}

export default function CookiePolicyPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 bg-ink">
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-3">Legal</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Cookie Policy
          </h1>
          <div className="gold-rule mt-6" />
          <p className="text-white/65 text-sm mt-4">Last updated: 26 July 2026</p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-parchment">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 prose prose-ink prose-lg max-w-none">

          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your device when you visit a website. They are
            widely used to make websites work efficiently and to provide information to the site
            owners. Some cookies are essential for the site to function; others help us understand
            how visitors use the site so we can improve it.
          </p>

          <h2>How We Use Cookies</h2>
          <p>Our website uses the following categories of cookies:</p>

          <h3>Strictly Necessary Cookies</h3>
          <p>
            These are required for the website to function and cannot be switched off. They are
            usually set in response to actions you take, such as setting your privacy preferences,
            logging in, or filling in forms.
          </p>
          <table>
            <thead>
              <tr>
                <th>Cookie</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>__next</td>
                <td>Next.js framework — page routing and performance</td>
                <td>Session</td>
              </tr>
            </tbody>
          </table>

          <h3>Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting
            and reporting information anonymously.
          </p>
          <table>
            <thead>
              <tr>
                <th>Cookie</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vercel Analytics</td>
                <td>Anonymous page view and performance metrics</td>
                <td>Session</td>
              </tr>
            </tbody>
          </table>

          <h3>Third-Party Cookies</h3>
          <p>
            Some third-party services embedded on our site may set their own cookies. We do not
            control these cookies.
          </p>
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Purpose</th>
                <th>More information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Elfsight (Google Reviews widget)</td>
                <td>Displays Google Reviews on our website</td>
                <td><a href="https://elfsight.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Elfsight Privacy Policy</a></td>
              </tr>
              <tr>
                <td>Stripe</td>
                <td>Fraud prevention during payment processing</td>
                <td><a href="https://stripe.com/gb/privacy" target="_blank" rel="noopener noreferrer">Stripe Privacy Policy</a></td>
              </tr>
            </tbody>
          </table>

          <h2>Managing Cookies</h2>
          <p>
            You can control and manage cookies through your browser settings. Most browsers allow
            you to:
          </p>
          <ul>
            <li>View what cookies are stored and delete them individually</li>
            <li>Block third-party cookies</li>
            <li>Block cookies from specific sites</li>
            <li>Block all cookies</li>
            <li>Delete all cookies when you close your browser</li>
          </ul>
          <p>
            Please note that blocking or deleting cookies may affect the functionality of our
            website.
          </p>
          <p>
            For more information on managing cookies in your browser:
          </p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
          </ul>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in technology or
            legislation. Any updates will be posted on this page with a revised date.
          </p>

          <h2>More Information</h2>
          <p>
            For more details on how we handle your personal data, see our{' '}
            <a href="/privacy">Privacy Policy</a>.
          </p>
          <p>
            If you have any questions about our use of cookies, contact us at{' '}
            <a href="mailto:info@legends-series.com">info@legends-series.com</a>.
          </p>
        </div>
      </section>
    </>
  )
}
