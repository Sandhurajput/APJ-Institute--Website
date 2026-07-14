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
        className="overflow-hidden rounded-3xl border border-black/10 bg-black p-5 text-white shadow-sm"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl text-gray-200">
            <FaBell />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-300">Live Feed</p>
            <h3 className="text-xl font-bold">Institutional Update Desk</h3>
          </div>
        </div>

        {spotlight && (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-300">
              <FaBullhorn />
              Spotlight
            </div>
            <h4 className="mt-3 text-lg font-bold">{spotlight.title}</h4>
            <p className="mt-2 text-sm leading-6 text-gray-300">{spotlight.description}</p>
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
            className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 border-b border-black/10 pb-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f5f5f5] text-black">
                <Icon />
              </div>
              <div>
                <h3 className="text-lg font-bold text-black">{group.title}</h3>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#666666]">Official notices and circulars</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {group.items.map((item) => (
                <div
                  key={item.title}
                  className="group flex items-start gap-3 rounded-2xl border border-black/10 bg-[#f8f8f8] p-4 transition hover:bg-[#f0f0f0]"
                >
                  <span className="mt-1 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-black shadow-sm">
                    <FaAngleRight />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-black">{item.title}</h4>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-[#666666]">{item.meta}</p>
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