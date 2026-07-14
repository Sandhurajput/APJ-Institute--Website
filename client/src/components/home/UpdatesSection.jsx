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
    <section id="updates" className="relative overflow-hidden bg-[#f5f5f5] py-16 sm:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(17,17,17,0.02),rgba(17,17,17,0.02))]" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-black shadow-sm">
              <FaBell />
              Live Updates & Notifications
            </div>
            <h2 className="mt-4 text-3xl font-black text-black sm:text-4xl lg:text-5xl">
              Official Notice Board for Students and Parents
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#555555] sm:text-lg">
              Track admissions, examinations, scholarships, placement drives, and institutional announcements in one place with a formal government-style presentation.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[360px]">
            {liveUpdateCounters.map((counter) => (
              <motion.div
                key={counter.id}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-black/10 bg-white p-4 text-center shadow-sm"
              >
                <p className="text-2xl font-black text-black">{counter.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#666666]">{counter.label}</p>
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
              className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm"
            >
              <div className="border-b border-black/10 px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#333333]">Notifications Panel</p>
                    <h3 className="mt-1 text-2xl font-black text-black">Announcements and Circulars</h3>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#f5f5f5] px-4 py-2 text-sm font-semibold text-[#333333]">
                    <FaCircleNotch className="animate-spin" />
                    Auto-refreshing content
                  </div>
                </div>
              </div>

              <div className="grid gap-5 border-b border-black/10 bg-[#f8f8f8] px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
                <motion.div
                  key={spotlight.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm"
                >
                  {spotlight.image && (
                    <div className="mb-4 overflow-hidden rounded-2xl border border-black/10">
                      <img
                        src={spotlight.image}
                        alt={spotlight.title}
                        className="h-auto max-h-[300px] w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                      Live Spotlight
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#f5f5f5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#333333]">
                      <FaRegClock />
                      Rotating update
                    </span>
                  </div>

                  <h4 className="mt-4 text-xl font-black text-black">{spotlight.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-[#555555]">{spotlight.description}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#666666]">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#f5f5f5] px-3 py-1 text-[#333333]">
                      <FaCalendarAlt className="text-black" />
                      {spotlight.date}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#f5f5f5] px-3 py-1 text-[#333333]">
                      <FaClipboardList className="text-[#666666]" />
                      {spotlight.category}
                    </span>
                  </div>
                </motion.div>

                <div className="rounded-3xl border border-black/10 bg-black p-5 text-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-gray-200">
                      <FaFilePdf />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-300">Quick Access</p>
                      <h4 className="text-lg font-bold">Downloadable circulars</h4>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 text-sm text-gray-300">
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