import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaCalendarAlt, FaCircleNotch, FaClipboardList, FaFilePdf, FaRegClock } from 'react-icons/fa';
import { liveNotificationCards, liveTickerNotices, liveUpdateCounters, sidebarUpdateGroups } from '../../data/homepageData';
import LiveTicker from './LiveTicker';
import NotificationCard from './NotificationCard';
import SidebarUpdates from './SidebarUpdates';
import DigitalPoster from './DigitalPoster';
import api from '../../services/api';

function formatNoticeDate(value) {
  if (!value) return 'Now';

  try {
    return new Date(value).toLocaleDateString();
  } catch {
    return 'Now';
  }
}

function mapNotificationToNotice(item, index = 0) {
  return {
    id: item.id ? String(item.id) : `notice-${index}`,
    title: item.title,
    description: item.message || item.content || 'Official notice published by APJ Institute Raipur.',
    category: item.type === 'warning' ? 'Admission Notice' : item.type === 'error' ? 'Exam Notice' : 'Application Update',
    date: formatNoticeDate(item.createdAt),
    isNew: index < 2,
    important: Number(item.priority || 0) > 0,
    pdfUrl: '#updates',
    viewUrl: '#updates',
  };
}

export default function UpdatesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [remoteNotifications, setRemoteNotifications] = useState([]);
  const basePoster = liveNotificationCards[0];

  useEffect(() => {
    let isMounted = true;

    api.get('/notifications/active/list')
      .then((response) => {
        if (!isMounted) return;
        const list = Array.isArray(response.data?.data) ? response.data.data : [];
        setRemoteNotifications(list);
      })
      .catch(() => {
        if (isMounted) setRemoteNotifications([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const count = remoteNotifications.length || liveNotificationCards.length;

    if (!count) {
      return undefined;
    }

    setActiveIndex(0);

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % count);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [remoteNotifications.length]);

  const displayNotifications = remoteNotifications.length
    ? remoteNotifications.map(mapNotificationToNotice)
    : liveNotificationCards;

  const spotlight = {
    ...basePoster,
    ...(displayNotifications[activeIndex] || {}),
    category: displayNotifications[activeIndex]?.category || basePoster.category,
    courses: basePoster.courses,
    eligibility: basePoster.eligibility,
    contact: basePoster.contact,
    image: basePoster.image,
    pdfUrl: displayNotifications[activeIndex]?.pdfUrl || basePoster.pdfUrl,
    viewUrl: displayNotifications[activeIndex]?.viewUrl || basePoster.viewUrl,
  };

  return (
    <section id="updates" className="relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 bg-medical-grid opacity-80" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-700 shadow-sm backdrop-blur">
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
                className="rounded-2xl border border-blue-100 bg-white/85 p-4 text-center shadow-[0_18px_45px_-32px_rgba(15,23,42,0.35)] backdrop-blur-xl"
              >
                <p className="text-2xl font-black text-slate-900">{counter.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{counter.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <LiveTicker notices={remoteNotifications.length ? remoteNotifications.map((item, index) => ({ id: item.id || `ticker-${index}`, label: item.title, category: item.type || 'Notice', emphasis: item.priority > 0 ? 'Alert' : 'Info' })) : liveTickerNotices} />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_minmax(300px,0.4fr)] lg:items-start">
          <DigitalPoster notification={spotlight} />

          <div className="rounded-3xl border border-slate-100 bg-slate-950 p-5 text-white shadow-lg h-fit">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-red-200">
                <FaFilePdf />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">Quick Access</p>
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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mt-8 overflow-hidden rounded-3xl border border-blue-100 bg-white/85 shadow-soft backdrop-blur-xl"
        >
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">All Notifications Panel</p>
                <h3 className="mt-1 text-2xl font-black text-slate-900">Browse All Announcements</h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                <FaCircleNotch className="animate-spin" />
                {displayNotifications.length} notifications
              </div>
            </div>
          </div>

          <div className="max-h-[760px] space-y-4 overflow-y-auto px-5 py-5 pr-3 sm:px-6 notice-scrollbar">
                {displayNotifications.map((item, index) => (
              <NotificationCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}