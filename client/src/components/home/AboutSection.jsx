import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FiArrowUpRight } from 'react-icons/fi';

// Custom generated high-end medical assets
import docPortrait from '../../assets/about/about_doctor_portrait.png';
import labTraining from '../../assets/about/about_lab_training.png';
import expertInstructors from '../../assets/about/about_expert_instructors.png';
import studentMentorship from '../../assets/about/about_student_mentorship.png';

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#f0f4fa] py-0 overflow-hidden relative select-none">
      
      {/* 1. CURVED HERO SECTION (Top Half) */}
      <div className="relative bg-[#15305b] pt-20 pb-44 px-4 sm:px-8 rounded-b-[4rem] sm:rounded-b-[6rem] shadow-xl overflow-hidden">
        
        {/* Subtle glowing backgrounds */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-[300px] h-[300px] bg-blue-900/30 rounded-full blur-[80px] pointer-events-none" />

        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-10">
          
          {/* Left Text & Stats Column (Spans 7 cols on desktop) */}
          <div className="lg:col-span-7 pb-4 text-left text-white">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.3em] text-[#bfdbfe] bg-blue-950/40 px-3.5 py-1.5 rounded-full border border-blue-400/20">
              <Sparkles size={11} /> About APJ Institute
            </span>
            <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase font-sans">
              The Premier Paramedical <br className="hidden sm:inline" />
              & Medical Education Center
            </h2>
            <p className="mt-4 text-[#dbeafe] font-light text-sm sm:text-base leading-relaxed max-w-xl">
              APJ Institute Dantewada delivers industry-relevant paramedical education. We provide a balance of rigorous academic knowledge, active laboratory diagnostics, and clinical internships to prepare career-ready health professionals.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 bg-white text-[#15305b] hover:bg-[#dbeafe] transition-all duration-300 rounded-full px-6 py-3 text-xs font-black uppercase tracking-wider shadow-md pointer-events-auto"
              >
                Admission Query
                <FiArrowUpRight size={14} className="stroke-[2.5]" />
              </a>
            </div>

            {/* 3 Quick Stats Row */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/20 pt-8 max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">100%</p>
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-wider mt-1">Practical Focus</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">8+</p>
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-wider mt-1">Specializations</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">1200+</p>
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-wider mt-1">Graduated Students</p>
              </div>
            </div>

          </div>

          {/* Right Doctor Portrait Column (Spans 5 cols on desktop) */}
          <div className="lg:col-span-5 h-[320px] sm:h-[460px] w-full flex justify-center lg:justify-end items-end overflow-hidden mt-6 lg:mt-0">
            <motion.img 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              src={docPortrait} 
              alt="Smiling APJ Medical Director" 
              className="h-full w-auto object-contain object-bottom select-none pointer-events-none drop-shadow-[0_15px_15px_rgba(15,23,42,0.25)]" 
            />
          </div>

        </div>
      </div>

      {/* 2. LAYERED SHADOW GRID OF CARDS (Bottom Half) */}
      <div className="relative -mt-24 mx-auto max-w-7xl px-4 lg:px-8 z-20 pb-20">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 (Tall 2x1 Lab diagnostics) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="sm:col-span-2 lg:col-span-1 lg:row-span-2 h-[350px] lg:h-auto relative overflow-hidden rounded-[2.5rem] shadow-lg group bg-white border border-slate-100"
          >
            <img src={labTraining} alt="Student learning diagnostic testing" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-[1]" />
            <div className="absolute bottom-6 left-6 right-6 z-[2] text-left">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-blue-300">CLINICAL EXCELLENCE</span>
              <h4 className="text-lg font-black text-white uppercase mt-1 leading-tight">Advanced Diagnostics Labs</h4>
            </div>
          </motion.div>

          {/* Card 2 (Square instructors) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="col-span-1 h-[220px] relative overflow-hidden rounded-[2.2rem] shadow-md group bg-white border border-slate-100"
          >
            <img src={expertInstructors} alt="Experienced APJ Instructors" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-[1]" />
          </motion.div>

          {/* Card 3 (Teal color card with Avatar profiles) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="col-span-1 h-[220px] bg-[#15305b] text-white p-6 rounded-[2.2rem] shadow-md flex flex-col justify-between text-left relative overflow-hidden"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full pointer-events-none" />
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-blue-200">FACULTY CORE</p>
              <h4 className="text-xl font-bold uppercase tracking-tight mt-2 leading-none">OUR EXPERTS</h4>
              
              {/* Overlapping Instructor Profile Avatars */}
              <div className="flex -space-x-2.5 mt-5">
                <div className="h-8 w-8 rounded-full border-2 border-[#15305b] bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700 shadow-sm">Dr.S</div>
                <div className="h-8 w-8 rounded-full border-2 border-[#15305b] bg-amber-100 flex items-center justify-center text-[10px] font-bold text-amber-700 shadow-sm">Dr.P</div>
                <div className="h-8 w-8 rounded-full border-2 border-[#15305b] bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700 shadow-sm">Dr.V</div>
                <div className="h-8 w-8 rounded-full border-2 border-[#15305b] bg-rose-100 flex items-center justify-center text-[10px] font-bold text-rose-700 shadow-sm">Dr.A</div>
                <div className="h-8 w-8 rounded-full border-2 border-[#15305b] bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700 shadow-sm">Dr.K</div>
              </div>
            </div>
            <p className="text-xs text-blue-100 font-light leading-relaxed">
              Guided by 15+ experienced doctors and specialized clinical instructors.
            </p>
          </motion.div>

          {/* Card 4 (Square mentorship) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="col-span-1 h-[220px] relative overflow-hidden rounded-[2.2rem] shadow-md group bg-white border border-slate-100"
          >
            <img src={studentMentorship} alt="Mentoring nursing students" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-[1]" />
          </motion.div>

          {/* Card 5 (Wide white card at the bottom) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="sm:col-span-2 lg:col-span-2 h-[220px] bg-white border border-slate-100 p-6 sm:p-8 rounded-[2.5rem] shadow-lg flex flex-col justify-between text-left"
          >
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#15305b]">PROFESSIONAL CONNECT</p>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mt-2 leading-tight">100% Practical Training Exposure</h4>
              <p className="mt-3 text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                Connect directly with clinical internships. We offer practical tie-ups with district govt hospitals and private clinics to secure valid work certifications.
              </p>
            </div>
            <div>
              <a
                href="#courses"
                className="inline-flex items-center gap-2 bg-[#15305b] text-white hover:bg-[#112649] transition-colors rounded-full px-5 py-2.5 text-xs font-bold shadow-md"
              >
                Learn More
                <ArrowRight size={12} />
              </a>
            </div>
          </motion.div>

          {/* Card 6 (Teal color horizontal outline card at bottom right) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="sm:col-span-2 lg:col-span-1 h-[220px] bg-[#e6eeff] border border-[#b8cffa] p-6 sm:p-8 rounded-[2.5rem] shadow-md flex flex-col justify-between text-left relative overflow-hidden"
          >
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#15305b]">COUNCIL AFFILIATION</p>
              <h4 className="text-lg font-black text-slate-800 uppercase mt-2 leading-tight">GOVT APPROVED PROGRAM Standards</h4>
              <p className="mt-2 text-xs text-slate-600 font-light leading-relaxed">
                Full syllabus regulated under the Chhattisgarh Paramedical Council guidelines.
              </p>
            </div>
            <div className="flex justify-end">
              <a 
                href="#courses"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-[#b8cffa] text-[#15305b] hover:bg-[#15305b] hover:text-white transition-all duration-300 shadow-sm"
              >
                <FiArrowUpRight size={14} className="stroke-[2.5]" />
              </a>
            </div>
          </motion.div>

        </div>

        {/* 3. APPROVED CLINICAL PARTNERS BAND */}
        <div className="mt-20 border-t border-slate-200/50 pt-10 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] mb-6">APPROVED CLINICAL TRAINING PARTNERS</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60">
            <span className="text-xs sm:text-sm font-black tracking-wider text-slate-500 uppercase">🏥 Govt Hospital Dantewada</span>
            <span className="text-xs sm:text-sm font-black tracking-wider text-slate-500 uppercase">🩺 DHS Chhattisgarh</span>
            <span className="text-xs sm:text-sm font-black tracking-wider text-slate-500 uppercase">🛡️ APJ Paramedical Board</span>
            <span className="text-xs sm:text-sm font-black tracking-wider text-slate-500 uppercase">💎 Dantewada Trust</span>
          </div>
        </div>

      </div>
    </section>
  );
}