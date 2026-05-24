import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
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
      <body className="bg-parchment text-ink font-poppins antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
