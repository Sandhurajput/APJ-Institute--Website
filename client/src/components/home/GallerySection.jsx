import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { galleryImages } from '../../data/homepageData';

import img11 from '../../new25.jpeg';
import img22 from '../../new1.jpeg';
import img33 from '../../new2.jpeg';
import img44 from '../../new3.jpeg';

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const slidesData = [
    {
      title: "MAIN LAB COMPLEX",
      subtitle: "PRACTICAL LABS",
      description: "Equipped with state-of-the-art pathology, microbiology, and clinical diagnostic setups for professional hands-on learning.",
      image: img11,
    },
    {
      title: "CAMPUS BUILDING",
      subtitle: "INFRASTRUCTURE",
      description: "A modern multi-storey institutional hub in Dantewada designed with advanced student support facilities.",
      image: img22,
    },
    {
      title: "CLASSROOM STUDY",
      subtitle: "ACADEMICS",
      description: "Spacious, digitally-enabled classrooms fostering deep interaction between expert faculty and future health heroes.",
      image: img33,
    },
    {
      title: "ACADEMIC EVENTS",
      subtitle: "LEARNING HUB",
      description: "Regular academic symposiums, interactive guest lectures, and practical health outreach campaigns.",
      image: img44,
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slidesData.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slidesData.length) % slidesData.length);
    setProgress(0);
  };

  // Auto scroll effect
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 1;
      });
    }, 60); // ~6 seconds for 100%

    return () => clearInterval(interval);
  }, [isPlaying, activeIndex]);

  return (
    <section id="gallery" className="bg-white py-20 overflow-hidden relative border-t border-slate-100 select-none">
      {/* Subtle Light Grid Pattern overlay */}
      <div className="absolute inset-0 bg-medical-grid opacity-[0.03] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
        
        {/* Header: Centered with gorgeous blue branding */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#15305b]">EXPERIENCE APJ</p>
          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl leading-tight">
            A glimpse into institute life and medical training
          </h2>
          <p className="mt-4 text-slate-500 text-sm leading-relaxed max-w-xl mx-auto">
            Browse our interactive campus gallery to explore our world-class laboratories, buildings, academic classrooms, and vibrant institute events.
          </p>
        </div>

        {/* Centered Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {slidesData.map((tab, idx) => (
            <button
              key={`tab-${idx}`}
              onClick={() => { setActiveIndex(idx); setProgress(0); }}
              className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                idx === activeIndex
                  ? 'bg-[#15305b] border-[#15305b] text-white shadow-lg shadow-[#15305b]/10'
                  : 'bg-slate-50 border-slate-200/60 text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
              }`}
            >
              {tab.subtitle.replace("PRACTICAL ", "")}
            </button>
          ))}
        </div>

        {/* Full-width premium widescreen picture container */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl bg-slate-950">
          
          {/* Active background image */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slidesData[activeIndex].image})` }}
              />
            </AnimatePresence>
            {/* Elegant dark overlay at the bottom and sides for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40 z-[1]" />
          </div>

          {/* Active Live badge */}
          <div className="absolute top-6 left-6 z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white bg-[#15305b]/90 border border-[#15305b]/50 rounded-full px-4 py-2 shadow-md">
              LIVE VIEW
            </span>
          </div>

          {/* Cinematic Tour badge in frame linking to /gallery */}
          <div className="absolute top-6 right-6 z-10">
            <a 
              href="/gallery" 
              className="text-[10px] font-black uppercase tracking-[0.3em] text-white bg-slate-950/70 border border-white/20 hover:bg-[#15305b] hover:border-[#15305b] rounded-full px-4 py-2 shadow-md transition-all duration-300 pointer-events-auto"
            >
              Cinematic Tour
            </a>
          </div>

          {/* Text details overlay inside frame */}
          <div className="absolute bottom-36 sm:bottom-28 left-6 sm:left-12 max-w-xl z-10 text-left pointer-events-none">
            <div className="inline-block relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`sub-${activeIndex}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-xs font-bold uppercase tracking-[0.25em] text-blue-300"
                >
                  {slidesData[activeIndex].subtitle}
                </motion.span>
              </AnimatePresence>
              <div className="h-[2px] w-12 bg-amber-500 mt-1.5" />
            </div>

            <div className="overflow-hidden mt-3">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={`title-${activeIndex}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-none text-white uppercase font-sans drop-shadow-md"
                >
                  {slidesData[activeIndex].title}
                </motion.h3>
              </AnimatePresence>
            </div>

            <div className="overflow-hidden mt-2 max-w-md hidden sm:block">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${activeIndex}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-slate-200 text-xs sm:text-sm leading-relaxed drop-shadow-sm font-light"
                >
                  {slidesData[activeIndex].description}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Widescreen Glassmorphic Arrow Controls */}
          <div className="absolute inset-y-0 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <button
              onClick={handlePrev}
              className="h-12 w-12 flex items-center justify-center rounded-full border border-white/20 bg-slate-950/40 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 active:scale-95 transition-all duration-300 shadow-lg pointer-events-auto"
              aria-label="Previous slide"
            >
              <FaChevronLeft size={14} className="stroke-[2.5]" />
            </button>
            <button
              onClick={handleNext}
              className="h-12 w-12 flex items-center justify-center rounded-full border border-white/20 bg-slate-950/40 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 active:scale-95 transition-all duration-300 shadow-lg pointer-events-auto"
              aria-label="Next slide"
            >
              <FaChevronRight size={14} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Floating Autoplay Indicator inside frame */}
          <div className="absolute bottom-6 left-6 sm:left-12 z-20 flex items-center gap-3 bg-slate-950/50 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 hidden sm:flex">
            <button
              onClick={() => setIsPlaying((value) => !value)}
              className="h-7 w-7 flex items-center justify-center rounded-full bg-white text-slate-950 hover:bg-[#15305b] hover:text-white transition-all duration-300 pointer-events-auto"
              aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
            >
              {isPlaying ? <FaPause size={8} /> : <FaPlay size={8} className="ml-0.5" />}
            </button>
            <div className="flex flex-col text-left">
              <div className="flex justify-between gap-6 text-[8px] font-bold text-slate-300 uppercase tracking-widest">
                <span>AUTOPLAY</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-24 h-[2.5px] bg-white/20 rounded-full overflow-hidden mt-0.5">
                <div 
                  className="h-full bg-[#15305b] transition-all duration-75 ease-linear rounded-full" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Floating Horizontal Deck at the bottom right */}
          <div className="absolute bottom-6 left-6 right-6 z-10 flex gap-3 overflow-x-auto pb-1 no-scrollbar justify-center sm:justify-end">
            {slidesData.map((slide, idx) => (
              <div
                key={`deck-${idx}`}
                onClick={() => { setActiveIndex(idx); setProgress(0); }}
                className={`w-[85px] sm:w-[110px] h-[115px] sm:h-[135px] shrink-0 rounded-2xl overflow-hidden border-2 relative cursor-pointer shadow-lg hover:scale-105 transition-all duration-300 pointer-events-auto ${
                  idx === activeIndex 
                    ? 'border-[#15305b] scale-[1.03] shadow-[0_0_15px_rgba(21,48,91,0.5)]' 
                    : 'border-white/20 hover:border-white/50 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent z-[2]" />
                <div className="absolute bottom-2 left-2 right-2 z-[3]">
                  <p className="text-[7px] font-bold text-amber-400 tracking-wider uppercase">{slide.subtitle.replace("PRACTICAL ", "")}</p>
                  <p className="text-[9px] font-black text-white leading-tight uppercase mt-0.5 truncate">{slide.title.replace("MAIN ", "")}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}