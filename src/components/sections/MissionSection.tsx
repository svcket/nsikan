'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { SectionWrapper } from '@/components/SectionWrapper';

export function MissionSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, margin: '-20%' });

    return (
        <SectionWrapper id="mission" as="section" className="py-32 md:py-48 bg-background relative z-10">
            <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-12 lg:gap-24" ref={containerRef}>

                <div className="w-full md:w-1/3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                        className="sticky top-32 flex flex-col items-start gap-8"
                    >
                        <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-widest text-muted-foreground">What We Do</h2>
                        <button
                            className="group flex items-center gap-4 border border-foreground rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
                            data-cursor-hover
                        >
                            <span>Our Services</span>
                            <span className="w-2 h-2 rounded-full bg-foreground group-hover:bg-background transition-colors" />
                        </button>
                    </motion.div>
                </div>

                <div className="w-full md:w-2/3">
                    <h3 className="text-3xl md:text-5xl lg:text-7xl leading-snug font-serif">
                        {['In', 'a', 'world', 'overloaded', 'with', 'noise,', 'we', 'build', 'brands', 'that', 'cut', 'through', 'the', 'superficial.', 'We', 'are', 'an', 'agency', 'rooted', 'in', 'earned', 'culture.'].map((word, i) => (
                            <span key={i} className="inline-block mr-3 md:mr-6 mb-2 overflow-hidden">
                                <motion.span
                                    className="inline-block"
                                    initial={{ y: '100%' }}
                                    animate={isInView ? { y: 0 } : { y: '100%' }}
                                    transition={{
                                        duration: 0.8,
                                        ease: [0.16, 1, 0.3, 1],
                                        delay: 0.1 + i * 0.03,
                                    }}
                                >
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </h3>
                </div>

            </div>
        </SectionWrapper>
    );
}
