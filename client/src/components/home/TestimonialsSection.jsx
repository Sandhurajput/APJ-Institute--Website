import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import img1 from '../../1.jpg';
import img2 from '../../2.jpg';
import img3 from '../../3.jpg';
import img4 from '../../4.jpg';
import img5 from '../../5.jpg';
import img6 from '../../6.jpg';
import img7 from '../../7.jpg';
import img8 from '../../8.jpg';

// Expanded list of 8 distinct student testimonials for cycling slider
const extendedTestimonials = [
  {
    name: 'Aditi Sahu',
    role: 'BMLT Student',
    quote: 'The labs, faculty support, and disciplined environment helped me gain practical confidence for my career.',
    image: img1,
    rating: 5,
    tag: 'Verified APJ Student',
  },
  {
    name: 'Vikram Mandavi',
    role: 'OT Technician Student',
    quote: 'The practical OT training is top-class. The surgical setups and equipment are exactly like a multi-specialty hospital.',
    image: img2,
    rating: 5,
    tag: 'OT Specialization',
  },
  {
    name: 'Rohit Kumar',
    role: 'DMLT Student',
    quote: 'The teaching approach is structured and professional. Every class feels focused on real medical practice.',
    image: img3,
    rating: 5,
    tag: 'Verified APJ Student',
  },
  {
    name: 'Simran Dewangan',
    role: 'X-Ray Tech Student',
    quote: 'Learning radiology physics and operating advanced X-ray setups under expert trainers has prepared me perfectly for hospital jobs.',
    image: img4,
    rating: 5,
    tag: 'Radiology Stream',
  },
  {
    name: 'Pooja Verma',
    role: 'Nursing Student',
    quote: 'APJ Institute gives a genuine institute atmosphere with strong guidance and meaningful exposure.',
    image: img5,
    rating: 5,
    tag: 'Verified APJ Student',
  },
  {
    name: 'Sameer Kashyap',
    role: 'Hospital Assistant',
    quote: 'The hospital assistant curriculum is short, high-yield, and focused. The support team really helps with career advice.',
    image: img6,
    rating: 4,
    tag: '6-Month Certificate',
  },
  {
    name: 'Nisha Netam',
    role: 'B.Sc. Nursing Student',
    quote: 'APJ offers a very supportive culture for female students, with safe hostel facilities and excellent clinical nursing labs.',
    image: img7,
    rating: 5,
    tag: 'Nursing Stream',
  },
  {
    name: 'Devendra Patel',
    role: 'DMLT Graduate',
    quote: 'The curriculum is highly structured and professional. The practical sessions in labs prepared me perfectly for my clinical career.',
    image: img8,
    rating: 5,
    tag: 'Verified APJ Graduate',
  }
];

export default function TestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % extendedTestimonials.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + extendedTestimonials.length) % extendedTestimonials.length);
  };

  // Get active 3 cards for desktop rendering
  const getActiveCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      cards.push(extendedTestimonials[(startIndex + i) % extendedTestimonials.length]);
    }
    return cards;
  };

  // Get active 1 card for mobile rendering
  const getActiveMobileCard = () => {
    return extendedTestimonials[startIndex];
  };

  return (
    <section className="bg-[#0f172a] py-20 sm:py-28 relative overflow-hidden font-sans selection:bg-[#15305b]/30">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-300">
              TESTIMONIALS
            </p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-sans font-black text-white tracking-tight leading-[1.1]">
              Perfect fit for every journey
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed font-light">
              Read authentic stories of learning, clinical preparation, and professional growth directly from our graduates who started their careers in top institutions.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <button 
              onClick={handlePrev} 
              className="p-3.5 rounded-full border border-white/15 bg-[#0f172a] text-white hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-lg"
              aria-label="Previous Student"
            >
              <ArrowLeft size={18} className="stroke-[2.5]" />
            </button>
            <button 
              onClick={handleNext} 
              className="p-3.5 rounded-full border border-white/15 bg-[#0f172a] text-white hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-lg"
              aria-label="Next Student"
            >
              <ArrowRight size={18} className="stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* ─── DESKTOP/TABLET GRID VIEW (3 cards side-by-side) ─── */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {getActiveCards().map((student, idx) => (
              <motion.div
                key={student.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden aspect-[3/4] rounded-[2.2rem] bg-slate-900 border border-white/10 group shadow-2xl transition-all duration-500 hover:border-blue-500/40"
              >
                {/* Background image */}
                <img 
                  src={student.image} 
                  alt={student.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Deep dark gradient overlay matching reference image */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent pointer-events-none" />
                
                {/* Text content details at the bottom */}
                <div className="absolute bottom-6 inset-x-6 flex flex-col justify-end z-10 pointer-events-none">
                  
                  {/* Avatar + Profile Row */}
                  <div className="flex items-center gap-3">
                    <img 
                      src={student.image} 
                      className="w-9 h-9 rounded-full object-cover border border-white/20 shadow-md shrink-0" 
                      alt=""
                    />
                    <div>
                      <h4 className="font-sans font-black text-white text-sm tracking-tight leading-tight">
                        {student.name}
                      </h4>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-blue-300 mt-0.5">
                        {student.role}
                      </p>
                    </div>
                  </div>

                  {/* Bold White Testimonial Quote */}
                  <p className="mt-4 font-sans font-bold text-white text-base leading-snug tracking-tight">
                    "{student.quote}"
                  </p>

                  {/* CTA link */}
                  <div className="mt-4 text-[11px] font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:text-white transition-all duration-300">
                    Read Story <ArrowRight size={12} className="stroke-[2.5]" />
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ─── MOBILE VIEW (1 card visible with swipe layout) ─── */}
        <div className="block md:hidden max-w-sm mx-auto">
          <AnimatePresence mode="wait">
            {(() => {
              const student = getActiveMobileCard();
              return (
                <motion.div
                  key={student.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden aspect-[3/4] rounded-[2.2rem] bg-slate-900 border border-white/10 group shadow-2xl"
                >
                  <img 
                    src={student.image} 
                    alt={student.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-6 inset-x-6 flex flex-col justify-end z-10">
                    <div className="flex items-center gap-3">
                      <img 
                        src={student.image} 
                        className="w-9 h-9 rounded-full object-cover border border-white/20 shadow-md shrink-0" 
                        alt=""
                      />
                      <div>
                        <h4 className="font-sans font-black text-white text-sm tracking-tight leading-tight">
                          {student.name}
                        </h4>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-blue-300 mt-0.5">
                          {student.role}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 font-sans font-bold text-white text-base leading-snug tracking-tight">
                      "{student.quote}"
                    </p>

                    <div className="mt-4 text-[11px] font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                      Read Story <ArrowRight size={12} className="stroke-[2.5]" />
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}