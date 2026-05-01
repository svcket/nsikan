'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { slug: "ping", title: "Ping - Formerly Gamic", description: "A Web3 social experience designed to simplify communities, chats, and digital interaction.", caseStudyHref: "#", liveSiteHref: "#", type: "mobile" },
  { slug: "torq", title: "Torq", description: "We are defining the strategy for Addmind’s new Dubai Harbour F&B precinct and building the place.", caseStudyHref: "#", liveSiteHref: "#", type: "web" },
  { slug: "breedjr", title: "Breedjr", description: "A dedicated platform for livestock management and agricultural innovation.", caseStudyHref: "#", liveSiteHref: "#", type: "web" },
  { slug: "isang", title: "Isang", description: "A premium hospitality and lifestyle experience designed for the modern traveler.", caseStudyHref: "#", liveSiteHref: "#", type: "web" },
  { slug: "masomo-ai", title: "Masomo AI", description: "Revolutionizing education through personalized AI-driven learning journeys.", caseStudyHref: "#", liveSiteHref: "#", type: "mobile" },
  { slug: "lecoindine", title: "Lécoindine", description: "Curated dining experiences and culinary storytelling for the refined palate.", caseStudyHref: "#", liveSiteHref: "#", type: "mobile" },
  { slug: "siroma", title: "Siroma", description: "Innovative workspace solutions for the next generation of creative teams.", caseStudyHref: "#", liveSiteHref: "#", type: "mobile" },
  { slug: "lstnr", title: "Lstnr", description: "An immersive audio platform for discovering and sharing unique soundscapes.", caseStudyHref: "#", liveSiteHref: "#", type: "mobile" },
  { slug: "plugin", title: "Plugin", description: "The essential bridge between digital tools and creative workflows.", caseStudyHref: "#", liveSiteHref: "#", type: "mobile" },
  { slug: "esbabi", title: "'esbabi", description: "A heritage-focused brand identity project celebrating traditional craftsmanship.", caseStudyHref: "#", liveSiteHref: "#", type: "mobile" },
  { slug: "pumpy-family", title: "Pumpy Family", description: "Building a vibrant community around shared values and collective growth.", caseStudyHref: "#", liveSiteHref: "#", type: "web" },
  { slug: "baird", title: "Baird", description: "Sophisticated financial management tools for established institutions.", caseStudyHref: "#", liveSiteHref: "#", type: "mobile" },
  { slug: "your-work-buddy", title: "Your Work Buddy", description: "A dedicated companion for professional productivity and focus management.", caseStudyHref: "#", liveSiteHref: "#", type: "web" },
  { slug: "send-me", title: "Send Me", description: "Redefining logistics and personal delivery services with absolute precision.", caseStudyHref: "#", liveSiteHref: "#", type: "mobile" },
];

const SLOTS = {
  mobile: {
    exitTop: { y: -900, opacity: 0, scale: 0.8 },
    focus: { y: 0, opacity: 1, scale: 1, filter: "brightness(1)" },
    enterBottom: { y: 900, opacity: 0, scale: 0.92, filter: "brightness(0.55)" },
  },
  web: {
    exitTop: { y: -900, opacity: 0, scale: 0.8 },
    focus: { y: 0, opacity: 1, scale: 1, filter: "brightness(1)" },
    enterBottom: { y: 900, opacity: 0, scale: 0.92, filter: "brightness(0.55)" },
  }
};

