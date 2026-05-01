'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface PreloaderIntroProps {
  onComplete: () => void;
}

/**
 * LogoLockup Component
 * Using the newly provided high-fidelity preload assets.
 */
function LogoLockup({ isActive = false }: { isActive?: boolean }) {
  return (
    <div className={`flex items-center ${isActive ? 'opacity-100' : 'opacity-20'}`}>
      <div className="h-[clamp(40px,10vw,80px)] flex items-center">
        <img 
          src={isActive ? "/assets/preload - active.png" : "/assets/preload - inactive.png"} 
          alt="Nsikan Etukudoh" 
          className="h-full w-auto block select-none"
          style={{ maxWidth: 'none' }}
        />
      </div>
    </div>
  );
}

export default function PreloaderIntro({ onComplete }: PreloaderIntroProps) {
  const shouldReduceMotion = useReducedMotion();
  const easingCurve: [number, number, number, number] = [0.76, 0, 0.24, 1];

  return (
    <div className="relative">
      {/* Background (Inactive) Layer */}
      <div className="relative">
        <LogoLockup isActive={false} />
      </div>

      {/* Foreground (Active/Reveal) Layer */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{
          duration: shouldReduceMotion ? 0 : 5,
          ease: easingCurve,
        }}
        onAnimationComplete={() => {
          setTimeout(() => {
            onComplete();
          }, 1500);
        }}
      >
        <LogoLockup isActive={true} />
      </motion.div>
    </div>
  );
}
