'use client'

import React, { useState } from 'react'
import { Plus, Minus, Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { Product } from '../../../types'
import { urlFor } from '../../../lib/sanity.client'
import { useCart } from '../../../context/CartContext'
import { useWishlist } from '../../../context/WishlistContext'

interface ProductDetailClientProps {
  product: Product
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const { name, price, discountPrice, images, category, inStock, shortDescription, description, tags } = product
  const hasDiscount = discountPrice !== undefined && discountPrice !== null && discountPrice < price
  const isWishlisted = isInWishlist(product._id)

  const activeImageUrl = images?.[activeImageIndex]
    ? urlFor(images[activeImageIndex]).width(600).height(600).url()
    : '/placeholder-product.jpg'

  const handleAddToCart = () => {
    if (inStock) {
      addToCart(product, quantity)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-6 sm:p-10 rounded-2xl border border-stone-100 shadow-xs">
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-stone-50 border border-stone-100">
            <img
              src={activeImageUrl}
              alt={name}
              className="h-full w-full object-cover object-center transition-all duration-300"
            />
            {hasDiscount && inStock && (
              <span className="absolute left-4 top-4 rounded-md bg-primary px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-white shadow-xs">
                Sale
              </span>
            )}
            {!inStock && (
              <span className="absolute left-4 top-4 rounded-md bg-stone-700 px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-white shadow-xs">
                Sold Out
              </span>
            )}
          </div>

          {/* Thumbnails Row */}
          {images && images.length > 1 && (
            <div className="flex flex-wrap gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-16 w-16 overflow-hidden rounded-lg bg-stone-50 border transition-all ${
                    idx === activeImageIndex
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-stone-205 hover:border-stone-400'
                  }`}
                >
                  <img
                    src={urlFor(img).width(100).height(100).url()}
                    alt={`${name} thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Specs & Actions */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category & Tags */}
            <div className="flex items-center gap-2">
              {category && (
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  {category.title}
                </span>
              )}
              {tags?.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[9px] font-bold tracking-wider uppercase text-accent"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl font-semibold text-stone-900 tracking-wide">
              {name}
            </h1>

            {/* Price Box */}
            <div className="flex items-center gap-3">
              {hasDiscount ? (
                <>
                  <span className="text-2xl font-bold text-primary">
                    ${discountPrice?.toFixed(2)}
                  </span>
                  <span className="text-sm text-stone-400 line-through">
                    ${price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-stone-900">
                  ${price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Short Description */}
            {shortDescription && (
              <p className="text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-4">
                {shortDescription}
              </p>
            )}
          </div>

          {/* Action Row: ATC / Quantity / Wishlist */}
          <div className="space-y-4 border-t border-stone-100 pt-6">
            {inStock ? (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Quantity Adjustment */}
                <div className="flex items-center justify-between rounded-lg border border-stone-200 bg-stone-50 py-2.5 px-4 shrink-0 sm:w-32">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-semibold text-stone-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md active:scale-98 transition-all"
                >
                  <ShoppingBag className="h-4.5 w-4.5" />
                  Add to Cart
                </button>

                {/* Wishlist Toggle Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`rounded-lg p-3.5 border border-stone-200 transition-all flex items-center justify-center hover:bg-stone-50 shrink-0 ${
                    isWishlisted ? 'text-primary border-primary/30 bg-primary/5' : 'text-stone-500'
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <div className="flex-1 rounded-lg bg-stone-100 py-3.5 text-center text-sm font-bold uppercase tracking-wider text-stone-500 border border-stone-200">
                  Sold Out / Out of Stock
                </div>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`rounded-lg p-3.5 border border-stone-200 transition-all flex items-center justify-center hover:bg-stone-50 shrink-0 ${
                    isWishlisted ? 'text-primary border-primary/30 bg-primary/5' : 'text-stone-500'
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            )}
          </div>

          {/* Delivery Policy Accents */}
          <div className="border-t border-stone-100 pt-6 space-y-3">
            <div className="flex items-center gap-3 text-xs text-stone-600">
              <Truck className="h-4.5 w-4.5 text-primary" />
              <span>Free delivery in Lebanon for orders above $50.00</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-stone-600">
              <RotateCcw className="h-4.5 w-4.5 text-primary" />
              <span>Easy exchanges within 7 days of delivery</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-stone-600">
              <ShieldCheck className="h-4.5 w-4.5 text-primary" />
              <span>100% genuine formulation guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Description & Portable Text */}
      {description && description.length > 0 && (
        <div className="mt-12 bg-white p-8 sm:p-10 rounded-2xl border border-stone-100 shadow-xs space-y-6">
          <h2 className="font-serif text-2xl font-semibold text-stone-900 border-b border-stone-100 pb-4">
            Product Description
          </h2>
          <article className="prose max-w-none text-stone-650 text-sm leading-relaxed space-y-4">
            <PortableText
              value={description}
              components={{
                block: {
                  normal: ({ children }) => <p className="mb-4">{children}</p>,
                  h2: ({ children }) => <h3 className="font-serif text-lg font-semibold text-stone-900 mt-6 mb-2">{children}</h3>,
                  h3: ({ children }) => <h4 className="font-serif text-base font-semibold text-stone-900 mt-4 mb-2">{children}</h4>,
                },
                list: {
                  bullet: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>,
                  number: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>,
                },
              }}
            />
          </article>
        </div>
      )}
    </div>
  )
}
