import { motion } from "framer-motion";
import { ChevronDown, Radio } from "lucide-react";

function StadiumScene() {
  return (
    <svg
      viewBox="0 0 900 620"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="fieldGlow" cx="50%" cy="95%" r="70%">
          <stop offset="0%" stopColor="#1F7A4D" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#060b18" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#060b18" stopOpacity="0" />
          <stop offset="100%" stopColor="#060b18" stopOpacity="1" />
        </linearGradient>
        <radialGradient id="lightBeam" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#F4F7FB" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F4F7FB" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="450" cy="640" rx="520" ry="230" fill="url(#fieldGlow)" />

      {/* pitch outline */}
      <ellipse cx="450" cy="660" rx="360" ry="150" fill="none" stroke="#3CB371" strokeOpacity="0.25" strokeWidth="2" />
      <rect x="420" y="540" width="60" height="200" rx="4" fill="#E8B54C" opacity="0.12" />

      {/* floodlight towers */}
      {[110, 790].map((x, i) => (
        <g key={i}>
          <rect x={x - 4} y="120" width="8" height="420" fill="#101f42" />
          <polygon points={`${x - 55},95 ${x + 55},95 ${x + 30},140 ${x - 30},140`} fill="#101f42" />
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 6 }).map((__, c) => (
              <circle
                key={`${r}-${c}`}
                cx={x - 45 + c * 18}
                cy={100 + r * 12}
                r="3.4"
                fill="#F4F7FB"
                opacity="0.9"
              />
            ))
          )}
          <polygon points={`${x - 60},130 ${x + 60},130 900,610 -20,610`} fill="url(#lightBeam)" />
        </g>
      ))}

      <rect x="0" y="380" width="900" height="240" fill="url(#skyFade)" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end overflow-hidden bg-ink pt-28 pb-16"
    >
      <StadiumScene />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-end">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
            </span>
            <span className="text-xs font-mono tracking-widest text-cyan uppercase">
              Falcons vs Strikers · Live Now
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-[15vw] leading-[0.85] sm:text-7xl lg:text-8xl text-chalk"
          >
            FEEL EVERY
            <br />
            <span className="text-stroke">BALL.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-md text-mist text-base sm:text-lg"
          >
            Live scores, ball-by-ball commentary, match highlights and player
            stats — all in one place, updated the moment it happens on the
            field.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#matches"
              className="relative inline-flex items-center gap-2 rounded-full bg-cyan text-ink px-7 py-3.5 font-semibold overflow-hidden group"
            >
              <span className="relative z-10">Explore Matches</span>
              <span className="absolute inset-0 bg-chalk scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
            <a
              href="#highlights"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-chalk hover:border-cyan hover:text-cyan transition-colors"
            >
              <Radio className="w-4 h-4" />
              Watch Highlights
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <div className="rounded-2xl border border-white/10 bg-navy/70 backdrop-blur-md p-5 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-mist mb-4">
              <span>Northshore Falcons</span>
              <span className="text-gold">Innings 2</span>
            </div>
            <div className="font-mono text-5xl text-chalk font-bold tracking-tight">
              187<span className="text-mist text-3xl">/4</span>
            </div>
            <div className="text-sm text-mist mt-1">16.3 overs · RR 11.34</div>
            <div className="mt-4 flex gap-2">
              {["1", "4", "0", "W", "2", "6"].map((b, i) => (
                <span
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                    b === "W"
                      ? "bg-royal/80 text-chalk"
                      : b === "4" || b === "6"
                      ? "bg-gold/90 text-ink"
                      : "bg-white/10 text-mist"
                  }`}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -left-8 -bottom-10 rounded-xl border border-white/10 bg-ink/90 backdrop-blur-md px-4 py-3 shadow-xl"
          >
            <div className="text-[10px] font-mono uppercase tracking-widest text-mist">
              Need
            </div>
            <div className="text-xl font-bold text-cyan font-mono">
              46 <span className="text-sm text-mist">off 21</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#live"
        aria-label="Scroll to live scoreboard"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-mist hover:text-cyan transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.a>
    </section>
  );
}
