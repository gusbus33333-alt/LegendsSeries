'use client'

import Image from 'next/image'

const codes = ['eng','aus','jpn','nzl','rsa','arg','fij','fra','ire','ita','sco','wal']

export default function BadgeStrip() {
  // Duplicate for seamless loop
  const items = [...codes, ...codes]

  return (
    <div className="py-8 overflow-hidden bg-black">
      <div
        className="flex gap-6"
        style={{
          width: 'max-content',
          animation: 'marquee 46s linear infinite',
        }}
      >
        {items.map((code, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 opacity-90 hover:opacity-100 transition-opacity duration-300"
            style={{ width: 66, height: 88 }}
          >
            <Image
              src={`/team-icons/${code}.png`}
              alt={code.toUpperCase()}
              fill
              className="object-contain"
              sizes="66px"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
