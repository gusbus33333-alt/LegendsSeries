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

            {/* Social links */}
            <div className="flex items-center gap-5">
              <a
                href="https://www.instagram.com/legends.series"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href="https://www.tiktok.com/@legendsseries_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-gold transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.17v-3.44a4.85 4.85 0 01-3.77-1.47V6.69h3.77z"/></svg>
              </a>
              <a
                href="https://www.facebook.com/BritishAndIrishLegends"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
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
