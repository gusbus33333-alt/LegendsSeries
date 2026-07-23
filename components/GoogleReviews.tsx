'use client'

import { useEffect } from 'react'

export default function GoogleReviews() {
  useEffect(() => {
    if (document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) return
    const script = document.createElement('script')
    script.src = 'https://static.elfsight.com/platform/platform.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div
      className="elfsight-app-92122df4-780e-4200-ba70-55e4cd82dfb2"
    />
  )
}
