'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Product } from '../types'

interface WishlistContextType {
  wishlist: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  toggleWishlist: (product: Product) => void
  isInWishlist: (productId: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('leone_wishlist')
      if (saved) {
        setWishlist(JSON.parse(saved))
      }
    } catch (e) {
      console.error('Failed to load wishlist', e)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('leone_wishlist', JSON.stringify(wishlist))
    }
  }, [wishlist, isLoaded])

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item._id === product._id)) return prev
      return [...prev, product]
    })
  }

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item._id !== productId))
  }

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item._id === product._id)
      if (exists) {
        return prev.filter((item) => item._id !== product._id)
      }
      return [...prev, product]
    })
  }

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item._id === productId)
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
