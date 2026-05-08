import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET

const projectId = (rawProjectId && /^[a-z0-9]+$/i.test(rawProjectId)) ? rawProjectId : '4y8gx2fx'
const dataset = (rawDataset && /^[a-z0-9_-~]+$/.test(rawDataset)) ? rawDataset : 'production'

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'Nsikan Studio',

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
