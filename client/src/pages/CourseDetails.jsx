import React, { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { courses } from '../utils/courseData';
import { FiArrowLeft, FiCheckCircle, FiBriefcase, FiBookOpen, FiClipboard } from 'react-icons/fi';
import TopHeaderBar from '../components/home/TopHeaderBar';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';

export default function CourseDetails() {
  const { courseId } = useParams();
  const course = courses.find((item) => item.id === courseId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId]);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopHeaderBar />
      <Navbar />
      <main className="bg-slate-50 pb-16 pt-6 flex-grow">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <Link to="/courses" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50">
          <FiArrowLeft />
          Back to Courses
        </Link>

        <section className="mt-6 overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-700 via-cyan-600 to-emerald-600 p-8 text-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.45)] md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">Course Details</p>
          <h1 className="mt-3 text-3xl font-black leading-tight md:text-5xl">{course.fullName}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-blue-50/90 md:text-base">{course.overview}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-white/70">Duration</p>
              <p className="mt-2 text-lg font-bold">{course.duration}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-white/70">Eligibility</p>
              <p className="mt-2 text-lg font-bold">{course.eligibility}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-white/70">Program</p>
              <p className="mt-2 text-lg font-bold">{course.name}</p>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="rounded-[1.75rem] border border-blue-100 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <FiBookOpen className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-bold text-slate-900">What you will learn</h2>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{course.training}</p>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <FiCheckCircle className="text-emerald-600" />
                  Key highlights
                </div>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {course.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <FiClipboard className="text-blue-600" />
                  Core subjects
                </div>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {course.subjects.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-blue-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.aside initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.05 }} className="space-y-6 rounded-[1.75rem] border border-blue-100 bg-white p-6 shadow-sm md:p-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <FiBriefcase className="h-5 w-5" />
                </span>
                <h2 className="text-2xl font-bold text-slate-900">Career scope</h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {course.careers.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-cyan-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">Admission summary</p>
              <p className="mt-3 text-sm leading-7 text-amber-950/90">
                If you are interested in this program, reach out through the admission section to get eligibility guidance, course counselling, and application support.
              </p>
              <Link to="/#admission" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                Open Admission Section
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
      <Footer />
    </div>
  );
}
