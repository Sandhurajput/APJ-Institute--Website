import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

export default function TopHeaderBar() {
  return (
    <div className="relative z-40 bg-gradient-to-r from-[#15305b] via-[#102445] to-[#1d3d6e] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-medium">
          <a href="mailto:apjinstituteparamedicaldantewa@gmail.com" className="inline-flex items-center gap-2 transition hover:text-blue-100">
            <FaEnvelope />
            apjinstituteparamedicaldantewa@gmail.com
          </a>
          <a href="tel:+916268409259" className="inline-flex items-center gap-2 transition hover:text-blue-100">
            <FaPhoneAlt />
            +91 62684 09259
          </a>
        </div>

        <a
          href="https://wa.me/916268409259"
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[#25D366]/30 bg-white/10 px-4 py-1.5 font-semibold text-[#25D366] backdrop-blur transition hover:bg-white/20 hover:border-[#25D366]/50"
        >
          <FaWhatsapp size={16} className="text-[#25D366]" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}