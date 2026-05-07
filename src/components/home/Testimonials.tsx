'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const testimonials = [
  {
    quote: "Nsikan is a thoughtful designer who truly understands user needs. He transformed our digital library experience with intuitive, user-friendly designs, making access to knowledge seamless for our audience.",
    author: "Ijeoma Eziri",
    role: "Executive Chair, 200ML"
  },
  {
    quote: "Nsikan brings a deep understanding of Web3 design, creating engaging, functional interfaces. His attention to detail and strategic approach helped elevate Gamic's user experience significantly.",
    author: "Ukeme Okuku",
    role: "CEO, Artist3 Labs"
  },
  {
    quote: "Nsikan is a top-tier designer with a sharp eye for detail. He delivers sleek, high-performing designs while maintaining a collaborative approach, ensuring smooth communication throughout the project.",
    author: "Malik Nasourou",
    role: "Founder, Creaya Labs"
  },
  {
    quote: "Nsikan is an incredible designer and a trusted mentor. He combines creativity with strategic thinking, offering valuable career insights while delivering clean, high-quality design solutions.",
    author: "Khalid David",
    role: "Senior Product Designer, Prefix Studio"
  },
  {
    quote: "Nsikan's ability to bring ideas to life through design is unmatched. He creates engaging, functional experiences while fostering collaboration, making him an invaluable creative partner.",
    author: "Maurice Edohoeket",
    role: "Design Engineer, Loopy Studios"
  },
  {
    quote: "Nsikan is a world-class designer known for delivering flawless, picture-perfect designs. Beyond his design skills, he is a collaborative team player who ensures everyone stays involved throughout the process.",
    author: "David Oladele",
    role: "Founder, Prefix Studio"
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Expansion animation: inset panel -> full width/height
  const width = useTransform(scrollYProgress, [0.1, 0.3], ["85%", "100%"]);
  const borderRadius = useTransform(scrollYProgress, [0.1, 0.3], ["0px", "0px"]);
  
  const quoteStyle = {
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: '250px',
    lineHeight: '1',
    color: '#A8E06C', // Lime green accent
  };

  return (
    <div ref={containerRef} className="relative w-full bg-black py-0">
      <motion.section 
        data-nav-theme="dark"
        style={{ 
          width, 
          borderRadius,
          margin: "0 auto"
        }}
        className="relative bg-[#000000] text-[#FFD1CE] min-h-[200vh] flex flex-col items-center"
      >
        {/* Subtle texture/banding */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-b from-transparent via-white/5 to-transparent overflow-hidden" />

        <div className="relative z-10 w-full pt-20 md:pt-32 pb-20 px-4 md:px-10">
          {/* Header */}
          <div className="text-center mb-[208px]">
            <h2 className="font-serif italic text-white text-[56px] md:text-[80px] leading-[1.1] max-w-[800px] mx-auto tracking-tight">
              Don’t take<br />my word for it...
            </h2>
          </div>

          {/* Testimonial & Sticky Quotes Container */}
          {/* Reverting to max-w-[1200px] as per user request to reduce width */}
          <div className="relative max-w-[1200px] mx-auto flex justify-center items-start">
            
            {/* Left Sticky Quote */}
            <div className="hidden lg:block sticky top-[50vh] -translate-y-1/2 mr-24">
               <span style={quoteStyle} className="italic select-none opacity-80">“</span>
            </div>

            {/* Testimonials Column - Fixed 322px Width, Left-Aligned */}
            <div className="flex flex-col space-y-[120px] pt-0 pb-20" style={{ width: 'min(322px, calc(100vw - 32px))' }}>
              {testimonials.map((t, i) => (
                <div key={i} className="text-left">
                  <p className="font-sans text-[17px] leading-[1.6] text-white/90 mb-10">
                    {t.quote}
                  </p>
                  <div className="space-y-1">
                    <h4 className="font-serif italic text-[22px] text-white">
                      {t.author}
                    </h4>
                    <p className="font-sans text-[13px] uppercase tracking-widest text-[#999999]">
                      {t.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Sticky Quote */}
            <div className="hidden lg:block sticky top-[50vh] -translate-y-1/2 ml-24">
               <span style={quoteStyle} className="italic select-none opacity-80">”</span>
            </div>
            
          </div>
        </div>
      </motion.section>
    </div>
  );
}
