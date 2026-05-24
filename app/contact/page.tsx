import type { Metadata } from 'next'
import Image from 'next/image'
import BookingForm from '@/components/BookingForm'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Book Now — Contact',
  description:
    'Reserve your place at a Legends Series event. Get in touch with our team and secure your spot with a 25% deposit.',
}

const contactDetails = [
  {
    label: 'Email',
    value: 'hello@legendsseries.com',
    href: 'mailto:hello@legendsseries.com',
  },
  {
    label: 'Phone',
    value: '+44 (0)1234 567 890',
    href: 'tel:+441234567890',
  },
  {
    label: 'Hours',
    value: 'Monday–Friday, 9am–6pm GMT',
    href: undefined,
  },
]

export default function ContactPage() {
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
            Reserve your place with a 25% deposit. Our team will be in touch within
            24 hours to confirm availability and next steps.
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
                          <a
                            href={detail.href}
                            className="text-ink text-sm font-medium hover:text-gold transition-colors"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <p className="text-ink text-sm">{detail.value}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Promise */}
                  <div className="border border-gold/30 p-6 flex flex-col gap-3">
                    <p className="text-gold text-xs tracking-[0.2em] uppercase font-semibold">
                      Our Promise
                    </p>
                    <p className="text-ink/60 text-sm leading-relaxed">
                      Every enquiry is answered within 24 hours. No hard sell.
                      No pressure. If the event isn&apos;t right for you, we&apos;ll
                      say so.
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
                    Secure your spot with a 25% deposit via Stripe
                  </p>
                  <BookingForm />
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
            {[
              {
                q: 'How do deposits work?',
                a: 'A 25% deposit secures your place immediately. The balance is due 60 days before the event.',
              },
              {
                q: 'What if I need to cancel?',
                a: 'Deposits are refundable up to 90 days before the event. Full T&Cs are available on request.',
              },
              {
                q: 'Can I gift an experience?',
                a: 'Absolutely. Gift bookings and experience vouchers are available — contact us to arrange.',
              },
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
