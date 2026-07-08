import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '../../../../lib/sanity.client'
import { productBySlugQuery } from '../../../../lib/queries'
import ProductDetailClient from './ProductDetailClient'
import { Product } from '../../../../types'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export const revalidate = 60 // Enable ISR

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product: Product | null = await client.fetch(productBySlugQuery, { slug: params.slug }).catch(() => null)
  
  if (!product) {
    return {
      title: 'Product Not Found | LEONE',
      description: 'The requested product could not be found.',
    }
  }

  return {
    title: `${product.name} | LEONE Tanning & Cosmetics`,
    description: product.shortDescription || `Buy ${product.name} at LEONE.`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product: Product | null = await client.fetch(productBySlugQuery, { slug: params.slug }).catch((err) => {
    console.error('Error fetching product detail', err)
    return null
  })

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
