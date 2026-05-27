'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

const photos = [
  { src: '/lounge-photos/LLL-004.jpg',  alt: 'Legends Lounge — England vs Ireland, Six Nations 2026' },
  { src: '/lounge-photos/LLL-027.jpg',  alt: 'Legends Lounge — England vs Ireland, Six Nations 2026' },
  { src: '/lounge-photos/LLL-058.jpg',  alt: 'Legends Lounge — England vs Ireland, Six Nations 2026' },
  { src: '/lounge-photos/LLL-095.jpg',  alt: 'Legends Lounge — England vs Ireland, Six Nations 2026' },
  { src: '/lounge-photos/LLL-148.jpg',  alt: 'Legends Lounge — England vs Ireland, Six Nations 2026' },
  { src: '/lounge-photos/LLL-158.jpg',  alt: 'Legends Lounge — England vs Ireland, Six Nations 2026' },
  { src: '/lounge-photos/LLL-195.jpg',  alt: 'Legends Lounge — England vs Ireland, Six Nations 2026' },
  { src: '/lounge-photos/LLL-238.jpg',  alt: 'Legends Lounge — England vs Ireland, Six Nations 2026' },
  { src: '/lounge-photos/LLL-256.jpg',  alt: 'Legends Lounge — England vs Ireland, Six Nations 2026' },
  { src: '/lounge-photos/LLL-262.jpg',  alt: 'Legends Lounge — England vs Ireland, Six Nations 2026' },
  { src: '/lounge-photos/LLL-284.jpg',  alt: 'Legends Lounge — England vs Ireland, Six Nations 2026' },
  { src: '/lounge-photos/LLL-297.jpg',  alt: 'Legends Lounge — England vs Ireland, Six Nations 2026' },
  { src: '/lounge-photos/LLL-371.jpg',  alt: 'Legends Lounge — England vs Ireland, Six Nations 2026' },
  { src: '/lounge-photos/LLL-388.jpg',  alt: 'Legends Lounge — England vs Ireland, Six Nations 2026' },
  { src: '/lounge-photos/LLL-416.jpg',  alt: 'Legends Lounge — England vs Ireland, Six Nations 2026' },
]

export default function LoungeGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const close = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(() =>
    setLightboxIndex(i => (i === null ? null : (i - 1 + photos.length) % photos.length)), [])
  const next = useCallback(() =>
    setLightboxIndex(i => (i === null ? null : (i + 1) % photos.length)), [])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, next, prev, close])

  return (
    <>
      {/* ── Gallery grid ───────────────────────────────────────── */}
      <section className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="text-center mb-12">
            <p className="section-label mb-3">In the room</p>
            <h2 className="text-4xl font-bold text-white leading-tight">
              England vs Ireland<br />
              <span className="text-gold">Six Nations 2026</span>
            </h2>
            <div className="flex justify-center mt-5">
              <div className="gold-rule-lg" />
            </div>
            <p className="text-white/40 text-sm mt-4">
              Photography by{' '}
              <span className="text-white/60">Kim Watson</span>
            </p>
          </div>

          {/* Masonry grid */}
          <div
            className="columns-2 md:columns-3 lg:columns-4 gap-2"
            style={{ columnGap: '6px' }}
          >
            {photos.map((photo, i) => (
              <div
                key={photo.src}
                className="break-inside-avoid mb-1.5 overflow-hidden cursor-pointer group relative"
                style={{ marginBottom: '6px' }}
                onClick={() => setLightboxIndex(i)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300 flex items-end">
                  <div className="w-full px-3 pb-2.5 pt-8 bg-gradient-to-t from-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <p className="text-white text-[0.6rem] tracking-[0.2em] uppercase">
                      Click to enlarge
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ───────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center gap-4"
          onClick={close}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-5 w-9 h-9 rounded-full border border-white/20 text-white/60 hover:border-gold hover:text-gold flex items-center justify-center text-lg transition-colors"
            onClick={close}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Counter */}
          <p className="absolute top-5 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-[0.2em]">
            {lightboxIndex + 1} / {photos.length}
          </p>

          {/* Image */}
          <div
            className="relative max-w-[92vw] max-h-[85vh]"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].alt}
              width={1400}
              height={933}
              className="max-w-[92vw] max-h-[85vh] object-contain"
              priority
            />
          </div>

          {/* Prev / Next */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 pointer-events-none"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="pointer-events-auto w-11 h-11 rounded-full bg-black/60 border border-white/15 text-white text-xl flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              onClick={prev}
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              className="pointer-events-auto w-11 h-11 rounded-full bg-black/60 border border-white/15 text-white text-xl flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              onClick={next}
              aria-label="Next"
            >
              ›
            </button>
          </div>

          {/* Caption */}
          <p className="text-white/30 text-xs tracking-widest uppercase">
            England vs Ireland · Six Nations 2026 · Kim Watson Photography
          </p>
        </div>
      )}
    </>
  )
}
