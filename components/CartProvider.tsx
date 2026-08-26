'use client'

import {
  createContext, useContext, useEffect, useState, useCallback, type ReactNode,
} from 'react'
import { type CartItem, type PromoDiscount, itemKey } from '@/lib/cart'

const STORAGE_KEY = 'legends-basket-v1'
const PROMO_KEY = 'legends-basket-promo-v1'

interface CartContextValue {
  items: CartItem[]
  /** Held here rather than in the basket page: adding another matchday
   *  unmounts that page, which used to discard an applied code. */
  promo: PromoDiscount | null
  setPromo: (promo: PromoDiscount | null) => void
  /** False until localStorage has been read, so nothing renders a wrong count. */
  hydrated: boolean
  addItem: (item: CartItem) => void
  updateItem: (key: string, patch: Partial<CartItem>) => void
  removeItem: (key: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [promo, setPromoState] = useState<PromoDiscount | null>(null)
  const [hydrated, setHydrated] = useState(false)

  // Read on mount rather than in useState: the server render has no
  // localStorage, and seeding state from it would mismatch on hydration.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setItems(parsed)
      }
      const rawPromo = localStorage.getItem(PROMO_KEY)
      if (rawPromo) {
        const parsed = JSON.parse(rawPromo)
        if (parsed && typeof parsed.code === 'string') setPromoState(parsed)
      }
    } catch {
      // A corrupt basket shouldn't break the site — start empty.
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Private browsing can refuse writes; the basket still works in-session.
    }
  }, [items, hydrated])

  const setPromo = useCallback((next: PromoDiscount | null) => {
    setPromoState(next)
    try {
      if (next) localStorage.setItem(PROMO_KEY, JSON.stringify(next))
      else localStorage.removeItem(PROMO_KEY)
    } catch {
      // Private browsing can refuse writes; the code still applies in-session.
    }
  }, [])

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const key = itemKey(item)
      const existing = prev.find((i) => itemKey(i) === key)
      if (!existing) return [...prev, item]
      // Adding the same matchday again tops up the existing line rather than
      // creating a second one the customer would have to reconcile.
      return prev.map((i) =>
        itemKey(i) === key
          ? {
              ...i,
              adults: i.adults + item.adults,
              under16: i.under16 + item.under16,
              carParking: i.carParking + item.carParking,
              busParking: i.busParking + item.busParking,
              signatureRooms: i.signatureRooms + item.signatureRooms,
            }
          : i
      )
    })
  }, [])

  const updateItem = useCallback((key: string, patch: Partial<CartItem>) => {
    setItems((prev) =>
      prev.map((i) => (itemKey(i) === key ? { ...i, ...patch } : i))
    )
  }, [])

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => itemKey(i) !== key))
  }, [])

  const clear = useCallback(() => {
    setItems([])
    setPromoState(null)
    try {
      localStorage.removeItem(PROMO_KEY)
    } catch {
      /* nothing to clean up if storage is unavailable */
    }
  }, [])

  return (
    <CartContext.Provider
      value={{ items, promo, setPromo, hydrated, addItem, updateItem, removeItem, clear }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside a CartProvider')
  return ctx
}
