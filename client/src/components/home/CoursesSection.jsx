import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiAward, FiBookOpen } from 'react-icons/fi';
import { courses } from '../../data/homepageData';

const courseDetails = {
  BMLT: {
    stream: '🔬 Laboratory Medicine',
    eligibility: '12th Pass (PCB/PCM)',
    curriculum: ['Clinical Biochemistry', 'Microbiology & Virology', 'Hematology & Serology', 'Pathological Diagnostics'],
    careers: ['Clinical Laboratory Manager', 'Hospital Lab Officer', 'Research Lab Associate', 'Blood Bank Supervisor'],
    facts: ['100% Practical clinical exposure', 'Comprehensive government syllabus aligned'],
  },
  DMLT: {
    stream: '🧪 Diagnostics Stream',
    eligibility: '12th Pass (PCB/PCM)',
    curriculum: ['Clinical Pathology', 'Blood Banking & Serology', 'Lab Safety Protocols', 'Chemical Analyzer Operation'],
    careers: ['Pathology Laboratory Assistant', 'Health Center Technician', 'Diagnostic Representative'],
    facts: ['Hands-on laboratory training', 'Highly in-demand career pathway'],
  },
  Pharmacy: {
    stream: '💊 Pharmaceutical Sciences',
    eligibility: '12th Pass (PCB/PCM)',
    curriculum: ['Pharmaceutics', 'Pharmacology & Toxicology', 'Pharmaceutical Chemistry', 'Clinical Pharmacy Practice'],
    careers: ['Licensed Pharmacist', 'Medical Retail Specialist', 'Pharmaceutical Officer', 'Quality Assurance Assistant'],
    facts: ['Approved professional curriculum', 'Mandatory drug-dispensing clinical internships'],
  },
  Nursing: {
    stream: '🩺 Clinical Nursing Care',
    eligibility: '12th Pass (PCB/PCM/Arts)',
    curriculum: ['Anatomy & Clinical Physiology', 'Nursing Foundations', 'Community Medical Nursing', 'Surgical Clinical Care'],
    careers: ['Registered General Nurse', 'ICU Specialization Nurse', 'Public Health Center Officer', 'Nurse Educator'],
    facts: ['Rigorous bedside clinical training', 'Highest healthcare sector placement rate'],
  },
  'Ophthalmic Assistant': {
    stream: '👁️ Vision & Optometry Support',
    eligibility: '12th Pass (PCB/PCM)',
    curriculum: ['Ophthalmic Anatomy & Optics', 'Clinical Refraction', 'Diagnostic Eye Equipment', 'Dispensing Opticianry'],
    careers: ['Certified Refractionist', 'Ophthalmic Assistant', 'Vision Care Clinic Coordinator'],
    facts: ['Direct training with senior ophthalmologists', 'Great self-employment and clinical prospects'],
  },
  'Medical Lab Technician': {
    stream: '🔬 Essential Diagnostics',
    eligibility: '10th / 12th Pass',
    curriculum: ['Specimen Sample Processing', 'Basic Biochemistry', 'Microscopic Examination', 'Clinical Lab Safety'],
    careers: ['Laboratory Assistant', 'Collection Center Specialist', 'Mobile Clinic Technician'],
    facts: ['Intense practice sessions in active labs', 'Swift path to entry-level jobs'],
  },
};

