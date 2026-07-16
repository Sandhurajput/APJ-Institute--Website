import { motion } from 'framer-motion';
import { FaAngleRight, FaBell, FaBullhorn, FaCalendarCheck, FaClipboardList, FaGraduationCap, FaNewspaper } from 'react-icons/fa';

const groupIcons = {
  news: FaNewspaper,
  admission: FaGraduationCap,
  events: FaCalendarCheck,
  exam: FaClipboardList,
};

export default function SidebarUpdates({ groups = [], spotlight }) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden rounded-3xl border border-[#15305b]/10 bg-gradient-to-br from-[#15305b] via-[#0e213f] to-slate-950 p-5 text-white shadow-soft"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl text-red-200 backdrop-blur">
            <FaBell />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">Live Feed</p>
            <h3 className="text-xl font-bold">Institutional Update Desk</h3>
          </div>
        </div>

        {spotlight && (
          <div className="mt-5 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-200">
              <FaBullhorn />
              Spotlight
            </div>
            <h4 className="mt-3 text-lg font-bold">{spotlight.title}</h4>
            <p className="mt-2 text-sm leading-6 text-blue-50/90">{spotlight.description}</p>
          </div>
        )}
      </motion.div>

      {groups.map((group, index) => {
        const Icon = groupIcons[group.icon] || FaNewspaper;

        return (
          <motion.section
            key={group.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className="rounded-3xl border border-[#15305b]/10 bg-white/85 p-5 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.35)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#15305b]/5 text-[#15305b]">
                <Icon />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{group.title}</h3>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Official notices and circulars</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {group.items.map((item) => (
                <div
                  key={item.title}
                  className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-[#15305b]/20 hover:bg-[#15305b]/5"
                >
                  <span className="mt-1 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#15305b] shadow-sm">
                    <FaAngleRight />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{item.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        );
      })}
    </aside>
  );
}