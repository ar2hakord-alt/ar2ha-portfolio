import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressBarProps {
  className?: string;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ className = '' }) => {
  const { scrollYProgress } = useScroll();
  
  // Smooth spring physics for a silky, luxury feel
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001
  });

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 h-[2.5px] bg-black/40 overflow-hidden pointer-events-none z-40 ${className}`}
      aria-hidden="true"
    >
      {/* Background track guide */}
      <div className="absolute inset-0 bg-white/[0.03]" />

      {/* Dynamic progress bar - advances right-to-left adhering to Persian RTL layout */}
      <motion.div
        style={{ scaleX }}
        className="h-full w-full origin-right bg-gradient-to-l from-amber-500 via-amber-300 to-emerald-400 shadow-[0_0_8px_rgba(251,191,36,0.65)]"
      />
    </div>
  );
};
