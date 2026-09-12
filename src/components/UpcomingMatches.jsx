import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { MapPin, ChevronLeft, ChevronRight, BellPlus } from "lucide-react";
import { upcomingMatches } from "../data/cricketData";
import useCountdown from "../hooks/useCountdown";
import { useToast } from "../context/ToastContext";

function MatchCard({ match }) {
  const { showToast } = useToast();
  const target = `${match.date}T${match.time}:00`;
  const { days, hours, minutes, done } = useCountdown(target);

  return (
    <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan/40 via-white/10 to-royal/40 h-full">
      <div className="relative rounded-2xl bg-navy/90 backdrop-blur-md p-6 h-full flex flex-col transition-transform duration-300 group-hover:-translate-y-1.5">
        <span className="text-xs font-mono uppercase tracking-widest text-gold mb-4">
          {match.type}
        </span>

        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-chalk text-sm leading-tight">{match.teamA}</span>
        </div>
        <div className="text-center text-xs text-mist font-mono my-1">vs</div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-chalk text-sm leading-tight">{match.teamB}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-mist mb-4">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="line-clamp-1">{match.venue}</span>
        </div>

        <div className="mt-auto">
          {!done ? (
            <div className="grid grid-cols-3 gap-2 mb-4 font-mono text-center">
              {[
                { v: days, l: "Days" },
                { v: hours, l: "Hrs" },
                { v: minutes, l: "Min" },
              ].map((u) => (
                <div key={u.l} className="rounded-lg bg-white/5 py-2">
                  <div className="text-lg font-bold text-cyan">{u.v}</div>
                  <div className="text-[10px] text-mist uppercase tracking-widest">{u.l}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mb-4 text-sm text-gold font-mono">Match day is here</p>
          )}

          <button
            onClick={() =>
              showToast(`Reminder set for ${match.teamA} vs ${match.teamB}.`, "success")
            }
            className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/15 py-2.5 text-sm font-semibold text-chalk hover:border-cyan hover:text-cyan transition-colors"
          >
            <BellPlus className="w-4 h-4" />
            Set Reminder
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UpcomingMatches() {
  return (
    <section id="matches" className="py-24 sm:py-28 bg-ink">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-mist text-sm font-mono">Fixture List</p>
            <h2 className="font-display text-3xl sm:text-4xl text-chalk mt-1">
              UPCOMING MATCHES
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="matches-prev w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-chalk hover:border-cyan hover:text-cyan transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="matches-next w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-chalk hover:border-cyan hover:text-cyan transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Navigation, A11y]}
            navigation={{ prevEl: ".matches-prev", nextEl: ".matches-next" }}
            spaceBetween={20}
            slidesPerView={1.1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="!pb-2"
          >
            {upcomingMatches.map((m) => (
              <SwiperSlide key={m.id} className="h-auto">
                <MatchCard match={m} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
