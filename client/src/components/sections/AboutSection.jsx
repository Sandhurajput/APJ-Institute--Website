import { motion } from 'framer-motion';
import { homeData } from '../../data/homeData';

const Counter = ({ target, duration }) => {
  const [value, setValue] = motion.useMotionValue(0);

  motion.useEffect(() => {
    if (value.current !== target) {
      let interval = setInterval(() => {
        setValue(prev => Math.min(prev + 1, target));
      }, (duration * 1000) / target);
      return () => clearInterval(interval);
    }
  }, [target, duration]);

  return value;
};

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                About APJ Institute
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Building Excellence in Technical <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Education</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 mb-6 leading-relaxed"
            >
              APJ Institute Raipur is committed to providing world-class education and training 
              in technology, design, and business. With industry experts as trainers and real-world 
              projects as curriculum, we prepare students for the challenges of the modern workplace.
            </motion.p>

            {/* Mission & Vision */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
                <h4 className="font-bold text-gray-900 mb-2">🎯 Our Mission</h4>
                <p className="text-gray-600">
                  To empower individuals with practical skills and knowledge that enable them to 
                  succeed in their chosen careers and contribute positively to society.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100">
                <h4 className="font-bold text-gray-900 mb-2">👁️ Our Vision</h4>
                <p className="text-gray-600">
                  To be a leading educational institute that bridges the gap between academics 
                  and industry, creating competent professionals who drive innovation.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Statistics */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {homeData.statistics.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl border border-blue-100 text-center hover:shadow-lg transition-all duration-300"
              >
                <motion.p
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
