import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { heroSlides } from '../../data/homepageData';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HeroSlider() {
  return (
    <section className="medical-slider relative overflow-hidden bg-[#f5f5f5]" aria-label="Hero banner slider">
      <Swiper modules={[Autoplay, Navigation, Pagination]} autoplay={{ delay: 3000, disableOnInteraction: false }} navigation pagination={{ clickable: true }} loop speed={900} className="h-[74vh] min-h-[560px] w-full">
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-[74vh] min-h-[560px] w-full">
              <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" loading="eager" />
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_35%)]" />

              <div className="absolute inset-0 mx-auto flex max-w-7xl items-center px-4 lg:px-8">
                <div className="max-w-3xl text-white">
                  <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-gray-100 backdrop-blur-sm">
                    {slide.eyebrow}
                  </motion.div>

                  <motion.h2 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.05 }} className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-7xl">
                    {slide.title}
                  </motion.h2>

                  <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.12 }} className="mt-6 max-w-2xl text-base leading-8 text-gray-100 sm:text-lg">
                    {slide.description}
                  </motion.p>

                  <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.18 }} className="mt-8 flex flex-wrap items-center gap-4">
                    <a href="#contact" className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black shadow-sm transition hover:bg-[#f0f0f0]">
                      {slide.cta}
                    </a>
                    <a href="#courses" className="rounded-full border border-white/25 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">
                      Explore Courses
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}