import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
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
    const simplifiedSteps = [
      { ...admissionSteps[0], stepNum: 1 }, // Inquiry & Counseling
      { ...admissionSteps[3], stepNum: 2 }, // Document Submission
      { ...admissionSteps[4], stepNum: 3 }, // Fee Payment
      { ...admissionSteps[5], stepNum: 4 }  // Confirmation
    ];

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
            {simplifiedSteps.map((step, index) => {
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
                    {/* pinterest card image container */}
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
                        Step {step.stepNum}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="pt-5 px-1 pb-4">
                      <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-snug group-hover:text-[#15305b] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500 font-semibold line-clamp-3">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Centered call-to-action button */}
          <div className="mt-12 flex justify-center">
            <Link 
              to="/admission" 
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-8 py-4 text-xs font-black tracking-widest uppercase text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/35"
            >
              Start Admission Process
              <FiArrowRight className="w-4 h-4" />
            </Link>
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
                <Link to="/admission" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#15305b]">
                  Get Started
                  <FiArrowRight />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}