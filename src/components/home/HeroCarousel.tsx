'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface HeroCarouselProps {
  stage?: 'preloading' | 'transitioning' | 'ready';
}

export default function HeroCarousel({ stage = 'ready' }: HeroCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const showContent = stage === 'transitioning' || stage === 'ready';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  // --- TRANSFORMATION TIMELINE ---

  // 1. EDITORIAL HEADING & MICROCOPY
  const headingY = useTransform(smoothProgress, [0, 0.4, 0.5], [0, -200, -350]);
  const contentOpacity = useTransform(smoothProgress, [0.35, 0.5], [1, 0]);

  // 2. PROJECT PREVIEW PLACEHOLDER
  const mediaWidth = useTransform(
    smoothProgress, 
    [0.1, 0.6, 0.8], 
    ['480px', '1226px', '1226px']
  );
  
  const mediaHeight = useTransform(
    smoothProgress, 
    [0.1, 0.6, 0.8], 
    ['320px', '784px', '784px']
  );

  const mediaOpacity = useTransform(smoothProgress, [0, 0.8, 0.95], [1, 1, 0]);
  const mediaScale = useTransform(smoothProgress, [0.1, 0.6, 0.8], [1, 1, 1]); 
  
  const mediaY = useTransform(
    smoothProgress, 
    [0, 0.1, 0.6, 0.8, 1], 
    [0, 0, -80, -80, -400]
  ); 
  
  const mediaBorderRadius = useTransform(smoothProgress, [0.1, 0.6], ['12px', '0px']);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[700vh] bg-black select-none"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Main Editorial Content Group */}
        <motion.div
          style={{ y: headingY, opacity: contentOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          className="absolute top-[16vh] flex flex-col items-center text-center px-4 z-20 pointer-events-none"
        >
          {/* Headline (H1) - 80px */}
          <h1 className="font-serif italic text-[clamp(48px,8vw,80px)] leading-[1.05] text-white tracking-tight">
            Senior Product Designer
            <br />
            and UI Engineer
          </h1>

          {/* 
            New Microcopy: 22px Helvetica Neue
            Positioned exactly 36px beneath the headline.
            Line height set to 150px with specific break after 'into'.
          */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-[36px] text-[22px] text-white/60 font-sans tracking-tight"
            style={{ 
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              lineHeight: '1.5' 
            }}
          >
            I help teams turn complex product ideas into
            <br />
            clear, thoughtful digital experiences.
          </motion.p>
        </motion.div>

        {/* 
          Project Preview Placeholder: 
          - Maintains same relative distance, pushed down after microcopy.
          - 240px margin from the main content group.
        */}
        <div className="relative w-full flex justify-center mt-[320px] z-10">
          <motion.div
            style={{ 
              width: mediaWidth, 
              height: mediaHeight,
              y: mediaY,
              opacity: mediaOpacity,
              scale: mediaScale,
              borderRadius: mediaBorderRadius
            }}
            initial={{ opacity: 1 }}
            animate={showContent ? { opacity: 1 } : {}}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
            className="relative overflow-hidden bg-[#1A1A1A] border border-white/5 shadow-2xl"
          >
            <img 
              src="/assets/proejct card tallest height.png" 
              alt="Project Showcase" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>

      </div>

      <div className="absolute bottom-0 w-full h-[600vh] pointer-events-none" />
    </div>
  );
}
