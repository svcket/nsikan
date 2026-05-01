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
      className="relative w-full pt-[120px] pb-[120px] overflow-visible"
    >
      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 px-4 md:px-10 text-center"
      >
        <h2
          className="font-serif italic text-[#1C1522] leading-[1.2] tracking-tight"
          style={{ fontSize: 'clamp(48px, 8vw, 80px)' }}
        >
          Projects and
          <br />
          Collaborations
        </h2>
      </motion.div>
    </div>
  );
}
