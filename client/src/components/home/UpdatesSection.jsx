import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaCalendarAlt, FaCircleNotch, FaClipboardList, FaFilePdf, FaRegClock } from 'react-icons/fa';
import { liveNotificationCards, liveTickerNotices, liveUpdateCounters, sidebarUpdateGroups } from '../../data/homepageData';
import LiveTicker from './LiveTicker';
import NotificationCard from './NotificationCard';
import SidebarUpdates from './SidebarUpdates';

export default function UpdatesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!liveNotificationCards.length) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % liveNotificationCards.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const spotlight = liveNotificationCards[activeIndex];

  return (
    <section id="updates" className="relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 bg-medical-grid opacity-80" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#15305b]/30 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#15305b]/20 bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#15305b] shadow-sm backdrop-blur">
              <FaBell />
              Live Updates & Notifications
            </div>
            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
              Official Notice Board for Students and Parents
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Track admissions, examinations, scholarships, placement drives, and institutional announcements in one place, styled like a government portal.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[360px]">
            {liveUpdateCounters.map((counter) => (
              <motion.div
                key={counter.id}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-[#15305b]/10 bg-white/85 p-4 text-center shadow-[0_18px_45px_-32px_rgba(15,23,42,0.35)] backdrop-blur-xl"
              >
                <p className="text-2xl font-black text-slate-900">{counter.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{counter.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <LiveTicker notices={liveTickerNotices} />

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.95fr)] lg:items-start">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden rounded-3xl border border-[#15305b]/10 bg-white/85 shadow-soft backdrop-blur-xl"
            >
              <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#15305b]">Notifications Panel</p>
                    <h3 className="mt-1 text-2xl font-black text-slate-900">Announcements and Circulars</h3>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                    <FaCircleNotch className="animate-spin" />
                    Auto-refreshing content
                  </div>
                </div>
              </div>

              <div className="grid gap-5 border-b border-slate-100 bg-gradient-to-br from-[#15305b]/5 via-white to-red-50 px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
                <motion.div
                  key={spotlight.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-3xl border border-[#15305b]/10 bg-white/90 p-5 shadow-sm"
                >
                  {spotlight.image && (
                    <div className="mb-4 rounded-2xl overflow-hidden border border-[#15305b]/10 shadow-md">
                      <img 
                        src={spotlight.image} 
                        alt={spotlight.title}
                        className="w-full h-auto object-cover max-h-[300px]"
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                      Live Spotlight
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#15305b]">
                      <FaRegClock />
                      Rotating update
                    </span>
                  </div>

                  <h4 className="mt-4 text-xl font-black text-slate-900">{spotlight.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{spotlight.description}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                      <FaCalendarAlt className="text-[#15305b]" />
                      {spotlight.date}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                      <FaClipboardList className="text-red-500" />
                      {spotlight.category}
                    </span>
                  </div>
                </motion.div>

                <div className="rounded-3xl border border-slate-100 bg-slate-950 p-5 text-white shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-red-200">
                      <FaFilePdf />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#bfdbfe]">Quick Access</p>
                      <h4 className="text-lg font-bold">Downloadable circulars</h4>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 text-sm text-slate-200">
                    <p>• PDF-ready notice cards with official update styling.</p>
                    <p>• Scrollable announcements for easy browsing.</p>
                    <p>• Hover to pause the breaking-news ticker.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 px-5 py-5 sm:px-6">
                {liveNotificationCards.map((item, index) => (
                  <NotificationCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </motion.div>
          </div>

          <SidebarUpdates groups={sidebarUpdateGroups} spotlight={spotlight} />
        </div>
      </div>
    </section>
  );
}