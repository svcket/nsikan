'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [hoverText, setHoverText] = useState('');

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for specific interactive elements
            const isClickable = target.closest('a') !== null ||
                target.closest('button') !== null ||
                target.hasAttribute('data-cursor-hover');

            if (isClickable) {
                setIsHovering(true);
                const customText = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
                if (customText) {
                    setHoverText(customText);
                } else {
                    setHoverText('');
                }
            } else {
                setIsHovering(false);
                setHoverText('');
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 10,
            y: mousePosition.y - 10,
            width: 20,
            height: 20,
            backgroundColor: 'rgb(255, 255, 255)',
            mixBlendMode: 'difference' as const,
            opacity: 1,
        },
        hover: {
            x: mousePosition.x - (hoverText ? 40 : 30),
            y: mousePosition.y - (hoverText ? 40 : 30),
            width: hoverText ? 80 : 60,
            height: hoverText ? 80 : 60,
            backgroundColor: hoverText ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.2)',
            mixBlendMode: 'normal' as const,
            color: '#000',
            opacity: 1,
        },
    };

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] flex items-center justify-center text-[10px] font-bold tracking-widest hidden md:flex"
            variants={variants}
            animate={isHovering || hoverText ? 'hover' : 'default'}
            transition={{
                type: 'spring',
                stiffness: 500,
                damping: 28,
                mass: 0.5,
            }}
        >
            {hoverText && (
                <span className="text-black uppercase">{hoverText}</span>
            )}
        </motion.div>
    );
}
