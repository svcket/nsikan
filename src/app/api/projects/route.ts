import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

// Validate and sanitize env vars — handles quoted strings, spaces, "undefined" literals
function safeDataset(): string {
  const raw = process.env.NEXT_PUBLIC_SANITY_DATASET ?? ''
  return /^[a-z0-9_~-]+$/.test(raw.trim()) ? raw.trim() : 'production'
}

function safeProjectId(): string {
  const raw = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
  return /^[a-z0-9]+$/i.test(raw.trim()) ? raw.trim() : '4y8gx2fx'
}

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
  // Client created INSIDE the handler — never runs at module evaluation time
  const serverClient = createClient({
    projectId: safeProjectId(),
    dataset: safeDataset(),
    apiVersion: '2024-05-04',
    useCdn: false,
  })

  try {
    const projects = await serverClient.fetch(allProjectsQuery)
    return NextResponse.json({ projects: projects ?? [] })
  } catch (err: any) {
    console.error('[API /projects] Sanity fetch failed:', err?.message ?? err)
    return NextResponse.json(
      { projects: [], error: err?.message ?? 'Failed to fetch' },
      { status: 500 }
    )
  }
}
