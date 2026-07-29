'use client'

import { useState } from 'react'
import Image from 'next/image'

type Category = 'all' | 'lounge' | 'bils'

const categories: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'lounge', label: 'Legends Lounge' },
  { key: 'bils', label: 'British & Irish Legends 2025' },
]

const loungeFiles = [
  '004','020','023','025','027','032','033','034','037','042','046','047','055','056','058',
  '061','062','063','072','078','081','084','085','095','098','103','106','123','124','126',
  '129','134','137','139','141','144','146','148','150','151','158','160','164','173','192',
  '195','196','198','203','209','210','211','215','217','219','222','223','226','227','236',
  '237','238','246','247','249','251','255','256','257','258','262','267','272','279','280',
  '281','284','288','289','290','291','292','295','296','297','299','305','310','311','315',
  '316','317','318','319','323','333','336','345','347','348','351','355','363','371','375',
  '380','387','388','392','394','400','402','406','408','410','414','416','417','427','430',
  '432','439','445','461','465','467','472','480',
]

const bilsPngIndices = new Set([42,44,47,48,49,50,51,52,53,54,57,58,59,60,61,62,63,64,65,66,67,70])

const allPhotos = [
  ...loungeFiles.map((n, i) => ({
    src: `/gallery/lounge/LLL-${n}.jpg`,
    cat: 'lounge' as Category,
    alt: `Legends Lounge photo ${i + 1}`,
  })),
  ...Array.from({ length: 88 }, (_, i) => ({
    src: `/gallery/bils/bils-${String(i + 1).padStart(3, '0')}.${bilsPngIndices.has(i + 1) ? 'png' : 'jpg'}`,
    cat: 'bils' as Category,
    alt: `British & Irish Legends tour photo ${i + 1}`,
  })),
]

export default function GalleryPage() {
  const [active, setActive] = useState<Category>('all')
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [visible, setVisible] = useState(24)

  const filtered = active === 'all' ? allPhotos : allPhotos.filter((p) => p.cat === active)
  const shown = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/gallery/lounge/LLL-027.jpg"
            alt="Gallery hero"
            fill
            className="object-cover opacity-15"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 to-ink" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-3">Memories from our events</p>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            Gallery
          </h1>
          <div className="gold-rule mt-6" />
          <p className="text-white/50 text-base mt-5 max-w-lg leading-relaxed">
            Photos from the Legends Lounge and British &amp; Irish Legends tour.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-16 lg:py-20 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Filter chips */}
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => { setActive(cat.key); setVisible(24) }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  active === cat.key
                    ? 'bg-gold text-ink shadow-md'
                    : 'bg-ink/10 text-ink/70 hover:bg-ink/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-ink/50 text-center py-20 text-lg">
              Photos coming soon.
            </p>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {shown.map((photo, i) => (
                <button
                  key={photo.src}
                  onClick={() => setLightbox(i)}
                  className="block w-full break-inside-avoid overflow-hidden rounded-lg group cursor-pointer"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisible((v) => v + 24)}
                className="px-8 py-3 bg-ink text-white rounded-full font-semibold hover:bg-ink/80 transition-colors"
              >
                Load more photos
              </button>
              <p className="text-ink/40 text-sm mt-3">
                Showing {shown.length} of {filtered.length}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white text-4xl leading-none"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            &times;
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl px-2"
            onClick={(e) => {
              e.stopPropagation()
              setLightbox(lightbox > 0 ? lightbox - 1 : shown.length - 1)
            }}
            aria-label="Previous"
          >
            &#8249;
          </button>
          <Image
            src={shown[lightbox].src}
            alt={shown[lightbox].alt}
            width={1200}
            height={800}
            className="max-h-[85vh] w-auto object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
            sizes="90vw"
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl px-2"
            onClick={(e) => {
              e.stopPropagation()
              setLightbox(lightbox < shown.length - 1 ? lightbox + 1 : 0)
            }}
            aria-label="Next"
          >
            &#8250;
          </button>
          <p className="absolute bottom-6 text-white/40 text-sm">
            {lightbox + 1} / {shown.length}
          </p>
        </div>
      )}
    </>
  )
}
