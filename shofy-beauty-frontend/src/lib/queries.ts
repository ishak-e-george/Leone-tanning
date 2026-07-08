export const allProductsQuery = `*[_type == "product"] | order(_createdAt desc){
  _id,
  name,
  "slug": slug.current,
  price,
  discountPrice,
  images,
  category->{
    title,
    "slug": slug.current
  },
  inStock,
  featured,
  tags,
  shortDescription,
  description
}`

export const featuredProductsQuery = `*[_type == "product" && featured == true] | order(_createdAt desc){
  _id,
  name,
  "slug": slug.current,
  price,
  discountPrice,
  images,
  category->{
    title,
    "slug": slug.current
  },
  inStock,
  tags
}`

export const productsByCategorySlugQuery = `*[_type == "product" && category->slug.current == $slug] | order(_createdAt desc){
  _id,
  name,
  "slug": slug.current,
  price,
  discountPrice,
  images,
  category->{
    title,
    "slug": slug.current
  },
  inStock,
  tags
}`

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  price,
  discountPrice,
  images,
  category->{
    title,
    "slug": slug.current
  },
  inStock,
  featured,
  tags,
  shortDescription,
  description
}`

export const bannersQuery = `*[_type == "banner"] | order(order asc){
  _id,
  heading,
  subheading,
  image,
  buttonText,
  buttonLink,
  order
}`

export const categoriesQuery = `*[_type == "category"]{
  _id,
  title,
  "slug": slug.current,
  image
}`

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  logo,
  phone,
  whatsapp,
  email,
  address,
  instagram,
  announcementBar
}`

export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  content
}`
