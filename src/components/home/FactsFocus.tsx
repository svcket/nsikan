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
  const borderRadius = useTransform(scrollYProgress, [0.05, 0.25], ["0px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const bulletItems = [
    'User Experience',
    'Product Design',
    'Prototyping',
    'Logo Design',
    'Creative Direction',
    'No-code Development',
    'Building with AI',
  ];

  return (
    <div ref={containerRef} className="relative w-full bg-black">
      <motion.section 
        className="relative w-full bg-[#F9FEE7] px-[24px] md:px-[40px] overflow-hidden"
        style={{ 
          width, 
          borderRadius, 
          opacity,
          margin: "0 auto",
          paddingTop: 'var(--section-spacing)',
          paddingBottom: 'var(--section-spacing)'
        }}
      >
        {/* Noise Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-multiply"
          style={{
            backgroundImage: `url("/assets/noise bg.png")`,
            backgroundRepeat: 'repeat',
          }}
        />

        <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0">
          {/* Left Column: Facts */}
          <div className="flex flex-col md:pr-20">
            <h2 
              className="font-serif italic text-[#1C1522] tracking-tight"
              style={{ fontSize: 'var(--text-section)', lineHeight: 'var(--text-section-lh)', marginBottom: 'var(--space-h-s)' }}
            >
              Design Practice
            </h2>
            <div className="space-y-10 md:pl-[115px] max-w-[540px]">
              <p className="font-sans text-[#1C1522]/80 text-[length:var(--text-body)] leading-[var(--text-body-lh)]">
                I&apos;m Nsikan Etukudoh, a product designer working at the intersection of Brand Experience, Product Design, and Design Engineering. My focus is on building digital products where visual identity, interaction, and system logic come together to create experiences that are both functional and intentional.
              </p>
              <p className="font-sans text-[#1C1522]/80 text-[length:var(--text-body)] leading-[var(--text-body-lh)]">
                My work spans across web, mobile, and emerging digital systems, often within complex spaces like Web3, AI-driven products, and multi-platform e-commerce tools. I enjoy working on problems where clarity is not obvious at first glance — translating complexity like wallet activity, trading flows, inventory systems, and user dashboards into simple, usable experiences.
              </p>
              <p className="font-sans text-[#1C1522]/80 text-[length:var(--text-body)] leading-[var(--text-body-lh)]">
                At a systems level, I care about how individual design decisions connect into broader product behavior. I&apos;ve worked in collaborative environments with engineers and cross-functional teams, helping shape product direction, facilitate design sprints, and improve execution flow across teams.
              </p>
              <p className="font-sans text-[#1C1522]/80 text-[length:var(--text-body)] leading-[var(--text-body-lh)]">
                Outside of product work, I actively contribute to design communities and learning spaces such as Kimoyo Fellowship, Friends of Figma Design Bootcamp, Pexels, and Ingressive Campus Circle — focusing on helping designers think beyond screens into product systems, constraints, and real-world execution.
              </p>
            </div>
          </div>

          {/* Center Divider (Desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#1C1522]/10 transform -translate-x-1/2" />

          {/* Right Column: Focus */}
          <div className="flex flex-col items-end text-right md:pt-[757px]">
            <h2 
              className="font-serif italic text-[#1C1522] tracking-tight"
              style={{ fontSize: 'var(--text-section)', lineHeight: 'var(--text-section-lh)', marginBottom: 'var(--space-h-s)' }}
            >
              What I do...
            </h2>
            <ul className="space-y-6 md:pr-[115px]">
              {bulletItems.map((item, index) => (
                <li key={index} className="flex items-center justify-end">
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
