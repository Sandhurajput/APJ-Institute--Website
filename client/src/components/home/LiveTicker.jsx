import { motion } from 'framer-motion';
import { FaBell, FaChevronRight, FaCircle } from 'react-icons/fa';

export default function LiveTicker({ notices = [] }) {
  const tickerItems = [...notices, ...notices];

  return (
    <div className="ticker-shell overflow-hidden rounded-3xl border border-[#15305b]/20 bg-gradient-to-r from-[#15305b] via-[#0f2240] to-red-700 shadow-soft">
      <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center">
        <motion.div
          animate={{ opacity: [1, 0.45, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur"
        >
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-300 shadow-[0_0_0_6px_rgba(239,68,68,0.2)]" />
          Latest Updates
        </motion.div>

        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white/95 backdrop-blur-sm">
          <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-lg text-white">
            <FaBell />
          </span>

          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="ticker-track flex w-max items-center gap-4 pr-4 text-sm font-medium sm:text-[15px]">
              {tickerItems.map((notice, index) => (
                <div
                  key={`${notice.id}-${index}`}
                  className="inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-white/10 px-4 py-2"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-red-200">
                    <FaCircle className="text-[7px]" />
                    {notice.emphasis}
                  </span>
                  <span className="h-4 w-px bg-white/30" />
                  <span className="text-white">{notice.label}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-blue-100/90">
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