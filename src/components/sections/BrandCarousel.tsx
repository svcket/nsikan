'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/SectionWrapper';

const brands = [
    'NIKE', 'LVMH', 'RED BULL', 'PORSCHE', 'RIMOWA', 'DIOR', 'SPOTIFY', 'SOHO HOUSE', 'AUDI'
];

export function BrandCarousel() {
    return (
        <SectionWrapper id="brands" as="section" className="py-24 md:py-32 bg-foreground text-background overflow-hidden relative">
            <div className="container mx-auto px-6 lg:px-12 mb-16">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80 mb-4">
                    We work with the biggest brands
                </h2>
            </div>

            <div className="relative w-full flex whitespace-nowrap overflow-hidden py-12 border-y border-muted-foreground/20">
                {/* Marquee Container */}
                <div className="animate-marquee flex gap-16 md:gap-32 items-center">
                    {[...brands, ...brands, ...brands].map((brand, i) => (
                        <span
                            key={i}
                            className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter uppercase inline-block mx-4 hover:italic hover:text-muted transition-all duration-300"
                            data-cursor-hover
                        >
                            {brand}
                        </span>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
