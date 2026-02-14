import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpandingGalleryProps {
  show: boolean;
}

const images = [
  '/images/WhatsApp Image 2026-02-13 at 23.21.58.jpeg',
  '/images/WhatsApp Image 2026-02-13 at 23.21.59.jpeg',
  '/images/WhatsApp Image 2026-02-13 at 23.22.00.jpeg',
  '/images/WhatsApp Image 2026-02-13 at 23.22.00 (1).jpeg',
  '/images/WhatsApp Image 2026-02-13 at 23.22.01.jpeg',
  '/images/WhatsApp Image 2026-02-13 at 23.22.01 (1).jpeg',
];

// Defined positions for a scattered but balanced look (x, y, rotation)
const positions = [
  { x: '-35vw', y: '-30vh', rotate: -12, scale: 1.1 },
  { x: '35vw', y: '-25vh', rotate: 8, scale: 0.9 },
  { x: '-40vw', y: '5vh', rotate: 15, scale: 1.0 },
  { x: '42vw', y: '10vh', rotate: -5, scale: 1.2 },
  { x: '-30vw', y: '35vh', rotate: -8, scale: 0.95 },
  { x: '32vw', y: '30vh', rotate: 10, scale: 1.05 },
];

const ExpandingGallery: React.FC<ExpandingGalleryProps> = ({ show }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {show && images.map((src, index) => (
          <motion.div
            key={src}
            initial={{ 
              opacity: 0, 
              scale: 0.3, 
              x: 0, 
              y: 0,
              rotate: 0 
            }}
            animate={{ 
              opacity: 0.7, 
              scale: positions[index].scale, 
              x: positions[index].x, 
              y: positions[index].y,
              rotate: positions[index].rotate 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.2, 
              x: 0, 
              y: 0,
              rotate: 0 
            }}
            transition={{ 
              duration: 1.8, 
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="absolute w-48 md:w-64 aspect-[3/4] md:aspect-auto"
          >
            <div className="relative w-full h-full p-2 bg-white/5 backdrop-blur-sm rounded-lg shadow-2xl border border-white/10 overflow-hidden transform-gpu">
              <img 
                src={src} 
                alt={`Memory ${index + 1}`} 
                className="w-full h-full object-cover rounded-md grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-none" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ExpandingGallery;
