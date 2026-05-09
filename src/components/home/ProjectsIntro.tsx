'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ProjectsIntro() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Soft reveal transforms
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);

  return (
    <div 
      ref={targetRef}
      className="relative w-full overflow-visible"
      style={{ paddingTop: 'var(--section-spacing)', paddingBottom: 'var(--section-spacing)' }}
    >
      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 px-4 md:px-10 text-center"
      >
        <h2
          className="font-serif italic text-[#1C1522] tracking-tight"
          style={{ fontSize: 'var(--text-section)', lineHeight: 'var(--text-section-lh)' }}
        >
          Projects and
          <br />
          Collaborations
        </h2>
      </motion.div>
    </div>
  );
}
