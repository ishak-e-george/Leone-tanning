import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'banner',
  title: 'Homepage Banners',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({ name: 'image', title: 'Banner Image', type: 'image', validation: r => r.required() }),
    defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
    defineField({ name: 'buttonLink', title: 'Button Link', type: 'string' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
})
