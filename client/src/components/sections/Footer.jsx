import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* About */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center font-bold">
                APJ
              </div>
              <h3 className="text-lg font-bold">APJ Institute</h3>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Empowering future innovators with world-class technical education and training.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Courses', 'Admission', 'Contact'].map((link, idx) => (
                <li key={idx}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Courses */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-lg mb-4">Courses</h4>
            <ul className="space-y-2">
              {['Full Stack Dev', 'Graphic Design', 'Tally', 'DCA/PGDCA', 'App Dev'].map((course, idx) => (
                <li key={idx}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    {course}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p>
                <strong>Address:</strong><br />
                Raipur, Chhattisgarh
              </p>
              <p>
                <strong>Phone:</strong><br />
                +91-XXXXXXXXXX
              </p>
              <p>
                <strong>Email:</strong><br />
                apjinstituteparamedicaldantewa@gmail.com
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-800"></div>

        {/* Bottom Footer */}
        <motion.div
          className="mt-12 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p>
            © {currentYear} APJ Institute Raipur. All rights reserved.
          </p>
          <motion.div className="flex gap-6 mt-4 md:mt-0">
            <motion.a href="#" whileHover={{ textDecoration: 'underline' }}>
              Privacy Policy
            </motion.a>
            <motion.a href="#" whileHover={{ textDecoration: 'underline' }}>
              Terms & Conditions
            </motion.a>
            <motion.a href="#" whileHover={{ textDecoration: 'underline' }}>
              Sitemap
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Made with Love */}
        <motion.div
          className="text-center mt-6 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="flex items-center justify-center gap-2">
            Made with <FaHeart className="text-red-500" /> by APJ Institute
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
