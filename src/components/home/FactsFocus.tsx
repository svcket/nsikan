'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FactsFocus() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Expansion animation: inset panel -> full width/height
  const width = useTransform(scrollYProgress, [0.05, 0.25], ["85%", "100%"]);
  const borderRadius = useTransform(scrollYProgress, [0.05, 0.25], ["12px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const bulletItems = [
    'User Experience',
    'Product Design',
    'Prototyping',
    'Logo Design',
    'Creative Direction',
    'No-code Development',
    'Agentic Development',
  ];

  return (
    <div ref={containerRef} className="relative w-full bg-black">
      <motion.section 
        data-nav-theme="light" 
        style={{ 
          width, 
          borderRadius, 
          opacity,
          margin: "0 auto" 
        }}
        className="relative w-full bg-[#FAF4FF] pt-20 pb-20 md:pt-40 md:pb-60 px-4 md:px-10 overflow-hidden"
      >
        {/* Noise Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-multiply"
          style={{
            backgroundImage: `url("/assets/noise bg.png")`,
            backgroundRepeat: 'repeat',
          }}
        />

        <div className="relative z-10 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0">
          {/* Left Column: Facts */}
          <div className="flex flex-col md:pr-20">
            <h2 className="font-serif italic text-[#1C1522] text-[48px] md:text-[56px] leading-[1.2] mb-20 md:mb-32">
              Facts
            </h2>
            <div className="space-y-12 max-w-[480px]">
              <p className="font-sans text-[#1C1522]/80 text-[17px] leading-[1.6]">
                I&apos;ve dedicated my career to the intersection of Brand and Product Design, known as Brand Experience Design. Focusing on highly crafted visual design, interactive prototyping across devices and hardware, as well as an emotive and intentional approach to integrating brand and visual identity systems within digital product experiences.
              </p>
              <p className="font-sans text-[#1C1522]/80 text-[17px] leading-[1.6]">
                I&apos;ve dedicated my career to the intersection of Brand and Product Design, known as Brand Experience Design. Focusing on highly crafted visual design, interactive prototyping across devices and hardware, as well as an emotive and intentional approach to integrating brand and visual identity systems within digital product experiences.
              </p>
              <p className="font-sans text-[#1C1522]/80 text-[17px] leading-[1.6]">
                I&apos;ve dedicated my career to the intersection of Brand and Product Design, known as Brand Experience Design. Focusing on highly crafted visual design, interactive prototyping across devices and hardware,
              </p>
            </div>
          </div>

          {/* Center Divider (Desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#1C1522]/10 transform -translate-x-1/2" />

          {/* Right Column: Focus */}
          <div className="flex flex-col md:pl-20 md:pt-[336px]">
            <h2 className="font-serif italic text-[#1C1522] text-[48px] md:text-[56px] leading-[1.2] mb-20 md:mb-32">
              Focus
            </h2>
            <ul className="space-y-6">
              {bulletItems.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="inline-block w-[6px] h-[6px] rounded-full bg-[#1C1522] mr-6 flex-shrink-0" />
                  <span className="font-serif italic text-[#1C1522] text-[36px] md:text-[36px] leading-[1.1]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
