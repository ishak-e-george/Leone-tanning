export interface Category {
  _id: string
  title: string
  slug: string
  image?: any
}

export interface Product {
  _id: string
  name: string
  slug: string
  price: number
  discountPrice?: number
  images: any[]
  category?: {
    title: string
    slug: string
  }
  inStock: boolean
  featured?: boolean
  tags?: string[]
  shortDescription?: string
  description?: any // Portable Text block content
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Banner {
  _id: string
  heading?: string
  subheading?: string
  image: any
  buttonText?: string
  buttonLink?: string
  order?: number
}

export interface SiteSettings {
  logo?: any
  phone?: string
  whatsapp?: string
  email?: string
  address?: string
  instagram?: string
  announcementBar?: string
}

export interface StaticPage {
  title: string
  slug: string
  content: any // Portable Text block content
}
