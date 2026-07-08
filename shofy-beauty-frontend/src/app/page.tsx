import React from 'react'
import Link from 'next/link'
import { Sparkles, Truck, ShieldCheck, HeartHandshake } from 'lucide-react'
import { client } from '../lib/sanity.client'
import { bannersQuery, categoriesQuery, featuredProductsQuery } from '../lib/queries'
import HeroBanner from '../components/HeroBanner'
import CategoryGrid from '../components/CategoryGrid'
import ProductCard from '../components/ProductCard'
import { Banner, Category, Product } from '../types'

export const revalidate = 60 // Enable ISR - page updates every 60s automatically

export default async function Home() {
  // Fetch banners, categories, and featured products with error fallbacks
  const banners: Banner[] = await client.fetch(bannersQuery).catch((err) => {
    console.error('Error fetching banners', err)
    return []
  })

  const categories: Category[] = await client.fetch(categoriesQuery).catch((err) => {
    console.error('Error fetching categories', err)
    return []
  })

  const products: Product[] = await client.fetch(featuredProductsQuery).catch((err) => {
    console.error('Error fetching featured products', err)
    return []
  })

  return (
    <div className="w-full pb-20">
      {/* Hero Sliders */}
      <HeroBanner banners={banners} />

      {/* Brand Value Pillars Section */}
      <section className="bg-stone-50 border-y border-stone-200/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <Truck className="h-6 w-6 text-primary" />
            <h3 className="font-serif text-sm font-semibold text-stone-900">Fast Local Shipping</h3>
            <p className="text-xs text-stone-500">Fast and secure delivery straight to your doorstep.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h3 className="font-serif text-sm font-semibold text-stone-900">Premium Quality</h3>
            <p className="text-xs text-stone-500">100% authentic, luxury tanning oil and cosmetics.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h3 className="font-serif text-sm font-semibold text-stone-900">Secure Ordering</h3>
            <p className="text-xs text-stone-500">Easy checkout and direct order submission via WhatsApp.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <HeartHandshake className="h-6 w-6 text-primary" />
            <h3 className="font-serif text-sm font-semibold text-stone-900">Dedicated Support</h3>
            <p className="text-xs text-stone-500">Personalized tanning and suncare beauty guidance.</p>
          </div>
        </div>
      </section>

      {/* Category Selection Grid */}
      <CategoryGrid categories={categories} />

      {/* Featured Products Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Handpicked Favorites
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 tracking-wide">
            Featured Products
          </h2>
          <div className="h-0.5 w-16 bg-primary mx-auto mt-2" />
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-500 text-sm">No featured products found. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full border-2 border-stone-900 hover:bg-stone-900 hover:text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-stone-900 transition-all duration-300"
          >
            Shop All Products
          </Link>
        </div>
      </section>
    </div>
  )
}
