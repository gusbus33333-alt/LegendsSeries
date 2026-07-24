'use client'

import { useEffect, useRef, useState } from 'react'

export default function GoogleReviews() {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loaded) {
          setLoaded(true)
          if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
            const script = document.createElement('script')
            script.src = 'https://static.elfsight.com/platform/platform.js'
            script.async = true
            document.body.appendChild(script)
          }
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [loaded])

  return (
    <div ref={ref}>
      {loaded && (
        <div className="elfsight-app-92122df4-780e-4200-ba70-55e4cd82dfb2" />
      )}
    </div>
  )
}
