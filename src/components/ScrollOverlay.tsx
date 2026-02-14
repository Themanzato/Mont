import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, animate, useMotionValue } from 'framer-motion';

const ScrollOverlay: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [isRevealed, setIsRevealed] = useState(false);
  const opacityLimit = useMotionValue(1);

  useEffect(() => {
    const handleReveal = () => {
      setIsRevealed(true);
      animate(opacityLimit, 0, { duration: 5, ease: "easeInOut" });
    };

    window.addEventListener('reveal-light', handleReveal);
    return () => window.removeEventListener('reveal-light', handleReveal);
  }, []);
  
  // Transform scroll progress to opacity, but capped by our dynamic opacityLimit
  const rawOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const opacity = useTransform([rawOpacity, opacityLimit], ([r, l]) => Math.min(r as number, l as number));

  return (
    <>
      <motion.div 
        style={{ opacity }}
        className="fixed inset-0 bg-black pointer-events-none z-[5]"
      />
      {/* Intense white bloom effect on reveal */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 0.6 : 0 }}
        transition={{ duration: 6, ease: "easeInOut" }}
        className="fixed inset-0 bg-white pointer-events-none z-[5] mix-blend-soft-light"
      />
    </>
  );
};

export default ScrollOverlay;
