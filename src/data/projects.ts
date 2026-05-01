export type ProjectVariant = 'landscape' | 'portrait' | 'square';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  variant: ProjectVariant;
  caseStudyUrl?: string;
  liveSiteUrl?: string;
}

export const projectsData: ProjectData[] = [
  // Column 1 sequence in reference (Landscape -> Square)
  {
    id: 'project-1',
    title: 'Gamic Pay',
    description: 'Move from crypto to cash in 1 minute.',
    imageUrl: '/assets/gamic-pay.png',
    variant: 'landscape',
    caseStudyUrl: '#',
    liveSiteUrl: 'https://gamic.app',
  },
  {
    id: 'project-4',
    title: 'Mobile Wallet',
    description: 'Seamless cross-border transfers.',
    imageUrl: '/assets/wallet-app.png',
    variant: 'portrait',
    caseStudyUrl: '#',
  },
  
  // Column 2 sequence in reference (Portrait -> Landscape)
  {
    id: 'project-2',
    title: 'Torq App',
    description: 'Event platform for drift enthusiasts.',
    imageUrl: '/assets/torq-app.png',
    variant: 'portrait',
    caseStudyUrl: '#',
  },
  {
    id: 'project-5',
    title: 'Design System',
    description: 'Component library for Torq web.',
    imageUrl: '/assets/torq-web.png',
    variant: 'landscape',
    caseStudyUrl: '#',
    liveSiteUrl: 'https://torq.events',
  },

  // Column 3 sequence in reference (Square -> Portrait)
  {
    id: 'project-3',
    title: 'Torq Drift Weekend',
    description: 'High performance event landing page.',
    imageUrl: '/assets/torq-drift.png',
    variant: 'square',
    caseStudyUrl: '#',
  },
  {
    id: 'project-6',
    title: 'Creator Dashboard',
    description: 'Analytics for content creators.',
    imageUrl: '/assets/creator-dash.png',
    variant: 'portrait',
    caseStudyUrl: '#',
  },
];
