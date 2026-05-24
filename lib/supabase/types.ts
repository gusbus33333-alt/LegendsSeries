// Database row types — mirrors the Supabase schema exactly
export interface DbEvent {
  id: string
  created_at: string
  slug: string
  title: string
  subtitle: string | null
  location: string
  country: string
  flag: string | null
  date: string | null
  date_range: string | null
  price: number
  price_display: string
  capacity: number | null
  spots_left: number | null
  featured: boolean
  image: string | null
  category: string | null
  description: string | null
  highlights: string[] | null
  legends: string[] | null
  included: string[] | null
}

export interface DbReview {
  id: string
  created_at: string
  author: string
  location: string | null
  event: string | null
  rating: number
  quote: string
  date: string | null
  published: boolean
}

export interface DbBooking {
  id: string
  created_at: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  event_slug: string | null
  guests: number
  requirements: string | null
  status: string
  total_price: number | null
  deposit_amount: number | null
}

// Insert types (omit server-generated fields)
export type BookingInsert = Omit<DbBooking, 'id' | 'created_at' | 'status'>
