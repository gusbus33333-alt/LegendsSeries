export interface Event {
  id: string
  slug: string
  title: string
  subtitle: string
  location: string
  country: string
  flag: string
  date: string
  dateRange: string
  price: number
  priceDisplay: string
  capacity: number
  spotsLeft: number
  featured: boolean
  image: string
  category: 'rugby' | 'golf' | 'adventure' | 'luxury-travel'
  description: string
  highlights: string[]
  legends: string[]
  included: string[]
}

export interface Legend {
  id: string
  slug: string
  name: string
  position?: string
  caps?: number
  country: string
  flag: string
  clubs: string
  homeLocation?: string
  achievements?: string[]
  bio?: string
  image?: string
}

export interface Review {
  id: string
  author: string
  location: string
  event: string
  rating: number
  quote: string
  date: string
  avatar?: string
}

export interface NavLink {
  href: string
  label: string
}
