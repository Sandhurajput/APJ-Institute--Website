import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import medicalFlyer from '../assets/medical_flyer.jpg';

export default function PopupAnnouncement() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup 500ms after page loads
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-40 flex items-center justify-center min-h-[100vh] pt-[120px] pb-8 px-4 sm:px-6 lg:px-8 overflow-y-auto"
          onClick={() => setIsOpen(false)}
        >
          {/* Cinematic Background */}
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-lg"></div>
          
          {/* Subtle medical patterns */}
          <div className="fixed inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none"></div>

          {/* Premium blue spotlight glow */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1000px] aspect-square bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="fixed bottom-0 right-0 w-[50vw] aspect-square bg-sky-400/10 rounded-full blur-[150px] pointer-events-none"></div>

          {/* Main Content Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 40 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 20 }}
            className="relative w-full max-w-[850px] z-10 flex flex-col items-center my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-5 -right-5 md:-top-7 md:-right-7 z-50 inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)] border border-blue-400/40 transition-all duration-300 hover:bg-slate-800 hover:scale-110 active:scale-95"
              aria-label="Close popup"
            >
              <X size={24} />
            </button>

            {/* Poster Container with floating animation and glassmorphism */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full rounded-2xl md:rounded-[2.5rem] bg-transparent p-2 md:p-5 backdrop-blur-2xl border border-blue-400/30 shadow-[0_0_60px_-5px_rgba(37,99,235,0.6)] hover:shadow-[0_0_90px_-5px_rgba(59,130,246,0.8)] transition-shadow duration-500"
            >
              {/* Blue Corner Glows */}
              <div className="pointer-events-none absolute -top-3 -left-3 w-16 h-16 rounded-full bg-blue-500/60 blur-xl z-20"></div>
              <div className="pointer-events-none absolute -top-3 -right-3 w-16 h-16 rounded-full bg-blue-400/60 blur-xl z-20"></div>
              <div className="pointer-events-none absolute -bottom-3 -left-3 w-16 h-16 rounded-full bg-sky-500/60 blur-xl z-20"></div>
              <div className="pointer-events-none absolute -bottom-3 -right-3 w-16 h-16 rounded-full bg-blue-500/60 blur-xl z-20"></div>
              <Link 
                to="/contact" 
                onClick={() => setIsOpen(false)}
                className="relative w-full flex justify-center items-center overflow-hidden rounded-xl md:rounded-[2rem] group cursor-pointer"
              >
                <img
                  src={medicalFlyer}
                  alt="APJ Paramedical Admissions Open Flyer"
                  className="w-full h-auto max-h-[70vh] object-contain block transition-transform duration-700 group-hover:scale-[1.03]"
                />
                
                {/* Glow border overlay on image */}
                <div className="absolute inset-0 rounded-xl md:rounded-[2rem] ring-1 ring-inset ring-white/20 group-hover:ring-blue-400/60 transition-all duration-500 pointer-events-none"></div>

                {/* Premium overlay badge */}
                <div className="absolute inset-0 bg-blue-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[4px]">
                  <span className="bg-gradient-to-r from-blue-600 to-sky-500 text-white text-sm md:text-lg font-black tracking-[0.2em] uppercase px-8 py-4 rounded-full shadow-[0_20px_40px_rgba(37,99,235,0.6)] border border-white/20 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                    Apply Admission Online
                  </span>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
