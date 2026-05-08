import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4y8gx2fx',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-05-04',
  useCdn: false,
})

const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    headline,
    "slug": slug.current,
    heroDescription,
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
    caseStudy[] {
      ...,
      blocks[] {
        ...,
        _type == "gridBlock" => {
          gridItems[] {
            ...,
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
        },
        _type == "visualBlock" => {
          ...,
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

const otherProjectsQuery = `
  *[_type == "project" && slug.current != $slug] {
    _id,
    title,
    "slug": slug.current,
    icon { ..., "url": asset->url },
    layout,
    heroDescription,
    heroVisual {
      image { ..., "url": asset->url },
      video { asset-> { url } }
    },
    discoveryVisual {
      image { ..., "url": asset->url },
      video { asset-> { url } }
    }
  }
`

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  try {
    const [project, otherProjects] = await Promise.all([
      serverClient.fetch(projectBySlugQuery, { slug }),
      serverClient.fetch(otherProjectsQuery, { slug }),
    ])
    return NextResponse.json({ project: project || null, otherProjects: otherProjects || [] })
  } catch (err) {
    console.error(`[API /project/${slug}] Sanity fetch failed:`, err)
    return NextResponse.json({ project: null, otherProjects: [], error: 'Failed to fetch' }, { status: 500 })
  }
}
