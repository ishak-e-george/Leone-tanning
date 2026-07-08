import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Product Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }] }),
    defineField({ name: 'price', title: 'Price (USD)', type: 'number', validation: r => r.required().min(0) }),
    defineField({ name: 'discountPrice', title: 'Discount Price (optional)', type: 'number' }),
    defineField({ name: 'images', title: 'Product Images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }], validation: r => r.min(1) }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text' }),
    defineField({ name: 'description', title: 'Full Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'inStock', title: 'In Stock', type: 'boolean', initialValue: true }),
    defineField({ name: 'featured', title: 'Show on Homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'tags', title: 'Tags (e.g. New, Best Seller)', type: 'array', of: [{ type: 'string' }] }),
  ],
})
