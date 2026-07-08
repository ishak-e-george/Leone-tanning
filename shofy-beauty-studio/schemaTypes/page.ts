import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Static Pages',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string' }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
  ],
})
