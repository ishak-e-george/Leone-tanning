import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { client } from '../../../lib/sanity.client'
import { productsByCategorySlugQuery } from '../../../lib/queries'
import ProductCard from '../../../components/ProductCard'
import { Product } from '../../../types'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export const revalidate = 60 // Enable ISR

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryTitle = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)
  return {
    title: `${categoryTitle} Collection | LEONE`,
    description: `Shop our exclusive ${categoryTitle} collection at LEONE.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Fetch products in this category
  const products: Product[] = await client.fetch(productsByCategorySlugQuery, { slug: params.slug }).catch((err) => {
    console.error('Error fetching category products', err)
    return []
  })

  // Fetch category info directly to display correct heading title
  const category = await client
    .fetch(`*[_type == "category" && slug.current == $slug][0]{ title }`, { slug: params.slug })
    .catch(() => null)

  if (!category) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full space-y-10">
      {/* Category Header */}
      <div className="text-center space-y-2 border-b border-stone-200 pb-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C87A80]">Collection</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 tracking-wide">
          {category.title}
        </h1>
        <p className="text-sm text-stone-500 max-w-md mx-auto">
          Explore our handpicked curation of premium {category.title.toLowerCase()} formulations.
        </p>
      </div>

      {/* Grid of Category Products */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-stone-100 shadow-xs space-y-4">
          <p className="text-stone-500 text-sm">No products found in this category yet.</p>
          <Link
            href="/shop"
            className="inline-block rounded-full bg-stone-900 px-6 py-2.5 text-xs font-semibold text-white uppercase tracking-wider hover:bg-stone-850"
          >
            Explore All Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
