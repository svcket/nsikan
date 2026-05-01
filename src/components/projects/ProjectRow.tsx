'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import type { ProjectRowData } from '@/data/projectRows';

interface ProjectRowProps {
  row: ProjectRowData;
  rowIndex: number;
}

export function ProjectRow({ row, rowIndex }: ProjectRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    // On desktop: 3 cards in a single horizontal flex row, gap 24px
    // On mobile: stack cards vertically
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1],
        delay: rowIndex * 0.08,
      }}
      className="flex flex-col md:flex-row"
      style={{ gap: '24px' }}
    >
      {row.map((card) => (
        <ProjectCard key={card.id} card={card} />
      ))}
    </motion.div>
  );
}
