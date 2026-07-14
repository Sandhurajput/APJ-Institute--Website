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
  const row1Items = [...highlights, ...highlights, ...highlights, ...highlights, ...highlights, ...highlights];
  const row2Items = [...highlights, ...highlights, ...highlights, ...highlights, ...highlights, ...highlights].reverse();

  return (
    <section className="overflow-hidden bg-[#f5f5f5] py-16 sm:py-20" id="facilities">
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

      <div className="marquee-container flex w-full flex-col gap-8">
        <div className="relative flex w-full overflow-hidden py-2">
          <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f5f5f5] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#f5f5f5] to-transparent pointer-events-none" />

          <div className="animate-marquee-left">
            {row1Items.map((item, idx) => {
              const Icon = icons[item.icon];
              return (
                <div
                  key={`row1-${item.title}-${idx}`}
                  className="w-[320px] shrink-0 rounded-2xl border border-black/10 bg-white p-6 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.25)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_-18px_rgba(0,0,0,0.3)]"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-2xl text-white">
                    <Icon />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-black">{item.title}</h3>
                  <p className="mt-2 whitespace-normal text-sm leading-6 text-[#555555]">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative flex w-full overflow-hidden py-2">
          <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f5f5f5] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#f5f5f5] to-transparent pointer-events-none" />

          <div className="animate-marquee-right">
            {row2Items.map((item, idx) => {
              const Icon = icons[item.icon];
              return (
                <div
                  key={`row2-${item.title}-${idx}`}
                  className="w-[320px] shrink-0 rounded-2xl border border-black/10 bg-white p-6 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.25)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_-18px_rgba(0,0,0,0.3)]"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-2xl text-white">
                    <Icon />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-black">{item.title}</h3>
                  <p className="mt-2 whitespace-normal text-sm leading-6 text-[#555555]">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}