import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGraduationCap, 
  FaStar, 
  FaExclamationTriangle, 
  FaPaperPlane, 
  FaWhatsapp, 
  FaCheckCircle, 
  FaCheck,
  FaTimes
} from 'react-icons/fa';

export default function AdmissionPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    program: '',
    cityState: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.program) {
      alert('Please fill in all required fields.');
      return;
    }
    // Simulate successful form submission
    setIsSubmitted(true);
    setFormData({
      fullName: '',
      phone: '',
      program: '',
      cityState: ''
    });
  };

  const programs = [
    'BMLT (Bachelor of Medical Laboratory Technology) - 3 Years',
    'DMLT (Diploma in Medical Laboratory Technology) - 2 Years',
    'Pharmacy (D.Pharma) - 2 Years',
    'Medical Lab Technician - 2 Years',
    'Ophthalmic Assistant - 2 Years'
  ];

  const reasons = [
    'Advanced Clinical Labs',
    'Specialized Medical Faculty',
    'Real-World Practice Training',
    'Great Job Opportunities'
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 relative">
        
        {/* Dark Top Banner */}
        <div className="bg-gradient-to-r from-[#1b3d54] via-[#1f4864] to-[#15305b] py-8 px-6 text-center text-white">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            APJ INSTITUTE DANTEWADA
          </h1>
          <p className="mt-2 text-slate-300 text-sm sm:text-base font-medium">
            Your Gateway to Healthcare & Professional Education excellence
          </p>
        </div>

        <div className="p-6 sm:p-10">
          {/* Two Columns Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {/* Featured Programs Card */}
            <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b-2 border-blue-500/20">
                <FaGraduationCap className="text-[#15305b] text-xl" />
                <h2 className="text-lg font-bold text-slate-800">Featured Programs</h2>
              </div>
              <ul className="space-y-3.5">
                {programs.map((prog, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-semibold leading-relaxed">
                    <span className="p-0.5 rounded-full bg-blue-50 text-blue-500 shrink-0 mt-0.5">
                      <FaCheckCircle className="text-blue-500 w-4 h-4" />
                    </span>
                    <span>{prog}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Choose APJ Card */}
            <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b-2 border-blue-500/20">
                <FaStar className="text-amber-500 text-xl" />
                <h2 className="text-lg font-bold text-slate-800">Why Choose APJ?</h2>
              </div>
              <ul className="space-y-3.5">
                {reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-semibold leading-relaxed">
                    <span className="p-0.5 rounded-full bg-blue-50 text-blue-500 shrink-0 mt-0.5">
                      <FaCheckCircle className="text-blue-500 w-4 h-4" />
                    </span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Important Notice Alert Box */}
          <div className="border-2 border-dashed border-amber-400 bg-amber-50/30 rounded-2xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <FaExclamationTriangle className="text-amber-600 text-lg shrink-0 mt-0.5" />
              <div>
                <h3 className="text-amber-800 font-extrabold text-sm uppercase tracking-wide">
                  IMPORTANT ADMISSION NOTICE
                </h3>
                <p className="text-amber-800/90 text-sm mt-1 leading-relaxed font-semibold">
                  Please note that all seat bookings and final admissions are processed <span className="font-extrabold underline">strictly offline</span> on our physical campus. Submit the enquiry form below to lock your inquiry and plan your campus visit details.
                </p>
              </div>
            </div>
          </div>

          {/* Enquiry Form Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <FaPaperPlane className="text-[#15305b] rotate-45" size={16} />
              <h2 className="text-xl font-bold text-slate-800">Quick Enquiry Form</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition duration-300 font-medium"
                  />
                </div>

                {/* Phone / Mobile */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your 10 digit number"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition duration-300 font-medium"
                  />
                </div>

                {/* Preferred Program */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Preferred Program *
                  </label>
                  <select
                    required
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition duration-300 font-semibold"
                  >
                    <option value="">-- Choose Course --</option>
                    <option value="BMLT">BMLT</option>
                    <option value="DMLT">DMLT</option>
                    <option value="Pharmacy">Pharmacy (D.Pharma)</option>
                    <option value="Nursing">Nursing</option>
                    <option value="Ophthalmic Assistant">Ophthalmic Assistant</option>
                    <option value="Medical Lab Technician">Medical Lab Technician</option>
                  </select>
                </div>

                {/* City / State */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    City / State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cityState}
                    onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                    placeholder="e.g., Raipur, Chhattisgarh"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition duration-300 font-medium"
                  />
                </div>

              </div>

              {/* Action Buttons */}
              <div className="relative pt-6">
                
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#0066cc] hover:bg-[#0052a3] text-white font-extrabold py-3.5 px-8 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  Submit & Request Visit Schedule →
                </button>

                {/* WhatsApp Chat Button */}
                <a
                  href="https://wa.me/919243758191"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-4 top-[-20px] text-white font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300 text-sm z-10"
                  style={{
                    backgroundColor: '#1cbd5d',
                    boxShadow: '0 10px 25px rgba(28, 189, 93, 0.35), 0 4px 10px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#17a04f';
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(28, 189, 93, 0.45), 0 6px 15px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#1cbd5d';
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(28, 189, 93, 0.35), 0 4px 10px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <FaWhatsapp size={20} />
                  Chat with Us on WhatsApp
                </a>

              </div>
            </form>
          </div>

        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-slate-100 text-center"
            >
              <button
                onClick={() => setIsSubmitted(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
              >
                <FaTimes size={18} />
              </button>
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-inner">
                <FaCheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Enquiry Submitted!</h3>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed font-medium">
                Thank you for your inquiry. Our admission counselor will get in touch with you shortly to schedule your campus visit.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-6 w-full bg-[#15305b] hover:bg-[#0e2243] text-white font-bold py-3 rounded-xl transition duration-300 text-sm shadow"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
