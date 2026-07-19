import { motion } from 'framer-motion';
import { FaBell, FaChevronRight } from 'react-icons/fa';

export default function LiveTicker({ notices = [] }) {
  const tickerItems = [...notices, ...notices];

  return (
    <div className="ticker-shell overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center">
        <motion.div
          animate={{ opacity: [1, 0.8, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex w-fit items-center gap-2 rounded-[6px] bg-[#FEE2E2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#B91C1C]"
        >
          Latest Updates
        </motion.div>

        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[8px] border border-[#E5E7EB] bg-[#FFF5F5] px-3 py-3 text-[#111827]">
          <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[6px] bg-[#FEE2E2] text-lg text-[#B91C1C]">
            <FaBell />
          </span>

          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="ticker-track flex w-max items-center gap-3 pr-4 text-sm font-medium sm:text-[15px]">
              {tickerItems.map((notice, index) => (
                <div
                  key={`${notice.id}-${index}`}
                  className="inline-flex items-center gap-3 whitespace-nowrap rounded-[6px] border border-[#D1D5DB] bg-[#FFFFFF] px-4 py-2"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#374151]">
                    {notice.emphasis}
                  </span>
                  <span className="h-4 w-px bg-[#D1D5DB]" />
                  <span className="text-[#111827]">{notice.label}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-[#6B7280]">
                    {notice.category}
                    <FaChevronRight className="text-[10px]" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}