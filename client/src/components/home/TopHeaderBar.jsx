import { motion } from 'framer-motion';
import { Mail, PhoneCall, MessageCircle } from 'lucide-react';

const contactItems = [
  {
    icon: Mail,
    label: 'info@apjinstitute.com',
    href: 'mailto:info@apjinstitute.com',
    align: 'md:justify-self-start',
  },
  {
    icon: PhoneCall,
    label: '+91-9243758191',
    href: 'tel:+919243758191',
    align: 'md:justify-self-center',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp Us',
    href: 'https://wa.me/919243758191',
    align: 'md:justify-self-end',
    external: true,
  },
];

export default function TopHeaderBar() {
  return (
    <div className="sticky top-0 z-50">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="bg-gradient-to-r from-slate-950 via-indigo-950 to-lime-900 text-white shadow-[0_16px_45px_rgba(15,23,42,0.28)]"
      >
        <div className="mx-auto max-w-7xl px-3 py-2 sm:px-4 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap no-scrollbar md:justify-between">
            {contactItems.map(({ icon: Icon, label, href, external, align }) => (
              <motion.a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`group inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs font-medium text-white/95 backdrop-blur-sm transition-shadow hover:shadow-[0_0_24px_rgba(255,255,255,0.12)] sm:px-4 sm:text-sm ${align}`}
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition group-hover:bg-white/20">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="truncate">{label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}