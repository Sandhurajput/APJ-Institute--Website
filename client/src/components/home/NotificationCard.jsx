import { motion } from 'framer-motion';
import { FaCalendarAlt, FaDownload, FaEye, FaExclamationTriangle } from 'react-icons/fa';

function GovernmentPdfIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="3" width="12" height="18" rx="1" fill="#FFFFFF" stroke="#C62828" strokeWidth="1.5" />
      <path d="M16 3h4v4" fill="#C62828" />
      <path d="M16 3v4h4" stroke="#C62828" strokeWidth="1.5" />
      <path d="M8 9h8" stroke="#C62828" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 13h8" stroke="#C62828" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 17h5" stroke="#C62828" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function NotificationCard({ item, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-[6px] border border-[#D6DCE5] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition"
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-[#111827]" />

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
            <span className="inline-flex items-center rounded-[4px] border border-[#D6DCE5] bg-[#F8F9FA] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111827]">
              {item.category}
            </span>
            {item.important && (
              <span className="inline-flex items-center gap-1 rounded-[4px] border border-[#D6DCE5] bg-[#F8F9FA] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111827]">
                <FaExclamationTriangle className="text-[#C62828]" />
                Important
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <FaCalendarAlt className="text-[#111827]" />
            {item.date}
          </div>
        </div>

        <div className="inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-[#D6DCE5] bg-[#F8F9FA] text-[#C62828] transition group-hover:scale-105">
          <GovernmentPdfIcon />
        </div>
      </div>

      <div className="mt-4 pl-2">
        <h3 className="text-lg font-semibold text-[#111827] sm:text-xl">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#374151]">{item.description}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3 pl-2">
        <a
          href={item.viewUrl}
          className="inline-flex items-center gap-2 rounded-[6px] border border-[#0B3D91] bg-white px-4 py-2 text-sm font-semibold text-[#0B3D91] transition hover:bg-[#F8F9FA]"
        >
          <FaEye />
          View
        </a>
        <a
          href={item.pdfUrl}
          download
          className="inline-flex items-center gap-2 rounded-[6px] border border-[#C62828] bg-[#C62828] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b11f1f]"
        >
          <FaDownload />
          Download PDF
        </a>
      </div>
    </motion.article>
  );
}