import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FiArrowUpRight } from 'react-icons/fi';

import docPortrait from '../../assets/about/about_doctor_portrait.png';
import labTraining from '../../assets/about/about_lab_training.png';
import expertInstructors from '../../assets/about/about_expert_instructors.png';
import studentMentorship from '../../assets/about/about_student_mentorship.png';

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#f5f5f5] py-0 select-none">
      <div className="relative overflow-hidden rounded-b-[3rem] bg-black px-4 pb-44 pt-20 shadow-sm sm:px-8 sm:rounded-b-[4rem]">
        <div className="absolute right-0 top-0 h-[320px] w-[320px] rounded-full bg-white/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-40px] left-10 h-[220px] w-[220px] rounded-full bg-white/10 blur-[90px] pointer-events-none" />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="pb-4 text-left text-white lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-gray-100">
              <Sparkles size={11} /> About APJ Institute
            </span>
            <h2 className="mt-6 text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl">
              The Premier Paramedical <br className="hidden sm:inline" />
              & Medical Education Center
            </h2>
            <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-gray-200 sm:text-base">
              APJ Institute Dantewada delivers industry-relevant paramedical education. We provide a balance of academic knowledge, laboratory diagnostics, and clinical internships to prepare career-ready health professionals.
            </p>

            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-xs font-black uppercase tracking-wider text-black shadow-sm transition hover:bg-[#f0f0f0]"
              >
                Admission Query
                <FiArrowUpRight size={14} className="stroke-[2.5]" />
              </a>
            </div>

            <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-8">
              <div>
                <p className="text-2xl font-black text-white sm:text-3xl">100%</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-300">Practical Focus</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white sm:text-3xl">8+</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-300">Specializations</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white sm:text-3xl">1200+</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-300">Graduated Students</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex h-[320px] w-full items-end justify-center overflow-hidden sm:h-[460px] lg:col-span-5 lg:mt-0 lg:justify-end">
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              src={docPortrait}
              alt="Smiling APJ Medical Director"
              className="h-full w-auto object-contain object-bottom select-none pointer-events-none drop-shadow-[0_15px_15px_rgba(0,0,0,0.2)]"
            />
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-24 max-w-7xl px-4 pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="group relative h-[350px] overflow-hidden rounded-[2.5rem] border border-black/10 bg-white shadow-sm sm:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            <img src={labTraining} alt="Student learning diagnostic testing" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 z-[2] text-left">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-200">CLINICAL EXCELLENCE</span>
              <h4 className="mt-1 text-lg font-black uppercase leading-tight text-white">Advanced Diagnostics Labs</h4>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="group relative col-span-1 h-[220px] overflow-hidden rounded-[2.2rem] border border-black/10 bg-white shadow-sm"
          >
            <img src={expertInstructors} alt="Experienced APJ Instructors" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative col-span-1 flex h-[220px] flex-col justify-between overflow-hidden rounded-[2.2rem] border border-black/10 bg-black p-6 text-left text-white shadow-sm"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 pointer-events-none" />
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-300">FACULTY CORE</p>
              <h4 className="mt-2 text-xl font-bold uppercase leading-none tracking-tight">OUR EXPERTS</h4>

              <div className="mt-5 flex -space-x-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-gray-100 text-[10px] font-bold text-black shadow-sm">Dr.S</div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-gray-100 text-[10px] font-bold text-black shadow-sm">Dr.P</div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-gray-100 text-[10px] font-bold text-black shadow-sm">Dr.V</div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-gray-100 text-[10px] font-bold text-black shadow-sm">Dr.A</div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-gray-100 text-[10px] font-bold text-black shadow-sm">Dr.K</div>
              </div>
            </div>
            <p className="text-xs font-light leading-relaxed text-gray-300">
              Guided by 15+ experienced doctors and specialized clinical instructors.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="group relative col-span-1 h-[220px] overflow-hidden rounded-[2.2rem] border border-black/10 bg-white shadow-sm"
          >
            <img src={studentMentorship} alt="Mentoring nursing students" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex h-[220px] flex-col justify-between rounded-[2.5rem] border border-black/10 bg-white p-6 text-left shadow-sm sm:col-span-2 lg:col-span-2"
          >
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#333333]">PROFESSIONAL CONNECT</p>
              <h4 className="mt-2 text-xl font-black uppercase leading-tight text-black sm:text-2xl">100% Practical Training Exposure</h4>
              <p className="mt-3 text-xs font-light leading-relaxed text-[#555555] sm:text-sm">
                Connect directly with clinical internships. We offer practical tie-ups with district government hospitals and private clinics to secure valid work certifications.
              </p>
            </div>
            <div>
              <a
                href="#courses"
                className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#333333]"
              >
                Learn More
                <ArrowRight size={12} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="relative flex h-[220px] flex-col justify-between overflow-hidden rounded-[2.5rem] border border-black/10 bg-[#f0f0f0] p-6 text-left shadow-sm sm:col-span-2 lg:col-span-1"
          >
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#333333]">COUNCIL AFFILIATION</p>
              <h4 className="mt-2 text-lg font-black uppercase leading-tight text-black">GOVT APPROVED PROGRAM Standards</h4>
              <p className="mt-2 text-xs font-light leading-relaxed text-[#555555]">
                Full syllabus regulated under the Chhattisgarh Paramedical Council guidelines.
              </p>
            </div>
            <div className="flex justify-end">
              <a
                href="#courses"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black transition hover:bg-black hover:text-white"
              >
                <FiArrowUpRight size={14} className="stroke-[2.5]" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 border-t border-black/10 pt-10 text-center">
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.25em] text-[#666666]">APPROVED CLINICAL TRAINING PARTNERS</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70">
            <span className="text-xs font-black uppercase tracking-wider text-[#555555] sm:text-sm">🏥 Govt Hospital Dantewada</span>
            <span className="text-xs font-black uppercase tracking-wider text-[#555555] sm:text-sm">🩺 DHS Chhattisgarh</span>
            <span className="text-xs font-black uppercase tracking-wider text-[#555555] sm:text-sm">🛡️ APJ Paramedical Board</span>
            <span className="text-xs font-black uppercase tracking-wider text-[#555555] sm:text-sm">💎 Dantewada Trust</span>
          </div>
        </div>
      </div>
    </section>
  );
}