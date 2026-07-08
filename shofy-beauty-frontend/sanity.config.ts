import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'leone-tanning',
  title: 'LEONE Tanning CMS',
  basePath: '/admin',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kthi1b6c',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
