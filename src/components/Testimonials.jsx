import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "../data/cricketData";

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-28 bg-navy">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10">
          <p className="text-mist text-sm font-mono">From the Stands</p>
          <h2 className="font-display text-3xl sm:text-4xl text-chalk mt-1">
            WHAT FANS SAY
          </h2>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, A11y]}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, el: ".testimonial-pagination" }}
            navigation={{ prevEl: ".testimonial-prev", nextEl: ".testimonial-next" }}
            loop
            className="!pb-2"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="rounded-2xl border border-white/10 bg-ink/60 p-8 sm:p-10 text-center">
                  <Quote className="w-8 h-8 text-cyan/50 mx-auto mb-4" />
                  <p className="text-lg sm:text-xl text-chalk leading-relaxed font-light">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < t.rating ? "text-gold fill-gold" : "text-white/15"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-4 font-semibold text-chalk">{t.name}</p>
                  <p className="text-sm text-mist">{t.location}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              className="testimonial-prev w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-chalk hover:border-cyan hover:text-cyan transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="testimonial-pagination flex items-center gap-2" />
            <button
              className="testimonial-next w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-chalk hover:border-cyan hover:text-cyan transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
