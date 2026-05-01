'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionWrapper } from '@/components/SectionWrapper';

const slides = [
    {
        id: 1,
        title: 'ELEVATING TOURISM.',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop',
    },
    {
        id: 2,
        title: 'CRAFTING EXPERIENCES.',
        image: 'https://images.unsplash.com/photo-1540553016722-983e48a2bc55?q=80&w=2000&auto=format&fit=crop',
    },
    {
        id: 3,
        title: 'BUILDING REPUTATIONS.',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000&auto=format&fit=crop',
    }
];

export function HorizontalGallery() {
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${100 * ((slides.length - 1) / slides.length)}%`]);

    return (
        <SectionWrapper as="section" id="horizontal-gallery" className="relative h-[300vh]" ref={targetRef}>
            <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-foreground text-background">
                <motion.div style={{ x }} className="flex w-[300vw] h-full items-center">
                    {slides.map((slide, index) => (
                        <div key={slide.id} className="w-[100vw] h-screen flex items-center justify-center relative px-6 md:px-24">
                            {/* Progress indicator */}
                            <div className="absolute top-1/4 md:top-[15%] left-6 md:left-24 font-serif text-3xl z-20">
                                {`0${index + 1} / 0${slides.length}`}
                            </div>

                            <div className="relative w-full max-w-7xl h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden group" data-cursor-hover data-cursor-text="EXPLORE">
                                <div
                                    className="absolute inset-0 bg-cover bg-center origin-center transition-transform duration-[2s] group-hover:scale-105"
                                    style={{ backgroundImage: `url(${slide.image})` }}
                                />
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="absolute inset-0 p-8 md:p-16 flex items-end">
                                    <h2 className="text-4xl md:text-7xl font-bold tracking-tighter w-full max-w-4xl leading-[0.9]">
                                        {slide.title}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
