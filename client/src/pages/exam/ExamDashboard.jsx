import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, CalendarCheck2, GraduationCap, LayoutDashboard, MessagesSquare, RefreshCw, ShieldCheck, Sparkles, UserRoundCheck } from 'lucide-react';
import classBackdrop from '../../components/home/WhatsApp Image 2026-05-17 at 9.41.12 PM.jpeg';
import { dashboardTiles, heroMetrics, initialForms, initialNotices, importantDates } from '../../data/examPortalData';
import { DashboardCard, FormsSection, GlassCard, ImportantDatesTable, LoadingGrid, NoticeBoardSection, PageShell, SectionHeading } from '../../components/exam/ExamComponents';
import { useExamPortal } from '../../context/ExamPortalContext';

export default function ExamDashboard() {
  const [loading, setLoading] = useState(true);
  const [rotatingMetric, setRotatingMetric] = useState(0);
  const navigate = useNavigate();
  const { notify } = useExamPortal();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRotatingMetric((current) => (current + 1) % heroMetrics.length);
    }, 2200);
    return () => window.clearInterval(interval);
  }, []);

  const spotlightMetrics = useMemo(() => heroMetrics.slice(0, 4), []);

  function handleQuickAction(path, label) {
    notify(`Opening ${label}.`, 'info');
    navigate(`/examination-dashboard/${path}`);
  }

  function handleDownload(item) {
    const content = `APJ Institute Raipur\n\nForm: ${item.name}\nType: ${item.type}\nDescription: ${item.description}\n\nPlease replace this demo file with the official PDF in the admin panel.`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = item.file;
    anchor.click();
    URL.revokeObjectURL(url);
    notify(`${item.name} download started.`, 'success');
  }

  return (
    <main className="pb-10">
      <section className="relative overflow-hidden px-4 py-8 lg:px-6 lg:py-10">
        <div className="absolute inset-0 -z-10">
          <img src={classBackdrop} alt="APJ Institute classroom background" className="h-full w-full object-cover blur-[4px] brightness-[0.42] saturate-110" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.25),rgba(2,6,23,0.78))]" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-200">
              <Sparkles size={14} /> University Examination Portal
            </div>
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">
              APJ Institute Raipur Examination Dashboard
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              A modern, responsive examination portal with login cards, notices, forms, results, and admin-ready management sections built for a polished university experience.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {spotlightMetrics.map((item, index) => (
                <GlassCard key={item.label} className="p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-300">{item.label}</p>
                  <p className="mt-2 text-2xl font-black text-white">{item.value}</p>
                  <div className="mt-3 h-1.5 rounded-full bg-gradient-to-r from-sky-500 via-violet-500 to-fuchsia-500" style={{ opacity: index === rotatingMetric ? 1 : 0.45 }} />
                </GlassCard>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/examination-dashboard/results" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.01]">
                View Results <ArrowRight size={16} />
              </Link>
              <Link to="/examination-dashboard/forms" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12">
                Download Forms <BookOpen size={16} />
              </Link>
              <button
                type="button"
                onClick={() => navigate('/admin', { state: { tab: 'gallery' } })}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
              >
                Manage Gallery
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid gap-4 rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">Quick Access</p>
                <h3 className="mt-1 text-xl font-bold text-white">Role-based entry points</h3>
              </div>
              <LayoutDashboard size={22} className="text-sky-300" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: 'Student Login', icon: GraduationCap, path: 'student-login', tone: 'from-sky-500 to-blue-600' },
                  { label: 'Student Signup', icon: UserRoundCheck, path: 'student-signup', tone: 'from-cyan-500 to-sky-500' },
                { label: 'Admin Login', icon: ShieldCheck, path: 'admin-login', tone: 'from-violet-500 to-fuchsia-600' },
                  { label: 'Teacher Login', icon: MessagesSquare, path: 'teacher-login', tone: 'from-orange-500 to-amber-500' },
                { label: 'Notices', icon: CalendarCheck2, path: 'notices', tone: 'from-emerald-500 to-teal-500' },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleQuickAction(item.path, item.label)}
                  className={`group rounded-[1.5rem] bg-gradient-to-br ${item.tone} p-[1px] text-left`}
                >
                  <div className="flex h-full min-h-[132px] flex-col justify-between rounded-[1.45rem] bg-slate-950/88 p-4 text-white transition group-hover:bg-slate-900/95">
                    <item.icon size={24} />
                    <div>
                      <p className="text-lg font-black">{item.label}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-300">Open portal</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-sky-400/15 bg-sky-500/10 p-4">
              <p className="text-sm font-semibold text-sky-100">Admin-ready highlights</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Dynamic notices, downloadable forms, result search, date management, and role-based access are built into the portal structure.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <PageShell
        title="Unified exam dashboard"
        subtitle="Ten colorful square cards for student and staff access, with notices, forms, and important dates below."
        action={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => notify('Dashboard refreshed.', 'success')}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
            >
              <RefreshCw size={16} /> Refresh view
            </button>

            <button
              type="button"
              onClick={() => { window.location.href = '/'; }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
            >
              Return to Site
            </button>
          </div>
        }
      >
        {loading ? <LoadingGrid /> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{dashboardTiles.map((tile) => <DashboardCard key={tile.title} icon={tile.icon} title={tile.title} description={`Open ${tile.title.toLowerCase()} quickly from the examination portal.`} gradient={tile.gradient} href={`/examination-dashboard/${tile.path}`} />)}</div>}

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <NoticeBoardSection items={initialNotices} />
          <GlassCard className="p-5 sm:p-6">
            <SectionHeading
              eyebrow="Portal Summary"
              title="Today at a glance"
              description="Important status cards for admissions, exams, certificates and fees."
            />
            <div className="mt-5 grid grid-cols-2 gap-4">
              {[
                ['Admissions Open', 'Yes'],
                ['Result Window', 'Active'],
                ['Certificate Queue', '12 Pending'],
                ['Fee Dues', '27 Students'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{label}</p>
                  <p className="mt-2 text-xl font-black text-white">{value}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <FormsSection forms={initialForms} onDownload={handleDownload} />
          <ImportantDatesTable rows={importantDates} />
        </div>
      </PageShell>
    </main>
  );
}
