import React, { Suspense } from 'react'
import { client } from '../../lib/sanity.client'
import { allProductsQuery, categoriesQuery } from '../../lib/queries'
import ShopClient from './ShopClient'
import { Category, Product } from '../../types'

export const revalidate = 60 // Enable ISR

export default async function ShopPage() {
  const products: Product[] = await client.fetch(allProductsQuery).catch((err) => {
    console.error('Error fetching products for shop', err)
    return []
  })

  const categories: Category[] = await client.fetch(categoriesQuery).catch((err) => {
    console.error('Error fetching categories for shop', err)
    return []
  })

  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-stone-500 font-medium">
        Loading our collections...
      </div>
    }>
      <ShopClient initialProducts={products} categories={categories} />
    </Suspense>
  )
}
