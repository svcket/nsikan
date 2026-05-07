import { groq } from 'next-sanity'

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    headline,
    "slug": slug.current,
    heroDescription,
    icon,
    heroVisual {
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
`

export const allProjectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    heroDescription,
    "layout": layout,
    tags,
    liveSiteHref,
    icon,
    heroVisual {
      ...,
      video {
        asset-> {
          url
        }
      }
    },
    discoveryVisual {
      ...,
      video {
        asset-> {
          url
        }
      }
    }
  }
`
