import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { admissionSteps } from '../../data/homepageData';
import admissionBg from '../../assets/admission_bg.png';

const stepDetails = [
  { duration: "15 Mins", requirement: "Free Counseling", status: "Walk-in" },
  { duration: "Same Day", requirement: "Marksheets", status: "Instant Check" },
  { duration: "10 Mins", requirement: "Online Form", status: "Easy Apply" },
  { duration: "Immediate", requirement: "Original Docs", status: "Verified" },
  { duration: "Instant", requirement: "Fee Receipt", status: "Secure Pay" },
  { duration: "Same Day", requirement: "Student ID", status: "Seat Confirmed" },
  { duration: "24/7 Access", requirement: "Welcome Kit", status: "Assisted" },
  { duration: "1 Hour", requirement: "Campus Tour", status: "Weekly" }
];

export default function AdmissionSection({ variant = "original" }) {
  if (variant === "homepage") {
    return (
      <section id="admission" className="py-20 sm:py-24 bg-slate-900 relative overflow-hidden">
        {/* Crisp twilight medical campus background image clearly visible with high opacity */}
        <div className="absolute inset-0 z-0">
          <img 
            src={admissionBg} 
            alt="APJ Biomedical Campus" 
            className="w-full h-full object-cover opacity-85 select-none pointer-events-none" 
            loading="lazy"
          />
          <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
        </div>

        <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-300 bg-blue-500/5 inline-block px-4 py-1.5 rounded-full border border-blue-500/10">
              Admission Process
            </p>
            <h2 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl tracking-tight leading-tight">
              How to Get <span className="bg-gradient-to-r from-blue-300 via-blue-100 to-sky-300 bg-clip-text text-transparent">Admitted</span>
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-slate-400 text-base sm:text-lg font-medium leading-relaxed">
              Our admission process is simple, transparent and student-friendly. Follow the steps below to complete your enrollment.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {admissionSteps.map((step, index) => {
              const meta = stepDetails[index] || { duration: "Immediate", requirement: "None", status: "Assisted" };
              return (
                <motion.article 
                  key={step.title} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, amount: 0.15 }} 
                  transition={{ duration: 0.6, delay: index * 0.05, ease: [0.215, 0.61, 0.355, 1] }} 
                  className="group flex flex-col justify-between overflow-hidden rounded-[2.2rem] bg-white border border-slate-100 p-5 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_70px_rgba(15,23,42,0.12)] hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                >
                  <div>
                    {/* Pinterest Card Image Container */}
                    <div className="relative w-full aspect-[4/3] rounded-[1.6rem] overflow-hidden bg-slate-100 shadow-inner">
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                        loading="lazy" 
                      />
                      
                      {/* Dark overlay on hover */}
                      <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      {/* Step badge overlay */}
                      <div className="absolute top-3.5 left-3.5 bg-slate-950/90 backdrop-blur-md text-white font-extrabold text-[9px] tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        Step {index + 1}
                      </div>

                      {/* Top right bookmark / indicator icon */}
                      <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md text-slate-800 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="pt-5 px-1">
                      <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-snug group-hover:text-[#15305b] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500 font-semibold line-clamp-3">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Actions (Rich Metadata + Button) */}
                  <div className="px-1 mt-5">
                    {/* Divider */}
                    <div className="w-full h-[1px] bg-slate-100" />
                    
                    {/* Elegant Metadata Row */}
                    <div className="py-4 flex items-center justify-between text-[10px] text-slate-400 font-black tracking-wider uppercase">
                      <span className="flex items-center gap-1 text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#15305b]" />
                        {meta.duration}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-200" />
                      <span className="text-slate-500">{meta.status}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-200" />
                      <span className="text-slate-600">{meta.requirement}</span>
                    </div>

                    {/* Solid Pill Action Button */}
                    <a 
                      href="#contact" 
                      className="w-full bg-slate-950 text-white font-extrabold text-[10px] tracking-widest uppercase py-3.5 rounded-full text-center transition-all duration-300 hover:bg-[#15305b] hover:shadow-[0_10px_25px_rgba(21,48,91,0.25)] flex items-center justify-center gap-2 group/btn"
                    >
                      Get Started
                      <FiArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Original Horizontal Split Cards
  return (
    <section id="admission" className="py-16 sm:py-20 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-200">Admission Process</p>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">Admission Process</h2>
          <p className="mt-4 mx-auto max-w-2xl text-slate-300">
            Our admission process is simple, transparent and student-friendly. Follow the steps below to complete your enrollment.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {admissionSteps.map((step, index) => (
            <motion.article key={step.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: index * 0.06 }} whileHover={{ y: -6 }} className="flex overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="w-32 shrink-0 overflow-hidden">
                <img src={step.image} alt={step.title} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-5 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Step {index + 1}</p>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#15305b]">
                  Get Started
                  <FiArrowRight />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}