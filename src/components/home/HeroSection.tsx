'use client';

import { motion } from 'framer-motion';

interface HeroSectionProps {
  stage: 'preloading' | 'transitioning' | 'ready';
}

export default function HeroSection({ stage }: HeroSectionProps) {
  const showContent = stage === 'transitioning' || stage === 'ready';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.9,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] as const }
    },
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col pt-32 pb-0 px-4 md:px-10 pointer-events-auto overflow-hidden">
      
      {/* Subtle atmospheric background effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-b from-[#1C1522] via-[#2D1B36] to-[#1C1522] mix-blend-screen" />

      <motion.div 
        className="relative z-10 flex-grow flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate={showContent ? 'visible' : 'hidden'}
      >
        {/* ── CTA Button ───────────────────────────────────────────────
            Requested: 324px from top, 40px from right edge.
            Tailwind 'right-10' is exactly 40px (2.5rem).
        ────────────────────────────────────────────────────────────────── */}
        <motion.button 
          variants={itemVariants}
          className="hidden md:block absolute top-[324px] right-10 px-8 py-3 rounded-none border-2 border-[#FF756C] text-[#FF756C] font-sans text-base font-medium tracking-wide hover:bg-[#FF756C] hover:text-[#1C1522] transition-colors duration-300 z-30"
        >
          Let’s Work
        </motion.button>

        {/* Top Content Row */}
        <div className="flex flex-col w-full mb-16 lg:mb-20">
          
          {/* Left: Main H1 */}
          <motion.div variants={itemVariants} className="w-full lg:w-2/3" style={{ marginBottom: 'var(--space-h-s)' }}>
            <h1 className="font-serif italic text-[length:var(--text-hero)] leading-[var(--text-hero-lh)] tracking-tight text-[#FFD1CE]">
              Senior Product Designer<br />
              and UI Engineer
            </h1>
          </motion.div>

          {/* Left: Supporting Microcopy */}
          <motion.div variants={itemVariants} className="w-full lg:w-1/2">
            <p 
              className="font-sans text-[#9481A3] text-[length:var(--text-body)] font-normal max-w-[420px]"
              style={{ lineHeight: 'var(--text-body-lh)' }}
            >
              I help teams turn complex product ideas into clear,<br />
              thoughtful digital experiences.
            </p>
          </motion.div>

          {/* Mobile CTA */}
          <motion.button 
            variants={itemVariants}
            className="md:hidden mt-10 px-8 py-3 rounded-none border-2 border-[#FF756C] text-[#FF756C] font-sans text-base font-medium tracking-wide w-fit"
          >
            Let’s Work
          </motion.button>
        </div>

        {/* Lower Media Placeholders (Height Difference, Same Bottom Baseline) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full mt-auto items-end pb-10">
          {/* Left Large Media (Taller) */}
          <motion.div 
            variants={itemVariants}
            className="w-full h-[55vh] lg:h-[65vh] lg:col-span-7 border border-white/10 rounded-sm bg-white/[0.015] overflow-hidden relative"
          >
            {/* Future Video/GIF container */}
          </motion.div>

          {/* Right Media (Shorter, Aligned to bottom) */}
          <motion.div 
            variants={itemVariants}
            className="w-full h-[40vh] lg:h-[45vh] lg:col-span-5 border border-white/10 rounded-sm bg-white/[0.015] overflow-hidden relative hidden lg:block"
          >
            {/* Future Video/GIF container */}
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
