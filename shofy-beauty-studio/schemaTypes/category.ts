import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Category Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'image', title: 'Category Image', type: 'image' }),
  ],
})
