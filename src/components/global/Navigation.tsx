'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import Link from 'next/link';

interface NavigationProps {
  stage: 'preloading' | 'transitioning' | 'ready';
}

export default function Navigation({ stage }: NavigationProps) {
  const lenis = useLenis();
  const showNav = stage === 'transitioning' || stage === 'ready';
  const [isLightBackground, setIsLightBackground] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-nav-theme]');
      let activeTheme = 'dark';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 80) {
          const theme = section.getAttribute('data-nav-theme');
          if (theme) activeTheme = theme;
        }
      });

      setIsLightBackground(activeTheme === 'light');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'PROJECTS', href: '/#projects' },
    { name: 'CONTACT', href: '/#footer' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isHomePage = window.location.pathname === '/';
    const isAnchor = href.startsWith('/#');

    if (isHomePage && (href === '/' || href === '/#')) {
      e.preventDefault();
      lenis?.scrollTo(0);
      setIsMobileMenuOpen(false);
      return;
    }

    if (isAnchor && isHomePage) {
      e.preventDefault();
      const targetId = href.split('#')[1];
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        lenis?.scrollTo(`#${targetId}`, { offset: 0, duration: 2 });
      }
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-10 py-8 flex items-center justify-between pointer-events-none">
        
        {/* Left: Brand Mark */}
        <div className="flex items-center pointer-events-auto">
          {showNav && hasMounted && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Link
                href="/"
                className="flex items-center"
                onClick={(e) => handleNavClick(e, '/')}
              >
                <div className="h-[32px] md:h-[32px] flex items-center">
                  <img 
                    src={hasMounted && isLightBackground 
                      ? "/assets/landing%20page%20logo%20-%20black%20text.png" 
                      : "/assets/landing%20page%20logo%20-%20white%20text.png"
                    } 
                    alt="Nsikan Etukudoh" 
                    className="h-full w-auto block select-none transition-opacity duration-300"
                    style={{ maxWidth: 'none' }}
                  />
                </div>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Right: Desktop Links */}
        <div className={`hidden md:flex items-center space-x-12 font-sans font-medium tracking-wide pointer-events-auto transition-colors duration-300 ${
          isLightBackground ? 'text-[#1C1522]' : 'text-[#FAF4FF]'
        }`} style={{ fontSize: 'var(--text-label)' }}>
          {navLinks.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={stage === 'ready' || stage === 'transitioning' ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.8 + i * 0.1,
              }}
              className="hover:opacity-50 transition-opacity"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden pointer-events-auto">
          {showNav && hasMounted && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setIsMobileMenuOpen(true)}
              className={isLightBackground ? 'text-[#1C1522]' : 'text-[#FAF4FF]'}
            >
              <Menu size={24} />
            </motion.button>
          )}
        </div>
      </nav>

      {/* Mobile Menu - DARK MODE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col p-6 md:hidden"
          >
            <div className="flex items-center justify-between mb-20 px-2">
              <div className="h-[32px] flex items-center">
                <img 
                  src="/assets/landing%20page%20logo%20-%20white%20text.png" 
                  alt="Nsikan Etukudoh" 
                  className="h-full w-auto block select-none" 
                  style={{ maxWidth: 'none' }} 
                />
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center space-y-12 pb-24">
              {navLinks.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white text-center font-bold tracking-tight"
                  style={{ 
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: 'var(--text-section)',
                    lineHeight: 'var(--text-section-lh)'
                  }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
