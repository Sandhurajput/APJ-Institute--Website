<<<<<<< HEAD
import React, { useState } from 'react';
import axios from 'axios';

const ContactSection = () => {
  // 1. Form State (APJ Inquiry Data के अनुसार)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '', // पूछताछ का प्रकार (जैसे: Course, Support, Business)
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // टाइप करते ही एरर हटाना
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // 2. Validation
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'नाम लिखना अनिवार्य है।';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'ईमेल लिखना अनिवार्य है।';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'कृपया सही ईमेल दर्ज करें।';
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = 'फ़ोन नंबर लिखना अनिवार्य है।';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      tempErrors.phone = 'कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें।';
    }
    
    if (!formData.inquiryType) tempErrors.inquiryType = 'पूछताछ का विषय चुनना अनिवार्य है।';
    if (!formData.message.trim()) tempErrors.message = 'संदेश या प्रश्न लिखना अनिवार्य है।';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // 3. Axios API Call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ success: null, message: '' });

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.inquiryType,
        message: formData.message,
      };

      const response = await axios.post('/api/contact', payload);

      if (response.status === 200 || response.status === 201) {
        setSubmitStatus({
          success: true,
          message: 'आपकी पूछताछ (Inquiry) सफलतापूर्वक दर्ज कर ली गई है। हमारी टीम जल्द ही आपसे संपर्क करेगी।',
        });
        // फॉर्म रीसेट करें
        setFormData({ name: '', email: '', phone: '', inquiryType: '', message: '' });
      }
    } catch (error) {
      console.error('Inquiry Submission Error:', error);
      setSubmitStatus({
        success: false,
        message: error.response?.data?.message || 'सबमिट करने में समस्या आई। कृपया पुनः प्रयास करें।',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900" id="inquiry-section">
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">APJ Inquiry Portal</span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">पूछताछ फ़ॉर्म</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">अपनी क्वेरी दर्ज करें, हमारी टीम जल्द ही आपसे संपर्क करेगी।</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 space-y-6">
          
          {/* Status Alert Messages */}
          {submitStatus.success === true && (
            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-slate-800 dark:text-green-400 border border-green-200" role="alert">
              {submitStatus.message}
            </div>
          )}
          {submitStatus.success === false && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-slate-800 dark:text-red-400 border border-red-200" role="alert">
              {submitStatus.message}
            </div>
          )}

          {/* Name Field */}
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">पूरा नाम</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2.5 text-sm rounded-lg border bg-slate-50 dark:bg-slate-700 dark:text-white transition-all ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="आपका नाम दर्ज करें"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">ईमेल पता</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2.5 text-sm rounded-lg border bg-slate-50 dark:bg-slate-700 dark:text-white transition-all ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="name@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">मोबाइल नंबर</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-2.5 text-sm rounded-lg border bg-slate-50 dark:bg-slate-700 dark:text-white transition-all ${
                errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="98765XXXXX"
            />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </div>

          {/* Inquiry Type Dropdown */}
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">पूछताछ का विषय</label>
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className={`w-full p-2.5 text-sm rounded-lg border bg-slate-50 dark:bg-slate-700 dark:text-white transition-all ${
                errors.inquiryType ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            >
              <option value="">एक विकल्प चुनें</option>
              <option value="Admission / Course Inquiry">प्रवेश / कोर्स संबंधित (Admission)</option>
              <option value="General Query">सामान्य पूछताछ (General)</option>
              <option value="Technical Support">तकनीकी सहायता (Support)</option>
              <option value="Partnership / Business">साझेदारी / बिजनेस (Business)</option>
            </select>
            {errors.inquiryType && <p className="mt-1 text-xs text-red-500">{errors.inquiryType}</p>}
          </div>

          {/* Message Field */}
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">आपका संदेश / विवरण</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-2.5 text-sm rounded-lg border bg-slate-50 dark:bg-slate-700 dark:text-white transition-all ${
                errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="कृपया अपनी समस्या या पूछताछ का विवरण यहाँ लिखें..."
            ></textarea>
            {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
          </div>

          {/* Loading / Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white font-semibold rounded-lg text-sm px-5 py-3 text-center transition-all shadow-md ${
              isLoading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg focus:ring-4 focus:ring-blue-300'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                दर्ज किया जा रहा है...
              </span>
            ) : (
              'पूछताछ दर्ज करें (Submit Inquiry)'
            )}
          </button>
        </form>
=======
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { homeData } from '../../data/homeData';
import { submitContactInquiry } from '../../utils/contactApi';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');
    setErrorMessage('');

    try {
      await submitContactInquiry({
        ...formData,
        subject: 'General Inquiry',
      });

      setStatusMessage('Inquiry sent successfully.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Unable to send your inquiry right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-lg text-gray-600">Have questions? Reach out to us today!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            className="space-y-8"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="flex gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white">
                  <FaMapMarkerAlt size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                <p className="text-gray-600">{homeData.contact.address}</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-600 text-white">
                  <FaPhoneAlt size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                <p className="text-gray-600">{homeData.contact.phone}</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-600 text-white">
                  <FaEnvelope size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600">{homeData.contact.email}</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <motion.div whileFocus={{ scale: 1.02 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="Your Name"
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="your@email.com"
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="+91 XXXXXXXXXX"
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
                  placeholder="Your message here..."
                />
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <FaPaperPlane size={18} />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>

              {statusMessage && <p className="text-sm font-medium text-emerald-600">{statusMessage}</p>}
              {errorMessage && <p className="text-sm font-medium text-red-600">{errorMessage}</p>}
            </div>
          </motion.form>
        </div>
>>>>>>> 40f48fc (change final)
      </div>
    </section>
  );
};

export default ContactSection;