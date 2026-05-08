'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import PreloaderIntro from '@/components/home/PreloaderIntro';
import HeroCarousel from '@/components/home/HeroCarousel';
import ProjectsSection from '@/components/home/ProjectsSection';
import FactsFocus from '@/components/home/FactsFocus';
import Testimonials from '@/components/home/Testimonials';
import Footer from '@/components/home/Footer';
import Navigation from '@/components/global/Navigation';

export default function HomePage() {
  const [stage, setStage] = useState<'preloading' | 'transitioning' | 'ready'>(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('hasLoaded')) {
      return 'ready';
    }
    return 'preloading';
  });

  // Handle anchor links on mount (e.g. coming from a project page)
  useEffect(() => {
    if (stage === 'ready' && window.location.hash === '#projects') {
      const timer = setTimeout(() => {
        const element = document.getElementById('projects');
        if (element) {
          // Force scroll to top of projects section to ensure index 0
          window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
          });
        }
      }, 600); // Wait for animations and GSAP initialization
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Disable scroll when not ready
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    if (hasLoaded) {
      setStage('ready');
    }

    if (stage !== 'ready') {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0); // Lock to top during preloader
    } else {
      document.body.style.overflow = 'auto';
      if (!hasLoaded) {
        sessionStorage.setItem('hasLoaded', 'true');
      }
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
          
          {/* Landing Hero Section - Focused Refinement */}
          <section data-nav-theme="dark" className="relative w-full bg-black overflow-visible">
            <HeroCarousel stage={stage} />
          </section>

          {/* Projects and Collaborations Section - Sequential Scroll Interaction */}
          <ProjectsSection />

          <FactsFocus />

          <Testimonials />

          <Footer />
          <div className="text-[8px] text-white/5 uppercase tracking-widest text-center py-2">
            Build Status: Industrial Sync v2.2
          </div>

          {/* 
            Other sections removed for focused refinement.
          */}

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
