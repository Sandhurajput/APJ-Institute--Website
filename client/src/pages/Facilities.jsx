import React from 'react';
import { motion } from 'framer-motion';
import { FaUserTie, FaGraduationCap, FaHandsHelping, FaBriefcase, FaAward } from 'react-icons/fa';
import { highlights, buildingImage } from '../data/homepageData';

const icons = {
  faculty: FaUserTie,
  excellence: FaGraduationCap,
  activity: FaHandsHelping,
  placement: FaBriefcase,
  package: FaAward,
};

export default function Facilities() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <section className="relative mb-12 overflow-hidden rounded-3xl bg-slate-950 p-10 text-white shadow-2xl min-h-[360px] flex flex-col justify-end">
          <img src={buildingImage} alt="Campus Facilities" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-black tracking-tight"
            >
              Campus Facilities
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 max-w-2xl text-lg text-blue-100"
            >
              Modern infrastructure, smart classrooms, and advanced laboratories designed to support excellence in medical and allied health education.
            </motion.p>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {highlights.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <motion.article 
                key={item.title} 
                initial={{ opacity: 0, y: 16 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.35, delay: index * 0.08 }} 
                className="group rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-blue-200"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600 shadow-sm transition group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white">
                  <Icon />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </motion.article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
