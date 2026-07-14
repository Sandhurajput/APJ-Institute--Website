import { motion } from 'framer-motion';
import { newsImage } from '../../data/homepageData';

export default function NewsSection() {
  const news = [
    {
      title: 'Admissions Open for 2026-27',
      date: '1 August to 15 August 2025',
      description: 'Special admission offers available for all medical and paramedical courses.',
    },
    {
      title: 'Independence Day Celebrations',
      date: '15 August 2025',
      description: 'APJ Institute celebrates India\'s Independence with cultural programs and community engagement.',
    },
    {
      title: 'Campus Facility Upgrade Complete',
      date: 'May 2025',
      description: 'New laboratory equipment and modern facilities now available for student training.',
    },
  ];

  return (
    <section id="news" className="py-16 sm:py-20 bg-gradient-to-r from-slate-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 items-stretch">
          {/* News Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="relative overflow-hidden rounded-2xl shadow-soft"
          >
            <img
              src={newsImage}
              alt="Latest News and Announcements"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          </motion.div>

          {/* News Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-8">
              <div className="inline-block bg-gradient-to-r from-blue-600 to-sky-500 text-white px-4 py-2 rounded-lg mb-4">
                <p className="text-sm font-semibold uppercase tracking-wide">Latest News & Notifications</p>
              </div>
              <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">Stay Updated With Institute News</h2>
              <p className="mt-4 text-slate-600">
                Get the latest announcements, admission updates, and important notifications from APJ Institute Raipur.
              </p>
            </div>

            {/* News List */}
            <div className="space-y-4">
              {news.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  className="p-4 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-xs font-semibold uppercase text-blue-600 tracking-wide mb-1">{item.date}</p>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-6">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-6 inline-flex w-fit rounded-full bg-gradient-to-r from-blue-700 to-sky-500 px-7 py-3.5 text-sm font-bold text-white shadow-soft transition hover:scale-[1.02]"
            >
              View All Updates
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
