import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiAward, FiBookOpen } from 'react-icons/fi';
import { courses } from '../../data/homepageData';

const courseDetails = {
  BMLT: {
    stream: "🔬 Laboratory Medicine",
    eligibility: "12th Pass (PCB/PCM)",
    curriculum: ["Clinical Biochemistry", "Microbiology & Virology", "Hematology & Serology", "Pathological Diagnostics"],
    careers: ["Clinical Laboratory Manager", "Hospital Lab Officer", "Research Lab Associate", "Blood Bank Supervisor"],
    facts: ["100% Practical clinical exposure", "Comprehensive government syllabus aligned"]
  },
  DMLT: {
    stream: "🧪 Diagnostics Stream",
    eligibility: "12th Pass (PCB/PCM)",
    curriculum: ["Clinical Pathology", "Blood Banking & Serology", "Lab Safety Protocols", "Chemical Analyzer Operation"],
    careers: ["Pathology Laboratory Assistant", "Health Center Technician", "Diagnostic Representative"],
    facts: ["Hands-on laboratory training", "Highly in-demand career pathway"]
  },
  Pharmacy: {
    stream: "💊 Pharmaceutical Sciences",
    eligibility: "12th Pass (PCB/PCM)",
    curriculum: ["Pharmaceutics", "Pharmacology & Toxicology", "Pharmaceutical Chemistry", "Clinical Pharmacy Practice"],
    careers: ["Licensed Pharmacist", "Medical Retail Specialist", "Pharmaceutical Officer", "Quality Assurance Assistant"],
    facts: ["Approved professional curriculum", "Mandatory drug-dispensing clinical internships"]
  },
  Nursing: {
    stream: "🩺 Clinical Nursing Care",
    eligibility: "12th Pass (PCB/PCM/Arts)",
    curriculum: ["Anatomy & Clinical Physiology", "Nursing Foundations", "Community Medical Nursing", "Surgical Clinical Care"],
    careers: ["Registered General Nurse", "ICU Specialization Nurse", "Public Health Center Officer", "Nurse Educator"],
    facts: ["Rigorous bedside clinical training", "Highest healthcare sector placement rate"]
  },
  "Ophthalmic Assistant": {
    stream: "👁️ Vision & Optometry Support",
    eligibility: "12th Pass (PCB/PCM)",
    curriculum: ["Ophthalmic Anatomy & Optics", "Clinical Refraction", "Diagnostic Eye Equipment", "Dispensing Opticianry"],
    careers: ["Certified Refractionist", "Ophthalmic Assistant", "Vision Care Clinic Coordinator"],
    facts: ["Direct training with senior ophthalmologists", "Great self-employment and clinical prospects"]
  },
  "Medical Lab Technician": {
    stream: "🔬 Essential Diagnostics",
    eligibility: "10th / 12th Pass",
    curriculum: ["Specimen Sample Processing", "Basic Biochemistry", "Microscopic Examination", "Clinical Lab Safety"],
    careers: ["Laboratory Assistant", "Collection Center Specialist", "Mobile Clinic Technician"],
    facts: ["Intense practice sessions in active labs", "Swift path to entry-level jobs"]
  }
};

