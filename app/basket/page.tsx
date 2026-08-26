import type { Metadata } from 'next'
import BasketView from '@/components/BasketView'

export const metadata: Metadata = {
  title: 'Your Basket',
  description: 'Review your Legends Lounge matchdays and check out.',
  // A personal basket has nothing to offer search engines.
  robots: { index: false, follow: false },
}

export default function BasketPage() {
  return (
    <section className="min-h-screen bg-[#0a0a0b] pt-32 pb-24 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="text-[11px] font-bold tracking-[0.5em] uppercase text-gold mb-3">
            Your Basket
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold uppercase tracking-[0.06em] text-white">
            Book more than one matchday
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mt-5" />
        </div>

        <BasketView />
      </div>
    </section>
  )
}
