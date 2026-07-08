'use client'

import React from 'react'
import Link from 'next/link'
import { Category } from '../types'
import { urlFor } from '../lib/sanity.client'

interface CategoryGridProps {
  categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  if (!categories || categories.length === 0) {
    // Show a premium fallback UI for categories if empty
    return (
      <section className="py-12 bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-stone-900 tracking-wide">
            Shop by Collection
          </h2>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {['Tanning Oils', 'Suncare & SPF', 'After-Sun Care'].map((name) => (
              <div
                key={name}
                className="relative aspect-3/4 rounded-2xl overflow-hidden bg-stone-100 flex flex-col justify-end p-6 border border-stone-200"
              >
                <h3 className="font-serif text-lg font-medium text-stone-800 z-10">{name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Curated Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 tracking-wide">
            Shop by Collection
          </h2>
          <div className="h-0.5 w-16 bg-primary mx-auto mt-2" />
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category) => {
            const imageUrl = category.image
              ? urlFor(category.image).width(350).height(450).url()
              : '/placeholder-category.jpg'

            return (
              <Link
                key={category._id}
                href={`/category/${category.slug}`}
                className="group relative flex flex-col items-center justify-end overflow-hidden rounded-2xl bg-stone-100 aspect-3/4 hover:shadow-lg transition-all duration-300 border border-stone-100"
              >
                {/* Image */}
                <img
                  src={imageUrl}
                  alt={category.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-103"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent z-10 transition-opacity duration-300 group-hover:from-black/85" />

                {/* Info Container */}
                <div className="relative z-20 w-full p-5 text-center text-white space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-lg font-medium tracking-wide">
                    {category.title}
                  </h3>
                  <span className="inline-block text-[10px] uppercase font-semibold tracking-widest text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore &rarr;
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
