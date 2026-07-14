import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { admissionSteps } from '../../data/homepageData';
import admissionBg from '../../assets/admission_bg.png';

const stepDetails = [
  { duration: '15 Mins', requirement: 'Free Counseling', status: 'Walk-in' },
  { duration: 'Same Day', requirement: 'Marksheets', status: 'Instant Check' },
  { duration: '10 Mins', requirement: 'Online Form', status: 'Easy Apply' },
  { duration: 'Immediate', requirement: 'Original Docs', status: 'Verified' },
  { duration: 'Instant', requirement: 'Fee Receipt', status: 'Secure Pay' },
  { duration: 'Same Day', requirement: 'Student ID', status: 'Seat Confirmed' },
  { duration: '24/7 Access', requirement: 'Welcome Kit', status: 'Assisted' },
  { duration: '1 Hour', requirement: 'Campus Tour', status: 'Weekly' },
];

export default function AdmissionSection({ variant = 'original' }) {
  if (variant === 'homepage') {
    return (
      <section id="admission" className="relative overflow-hidden bg-[#f5f5f5] py-20 sm:py-24">
        <div className="absolute inset-0 z-0">
          <img
            src={admissionBg}
            alt="APJ Biomedical Campus"
            className="h-full w-full object-cover opacity-80 select-none pointer-events-none"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-white/70 pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-16 text-center">
            <p className="inline-block rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-black">
              Admission Process
            </p>
            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-black sm:text-5xl">
              How to Get <span className="text-[#333333]">Admitted</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-[#555555] sm:text-lg">
              Our admission process is simple, transparent and student-friendly. Follow the steps below to complete your enrollment.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {admissionSteps.map((step, index) => {
              const meta = stepDetails[index] || { duration: 'Immediate', requirement: 'None', status: 'Assisted' };
              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: index * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
                  className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-[2.2rem] border border-black/10 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.6rem] bg-[#f5f5f5] shadow-inner">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="absolute left-3.5 top-3.5 flex items-center gap-1.5 rounded-full bg-black px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        Step {index + 1}
                      </div>
                    </div>

                    <div className="px-1 pt-5">
                      <h3 className="text-xl font-extrabold leading-snug tracking-tight text-black transition-colors duration-200 group-hover:text-[#333333]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-xs font-semibold leading-relaxed text-[#666666] line-clamp-3">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 px-1">
                    <div className="h-[1px] w-full bg-black/10" />

                    <div className="flex items-center justify-between py-4 text-[10px] font-black uppercase tracking-wider text-[#666666]">
                      <span className="flex items-center gap-1 text-[#333333]">
                        <span className="h-1.5 w-1.5 rounded-full bg-black" />
                        {meta.duration}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-black/20" />
                      <span>{meta.status}</span>
                      <span className="h-1 w-1 rounded-full bg-black/20" />
                      <span className="text-[#333333]">{meta.requirement}</span>
                    </div>

                    <a
                      href="#contact"
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-center text-[10px] font-extrabold uppercase tracking-widest text-white transition duration-200 hover:bg-[#333333]"
                    >
                      Get Started
                      <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
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

  return (
    <section id="admission" className="bg-[#f5f5f5] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#333333]">Admission Process</p>
          <h2 className="mt-4 text-3xl font-black text-black sm:text-4xl">Admission Process</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Our admission process is simple, transparent and student-friendly. Follow the steps below to complete your enrollment.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {admissionSteps.map((step, index) => (
            <motion.article key={step.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: index * 0.06 }} whileHover={{ y: -6 }} className="flex overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
              <div className="w-32 shrink-0 overflow-hidden">
                <img src={step.image} alt={step.title} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#666666]">Step {index + 1}</p>
                <h3 className="mt-2 text-lg font-bold text-black">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#555555]">{step.description}</p>
                <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black">
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