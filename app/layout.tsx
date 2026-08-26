import type { Metadata } from 'next'
import { Poppins, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { CartProvider } from '@/components/CartProvider'
import { organizationSchema, SITE_URL } from '@/lib/structured-data'
import { Analytics } from '@vercel/analytics/next'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  // Without this, Open Graph and canonical URLs resolve relative and break
  // when a link is shared or crawled.
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  title: {
    default: 'Legends Series — Play & Party Alongside Your Heroes',
    template: '%s | Legends Series',
  },
  description:
    "Premium sports hospitality at the world's greatest events. Play golf and party alongside rugby's all-time legends. From £165 per person.",
  keywords: [
    'sports hospitality',
    'rugby legends',
    'premium events',
    'Twickenham hospitality',
    'Nations Championship',
    'rugby travel',
    'sporting experiences',
  ],
  openGraph: {
    title: 'Legends Series — Play & Party Alongside Your Heroes',
    description:
      "Premium sports hospitality at the world's greatest events. From £165 per person.",
    siteName: 'Legends Series',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`bg-parchment text-ink font-poppins antialiased ${cormorant.variable}`}>
        {/* Site-wide identity for search engines and assistants. Only facts
            that are verifiable elsewhere on the site. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <CartProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </CartProvider>
        {/* Scroll depth and page data, so layout decisions can be measured
            rather than argued. Cookieless — no consent banner needed. */}
        <Analytics />
      </body>
    </html>
  )
}
