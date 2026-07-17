import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FaFlask, FaEye, FaMicroscope, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from './Logo';
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
            {/* Digital Poster Section */}
              <div className="relative overflow-hidden bg-gradient-to-b from-blue-700 via-blue-600 to-blue-800 p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 -mr-32 -mt-32 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
              
              {/* Content */}
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-white/10 p-1 flex items-center justify-center">
                    <Logo size="sm" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">APJ Institute</p>
                    <p className="text-[11px] text-blue-100">Dantewada</p>
                  </div>
                </div>
                {/* Header Badge */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.05, duration: 0.3 }}
                  className="flex flex-col gap-2"
                >
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm w-fit">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    LIMITED SEATS AVAILABLE
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">ADMISSION OPEN 2026-27</h2>
                  <p className="text-yellow-200 text-sm font-semibold">पैरामेडिकल कोर्स से तिजोरी अपने सपनों को नई उड़ान दो</p>
                </motion.div>

                {/* Courses Section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="mt-4"
                >
                  <h3 className="text-xs font-bold text-blue-100 uppercase tracking-widest mb-3">🎓 COURSES AVAILABLE</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: FaFlask, label: 'BMLT', duration: '3 Years', desc: 'Bachelor of Medical Lab' },
                      { icon: FaFlask, label: 'DMLT', duration: '2 Years', desc: 'Diploma in Medical Lab' },
                      { icon: FaEye, label: 'X-RAY', duration: '2 Years', desc: 'Diploma in X-ray' },
                      { icon: FaMicroscope, label: 'LAB TECH', duration: 'Certificate', desc: 'In Medical Lab Tech' },
                    ].map((course, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.12 + idx * 0.05, duration: 0.3 }}
                        className="bg-white/10 backdrop-blur-md border border-white/25 rounded-lg p-2.5 text-center hover:bg-white/15 transition-all group"
                      >
                        <course.icon className="text-yellow-300 text-lg mx-auto mb-1 group-hover:scale-110 transition" />
                        <p className="text-xs font-bold text-white">{course.label}</p>
                        <p className="text-[9px] text-blue-100">{course.duration}</p>
                        <p className="text-[8px] text-blue-200 mt-0.5">{course.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Mid Highlight */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <h3 className="text-xs font-bold text-blue-100 uppercase tracking-widest mb-3">⭐ MID HIGHLIGHT</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { icon: '100%', label: 'Practical Training' },
                      { icon: '👨‍🏫', label: 'Experienced Faculty' },
                      { icon: '🔬', label: 'Modern Lab' },
                      { icon: '🎯', label: 'Career Guidance' },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-2 text-center hover:bg-white/15 transition"
                      >
                        <p className="text-lg mb-0.5">{item.icon}</p>
                        <p className="text-[9px] font-bold text-white leading-tight">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Eligibility */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.3 }}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✅</span>
                    <div>
                      <p className="text-xs font-bold text-green-100">ELIGIBILITY</p>
                      <p className="text-sm font-black text-white">12th Pass (Biology)</p>
                    </div>
                  </div>
                </motion.div>

                {/* Why Join Us */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <h3 className="text-xs font-bold text-blue-100 uppercase tracking-widest mb-2">💡 WHY JOIN US</h3>
                  <div className="space-y-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3">
                    {[
                      '✓ 100% Practical Training',
                      '✓ Experienced Faculty',
                      '✓ Modern Lab Facility',
                      '✓ Paramedical Facility',
                      '✓ Career Guidance',
                      '✓ Industry Ready Training',
                    ].map((benefit, idx) => (
                      <p key={idx} className="text-xs text-blue-100 font-semibold">
                        {benefit}
                      </p>
                    ))}
                  </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.23, duration: 0.3 }}
                  className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-3 space-y-2"
                >
                  <p className="text-xs font-bold text-red-100 uppercase">START YOUR MEDICAL CAREER TODAY</p>
                  <div className="flex flex-col gap-1 text-white">
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <FaWhatsapp className="text-lg" />
                      <span>9243758191, 9243758191</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <FaMapMarkerAlt />
                      <span className="leading-tight">Sanjay Nagar, near New BSNL Exchange Office, Shani Mandir Road, Dantewada (C.G.)</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 sm:p-6 flex flex-col justify-between gap-4">
              <div>
                <h3 className="mb-2 text-lg font-black text-slate-900">
                  🚀 Limited Seats - Apply Today!
                </h3>
                <p className="text-sm leading-6 text-slate-700">
                  Join APJ Institute and build your career in Medical & Paramedical Sciences with expert faculty, modern labs, and guaranteed career guidance.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <a
                  href="https://wa.me/919243758191?text=Hi, I'm interested in admission for paramedical courses at APJ Institute Dantewada"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-xl hover:scale-105"
                >
                  <FaWhatsapp className="text-lg" />
                  WhatsApp Now
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border-2 border-blue-300 px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
