import type { Metadata } from 'next'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import BookingForm from '@/components/BookingForm'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Book Now — Contact',
  description:
    'Reserve your place at a Legends Series event. Get in touch with our team and secure your spot with a 25% deposit.',
}

export const revalidate = 60

const contactDetails = [
  { label: 'General Enquiries', value: 'info@legends-series.com', href: 'mailto:info@legends-series.com' },
  { label: 'Phone / WhatsApp', value: '+44 (0) 7595 217647', href: 'tel:+447595217647' },
  { label: 'Sponsorship', value: 'finance@legends-series.com', href: 'mailto:finance@legends-series.com' },
  { label: 'Address', value: 'Legends House, Queen Street, St Albans, AL3 4PJ', href: undefined },
]

export default async function ContactPage() {
  const supabase = createClient()
  const { data } = await supabase
    .from('events')
    .select('slug, title, price, price_display')
    .order('price', { ascending: true })

  const eventOptions = (data ?? []).map((e) => ({
    slug: e.slug,
    title: e.title,
    price: e.price,
    priceDisplay: e.price_display,
  }))

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1600&q=80"
            alt="Booking enquiry"
            fill
            className="object-cover opacity-10"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-ink/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-3">Your place is waiting</p>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            Book Your Experience
          </h1>
          <div className="gold-rule mt-6" />
          <p className="text-white/50 text-base mt-5 max-w-lg leading-relaxed">
            Fill in the form and our team will be in touch within 24 hours to confirm
            availability and next steps. You can also WhatsApp us directly.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-20 lg:py-24 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Left — contact info */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="left">
                <div className="flex flex-col gap-10">
                  <div>
                    <p className="section-label mb-3">Get in touch</p>
                    <h2 className="text-3xl font-bold text-ink leading-tight">
                      Talk to the<br />Legends Series Team
                    </h2>
                    <div className="gold-rule mt-5 mb-6" />
                    <p className="text-ink/60 text-sm leading-relaxed">
                      Whether you&apos;re ready to book, have a question, or want help
                      choosing the right event — our team is here. No chatbots. No phone
                      trees. Real people who love rugby.
                    </p>
                  </div>

                  <div className="flex flex-col gap-6">
                    {contactDetails.map((detail) => (
                      <div key={detail.label} className="flex flex-col gap-1">
                        <p className="text-gold text-[0.65rem] tracking-[0.25em] uppercase font-semibold">
                          {detail.label}
                        </p>
                        {detail.href ? (
                          <a href={detail.href} className="text-ink text-sm font-medium hover:text-gold transition-colors">
                            {detail.value}
                          </a>
                        ) : (
                          <p className="text-ink text-sm">{detail.value}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="border border-gold/30 p-6 flex flex-col gap-3">
                    <p className="text-gold text-xs tracking-[0.2em] uppercase font-semibold">
                      Our Promise
                    </p>
                    <p className="text-ink/60 text-sm leading-relaxed">
                      Every enquiry is answered within 24 hours. No hard sell.
                      No pressure. If the event isn&apos;t right for you, we&apos;ll say so.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right — booking form */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="right" delay={0.1}>
                <div className="bg-white border border-ink/8 p-8 lg:p-10">
                  <h3 className="text-ink font-bold text-xl mb-1">Reserve Your Place</h3>
                  <p className="text-ink/40 text-xs tracking-wide mb-8">
                    Tell us which event interests you and we&apos;ll confirm availability &amp; next steps within 24 hours.
                  </p>
                  <BookingForm eventOptions={eventOptions} />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ strip */}
      <section className="py-16 bg-ink border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white">Common Questions</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            [
              { q: 'Does the Legends Lounge include a match ticket?', a: 'No — the Legends Lounge is a hospitality-only experience. Our marquee is open during the match and shows the game live on giant screens for those without a ticket.' },
              { q: 'What does "Living with Legends" include?', a: 'Full hosting by rugby legends throughout, with all accommodation, transfers, meals, activities and (where applicable) match tickets as described for each event.' },
              { q: 'How do I book?', a: 'Use the enquiry form and our team will contact you within 24 hours to confirm availability. You can also WhatsApp us on +44 (0) 7595 217647.' },
            ].map((faq, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div className="flex flex-col gap-3">
                  <h3 className="text-gold text-sm font-semibold">{faq.q}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
