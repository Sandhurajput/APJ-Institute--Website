import { motion } from 'framer-motion';
import { FaBell, FaFileAlt, FaExternalLinkAlt, FaCalendarAlt, FaTag } from 'react-icons/fa';

export default function DigitalPoster({ notification }) {
  if (!notification) return null;

  const getGradient = (category) => {
    const gradients = {
      'Admission Notice': 'from-blue-600 to-cyan-500',
      'Application Update': 'from-purple-600 to-blue-500',
      'Scholarship Alert': 'from-green-600 to-emerald-500',
      'Placement Cell': 'from-orange-600 to-yellow-500',
      'Exam Notice': 'from-red-600 to-pink-500',
    };
    return gradients[category] || 'from-blue-600 to-sky-500';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Admission Notice': 'bg-blue-100 text-blue-700',
      'Application Update': 'bg-purple-100 text-purple-700',
      'Scholarship Alert': 'bg-green-100 text-green-700',
      'Placement Cell': 'bg-orange-100 text-orange-700',
      'Exam Notice': 'bg-red-100 text-red-700',
    };
    return colors[category] || 'bg-blue-100 text-blue-700';
  };

  const gradient = getGradient(notification.category);
  const categoryColor = getCategoryColor(notification.category);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-2xl"
      style={{
        background: `linear-gradient(135deg, rgba(15, 23, 42, 0.02) 0%, rgba(59, 130, 246, 0.03) 100%)`,
      }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />

      {/* Animated background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-transparent rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-gradient-to-tr from-blue-100 to-transparent rounded-full opacity-15 blur-3xl" />

      {/* Content */}
      <div className="relative p-8 md:p-12">
        {/* Top section with header */}
        <div className="mb-8 pb-8 border-b border-slate-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            {/* Left: Category & Status */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2 items-center">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide ${categoryColor}`}>
                  <FaTag size={12} />
                  {notification.category}
                </span>

                {notification.isNew && (
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold uppercase"
                  >
                    <FaBell size={10} />
                    New
                  </motion.span>
                )}

                {notification.important && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold uppercase">
                    ⚠️ Important
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <FaCalendarAlt size={14} />
                <span>{notification.date}</span>
              </div>
            </div>

            {/* Right: Decorative element */}
            <div className={`hidden md:block w-24 h-24 rounded-2xl bg-gradient-to-br ${gradient} opacity-10 blur-xl`} />
          </div>
        </div>

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
        >
          {notification.title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-lg text-slate-700 leading-8 mb-8 max-w-3xl"
        >
          {notification.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {notification.pdfUrl && (
            <a
              href={notification.pdfUrl}
              className={`inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-white uppercase tracking-wide bg-gradient-to-r ${gradient} shadow-lg hover:shadow-xl transition-all hover:scale-105 group`}
            >
              <FaFileAlt className="group-hover:animate-bounce" />
              Download Details
            </a>
          )}

          {notification.viewUrl && (
            <a
              href={notification.viewUrl}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-slate-700 uppercase tracking-wide border-2 border-slate-300 hover:border-blue-500 hover:text-blue-700 transition-all hover:scale-105"
            >
              Learn More
              <FaExternalLinkAlt />
            </a>
          )}
        </motion.div>

        {/* Institute branding at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">APJ Institute</p>
            <p className="text-sm font-semibold text-slate-800">Raipur</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Official Announcement</p>
            <p className="text-sm font-semibold text-slate-700">Medical & Paramedical Excellence</p>
          </div>
        </motion.div>
      </div>

      {/* Decorative corner accent */}
      <div className={`absolute top-0 right-0 w-1 h-32 bg-gradient-to-b ${gradient} opacity-30`} />
      <div className={`absolute bottom-0 left-0 w-32 h-1 bg-gradient-to-r ${gradient} opacity-30`} />
    </motion.div>
  );
}
