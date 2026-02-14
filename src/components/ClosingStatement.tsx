import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ClosingStatement: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const sentence = "Gracias por iluminar mi vida";

  const handleInteraction = () => {
    if (!hasStarted) {
      setHasStarted(true);
      window.dispatchEvent(new CustomEvent('reveal-light'));
    }
  };

  const typewriterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.5,
      },
    },
  };

  return (
    <section 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden cursor-pointer"
      onClick={handleInteraction}
    >
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-12">
        <AnimatePresence mode="wait">
          {!hasStarted ? (
            <motion.div
              key="interaction-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 1 } }}
              className="flex flex-col items-center space-y-8"
            >
              {/* Realistic Moon Visual */}
              <div className="relative group">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative w-16 h-16 md:w-24 md:h-24 rounded-full z-10"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, #fff 0%, #f0f0f0 40%, #dcdcdc 100%)",
                    boxShadow: "0 0 30px rgba(255, 255, 255, 0.4), inset -5px -5px 15px rgba(0,0,0,0.1)"
                  }}
                >
                  {/* Subtle Moon Texture/Craters */}
                  <div className="absolute inset-0 opacity-10 rounded-full" style={{ background: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\"/%3E%3C/svg%3E')" }} />
                  
                  {/* Moon Glow Layers */}
                  <div className="absolute -inset-4 bg-white/5 blur-xl rounded-full -z-10" />
                  <div className="absolute -inset-8 bg-white/5 blur-2xl rounded-full -z-20" />
                </motion.div>
              </div>

              {/* Minimal Mouse Hint */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="opacity-20"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1">
                   <rect x="5" y="2" width="14" height="20" rx="7" />
                   <path d="M12 6v4" />
                </svg>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="message"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center px-6"
            >
              <h2 
                className="font-serif text-3xl md:text-5xl lg:text-6xl font-light italic tracking-tight text-white/90"
                style={{ textShadow: "0 0 20px rgba(255,255,255,0.2)" }}
              >
                {sentence.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={typewriterVariants}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ClosingStatement;