export default function CoursesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCourse = courses[activeIndex];
  const activeDetail = courseDetails[activeCourse.title] || {
    stream: '🩺 Healthcare Pathway',
    eligibility: '12th Pass',
    curriculum: ['Clinical Training', 'Basic Theory'],
    careers: ['Healthcare Assistant'],
    facts: ['Practical learning focus'],
  };

  return (
    <section id="courses" className="relative overflow-hidden bg-[#f5f5f5] py-20 sm:py-24 select-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(17,17,17,0.02),rgba(17,17,17,0.02))]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-[#333333]">
            🏥 Medical Courses
          </span>
          <h2 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight text-black sm:text-4xl md:text-5xl">
            Career-Focused Programs Built For Healthcare Success
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#555555] sm:text-lg">
            Explore our state-approved diploma and certificate pathways designed with immersive laboratory practice, clinical internship exposure, and professional credentials.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <div className="flex gap-3 overflow-x-auto pb-4 lg:col-span-4 lg:flex-col lg:overflow-x-visible lg:pb-0">
            {courses.map((course, idx) => {
              const isActive = idx === activeIndex;
              const detail = courseDetails[course.title] || { stream: '🩺 Healthcare' };
              return (
                <button
                  key={course.title}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative flex w-full min-w-[240px] shrink-0 items-center justify-between overflow-hidden rounded-[1.6rem] border p-5 text-left transition duration-200 sm:min-w-[280px] lg:min-w-0 ${
                    isActive ? 'border-black/10 bg-white text-black shadow-sm' : 'border-black/10 bg-[#f8f8f8] text-[#333333] hover:bg-white'
                  }`}
                >
                  <div className="relative z-10 flex flex-col justify-center">
                    <span className={`mb-1.5 text-[10px] font-black uppercase tracking-[0.2em] ${isActive ? 'text-[#333333]' : 'text-[#666666]'}`}>
                      {detail.stream}
                    </span>
                    <h3 className="text-lg font-black uppercase leading-tight tracking-tight">
                      {course.title}
                    </h3>
                  </div>

                  <div className="relative z-10 ml-4 flex shrink-0 flex-col items-end gap-2">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${isActive ? 'bg-black text-white' : 'bg-white text-[#333333]'}`}>
                      {course.duration}
                    </span>
                    {isActive && (
                      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-black">
                        <FiCheckCircle size={15} />
                      </motion.div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-black/10 bg-white shadow-sm lg:flex-row"
              >
                <div className="relative h-64 shrink-0 overflow-hidden bg-black lg:h-auto lg:w-5/12">
                  <img src={activeCourse.image} alt={activeCourse.title} className="h-full w-full object-cover select-none" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:bg-gradient-to-r" />

                  <div className="absolute left-6 top-6 rounded-2xl bg-white/95 px-4.5 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-black shadow-sm">
                    🏛️ GOVT APPROVED
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-8 text-left sm:p-10">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-black/10 bg-[#f5f5f5] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#333333]">
                        {activeDetail.stream}
                      </span>
                      <span className="rounded-full bg-[#f5f5f5] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#666666]">
                        ⏳ {activeCourse.duration}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black uppercase leading-tight tracking-tight text-black sm:text-3xl">
                      {activeCourse.title} Program
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[#555555]">
                      {activeCourse.description}
                    </p>

                    <div className="mt-5 flex items-center gap-3 rounded-2xl border border-black/10 bg-[#f8f8f8] p-4">
                      <div className="rounded-xl bg-black p-2 text-white">
                        <FiAward size={16} />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold uppercase tracking-wider text-black">Admission Eligibility</p>
                        <p className="mt-0.5 text-[#555555]">{activeDetail.eligibility}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="mb-3 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-black">
                        <FiBookOpen className="text-[#333333]" /> Core Clinical Curriculum
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {activeDetail.curriculum.map((item) => (
                          <div key={item} className="flex items-center gap-2 rounded-xl border border-black/10 bg-[#f8f8f8] px-3.5 py-2.5 text-xs text-[#333333]">
                            <span className="h-1.5 w-1.5 rounded-full bg-black" />
                            <span className="truncate font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="mb-2.5 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-black">
                        🌟 Career Scope & Pathways
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {activeDetail.careers.map((career) => (
                          <span key={career} className="rounded-lg border border-black/10 bg-[#f8f8f8] px-3 py-1.5 text-[10px] font-semibold text-[#333333]">
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-black/10 pt-6">
                    <a
                      href="#contact"
                      className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-black px-7 py-4 text-xs font-black uppercase tracking-widest text-white transition hover:bg-[#333333] sm:w-auto"
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