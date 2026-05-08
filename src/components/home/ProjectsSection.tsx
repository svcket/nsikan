'use client';

import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

gsap.registerPlugin(ScrollTrigger);

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
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  
  const [projects, setProjects] = useState<any[]>([]);
  const [activeProject, setActiveProject] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects')
        if (!res.ok) {
          const text = await res.text()
          throw new Error(`API ${res.status}: ${text.slice(0, 200)}`)
        }
        const body = await res.json()
        const data = body.projects

        if (!data || !Array.isArray(data)) {
          setFetchError(`Bad response shape: ${JSON.stringify(body).slice(0, 200)}`);
          setProjects([]);
          return;
        }

        if (data.length === 0) {
          setFetchError('Sanity returned 0 projects — check dataset/projectId');
          setProjects([]);
          return;
        }

        const projectOrder = [
          'torq', 'breedjr', 'isang', 'ping', 'masomo',
          'lecoindine', 'lstnr', 'plugin', 'esbabi'
        ];

        const sortedData = [...data].sort((a: any, b: any) => {
          const aIndex = projectOrder.indexOf(a.slug);
          const bIndex = projectOrder.indexOf(b.slug);
          if (aIndex === -1 && bIndex === -1) return 0;
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });

        setProjects(sortedData);
      } catch (error: any) {
        const msg = error?.message || String(error)
        console.error('Error fetching projects:', msg);
        setFetchError(msg);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  useLayoutEffect(() => {
    if (loading || projects.length === 0) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const totalScroll = 8000;
        const introDuration = 0.15;
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
          if (!card || !projects[i]) return;
          const layout = (projects[i].layout || 'web') as 'mobile' | 'web';
          if (i === 0) {
             gsap.set(card, { ...SLOTS[layout].focus, opacity: 1, visibility: "visible" });
          } else {
             gsap.set(card, { ...SLOTS[layout].enterBottom, opacity: 0, visibility: "visible" });
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

          const layout = (project.layout || 'web') as 'mobile' | 'web';
          const focusTime = introDuration + (i * projectDuration);
          const startTime = focusTime - projectDuration;

          if (i < projects.length - 1) {
            master.to(card, { ...SLOTS[layout].exitTop, opacity: 0, duration: projectDuration, ease: "none" }, focusTime);
          }

          if (i > 0) {
            master.fromTo(card, 
              { ...SLOTS[layout].enterBottom, opacity: 0 },
              { ...SLOTS[layout].focus, opacity: 1, duration: projectDuration, ease: "none" },
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
  }, [loading, projects]);

  const active = projects.length > 0 ? projects[activeProject] : null;

  return (
    <section 
      id="projects"
      ref={containerRef} 
      className="relative bg-black text-white w-full min-h-screen overflow-visible"
    >
      {fetchError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 gap-4 px-8 text-center">
          <p className="text-red-400 font-mono text-sm max-w-xl break-all">{fetchError}</p>
        </div>
      )}
      {(loading || (!active && !fetchError)) && (
        <div className="absolute inset-0 flex items-center justify-center text-white/20 font-serif italic text-2xl z-50">
          Initializing Projects...
        </div>
      )}

      {/* DESKTOP VIEW (STICKY / GSAP) */}
      <div className={`hidden md:block w-full h-screen overflow-hidden sticky top-0 ${!active ? 'opacity-0' : 'opacity-100'}`}>
        {/* PHASE 1: INTRO */}
        <div ref={introRef} className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none">
          <h2 className="font-serif italic text-[72px] leading-[1.2] text-white text-center">
            Projects and<br />Collaborations
          </h2>
        </div>

        {/* PHASE 2: SHOWCASE */}
        <div ref={splitStageRef} className="absolute inset-0 z-10 w-full h-full flex items-center px-[40px]">
          
          {/* LEFT COLUMN */}
          <div className="w-[40%] flex flex-col justify-center pointer-events-auto">
            {active && (
              <div key={activeProject} className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                <div className="flex flex-wrap gap-2 mb-4">
                  {active.tags?.map((tag: string) => (
                    <span key={tag} className="text-[11px] tracking-widest uppercase opacity-40 font-sans px-2 py-1 border border-white/10 rounded-none">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-serif italic text-[48px] leading-[1.1] text-white font-normal mb-8 whitespace-nowrap">
                  {active.title}
                </h3>
                <p className="text-[18px] leading-[1.6] text-white/60 font-sans mb-10 max-w-[420px]">
                  {active.heroDescription}
                </p>
                <div className="flex items-center gap-6 text-[13px] tracking-[0.08em] uppercase font-sans font-medium">
                  <Link href={`/projects/${active.slug}`} className="flex items-center gap-2 hover:text-white transition-colors">
                    Read Case Study <ArrowRight size={16} />
                  </Link>
                  {active.liveSiteHref && (
                    <>
                      <span className="text-white/20">|</span>
                      <a href={active.liveSiteHref} className="flex items-center gap-2 text-[#A8E06C] hover:opacity-80 transition-opacity">
                        View Live Site <ArrowUpRight size={16} />
                      </a>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-[60%] h-full relative pointer-events-none overflow-visible flex items-center justify-center">
            {projects.map((project, i) => (
              <article 
                key={`${project.slug}-${i}`}
                ref={el => { cardRefs.current[i] = el; }}
                className={`absolute bg-[#050505] will-change-transform overflow-hidden ${
                   project.layout === 'mobile' ? 'w-[340px] h-auto' : 'w-[840px] h-auto'
                }`}
                style={{ 
                  boxShadow: '0 40px 100px -30px rgba(0, 0, 0, 0.9)',
                  borderRadius: '0px',
                }}
              >
                <div className="w-full relative">
                   {project.heroVisual?.video?.asset?.url ? (
                      <video 
                        src={project.heroVisual.video.asset.url} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="w-full h-auto block object-cover" 
                      />
                   ) : (project.heroVisual?.image && (project.heroVisual.image.url || project.heroVisual.image.asset || project.heroVisual.image._ref)) ? (
                      <img 
                        src={project.heroVisual.image.url || urlFor(project.heroVisual.image).url()} 
                        alt="" 
                        className="w-full h-auto block object-cover" 
                      />
                   ) : (project.discoveryVisual?.image && (project.discoveryVisual.image.url || project.discoveryVisual.image.asset || project.discoveryVisual.image._ref)) ? (
                      <img 
                        src={project.discoveryVisual.image.url || urlFor(project.discoveryVisual.image).url()} 
                        alt="" 
                        className="w-full h-auto block object-cover" 
                      />
                   ) : project.discoveryVisual ? (
                      <img 
                        src={urlFor(project.discoveryVisual).url()} 
                        alt="" 
                        className="w-full h-auto block object-cover" 
                      />
                   ) : project.icon ? (
                      <div className="w-full aspect-video flex items-center justify-center p-12">
                        <img 
                          src={urlFor(project.icon).url()} 
                          alt="" 
                          className="w-32 h-32 object-contain opacity-20 grayscale" 
                        />
                      </div>
                   ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE VIEW (STANDARD SCROLL LIST) */}
      <div className="md:hidden w-full flex flex-col pt-24 px-4 space-y-32">
        <h2 className="font-serif italic text-[44px] leading-[1.2] text-white mb-12 text-center">
          Projects and Collaborations
        </h2>
        
        {projects.map((project, i) => (
          <div key={i} className="flex flex-col space-y-10">
            {/* Visual First */}
            <div 
              className={`relative bg-[#050505] overflow-hidden mx-auto rounded-none ${
                project.layout === 'mobile' ? 'w-[280px] h-auto' : 'w-full h-auto'
              }`}
            >
              <div className="w-full relative">
                   {project.heroVisual?.video?.asset?.url ? (
                      <video 
                        src={project.heroVisual.video.asset.url} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="w-full h-auto block object-cover" 
                      />
                   ) : (project.heroVisual?.image && (project.heroVisual.image.url || project.heroVisual.image.asset || project.heroVisual.image._ref)) ? (
                      <img 
                        src={project.heroVisual.image.url || urlFor(project.heroVisual.image).url()} 
                        alt="" 
                        className="w-full h-auto block object-cover" 
                      />
                   ) : (project.discoveryVisual?.image && (project.discoveryVisual.image.url || project.discoveryVisual.image.asset || project.discoveryVisual.image._ref)) ? (
                      <img 
                        src={project.discoveryVisual.image.url || urlFor(project.discoveryVisual.image).url()} 
                        alt="" 
                        className="w-full h-auto block object-cover" 
                      />
                   ) : project.icon ? (
                      <div className="w-full aspect-video flex items-center justify-center p-8">
                        <img 
                          src={urlFor(project.icon).url()} 
                          alt="" 
                          className="w-20 h-20 object-contain opacity-20 grayscale" 
                        />
                      </div>
                   ) : null}
              </div>
            </div>
            
            {/* Info Beneath */}
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.map((tag: string) => (
                  <span key={tag} className="text-[10px] tracking-widest uppercase opacity-40 font-sans px-2 py-1 border border-white/10 rounded-none">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-serif italic text-[32px] leading-[1.1] text-white mb-4">
                {project.title}
              </h3>
              <p className="text-[16px] leading-[1.6] text-white/60 font-sans mb-6">
                {project.heroDescription}
              </p>
              <div className="flex items-center gap-6 text-[12px] tracking-[0.08em] uppercase font-sans font-medium">
                <Link href={`/projects/${project.slug}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  Read Case Study <ArrowRight size={14} />
                </Link>
                {project.liveSiteHref && (
                  <>
                    <span className="text-white/20">|</span>
                    <a href={project.liveSiteHref} className="flex items-center gap-2 text-[#A8E06C] hover:opacity-80 transition-opacity">
                      View Live Site <ArrowUpRight size={14} />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
