import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Name (e.g. Ping)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Editorial Headline (e.g. Designing a Web3...)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Old Type (Deprecated)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'layout',
      title: 'Card Layout',
      description: 'Determines the shape of the project card on the homepage.',
      type: 'string',
      options: {
        list: [
          { title: 'Mobile (Vertical)', value: 'mobile' },
          { title: 'Web (Horizontal)', value: 'web' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Expertise Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Branding', value: 'Branding' },
          { title: 'UI/UX Design', value: 'UI/UX Design' },
          { title: 'Web Development', value: 'Web Development' },
          { title: 'Mobile App', value: 'Mobile App' },
          { title: 'Logo Design', value: 'Logo Design' },
          { title: 'Product Strategy', value: 'Product Strategy' },
          { title: 'Motion Design', value: 'Motion Design' },
        ],
        layout: 'tags'
      }
    }),
    defineField({
      name: 'liveSiteHref',
      title: 'Live Site URL',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Project Icon',
      type: 'image',
    }),
    defineField({
      name: 'heroVisual',
      title: 'Hero Visual',
      type: 'object',
      fields: [
        { name: 'image', type: 'image', title: 'Image' },
        { name: 'video', type: 'file', title: 'Video (MP4/MOV)', options: { accept: 'video/*' } },
      ]
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case Study Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          title: 'Section',
          fields: [
            defineField({
              name: 'sectionTitle',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'blocks',
              title: 'Blocks',
              type: 'array',
              of: [
                // Text Block
                {
                  type: 'object',
                  name: 'textBlock',
                  title: 'Text Block',
                  fields: [
                    { name: 'title', type: 'string', title: 'Title' },
                    { 
                      name: 'content', 
                      type: 'array', 
                      title: 'Content Paragraphs',
                      of: [{ type: 'text' }]
                    },
                  ]
                },
                // Grid Block
                {
                  type: 'object',
                  name: 'gridBlock',
                  title: 'Grid Block (2-Cols)',
                  fields: [
                    {
                      name: 'gridItems',
                      type: 'array',
                      title: 'Grid Items',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            { name: 'image', type: 'image', title: 'Image' },
                            { name: 'video', type: 'file', title: 'Video (MP4/MOV)', options: { accept: 'video/*' } },
                            { name: 'height', type: 'number', title: 'Height (defaults to 720)' },
                          ]
                        }
                      ]
                    }
                  ]
                },
                // Visual Block
                {
                  type: 'object',
                  name: 'visualBlock',
                  title: 'Visual Block (Full Width)',
                  fields: [
                    { name: 'image', type: 'image', title: 'Image' },
                    { name: 'video', type: 'file', title: 'Video (MP4/MOV)', options: { accept: 'video/*' } },
                    { name: 'height', type: 'number', title: 'Height (defaults to 720)' },
                  ]
                },
                // Metrics Block
                {
                  type: 'object',
                  name: 'metricsBlock',
                  title: 'Metrics Block',
                  fields: [
                    {
                      name: 'metrics',
                      type: 'array',
                      title: 'Metrics',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            { name: 'value', type: 'string', title: 'Value' },
                            { name: 'description', type: 'string', title: 'Description' },
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'discoveryVisual',
      title: 'Final Discovery Visual (Edge-to-Edge)',
      type: 'object',
      fields: [
        { name: 'image', type: 'image', title: 'Image' },
        { name: 'video', type: 'file', title: 'Video (MP4/MOV)', options: { accept: 'video/*' } },
      ]
    })
  ],
})
