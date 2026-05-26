'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/events', label: 'Events' },
  { href: '/legends', label: 'Legends' },
  { href: '/legends-lounge', label: 'The Lounge' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ink shadow-2xl' : 'bg-ink/90 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Legends Series"
              width={120}
              height={52}
              className="h-10 w-auto object-contain"
              style={{ filter: 'invert(1)' }}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-gold'
                    : 'text-white/70 hover:text-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block flex-shrink-0">
            <Link
              href="/contact"
              className="px-6 py-2.5 border border-gold text-gold hover:bg-gold hover:text-ink text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 -mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 origin-center ${
                isOpen ? 'rotate-45 translate-y-[3.5px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                isOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 origin-center ${
                isOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden bg-ink border-t border-white/10 overflow-hidden"
          >
            <nav className="px-6 pt-6 pb-8 flex flex-col gap-1">
              <Link
                href="/"
                className={`py-3 text-xs tracking-[0.25em] uppercase font-medium border-b border-white/5 transition-colors ${
                  pathname === '/' ? 'text-gold' : 'text-white/70 hover:text-gold'
                }`}
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-3 text-xs tracking-[0.25em] uppercase font-medium border-b border-white/5 transition-colors ${
                    pathname === link.href
                      ? 'text-gold'
                      : 'text-white/70 hover:text-gold'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-5 py-3.5 border border-gold text-gold text-center text-xs tracking-[0.25em] uppercase font-semibold hover:bg-gold hover:text-ink transition-all duration-300"
              >
                Book Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
