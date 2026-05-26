import Link from 'next/link'
import Image from 'next/image'

const footerNav = [
  {
    heading: 'Experiences',
    links: [
      { label: 'All Events', href: '/events' },
      { label: 'Legends Lounge', href: '/legends-lounge' },
      { label: 'Rugby Events', href: '/events' },
      { label: 'Golf Events', href: '/events' },
      { label: 'Adventure Travel', href: '/events' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'The Legends', href: '/legends' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Policies',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Booking Policy', href: '/booking-policy' },
      { label: 'FAQs', href: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <div className="mb-4">
                <Image
                  src="/logo.png"
                  alt="Legends Series"
                  width={130}
                  height={56}
                  className="h-11 w-auto object-contain invert"
                />
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Premium sports hospitality at the world&apos;s greatest events. Play golf and party
                alongside rugby&apos;s all-time legends.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-gold text-xs tracking-[0.2em] uppercase font-semibold">
                Get in touch
              </p>
              <a
                href="mailto:info@legends-series.com"
                className="text-white/60 hover:text-gold text-sm transition-colors"
              >
                info@legends-series.com
              </a>
              <a
                href="tel:+447595217647"
                className="text-white/60 hover:text-gold text-sm transition-colors"
              >
                +44 (0) 7595 217647
              </a>
            </div>

            <div className="w-12 h-px bg-gold" />

            <p className="text-white/30 text-xs leading-relaxed max-w-xs">
              Legends Series is a premium sports hospitality company. Events subject to availability.
              All prices quoted per person.
            </p>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.heading} className="flex flex-col gap-5">
              <h4 className="text-gold text-xs tracking-[0.3em] uppercase font-semibold">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Gold rule */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-wide">
            &copy; {new Date().getFullYear()} Legends Series. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-white/20 text-xs tracking-[0.15em] uppercase">
              Play &amp; Party Alongside Your Heroes
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