export default function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const heroPlaceholderRef = useRef<HTMLDivElement>(null);
  const splitStageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [activeProject, setActiveProject] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const totalScroll = 12000;
        const introDuration = 0.5;
        const projectDuration = 1.0;

        const master = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${totalScroll}`,
            pin: true,
            scrub: 1.2,
          }
        });

        // --- INITIAL STATE ---
        gsap.set(splitStageRef.current, { opacity: 0, visibility: "visible" });
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const type = projects[i].type as 'mobile' | 'web';
          if (i === 0) {
             gsap.set(card, { ...SLOTS[type].focus, opacity: 1, visibility: "visible" });
          } else {
             gsap.set(card, { ...SLOTS[type].enterBottom, opacity: 0, visibility: "visible" });
          }
        });

        // --- PHASE 1: INTRO ---
        master.to(introRef.current, { opacity: 0, y: -100, duration: introDuration, ease: "power2.out" }, 0);
        master.to(heroPlaceholderRef.current, { scale: 0.7, opacity: 0, duration: introDuration }, 0);
        master.to(splitStageRef.current, { opacity: 1, duration: 0.3 }, introDuration - 0.1);

        // --- PHASE 2: HARD SYNC SEQUENCE ---
        projects.forEach((project, i) => {
          const card = cardRefs.current[i];
          if (!card) return;

          const type = project.type as 'mobile' | 'web';
          const focusTime = introDuration + (i * projectDuration);
          const startTime = focusTime - projectDuration;

          if (i < projects.length - 1) {
            master.to(card, { ...SLOTS[type].exitTop, opacity: 0, duration: projectDuration, ease: "none" }, focusTime);
          }

          if (i > 0) {
            master.fromTo(card, 
              { ...SLOTS[type].enterBottom, opacity: 0 },
              { ...SLOTS[type].focus, opacity: 1, duration: projectDuration, ease: "none" },
              startTime
            );
          }
        });

        // SYNC TEXT
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalScroll}`,
          scrub: true,
          onUpdate: (self) => {
            const progress = Math.max(0, self.progress - 0.041);
            const totalUnits = projects.length;
            const index = Math.min(
              totalUnits - 1,
              Math.floor(progress * (totalUnits / 0.958))
            );
            setActiveProject(prev => prev !== index ? index : prev);
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const active = projects[activeProject];

  return (
    <section 
      ref={containerRef} 
      className="relative bg-black text-white w-full min-h-screen overflow-visible"
    >
      {/* DESKTOP VIEW (STICKY / GSAP) */}
      <div className="hidden md:block w-full h-screen overflow-hidden sticky top-0">
        {/* PHASE 1: INTRO */}
        <div ref={introRef} className="absolute inset-0 flex flex-col items-center pt-[10vh] z-50 pointer-events-none">
          <h2 className="font-serif italic text-[72px] leading-[1.2] text-white text-center mb-16">
            Projects and<br />Collaborations
          </h2>
          <div ref={heroPlaceholderRef} className="w-[1200px] h-[780px] bg-[#050505] border border-white/10" />
        </div>

        {/* PHASE 2: SHOWCASE */}
        <div ref={splitStageRef} className="absolute inset-0 z-10 w-full h-full flex items-center px-[40px]">
          
          {/* LEFT COLUMN */}
          <div className="w-[40%] flex flex-col justify-center pointer-events-auto">
            <div key={activeProject} className="animate-in fade-in slide-in-from-bottom-2 duration-700">
              <h3 className="font-serif italic text-[48px] leading-[1.1] text-white font-normal mb-8 whitespace-nowrap">
                {active.title}
              </h3>
              <p className="text-[18px] leading-[1.6] text-white/60 font-sans mb-10 max-w-[420px]">
                {active.description}
              </p>
              <div className="flex items-center gap-6 text-[13px] tracking-[0.08em] uppercase font-sans font-medium">
                <a href={active.caseStudyHref} className="flex items-center gap-2 hover:text-white transition-colors">
                  Read Case Study <ArrowRight size={16} />
                </a>
                <span className="text-white/20">|</span>
                <a href={active.liveSiteHref} className="flex items-center gap-2 text-[#FF6A5E] hover:opacity-80 transition-opacity">
                  View Live Site <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-[60%] h-full relative pointer-events-none overflow-visible flex items-center justify-center">
            {projects.map((project, i) => (
              <article 
                key={`${project.slug}-${i}`}
                ref={el => { cardRefs.current[i] = el; }}
                className={`absolute border border-white/12 bg-white/[0.015] will-change-transform overflow-hidden ${
                   project.type === 'mobile' ? 'w-[340px] h-[680px]' : 'w-[840px] h-[520px]'
                }`}
                style={{ 
                  boxShadow: '0 40px 100px -30px rgba(0, 0, 0, 0.9)',
                  borderRadius: project.type === 'mobile' ? '40px' : '16px',
                }}
              >
                <div className="w-full h-full flex items-center justify-center p-4">
                  <div className="w-full h-full border border-white/5 opacity-10 rounded-[inherit] overflow-hidden" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE VIEW (STANDARD SCROLL LIST) */}
      <div className="md:hidden w-full flex flex-col pt-24 pb-24 px-4 space-y-32">
        <h2 className="font-serif italic text-[44px] leading-[1.2] text-white mb-12 text-center">
          Projects and Collaborations
        </h2>
        
        {projects.map((project, i) => (
          <div key={i} className="flex flex-col space-y-10">
            {/* Visual First */}
            <div 
              className={`relative border border-white/12 bg-white/[0.015] overflow-hidden mx-auto ${
                project.type === 'mobile' ? 'w-[280px] h-[560px] rounded-[32px]' : 'w-full aspect-[16/10] rounded-[12px]'
              }`}
            >
              <div className="w-full h-full flex items-center justify-center p-4">
                <div className="w-full h-full border border-white/5 opacity-10 rounded-[inherit] overflow-hidden" />
              </div>
            </div>
            
            {/* Info Beneath */}
            <div className="flex flex-col">
              <h3 className="font-serif italic text-[32px] leading-[1.1] text-white mb-4">
                {project.title}
              </h3>
              <p className="text-[16px] leading-[1.6] text-white/60 font-sans mb-6">
                {project.description}
              </p>
              <div className="flex items-center gap-6 text-[12px] tracking-[0.08em] uppercase font-sans font-medium">
                <a href={project.caseStudyHref} className="flex items-center gap-2 hover:text-white transition-colors">
                  Read Case Study <ArrowRight size={14} />
                </a>
                <span className="text-white/20">|</span>
                <a href={project.liveSiteHref} className="flex items-center gap-2 text-[#FF6A5E] hover:opacity-80 transition-opacity">
                  View Live Site <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
