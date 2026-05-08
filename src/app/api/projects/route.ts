import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

// Build the client purely server-side with hardcoded fallbacks.
// This runs in a Node.js context, never in the browser, so no CORS issues.
const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4y8gx2fx',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-05-04',
  useCdn: false,
})

const allProjectsQuery = `
  *[_type == "project"] {
    _id,
    title,
    "slug": slug.current,
    heroDescription,
    layout,
    tags,
    liveSiteHref,
    icon {
      ...,
      "url": asset->url
    },
    heroVisual {
      image {
        ...,
        "url": asset->url
      },
      video {
        asset-> {
          url
        }
      }
    },
    discoveryVisual {
      image {
        ...,
        "url": asset->url
      },
      video {
        asset-> {
          url
        }
      }
    }
  }
`

export async function GET() {
  try {
    const projects = await serverClient.fetch(allProjectsQuery)
    return NextResponse.json({ projects: projects || [] })
  } catch (err) {
    console.error('[API /projects] Sanity fetch failed:', err)
    return NextResponse.json({ projects: [], error: 'Failed to fetch' }, { status: 500 })
  }
}
