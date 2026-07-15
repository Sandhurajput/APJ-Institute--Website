import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, PhoneCall, Mail, ChevronUp } from 'lucide-react';

export default function FloatingContactButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Show scroll-to-top button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const buttons = [
    {
      icon: <Mail size={22} />,
      label: 'Email Us',
      href: 'mailto:info@apjinstitutedantewada.com',
      color: 'hover:text-indigo-400',
      glow: 'hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]',
      border: 'hover:border-indigo-500'
    },
    {
      icon: <PhoneCall size={22} />,
      label: 'Call Now',
      href: 'tel:9243758191',
      color: 'hover:text-blue-400',
      glow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]',
      border: 'hover:border-blue-500'
    },
    {
      icon: <MessageCircle size={22} />,
      label: 'WhatsApp',
      href: 'https://wa.me/919243758191',
      color: 'hover:text-emerald-400',
      glow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]',
      border: 'hover:border-emerald-500'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Scroll to Top */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-white flex items-center justify-center shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:border-white/30 transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <div 
        className="relative flex flex-col items-end"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Floating Actions */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2, staggerChildren: 0.1, delayChildren: 0.1 }}
              className="flex flex-col gap-3 mb-3 items-end"
            >
              {buttons.map((btn, index) => (
                <motion.a
                  key={index}
                  href={btn.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 text-white shadow-xl transition-all duration-300 group ${btn.glow} ${btn.border}`}
                >
                  <span className="text-sm font-semibold whitespace-nowrap">{btn.label}</span>
                  <div className={`transition-colors duration-300 ${btn.color}`}>
                    {btn.icon}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Trigger Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(30,58,95,0.4)] border transition-all duration-300 ${isOpen ? 'bg-[#1e3a5f] border-[#1e3a5f] shadow-[0_0_30px_rgba(30,58,95,0.8)]' : 'bg-gradient-to-tr from-[#1e3a5f] to-blue-500 border-blue-400/30'}`}
          aria-label="Contact options"
        >
          <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3, type: "spring", stiffness: 200 }}>
             {isOpen ? <div className="text-2xl font-light">×</div> : <MessageCircle size={26} className="animate-pulse" />}
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
