import { createClient } from 'next-sanity'

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export const client = createClient({
  projectId: (rawProjectId && /^[a-z0-9]+$/i.test(rawProjectId)) ? rawProjectId : '4y8gx2fx',
  dataset: (rawDataset && /^[a-z0-9_-~]+$/.test(rawDataset)) ? rawDataset : 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-04',
  useCdn: false, 
})
