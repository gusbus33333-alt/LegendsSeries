import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photos from Legends Series events — the Legends Lounge at Twickenham, British & Irish Legends 2025 Australia Tour, and golf days.',
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
