'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const stats = [
  { value: '6+', label: 'Countries' },
  { value: '£165', label: 'From' },
  { value: '300', label: 'Max Guests' },
  { value: '5★', label: 'Rating' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col" aria-label="Hero">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1920&q=80"
          alt="Cape Town Stadium with Table Mountain"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Layered gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/30 via-transparent to-transparent" />
      </div>

      {/* Gold grain texture overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 lg:px-10 pt-28 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-5xl"
        >
          {/* Eyebrow label */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-gold" />
            <span className="text-white text-xs tracking-[0.4em] uppercase font-semibold">
              Premium Sports Hospitality
            </span>
            <span className="w-8 h-px bg-gold" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="text-white font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight text-shadow-lg"
          >
            Play &amp; Party
            <br />
            <span className="text-gold italic">Alongside</span> Your
            <br />
            Heroes
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-white/80 text-base sm:text-lg lg:text-xl max-w-xl mt-8 leading-relaxed font-light"
          >
            Exclusive access to the world&apos;s greatest sporting events — alongside rugby&apos;s
            most iconic legends.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10"
          >
            <Link href="/legends-lounge" className="btn-gold min-w-[220px]">
              View Legends Lounge
            </Link>
            <Link href="/events" className="btn-outline-white min-w-[220px]">
              Legends Tours
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 mt-12 text-white/80 text-xs tracking-widest uppercase"
          >
            <span>Twickenham</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>Cape Town</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>Dubai</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>St. Moritz</span>
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}
