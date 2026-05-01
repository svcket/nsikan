# Portfolio Rebuild (Example Style)

This project is a React/Next.js implementation of a premium digital agency portfolio, featuring dynamic client-side filtering, smooth scrolling with Lenis, and complex scroll-based Framer Motion animations.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (v4)
- **Animation:** Framer Motion
- **Scrolling:** Lenis Smooth Scroll
- **Language:** TypeScript

## Managing Content

All dummy data and placeholder content is managed centrally in `src/config/content.ts`.

### Adding New Work Items

To add a new work case study, open `src/config/content.ts` and locate the `workItems` array. Add a new object following the `WorkItem` type structure:

```typescript
{
  id: 'unique-id',
  slug: 'url-friendly-slug',
  title: 'Project Title',
  client: 'Client Name',
  industry: 'Technology',
  service: 'Digital Strategy',
  featuredImage: 'https://...', // URL or relative path
  labels: ['Strategy', 'Design'],
  summary: 'A short summary.',
  content: ['Paragraph 1', 'Paragraph 2'],
  isComingSoon: false, // If true, it won't be clickable or generate a detail page
}
```

## Section Registry Architecture

This application uses a centralized section registry to control the visibility of major UI blocks. This guarantees that any section can be turned off instantly without breaking the layout.

### How to Toggle a Section

1. Open `src/config/sections.ts`.
2. Locate the specific section ID in the `globalSections` or `pageSections` object.
3. Change the `enabled` boolean.

**Example: Removing the "Newsletter" block from the Home page**

```typescript
// Inside src/config/sections.ts
export const pageSections: Record<string, SectionConfig> = {
  // ...
  'home.newsletterEtcetera': { id: 'home.newsletterEtcetera', enabled: false }, // Changed to false
  // ...
};
```

That's it. The `<SectionWrapper>` component will automatically handle the visibility logic and prevent the component from rendering.

## Running Locally

1. `npm install`
2. `npm run dev`
3. Visit `http://localhost:3000`
