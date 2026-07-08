'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { SiteSettings } from '../types'
import { urlFor } from '../lib/sanity.client'
import SearchBar from './SearchBar'
import CartDrawer from './CartDrawer'

interface HeaderProps {
  settings: SiteSettings | null
}

export default function Header({ settings }: HeaderProps) {
  const { cartCount } = useCart()
  const { wishlist } = useWishlist()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const logoUrl = settings?.logo ? urlFor(settings.logo).height(40).url() : '/logo.png'
  const announcement = settings?.announcementBar || 'Welcome to LEONE Tanning & Cosmetics'

  return (
    <>
      <header className="w-full z-40 bg-[#FAF8F7] border-b border-stone-200">
        {/* Top Announcement Bar */}
        {announcement && (
          <div className="w-full bg-primary py-2 px-4 text-center text-xs font-semibold tracking-wider text-white">
            {announcement}
          </div>
        )}

        {/* Main Navigation Bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex-1 md:flex-initial">
              <Link href="/" className="inline-flex items-center gap-2 group">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="LEONE Logo"
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <span className="font-serif text-2xl font-bold tracking-widest text-primary group-hover:text-primary/80 transition-colors">
                    LEONE
                  </span>
                )}
              </Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center justify-center space-x-8 text-sm font-medium text-stone-600">
              <Link
                href="/"
                className="hover:text-primary tracking-wide transition-colors"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="hover:text-primary tracking-wide transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="hover:text-primary tracking-wide transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="hover:text-primary tracking-wide transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center justify-end space-x-2 sm:space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="rounded-full p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist Button */}
              <Link
                href="/wishlist"
                className="relative rounded-full p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                aria-label="View wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative rounded-full p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-full p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors md:hidden"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-stone-200 bg-white md:hidden animate-in slide-in-from-top-2 duration-150">
            <div className="space-y-1 px-4 py-3">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-stone-700 hover:bg-stone-50 hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-stone-700 hover:bg-stone-50 hover:text-primary"
              >
                Shop
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-stone-700 hover:bg-stone-50 hover:text-primary"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-stone-700 hover:bg-stone-50 hover:text-primary"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Overlays */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
