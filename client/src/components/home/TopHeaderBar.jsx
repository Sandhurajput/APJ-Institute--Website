import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

export default function TopHeaderBar() {
  return (
    <div className="relative z-40 border-b border-black/10 bg-[#111111] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-medium">
          <a href="mailto:info@apjinstitutedantewada.com" className="inline-flex items-center gap-2 transition hover:text-gray-200">
            <FaEnvelope />
            info@apjinstitutedantewada.com
          </a>
          <a href="tel:+916268409259" className="inline-flex items-center gap-2 transition hover:text-gray-200">
            <FaPhoneAlt />
            +91 62684 09259
          </a>
        </div>

        <a
          href="https://wa.me/916268409259"
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-semibold transition hover:bg-white/20"
        >
          <FaWhatsapp size={16} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}