import { FaChevronRight, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { courseNames, quickLinks } from '../../data/homepageData';

export default function Footer() {
  return (
    <footer className="relative bg-[#0b1120] text-slate-300 overflow-hidden border-t border-slate-800">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Column 1: About */}
          <div className="flex flex-col">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <span className="text-blue-500">APJ</span> Institute
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-slate-400 text-justify">
              AP Education Institute (also known as AP Paramedical Institute) is a career-oriented training center located at Sector 9, Raghuraj Tower (Opposite MMR Hospital), Kamal Vihar, Raipur. They offer vocational and diploma programs in allied healthcare, including BMLT, DMLT, OT Technician, and X-Ray Technician.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-5 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1.5 left-0 w-1/2 h-0.5 bg-blue-500 rounded-full"></span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="group flex items-center gap-2 text-slate-400 transition-colors hover:text-blue-400">
                    <FaChevronRight className="text-[10px] text-slate-600 group-hover:text-blue-400 transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Courses */}
          <div>
            <h4 className="text-lg font-bold text-white mb-5 relative inline-block">
              Courses
              <span className="absolute -bottom-1.5 left-0 w-1/2 h-0.5 bg-blue-500 rounded-full"></span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              {courseNames.map((course) => {
                const courseRoutes = {
                  'BMLT': '/courses/bmlt',
                  'DMLT': '/courses/dmlt',
                  'DOA': '/courses/doa',
                  'CCH': '/courses/cch',
                };
                return (
                  <li key={course}>
                    <Link to={courseRoutes[course] || '/courses'} className="group flex items-start gap-2 text-slate-400 transition-colors hover:text-blue-400">
                      <FaChevronRight className="text-[10px] text-slate-600 mt-1 group-hover:text-blue-400 transition-colors shrink-0" />
                      <span className="leading-snug">{course}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-5 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1.5 left-0 w-1/2 h-0.5 bg-blue-500 rounded-full"></span>
            </h4>
            
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 text-blue-400 shrink-0">
                  <FaMapMarkerAlt size={14} />
                </div>
                <a href="https://maps.google.com/?q=Sector+9,+Raghuraj+Tower+(Opposite+MMR+Hospital),+Kamal+Vihar,+Raipur" target="_blank" rel="noopener noreferrer" className="text-slate-400 leading-relaxed hover:text-blue-400 transition-colors">
                  Sector 9, Raghuraj Tower (Opposite MMR Hospital), Kamal Vihar, Raipur
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="text-blue-400 shrink-0">
                  <FaPhoneAlt size={14} />
                </div>
                <a href="tel:+919243758191" className="text-slate-400 hover:text-blue-400 transition-colors">
                  +91 92437 58191
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="text-blue-400 shrink-0">
                  <FaEnvelope size={14} />
                </div>
                <a href="mailto:info@apjinstitute.com" className="text-slate-400 truncate hover:text-blue-400 transition-colors">
                  info@apjinstitute.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Map */}
          <div className="h-48 md:h-full min-h-[180px] w-full rounded-xl overflow-hidden border border-slate-700/50 shadow-lg group relative">
            <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none z-10"></div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.966023330107!2d81.3533!3d18.8953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a303dd5d5ec335d%3A0xb36ed862cbfd9061!2sRaipur%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[30%] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 absolute inset-0"
            ></iframe>
          </div>
          
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} APJ Institute Raipur. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
