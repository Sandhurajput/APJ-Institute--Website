import { motion } from 'framer-motion';
import { FaBell } from 'react-icons/fa';
import { liveNotificationCards, liveTickerNotices } from '../../data/homepageData';
import LiveTicker from './LiveTicker';
import NotificationCard from './NotificationCard';

export default function UpdatesSection() {
  return (
    <section id="updates" className="relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 bg-medical-grid opacity-80" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#15305b]/30 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        
        {/* Header Section */}
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
              Track admissions, examinations, scholarships, placement drives, and institutional announcements in one place.
            </p>
          </div>
        </div>

        {/* Live Scrolling Ticker */}
        <LiveTicker notices={liveTickerNotices} />

        {/* Simplified Notification Cards Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {liveNotificationCards.map((item, index) => (
            <NotificationCard key={item.id} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}