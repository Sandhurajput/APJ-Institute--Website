import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactSection() {
  return (
    <section id="contact" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">Contact</p>
          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">Get in touch with APJ Institute Raipur</h2>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.form initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35 }} className="rounded-[1.8rem] border border-blue-100 bg-white p-6 shadow-soft">
            <div className="grid gap-4 md:grid-cols-2">
              <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400" placeholder="Your Name" />
              <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400" placeholder="Phone Number" />
              <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400 md:col-span-2" placeholder="Email Address" />
              <select className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400 md:col-span-2">
                <option>Choose a course</option>
                <option>BMLT</option>
                <option>DMLT</option>
                <option>DOA</option>
                <option>CCH</option>
              </select>
              <textarea rows="5" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400 md:col-span-2" placeholder="Write your message here" />
            </div>

            <button type="submit" className="mt-5 rounded-full bg-gradient-to-r from-blue-700 to-sky-500 px-7 py-3.5 text-sm font-bold text-white shadow-soft transition hover:scale-[1.02]">
              Send Enquiry
            </button>
          </motion.form>

          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: 0.05 }} className="space-y-6">
            <div className="rounded-[1.8rem] border border-blue-100 bg-white p-6 shadow-soft">
              <div className="space-y-4 text-slate-700">
                <div className="flex items-start gap-4">
                  <span className="mt-1 text-blue-700"><FaMapMarkerAlt /></span>
                  <p>
                    APJ Institute Raipur,
                    <br />
                    Near Medical Campus, Raipur, Chhattisgarh
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-blue-700"><FaPhoneAlt /></span>
                  <a href="tel:+919243758191" className="hover:text-blue-700">+91 92437 58191</a>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-blue-700"><FaEnvelope /></span>
                  <a href="mailto:info@apjinstitute.com" className="hover:text-blue-700">info@apjinstitute.com</a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.8rem] border border-blue-100 bg-white shadow-soft">
              <iframe title="APJ Institute Raipur location" src="https://www.google.com/maps?q=Raipur%20Chhattisgarh&output=embed" className="h-[320px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}