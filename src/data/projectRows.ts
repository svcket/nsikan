export type CardVariant = 'tall' | 'taller' | 'tallest';

export interface CardData {
  id: string;
  variant: CardVariant;
  title: string;
  description: string;
  caseStudyUrl?: string;
  liveSiteUrl?: string;
}

// Each tuple is exactly 3 cards — one row in the grid.
// Row order and variant assignment matches the "projects cards.png" reference:
//   Row 1: tall | tallest | taller
//   Row 2: tallest | taller | tallest
//   Row 3: taller | tallest | taller
//   Row 4: tallest | taller | tallest
export type ProjectRowData = [CardData, CardData, CardData];

export const projectRows: ProjectRowData[] = [
  [
    { id: 'r1c1', variant: 'tall',    title: "Tor'q", description: "We are defining the strategy for Addmind's new Dubai Harbour F&B precinct and building the place", caseStudyUrl: '#', liveSiteUrl: '#' },
    { id: 'r1c2', variant: 'tallest', title: "Tor'q", description: "We are defining the strategy for Addmind's new Dubai Harbour F&B precinct and building the place", caseStudyUrl: '#', liveSiteUrl: '#' },
    { id: 'r1c3', variant: 'taller',  title: "Tor'q", description: "We are defining the strategy for Addmind's new Dubai Harbour F&B precinct and building the place", caseStudyUrl: '#' },
  ],
  [
    { id: 'r2c1', variant: 'tallest', title: "Tor'q", description: "We are defining the strategy for Addmind's new Dubai Harbour F&B precinct and building the place", caseStudyUrl: '#' },
    { id: 'r2c2', variant: 'taller',  title: "Tor'q", description: "We are defining the strategy for Addmind's new Dubai Harbour F&B precinct and building the place", caseStudyUrl: '#', liveSiteUrl: '#' },
    { id: 'r2c3', variant: 'tallest', title: "Tor'q", description: "We are defining the strategy for Addmind's new Dubai Harbour F&B precinct and building the place", caseStudyUrl: '#', liveSiteUrl: '#' },
  ],
  [
    { id: 'r3c1', variant: 'taller',  title: "Tor'q", description: "We are defining the strategy for Addmind's new Dubai Harbour F&B precinct and building the place", caseStudyUrl: '#', liveSiteUrl: '#' },
    { id: 'r3c2', variant: 'tallest', title: "Tor'q", description: "We are defining the strategy for Addmind's new Dubai Harbour F&B precinct and building the place", caseStudyUrl: '#' },
    { id: 'r3c3', variant: 'taller',  title: "Tor'q", description: "We are defining the strategy for Addmind's new Dubai Harbour F&B precinct and building the place", caseStudyUrl: '#', liveSiteUrl: '#' },
  ],
  [
    { id: 'r4c1', variant: 'tallest', title: "Tor'q", description: "We are defining the strategy for Addmind's new Dubai Harbour F&B precinct and building the place", caseStudyUrl: '#' },
    { id: 'r4c2', variant: 'taller',  title: "Tor'q", description: "We are defining the strategy for Addmind's new Dubai Harbour F&B precinct and building the place", caseStudyUrl: '#', liveSiteUrl: '#' },
    { id: 'r4c3', variant: 'tallest', title: "Tor'q", description: "We are defining the strategy for Addmind's new Dubai Harbour F&B precinct and building the place", caseStudyUrl: '#' },
  ],
];