export default function CoursesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCourse = courses[activeIndex];
  const activeDetail = courseDetails[activeCourse.title] || {
    stream: "🩺 Healthcare Pathway",
    eligibility: "12th Pass",
    curriculum: ["Clinical Training", "Basic Theory"],
    careers: ["Healthcare Assistant"],
    facts: ["Practical learning focus"]
  };

  return (
    <section id="courses" className="bg-gradient-to-br from-[#15305b] via-[#102445] to-[#0b182d] py-20 sm:py-24 relative overflow-hidden select-none">
      
      {/* Visual glowing decorations */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute -top-40 right-10 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 left-10 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.35em] text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
            🏥 Medical Courses
          </span>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl md:text-5xl tracking-tight leading-tight uppercase font-sans">
            Career-Focused Programs Built For Healthcare Success
          </h2>
          <p className="mt-4 text-blue-100 font-light text-base sm:text-lg leading-relaxed">
            Explore our state-approved diploma and certificate pathways designed with immersive laboratory practice, clinical internship exposure, and high-value professional credentials.
          </p>
        </div>

        {/* Dynamic Interactive Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          
          {/* LEFT: Dynamic Tab Navigation Column (4 cols on lg) */}
          <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none snap-x snap-mandatory">
            {courses.map((course, idx) => {
              const isActive = idx === activeIndex;
              const detail = courseDetails[course.title] || { stream: "🩺 Healthcare" };
              return (
                <button
                  key={course.title}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left snap-start shrink-0 min-w-[240px] sm:min-w-[280px] lg:min-w-0 p-5 rounded-[1.6rem] border transition-all duration-300 relative overflow-hidden flex items-center justify-between ${
                    isActive 
                      ? 'bg-white border-white shadow-lg text-slate-900' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80 hover:text-white'
                  }`}
                >
                  {/* Active background layout overlay */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabOutline" 
                      className="absolute inset-0 bg-white z-0" 
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <div className="relative z-10 flex flex-col justify-center">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 ${
                      isActive ? 'text-amber-500' : 'text-amber-400'
                    }`}>
                      {detail.stream}
                    </span>
                    <h3 className="text-lg font-black tracking-tight uppercase leading-tight font-sans">
                      {course.title}
                    </h3>
                  </div>

                  <div className="relative z-10 flex flex-col items-end gap-2 shrink-0 ml-4">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      isActive 
                        ? 'bg-[#15305b]/10 text-[#15305b]' 
                        : 'bg-white/10 text-blue-200'
                    }`}>
                      {course.duration}
                    </span>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[#15305b]"
                      >
                        <FiCheckCircle size={15} />
                      </motion.div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Dynamic Showcase Area (8 cols on lg) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_30px_70px_rgba(15,23,42,0.45)] h-full flex flex-col lg:flex-row"
              >
                {/* Course Image Frame */}
                <div className="lg:w-5/12 h-64 lg:h-auto relative overflow-hidden bg-slate-900 shrink-0">
                  <img 
                    src={activeCourse.image} 
                    alt={activeCourse.title} 
                    className="h-full w-full object-cover select-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/80 lg:from-slate-950/20 via-transparent to-transparent" />
                  
                  <div className="absolute left-6 top-6 bg-white/95 backdrop-blur-md px-4.5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] text-[#15305b] shadow-sm">
                    🏛️ GOVT APPROVED
                  </div>
                </div>

                {/* Course Details Content */}
                <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between text-left">
                  
                  <div>
                    {/* Header line info */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#15305b] bg-[#15305b]/5 px-3 py-1 rounded-full border border-[#15305b]/10">
                        {activeDetail.stream}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        ⏳ {activeCourse.duration}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight uppercase font-sans">
                      {activeCourse.title} Program
                    </h3>
                    
                    <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                      {activeCourse.description}
                    </p>

                    {/* Eligibility Block */}
                    <div className="mt-5 p-4 rounded-2xl bg-amber-400/5 border border-amber-400/10 flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-amber-400/10 text-amber-600">
                        <FiAward size={16} />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-slate-950 uppercase tracking-wider">Admission Eligibility</p>
                        <p className="text-slate-600 mt-0.5">{activeDetail.eligibility}</p>
                      </div>
                    </div>

                    {/* Core Curriculum Grid */}
                    <div className="mt-6">
                      <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                        <FiBookOpen className="text-[#15305b]" /> Core Clinical Curriculum
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {activeDetail.curriculum.map((item) => (
                          <div key={item} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-100">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#15305b]" />
                            <span className="font-medium truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Professional Career Pathways */}
                    <div className="mt-6">
                      <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
                        🌟 Career Scope & Pathways
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {activeDetail.careers.map((career) => (
                          <span key={career} className="text-[10px] font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Primary CTA button */}
                  <div className="mt-8 border-t border-slate-100 pt-6">
                    <a
                      href="#contact"
                      className="inline-flex w-full sm:w-auto justify-center items-center gap-3 bg-[#15305b] hover:bg-[#112649] text-white transition-all duration-300 rounded-2xl px-7 py-4 text-xs font-black uppercase tracking-widest shadow-md hover:scale-[1.02]"
                    >
                      Enquire for Admission
                      <FiArrowRight size={14} className="stroke-[2.5]" />
                    </a>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}