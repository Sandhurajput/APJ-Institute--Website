import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaSearch } from 'react-icons/fa';
import { liveNotificationCards, liveTickerNotices } from '../../data/homepageData';
import LiveTicker from './LiveTicker';
import NotificationCard from './NotificationCard';

export default function UpdatesSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotifications = useMemo(() => {
    if (!searchTerm.trim()) return liveNotificationCards;
    const lowerSearch = searchTerm.toLowerCase();
    return liveNotificationCards.filter((item) =>
      [item.title, item.description, item.category, item.date].some((field) =>
        field?.toLowerCase().includes(lowerSearch)
      )
    );
  }, [searchTerm]);

  return (
    <section id="updates" className="relative py-16 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-[6px] border border-[#0B3D91]/20 bg-[#FFFFFF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0B3D91] shadow-[0_1px_2px_rgba(15,23,42,0.08)]">
              <FaBell />
              Live Updates & Notifications
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-[#1F2937] sm:text-4xl lg:text-5xl">
              Official Notice Board for Students and Parents
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#374151] sm:text-lg">
              Track admissions, examinations, scholarships, placement drives, and institutional announcements in one place.
            </p>
          </div>

          <div className="w-full max-w-sm">
            <label className="relative block text-sm text-[#111827]">
              <span className="sr-only">Search notices</span>
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#6B7280]">
                <FaSearch size={16} />
              </span>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search all notices"
                className="w-full rounded-[6px] border border-[#D1D5DB] bg-[#F9FAFB] py-3 pl-11 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#6B7280] focus:border-[#111827] focus:ring-1 focus:ring-[#111827]/10"
              />
              <p className="mt-2 text-sm text-[#6B7280]">Search by title, category, or date.</p>
            </label>
          </div>
        </div>

        {/* Live Scrolling Ticker */}
        <LiveTicker notices={liveTickerNotices} />

        {/* Simplified Notification Cards Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNotifications.map((item, index) => (
            <NotificationCard key={item.id} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}