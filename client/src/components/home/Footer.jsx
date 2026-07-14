import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaChevronRight } from 'react-icons/fa';
import { courseNames, quickLinks } from '../../data/homepageData';

export default function Footer() {
  return (
    <footer className="border-t border-[#15305b]/10 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <h3 className="text-2xl font-black">APJ Institute Dantewada</h3>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
              A professional medical and paramedical institute focused on academic discipline, hands-on training, and student success.
            </p>

            <div className="mt-6 flex gap-3">
              {[FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube].map((Icon, index) => (
                <a key={index} href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#15305b]">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold">Quick Links</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="inline-flex items-center gap-2 transition hover:text-white">
                    <FaChevronRight className="text-xs text-blue-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold">Courses</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {courseNames.map((course) => (
                <li key={course} className="inline-flex items-center gap-2">
                  <FaChevronRight className="text-xs text-blue-300" />
                  {course}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold">Contact</h4>
            <p className="mt-4 text-sm leading-7 text-slate-300">APJ Institute Dantewada, Near Medical Campus, Dantewada, Chhattisgarh</p>
            <p className="mt-3 text-sm text-slate-300">Phone: +91 98765 43210</p>
            <p className="mt-2 text-sm text-slate-300">Email: info@apjinstitutedantewada.com</p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
          © 2026 APJ Institute Dantewada. All rights reserved.
        </div>
      </div>
    </footer>
  );
}