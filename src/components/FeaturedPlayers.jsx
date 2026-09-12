import { motion } from "framer-motion";
import { featuredPlayers } from "../data/cricketData";
import useCountUp from "../hooks/useCountUp";

function StatCounter({ value, label }) {
  const { ref, value: current } = useCountUp(value, { duration: 1200 });
  return (
    <div ref={ref} className="text-center">
      <div className="font-mono text-lg font-bold text-chalk">{current}</div>
      <div className="text-[10px] uppercase tracking-widest text-mist">{label}</div>
    </div>
  );
}

function PlayerCard({ player, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group rounded-2xl border border-white/10 bg-navy/60 overflow-hidden hover:border-cyan/40 transition-colors"
    >
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-royal/30 via-navy to-ink flex items-end justify-center">
        <svg
          viewBox="0 0 120 140"
          className="h-52 w-auto translate-y-3 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
          aria-hidden="true"
        >
          <circle cx="60" cy="34" r="20" fill="#101f42" />
          <path d="M20 140 Q20 80 60 78 Q100 80 100 140 Z" fill="#0b1730" />
          <path d="M60 78 L60 130" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" />
          <rect x="46" y="94" width="10" height="46" rx="3" fill="#e8b54c" transform="rotate(-18 46 94)" />
        </svg>
        <span className="absolute top-3 right-3 rounded-full bg-ink/70 backdrop-blur px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-cyan">
          {player.role}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl text-chalk tracking-wide">{player.name}</h3>
        <p className="text-sm text-mist mb-4">{player.team}</p>

        <div className="grid grid-cols-4 gap-2 py-4 border-t border-white/10">
          <StatCounter value={player.matches} label="Mat" />
          <StatCounter value={player.runs} label="Runs" />
          <StatCounter value={player.wickets} label="Wkts" />
          <StatCounter value={Math.round(player.strikeRate)} label="SR" />
        </div>

        <button className="w-full mt-2 rounded-full border border-white/15 py-2.5 text-sm font-semibold text-chalk hover:border-cyan hover:text-cyan transition-colors">
          Player Profile
        </button>
      </div>
    </motion.div>
  );
}

export default function FeaturedPlayers() {
  return (
    <section id="players" className="py-24 sm:py-28 bg-navy">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-10">
          <p className="text-mist text-sm font-mono">Player Watch</p>
          <h2 className="font-display text-3xl sm:text-4xl text-chalk mt-1">
            FEATURED PLAYERS
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlayers.map((p, i) => (
            <PlayerCard key={p.id} player={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
