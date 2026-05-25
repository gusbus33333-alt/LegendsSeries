import type { Metadata } from 'next'
import LegendsDirectory from './LegendsDirectory'

export const metadata: Metadata = {
  title: 'The Legends',
  description:
    'Meet the rugby legends at the heart of every Legends Series event. 90+ World Cup winners, Lions tourists, and icons of the game — alongside you for the whole experience.',
}

export default function LegendsPage() {
  return <LegendsDirectory />
}
