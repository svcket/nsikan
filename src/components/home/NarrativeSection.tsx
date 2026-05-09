'use client';

import { motion } from 'framer-motion';

export default function NarrativeSection() {
  return (
    <section 
      className="relative w-full bg-black px-4 md:px-10 z-20"
      style={{ paddingTop: 'var(--space-h-s)', paddingBottom: 'var(--section-spacing)' }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="font-serif italic text-white text-center max-w-[900px] tracking-tight"
          style={{ fontSize: 'var(--text-section)', lineHeight: 'var(--text-section-lh)' }}
        >
          Projects and
          <br />
          Collaborations
        </motion.h2>
      </div>
    </section>
  );
}
