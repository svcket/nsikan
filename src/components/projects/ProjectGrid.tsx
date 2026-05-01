'use client';

import { projectRows } from '@/data/projectRows';
import { ProjectRow } from './ProjectRow';

export default function ProjectGrid() {
  return (
    <div className="relative w-full pb-0 px-4 md:px-10">
      {/* Row-based Grid */}
      <div className="relative z-10 flex flex-col" style={{ gap: '80px' }}>
        {projectRows.map((row, i) => (
          <ProjectRow key={row[0].id} row={row} rowIndex={i} />
        ))}
      </div>
    </div>
  );
}
