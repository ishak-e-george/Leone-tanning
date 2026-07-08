'use client'

import React from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { Product } from '../types'
import { urlFor } from '../lib/sanity.client'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const { name, slug, price, discountPrice, images, category, inStock, tags } = product
  const hasDiscount = discountPrice !== undefined && discountPrice !== null && discountPrice < price
  const isWishlisted = isInWishlist(product._id)
  const mainImage = images?.[0] ? urlFor(images[0]).width(400).height(400).url() : '/placeholder-product.jpg'
  const hoverImage = images?.[1] ? urlFor(images[1]).width(400).height(400).url() : null

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inStock) {
      addToCart(product, 1)
    }
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleWishlist(product)
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-stone-100 hover:shadow-md transition-all duration-300">
      {/* Product Image & Overlays */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-50">
        <Link href={`/product/${slug}`} className="block h-full w-full">
          <img
            src={mainImage}
            alt={name}
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {hoverImage && (
            <img
              src={hoverImage}
              alt={`${name} alt view`}
              className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
            />
          )}
        </Link>

        {/* Badges (Top Left) */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          {!inStock && (
            <span className="rounded-md bg-stone-700/95 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-white shadow-xs">
              Sold Out
            </span>
          )}
          {hasDiscount && inStock && (
            <span className="rounded-md bg-primary px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-white shadow-xs">
              Sale
            </span>
          )}
          {tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-accent px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-white shadow-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions Menu (Top Right / Hover) */}
        <div className="absolute right-3 top-3 flex flex-col gap-1.5 z-10 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`rounded-full p-2 bg-white/90 shadow-md hover:bg-white transition-colors border border-stone-100 hover:scale-105 active:scale-95 duration-200 ${
              isWishlisted ? 'text-primary' : 'text-stone-500'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart className={`h-4.5 w-4.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick Add to Cart (Bottom / Slide-up) */}
        {inStock && (
          <div className="absolute bottom-3 inset-x-3 sm:translate-y-12 sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-stone-900/90 hover:bg-stone-900 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md backdrop-blur-xs transition-colors"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Add to Cart
            </button>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="flex flex-1 flex-col p-4 bg-white">
        {category && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            {category.title}
          </span>
        )}
        <h3 className="mt-1 font-serif text-stone-900 font-medium text-sm group-hover:text-primary transition-colors leading-tight line-clamp-1">
          <Link href={`/product/${slug}`}>{name}</Link>
        </h3>
        
        {/* Pricing Info */}
        <div className="mt-2 flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-sm font-semibold text-primary">
                ${discountPrice?.toFixed(2)}
              </span>
              <span className="text-xs text-stone-400 line-through">
                ${price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold text-stone-900">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
