'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Magnetic button or split text effect can be added here
const navbarLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'What We Do', href: '/what-we-do' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex-1">
                    <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter" data-cursor-hover>
                        EXAMPLE.
                    </Link>
                </div>

                {/* Center: Links */}
                <nav className="hidden md:flex items-center justify-center space-x-8 flex-1">
                    {navbarLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-sm font-semibold uppercase tracking-widest relative group overflow-hidden"
                            data-cursor-hover
                        >
                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                                {link.label}
                            </span>
                            <span className="absolute left-0 top-full inline-block transition-transform duration-300 group-hover:-translate-y-full">
                                {link.label}
                            </span>
                        </Link>
                    ))}
                </nav>

                {/* Right: Contact CTA */}
                <div className="flex-1 flex justify-end">
                    <Link
                        href="mailto:hello@weareexample.com"
                        className="hidden md:block text-sm font-semibold uppercase tracking-widest border-b border-foreground hover:opacity-70 transition-opacity"
                        data-cursor-hover
                    >
                        hello@weareexample.com
                    </Link>
                    {/* Mobile menu trigger could go here */}
                    <button className="md:hidden text-sm uppercase font-bold tracking-widest">
                        Menu
                    </button>
                </div>
            </div>
        </motion.header>
    );
}

