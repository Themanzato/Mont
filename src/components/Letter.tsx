import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandingGallery from './ExpandingGallery';
import ScrollIndicator from './ScrollIndicator';

const Letter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  React.useEffect(() => {
    setIsReady(true);
  }, []);

  const toggleEnvelope = () => setIsOpen(!isOpen);

  if (!isReady) return null;

  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center p-6 md:p-12 overflow-visible">
      {/* Background Gallery */}
      <ExpandingGallery show={isOpen} />

      {/* Scroll Hint */}
      <ScrollIndicator />

      <div 
        className="relative perspective-1500 cursor-pointer group z-10"
        onClick={toggleEnvelope}
      >
        {/* Envelope Container */}
        <motion.div 
          animate={{ 
            rotateX: isOpen ? 10 : 0,
            scale: isOpen ? 1.05 : 1,
            y: isOpen ? 100 : 0
          }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-[320px] h-[220px] md:w-[450px] md:h-[300px] preserve-3d"
        >
          {/* Back of Envelope */}
          <div className="absolute inset-0 bg-[#e5e1da] shadow-xl rounded-sm border border-black/5" />

          {/* Paper Content */}
          <motion.div 
            initial={false}
            animate={{ 
              y: isOpen ? -380 : 0,
              height: isOpen ? (window.innerWidth < 768 ? 450 : 600) : (window.innerWidth < 768 ? 190 : 270),
              zIndex: isOpen ? 50 : 10
            }}
            transition={{ 
              duration: 1.5, 
              delay: isOpen ? 0.6 : 0,
              ease: [0.34, 1.56, 0.64, 1] 
            }}
            className="absolute inset-x-4 top-4 bg-[#fdfcf0] rounded-sm shadow-sm p-8 md:p-12 border border-black/5 flex flex-col overflow-hidden"
            style={{
              backgroundImage: 'linear-gradient(#f1eee3 1px, transparent 1px)',
              backgroundSize: '100% 2.2rem',
              transformOrigin: 'bottom center'
            }}
          >
            {/* Notebook Margin Line */}
            <div className="absolute left-10 top-0 bottom-0 w-px bg-rose-200/50" />

            <div className="relative z-10 flex-1">
              <header className="mb-8">
                <span className="text-xs uppercase tracking-[0.2em] text-black/30 font-sans block mb-2">
                  14 de Febrero, 2026
                </span>
                <h2 className="font-serif text-2xl text-black/80 italic font-light">
                  Querida Monti
                </h2>
              </header>

              <div className="font-serif text-lg md:text-xl text-black/70 leading-[2.2rem] space-y-4 font-light italic">
                <p>
                  Necesito mil cartas para expresar el amor que siento por ti, eres todo lo que un día soñé.
                </p>
                <p>
                  Agradeceré cada minuto a tu lado y besaré tu mano por el resto de mis días.
                </p>
                <p>
                  que este pequeño gesto sea un reflejo del gran amor que siento por ti.
                </p>
              </div>

              <footer className="mt-12">
                <p className="font-serif text-2xl italic text-black/50">
                  con cariño, el amor de tu vida.
                </p>
              </footer>
            </div>
          </motion.div>

          {/* Side Flaps */}
          <div className="absolute inset-0 z-20 pointer-events-none">
             {/* Left Flap */}
             <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#efede8] [clip-path:polygon(0_0,100%_50%,0_100%)] border-l border-black/5" />
             {/* Right Flap */}
             <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#efede8] [clip-path:polygon(100%_0,0_50%,100%_100%)] border-r border-black/5" />
             {/* Bottom Flap */}
             <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#f5f3f0] [clip-path:polygon(0_100%,50%_0,100%_100%)] border-b border-black/5 shadow-inner" />
          </div>

          {/* Top Flap (The one that opens) */}
          <motion.div 
            initial={false}
            animate={{ 
              rotateX: isOpen ? -170 : 0,
              zIndex: isOpen ? 5 : 30
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ transformOrigin: 'top center' }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#fbfaf8] [clip-path:polygon(0_0,50%_100%,100%_0)] border-t border-black/5 shadow-md flex items-center justify-center"
          >
            {/* Wax Seal - Minimal/Modern equivalent */}
            {!isOpen && (
              <motion.div 
                exit={{ opacity: 0 }}
                className="w-10 h-10 rounded-full bg-rose-900/10 border border-rose-900/20 flex items-center justify-center"
              >
                <div className="w-6 h-6 rounded-full border border-rose-900/20" />
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Interaction Hint */}
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="absolute -bottom-12 left-0 right-0 text-center font-sans text-[10px] uppercase tracking-[0.3em] text-white/40"
          >
            Haz clic para abrir
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Letter;
