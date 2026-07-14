import { motion } from 'framer-motion';
import { buildingImage } from '../../data/homepageData';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2 lg:px-8">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45 }} className="relative overflow-hidden rounded-[2rem] shadow-soft">
          <img src={buildingImage} alt="APJ Institute Raipur modern facility" className="h-[460px] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45 }}>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">About Institute</p>
          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">A trusted medical and paramedical institute built for modern career success</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            APJ Institute Raipur delivers industry-relevant education with a clear balance of classroom learning, laboratory practice, and student mentoring. The institute aims to prepare confident healthcare professionals with a strong sense of discipline and service.
          </p>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Our campus is designed to support focused learning through modern smart classrooms, advanced computer and digital labs, guidance from experienced and qualified teachers, and a safe student-friendly environment that encourages growth. With hostel support, library and e-learning access, plus career guidance and job support, students get the right atmosphere to learn and succeed.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
              <h3 className="text-lg font-bold text-slate-900">Mission</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">To provide accessible, modern, and practical healthcare education that builds confident and career-ready students.</p>
            </div>
            <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-[0_14px_35px_-26px_rgba(15,23,42,0.35)]">
              <h3 className="text-lg font-bold text-slate-900">Vision</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">To become a respected institute known for academic quality, digital learning, professional conduct, and student success.</p>
            </div>
          </div>

          <a href="#contact" className="mt-8 inline-flex rounded-full bg-gradient-to-r from-blue-700 to-sky-500 px-7 py-3.5 text-sm font-bold text-white shadow-soft transition hover:scale-[1.02]">
            Read More
          </a>
        </motion.div>
      </div>
    </section>
  );
}