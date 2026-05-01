'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionWrapper } from '@/components/SectionWrapper';

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    // Parallax calculations for floating elements
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);

    return (
        <SectionWrapper
            id="hero"
            as="section"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20"
            ref={containerRef}
        >
            {/* Background massive text */}
            <motion.div
                style={{ y: textY }}
                className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center mt-12 md:mt-24"
            >
                <h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter uppercase text-foreground m-0 p-0 flex flex-col">
                    <motion.span
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="block"
                    >
                        An Earned-Led
                    </motion.span>
                    <motion.span
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="block italic font-serif text-muted-foreground mr-12 md:mr-24"
                    >
                        Culture
                    </motion.span>
                    <motion.span
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        className="block"
                    >
                        Agency.
                    </motion.span>
                </h1>
            </motion.div>

            {/* Floating Image 1 */}
            <motion.div
                style={{ y: y1 }}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: -6 }}
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                className="absolute top-[15%] left-[5%] md:left-[10%] w-48 h-64 md:w-64 md:h-80 bg-muted rounded-lg shadow-2xl z-20 overflow-hidden hidden md:block"
                data-cursor-hover
                data-cursor-text="VIEW"
            >
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>

            {/* Floating Image 2 */}
            <motion.div
                style={{ y: y2 }}
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 8 }}
                transition={{ duration: 1.5, delay: 0.7, ease: 'easeOut' }}
                className="absolute top-[40%] right-[3%] md:right-[5%] w-56 h-72 md:w-72 md:h-[26rem] bg-muted rounded-lg shadow-2xl z-20 overflow-hidden hidden md:block"
                data-cursor-hover
                data-cursor-text="VIEW"
            >
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>

            {/* Floating Image 3 */}
            <motion.div
                style={{ y: y3 }}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                transition={{ duration: 1.5, delay: 0.9, ease: 'easeOut' }}
                className="absolute bottom-[-10%] md:bottom-[5%] left-[45%] md:left-[55%] w-60 h-40 md:w-80 md:h-56 bg-muted rounded-lg shadow-2xl z-20 overflow-hidden hidden md:block"
                data-cursor-hover
                data-cursor-text="VIEW"
            >
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>

            {/* Scroll indicator overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
            >
                <span className="text-xs uppercase tracking-widest font-semibold">Scroll</span>
                <div className="w-[1px] h-12 bg-foreground/30 relative overflow-hidden">
                    <motion.div
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                        className="absolute top-0 left-0 w-full h-full bg-foreground"
                    />
                </div>
            </motion.div>
        </SectionWrapper>
    );
}
