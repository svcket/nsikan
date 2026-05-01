import { workItems, WorkItem } from './content';

export interface Project extends WorkItem {
  // We extend WorkItem and can add view-specific metadata if needed
  year?: string;
  region?: string;
  discipline?: string;
  image: string; // Map from featuredImage
}

export type WorkRowPattern = 
  | 'patternA' // Large Left (8) + Narrow Right (4)
  | 'patternB' // Equal Split (6 + 6)
  | 'patternC' // Balanced Dual (6 + 6 or 5 + 5 with rhythm)
  | 'patternD'; // Wide Lead (7) + Support (5)

export interface WorkRow {
  id: string;
  pattern: WorkRowPattern;
  projects: Project[];
}

// Map the detailed WorkItems to the Project interface used by the grid
const mappedProjects: Project[] = workItems.map(item => ({
  ...item,
  image: item.featuredImage,
  year: '2026',
  region: 'Global',
  discipline: item.service
}));

export const workRows: WorkRow[] = [
  {
    id: 'row1',
    pattern: 'patternA',
    projects: [mappedProjects[0], mappedProjects[3]],
  },
  {
    id: 'row2',
    pattern: 'patternB',
    projects: [mappedProjects[4], mappedProjects[6]],
  },
  {
    id: 'row3',
    pattern: 'patternC',
    projects: [mappedProjects[7], mappedProjects[0]], // Re-use for rhythm
  },
  {
    id: 'row4',
    pattern: 'patternD',
    projects: [mappedProjects[1], mappedProjects[2]],
  },
];
