'use client'

import React from 'react'
import Link from 'next/link'
import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { useWishlist } from '../../../context/WishlistContext'
import { useCart } from '../../../context/CartContext'
import { urlFor } from '../../../lib/sanity.client'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 w-full space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Your Favorites</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-stone-900 tracking-wide">
          My Wishlist
        </h1>
        <div className="h-0.5 w-16 bg-primary mx-auto mt-3" />
      </div>

      {/* Main Wishlist Box */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-100 shadow-xs">
        {wishlist.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="rounded-full bg-stone-105 p-6 text-stone-400 inline-block">
              <Heart className="h-12 w-12" />
            </div>
            <h3 className="font-serif text-lg font-medium text-stone-900">Your wishlist is empty</h3>
            <p className="text-sm text-stone-500 max-w-[280px] mx-auto leading-relaxed">
              Explore our collections and tap the heart icon on any product to save it here.
            </p>
            <Link
              href="/shop"
              className="inline-block rounded-full bg-primary px-8 py-3 text-xs font-semibold text-white uppercase tracking-wider hover:bg-primary/90 transition-all"
            >
              Shop Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {wishlist.map((product) => {
              const mainImage = product.images?.[0]
                ? urlFor(product.images[0]).width(300).height(300).url()
                : '/placeholder-product.jpg'

              return (
                <div
                  key={product._id}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-stone-100 bg-white hover:shadow-md transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-square w-full overflow-hidden bg-stone-50">
                    <Link href={`/product/${product.slug}`} className="block h-full w-full">
                      <img
                        src={mainImage}
                        alt={product.name}
                        className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-103"
                      />
                    </Link>

                    {/* Delete overlay button */}
                    <button
                      onClick={() => removeFromWishlist(product._id)}
                      className="absolute right-3 top-3 rounded-full p-2 bg-white/90 shadow-md text-stone-400 hover:text-red-500 border border-stone-100 hover:scale-105 active:scale-95 duration-200 z-10"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col p-4 space-y-3 justify-between bg-white">
                    <div className="space-y-1">
                      {product.category && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                          {product.category.title}
                        </span>
                      )}
                      <h3 className="font-serif text-stone-900 font-medium text-sm leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                        <Link href={`/product/${product.slug}`}>{product.name}</Link>
                      </h3>
                      <p className="text-sm font-semibold text-stone-900">
                        ${(product.discountPrice ?? product.price).toFixed(2)}
                      </p>
                    </div>

                    {/* Move to Cart */}
                    <button
                      onClick={() => {
                        if (product.inStock) {
                          addToCart(product, 1)
                          removeFromWishlist(product._id)
                        }
                      }}
                      disabled={!product.inStock}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-stone-900 hover:bg-stone-850 disabled:bg-stone-300 disabled:text-stone-500 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-colors"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      {product.inStock ? 'Move to Cart' : 'Sold Out'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
