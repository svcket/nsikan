import { createClient } from 'next-sanity'
import ProjectClient from './ProjectClient'
import { notFound } from 'next/navigation'

function safeDataset(): string {
  const raw = process.env.NEXT_PUBLIC_SANITY_DATASET ?? ''
  return /^[a-z0-9_~-]+$/.test(raw.trim()) ? raw.trim() : 'production'
}

function safeProjectId(): string {
  const raw = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
  return /^[a-z0-9]+$/i.test(raw.trim()) ? raw.trim() : '4y8gx2fx'
}

const serverClient = createClient({
  projectId: safeProjectId(),
  dataset: safeDataset(),
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

// Tell Next.js to pre-render all project pages at build time
export async function generateStaticParams() {
  try {
    const slugs = await serverClient.fetch(`*[_type == "project"][].slug.current`)
    return slugs.filter(Boolean).map((slug: string) => ({
      slug,
    }))
  } catch (error) {
    console.error("Failed to fetch static params for projects:", error)
    return []
  }
}

export default async function ProjectPageServer({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  try {
    const [project, otherProjects] = await Promise.all([
      serverClient.fetch(projectBySlugQuery, { slug }),
      serverClient.fetch(otherProjectsQuery, { slug }),
    ])

    if (!project) {
      notFound()
    }

    return <ProjectClient project={project} otherProjects={otherProjects || []} />
  } catch (error) {
    console.error(`Failed to fetch project ${slug}:`, error)
    notFound()
  }
}
