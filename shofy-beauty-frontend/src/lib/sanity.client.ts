import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
const isFallback = !/^[a-z0-9-]+$/i.test(rawProjectId) || rawProjectId === 'your-project-id'
const projectId = isFallback ? 'abc12345' : rawProjectId

if (isFallback && typeof window === 'undefined') {
  console.warn(
    '\x1b[33m%s\x1b[0m',
    '⚠️ [Sanity Client WARNING]: NEXT_PUBLIC_SANITY_PROJECT_ID is unset or invalid. ' +
      'Falling back to dummy ID "abc12345" for build compilation. Live CMS content will NOT load. ' +
      'Please set NEXT_PUBLIC_SANITY_PROJECT_ID in your .env.local file once initialized.'
  )
}

export const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true, // fast, cached reads
})

const builder = createImageUrlBuilder(client)
export const urlFor = (source: any) => {
  if (!source) {
    return {
      url: () => '/placeholder-product.jpg',
      width: () => ({ url: () => '/placeholder-product.jpg' }),
      height: () => ({ url: () => '/placeholder-product.jpg' }),
      fit: () => ({ url: () => '/placeholder-product.jpg' }),
    } as any
  }
  return builder.image(source)
}
