'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionWrapper } from '@/components/SectionWrapper';

export function NewsletterSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-20%' });

    return (
        <SectionWrapper id="newsletter" as="section" className="py-32 md:py-48 bg-background relative z-10 rounded-b-3xl" ref={containerRef}>
            <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-16">

                {/* Massive Etcetera Type */}
                <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start">
                    <h2 className="text-[15vw] md:text-[8rem] lg:text-[12rem] font-bold tracking-tighter uppercase leading-[0.8] flex flex-col items-center md:items-start text-foreground">
                        {['ETC', 'ETE', 'RA'].map((syllable, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: 50, opacity: 0 }}
                                animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                                transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="block"
                                data-cursor-hover
                            >
                                {syllable}
                            </motion.span>
                        ))}
                    </h2>
                </div>

                {/* Form Container */}
                <div className="w-full md:w-1/2 flex flex-col max-w-lg">
                    <h3 className="text-3xl md:text-5xl font-serif italic mb-6">A digest of culture, delivered to your inbox.</h3>
                    <p className="text-muted-foreground text-lg mb-12">Insights, events, and noise worth hearing from around our network.</p>

                    <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
                        <div className="relative border-b-2 border-foreground pb-2 group pb-4">
                            <input
                                type="email"
                                placeholder="ENTER YOUR EMAIL ADDRESS"
                                className="w-full bg-transparent outline-none text-xl md:text-2xl font-bold uppercase tracking-widest placeholder:text-muted-foreground"
                                required
                            />
                            {/* The underline expansion effect could be added here via group-hover or motion */}
                        </div>
                        <button
                            type="submit"
                            className="group self-start flex items-center gap-4 bg-foreground text-background rounded-full px-12 py-5 text-sm font-bold uppercase tracking-wider hover:bg-transparent hover:text-foreground border border-foreground transition-all duration-300"
                            data-cursor-hover
                            data-cursor-text="SUBMIT"
                        >
                            <span className="relative overflow-hidden inline-block">
                                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Sign Me Up</span>
                                <span className="absolute left-0 top-full inline-block transition-transform duration-300 group-hover:-translate-y-full">Sign Me Up</span>
                            </span>
                            <span className="w-2 h-2 rounded-full bg-background group-hover:bg-foreground transition-colors" />
                        </button>
                    </form>
                </div>

            </div>
        </SectionWrapper>
    );
}
