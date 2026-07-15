import { motion } from 'framer-motion';
import { FaCalendarAlt, FaDownload, FaEye, FaExclamationTriangle, FaFilePdf } from 'react-icons/fa';

export default function NotificationCard({ item, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-[#15305b]/10 bg-white/85 p-5 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.4)] backdrop-blur-xl transition"
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#15305b] via-blue-500 to-red-500" />

      <div className="flex flex-wrap items-start justify-between gap-3 pl-2">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {item.isNew && (
              <motion.span
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-sm"
              >
                NEW
              </motion.span>
            )}
            <span className="inline-flex items-center rounded-full bg-[#15305b]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#15305b]">
              {item.category}
            </span>
            {item.important && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-700">
                <FaExclamationTriangle />
                Important
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <FaCalendarAlt className="text-[#15305b]" />
            {item.date}
          </div>
        </div>

        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#15305b] to-blue-600 text-white shadow-lg shadow-[#15305b]/20 transition group-hover:scale-105">
          <FaFilePdf />
        </div>
      </div>

      <div className="mt-4 pl-2">
        <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3 pl-2">
        <a
          href={item.viewUrl}
          className="inline-flex items-center gap-2 rounded-full border border-[#15305b]/20 bg-[#15305b]/5 px-4 py-2 text-sm font-semibold text-[#15305b] transition hover:border-[#15305b]/30 hover:bg-[#15305b]/10"
        >
          <FaEye />
          View
        </a>
        <a
          href={item.pdfUrl}
          download
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#15305b] to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02]"
        >
          <FaDownload />
          Download PDF
        </a>
      </div>
    </motion.article>
  );
}