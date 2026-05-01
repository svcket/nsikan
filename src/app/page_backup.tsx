'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import PreloaderIntro from '@/components/home/PreloaderIntro';
import HeroCarousel from '@/components/home/HeroCarousel';
import Navigation from '@/components/global/Navigation';
import ProjectsIntro from '@/components/home/ProjectsIntro';
import ProjectGrid from '@/components/projects/ProjectGrid';
import FactsFocus from '@/components/home/FactsFocus';
import Testimonials from '@/components/home/Testimonials';
import Footer from '@/components/home/Footer';

export default function HomePage() {
  const [stage, setStage] = useState<'preloading' | 'transitioning' | 'ready'>('preloading');

  // Disable scroll when not ready
  useEffect(() => {
    if (stage !== 'ready') {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0); // Lock to top during preloader
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [stage]);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <LayoutGroup>
        <main className="relative w-full">
          
          {/* Global Noise Texture Overlay */}
          <div
            className="fixed inset-0 pointer-events-none opacity-[0.08] mix-blend-multiply z-[99]"
            style={{
              backgroundImage: `url("/assets/noise bg.png")`,
              backgroundRepeat: 'repeat',
            }}
          />
          
          <Navigation stage={stage} />
          
          {/* 
              STICKY SCROLL SEQUENCE:
              Hero section is pinned at scroll 0.
              Projects section rises from below and covers it.
          */}
          
          {/* Landing Hero Section */}
          <section data-nav-theme="dark" className="relative w-full bg-[#0F0F0F] overflow-visible">
            <HeroCarousel stage={stage} />
          </section>

          {/* Projects and Collaborations Section */}
          <section data-nav-theme="light" className="relative w-full bg-[#FAF4FF] overflow-visible">
            <ProjectsIntro />
            <ProjectGrid />
          </section>

          {/* Remaining Sections - Normal Scroll */}
          <div className="relative z-20">
            <FactsFocus />
            <Testimonials />
            <Footer />
          </div>

          {/* Preload Screen Overlay */}
          <AnimatePresence mode="wait">
            {(stage === 'preloading' || stage === 'transitioning') && (
              <motion.div
                key="preloader-overlay"
                initial={{ y: 0 }}
                animate={stage === 'transitioning' ? { y: '-100%' } : { y: 0 }}
                transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
                onAnimationComplete={() => {
                  if (stage === 'transitioning') {
                    setStage('ready');
                  }
                }}
                className="fixed inset-0 z-50 bg-white flex items-center justify-center pointer-events-none"
              >
                <div 
                  className="pointer-events-none absolute inset-0 opacity-10 mix-blend-multiply"
                  style={{
                    backgroundImage: `url("/assets/noise bg.png")`,
                    backgroundRepeat: 'repeat',
                  }}
                />
                
                {stage === 'preloading' && (
                  <PreloaderIntro onComplete={() => setStage('transitioning')} />
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </main>
      </LayoutGroup>
    </ReactLenis>
  );
}
