import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import medicalFlyer from '../assets/medical_flyer.jpg';

export default function PopupAnnouncement() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
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
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-40 flex min-h-[100vh] items-center justify-center overflow-y-auto px-4 pb-8 pt-[120px] sm:px-6 lg:px-8"
          onClick={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm"></div>

          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 30 }}
            transition={{ duration: 0.35, type: 'spring', stiffness: 100, damping: 20 }}
            className="relative z-10 my-auto flex w-full max-w-[850px] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -right-3 -top-3 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm transition hover:bg-[#f5f5f5] md:-right-5 md:-top-5 md:h-12 md:w-12"
              aria-label="Close popup"
            >
              <X size={24} />
            </button>

            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full rounded-[1.5rem] border border-black/10 bg-white p-2 shadow-sm md:rounded-[2rem] md:p-4"
            >
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="relative flex w-full items-center justify-center overflow-hidden rounded-[1rem] group cursor-pointer md:rounded-[1.5rem]"
              >
                <img
                  src={medicalFlyer}
                  alt="APJ Paramedical Admissions Open Flyer"
                  className="block h-auto max-h-[70vh] w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
