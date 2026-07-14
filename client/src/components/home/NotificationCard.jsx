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
      className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition"
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-black" />

      <div className="flex flex-wrap items-start justify-between gap-3 pl-2">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {item.isNew && (
              <motion.span
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center rounded-full bg-black px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white"
              >
                NEW
              </motion.span>
            )}
            <span className="inline-flex items-center rounded-full bg-[#f5f5f5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#333333]">
              {item.category}
            </span>
            {item.important && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#f5f5f5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#555555]">
                <FaExclamationTriangle />
                Important
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#666666]">
            <FaCalendarAlt className="text-black" />
            {item.date}
          </div>
        </div>

        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white transition group-hover:scale-105">
          <FaFilePdf />
        </div>
      </div>

      <div className="mt-4 pl-2">
        <h3 className="text-lg font-bold text-black sm:text-xl">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#555555]">{item.description}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3 pl-2">
        <a
          href={item.viewUrl}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f5f5f5] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#ececec]"
        >
          <FaEye />
          View
        </a>
        <a
          href={item.pdfUrl}
          download
          className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#333333]"
        >
          <FaDownload />
          Download PDF
        </a>
      </div>
    </motion.article>
  );
}