'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionWrapper } from '@/components/SectionWrapper';
import Link from 'next/link';

const projects = [
    {
        id: 1,
        client: 'The StandardX',
        title: 'A rebellious new hotel brand',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop',
        tags: ['Brand Strategy', 'Launch'],
    },
    {
        id: 2,
        client: 'Addmind Dubai',
        title: 'Redefining nightlife culture',
        image: 'https://images.unsplash.com/photo-1572360678225-b0b68eb419c7?q=80&w=1000&auto=format&fit=crop',
        tags: ['PR', 'Content'],
    },
    {
        id: 3,
        client: 'Boutique Hotel Group',
        title: 'Elevating the guest experience',
        image: 'https://images.unsplash.com/photo-1542314831-c534141d9990?q=80&w=1000&auto=format&fit=crop',
        tags: ['Digital Design', 'Web'],
    },
    {
        id: 4,
        client: 'Luxury Automotive',
        title: 'Driving culture forward',
        image: 'https://images.unsplash.com/photo-1503376713915-18831f240212?q=80&w=1000&auto=format&fit=crop',
        tags: ['Campaign', 'Motion'],
    }
];

export function WorkGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-10%' });

    return (
        <SectionWrapper id="work-grid" as="section" className="py-32 md:py-48 bg-background">
            <div className="container mx-auto px-6 lg:px-12" ref={containerRef}>
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                        Talked <br /> About.
                    </h2>
                    <Link
                        href="/work"
                        className="group flex items-center gap-4 border border-foreground rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
                        data-cursor-hover
                    >
                        <span>View All Work</span>
                        <span className="w-2 h-2 rounded-full bg-foreground group-hover:bg-background transition-colors" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-24">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className={`group flex flex-col ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
                        >
                            <div
                                className="relative w-full aspect-[4/5] overflow-hidden mb-8 rounded-xl bg-muted"
                                data-cursor-hover
                                data-cursor-text="VIEW"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                                    style={{ backgroundImage: `url(${project.image})` }}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">{project.client}</h3>
                                <p className="text-xl md:text-2xl font-serif italic text-muted-foreground">{project.title}</p>
                                <div className="flex gap-4 mt-4">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="text-xs uppercase font-semibold tracking-widest border border-muted-foreground/30 rounded-full px-4 py-1">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
