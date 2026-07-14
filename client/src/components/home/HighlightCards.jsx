import { FaUserTie, FaGraduationCap, FaHandsHelping, FaBriefcase, FaAward } from 'react-icons/fa';
import { highlights } from '../../data/homepageData';

const icons = {
  faculty: FaUserTie,
  excellence: FaGraduationCap,
  activity: FaHandsHelping,
  placement: FaBriefcase,
  package: FaAward,
};

export default function HighlightCards() {
  // Multiply the lists to ensure continuous seamless looping even on wide 4K screens
  const row1Items = [...highlights, ...highlights, ...highlights, ...highlights, ...highlights, ...highlights];
  const row2Items = [...highlights, ...highlights, ...highlights, ...highlights, ...highlights, ...highlights].reverse();

  return (
    <section className="bg-white py-16 sm:py-20 overflow-hidden" id="facilities">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.3333%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marquee-right 40s linear infinite;
        }
        .marquee-container:hover .animate-marquee-left,
        .marquee-container:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-container flex flex-col gap-8 w-full">
        {/* ROW 1: Scrolling Left */}
        <div className="relative flex w-full overflow-hidden py-2">
          {/* Fades on left and right for a gorgeous premium glass edge overlay */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee-left">
            {row1Items.map((item, idx) => {
              const Icon = icons[item.icon];
              return (
                <div 
                  key={`row1-${item.title}-${idx}`} 
                  className="w-[320px] shrink-0 rounded-3xl border border-[#15305b]/10 bg-gradient-to-b from-white to-[#15305b]/5 p-6 shadow-[0_15px_35px_-25px_rgba(15,23,42,0.25)] transition duration-300 hover:scale-[1.03] hover:border-[#15305b]/30 hover:shadow-md cursor-pointer"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#15305b] text-2xl text-white shadow-lg shadow-[#15305b]/20">
                    <Icon />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 whitespace-normal">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 2: Scrolling Right */}
        <div className="relative flex w-full overflow-hidden py-2">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee-right">
            {row2Items.map((item, idx) => {
              const Icon = icons[item.icon];
              return (
                <div 
                  key={`row2-${item.title}-${idx}`} 
                  className="w-[320px] shrink-0 rounded-3xl border border-[#15305b]/10 bg-gradient-to-b from-white to-[#15305b]/5 p-6 shadow-[0_15px_35px_-25px_rgba(15,23,42,0.25)] transition duration-300 hover:scale-[1.03] hover:border-[#15305b]/30 hover:shadow-md cursor-pointer"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#15305b] text-2xl text-white shadow-lg shadow-[#15305b]/20">
                    <Icon />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 whitespace-normal">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}