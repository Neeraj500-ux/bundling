import { motion } from "framer-motion";
import { liveMatch } from "../data/cricketData";

export default function LiveScore() {
  const { teamA, teamB, target, runRate, requiredRate, batsmen, bowler, recentBalls, venue, tournament } =
    liveMatch;
  const progress = Math.min(100, (teamA.score / target) * 100);

  return (
    <section id="live" className="relative py-24 sm:py-28 bg-navy">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <p className="text-mist text-sm font-mono">{tournament}</p>
            <h2 className="font-display text-3xl sm:text-4xl text-chalk mt-1">
              LIVE SCOREBOARD
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-royal/20 border border-royal/40 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-royal opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-royal" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-chalk">
              Live
            </span>
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-ink/60 p-6 sm:p-8"
        >
          <p className="text-mist text-sm mb-6">{venue}</p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-chalk">{teamA.name}</span>
                <span className="text-xs font-mono text-mist">{teamA.overs} ov</span>
              </div>
              <div className="font-mono text-4xl sm:text-5xl font-bold text-cyan mt-1">
                {teamA.score}
                <span className="text-mist text-2xl sm:text-3xl">/{teamA.wickets}</span>
              </div>
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-mist">{teamB.name}</span>
                <span className="text-xs font-mono text-mist">{teamB.overs} ov</span>
              </div>
              <div className="font-mono text-4xl sm:text-5xl font-bold text-chalk mt-1">
                {teamB.score}
                <span className="text-mist text-2xl sm:text-3xl">/{teamB.wickets}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-xs font-mono text-mist mb-1.5">
              <span>Target {target}</span>
              <span>
                RR {runRate} · Req {requiredRate}
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-cyan to-royal"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/10">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-mist mb-3">
                At the crease
              </p>
              <ul className="space-y-2">
                {batsmen.map((b) => (
                  <li key={b.name} className="flex items-center justify-between text-sm">
                    <span className={b.onStrike ? "text-chalk font-medium" : "text-mist"}>
                      {b.name} {b.onStrike && "•"}
                    </span>
                    <span className="font-mono text-mist">
                      {b.runs} ({b.balls})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-mist mb-3">
                Bowling
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-chalk font-medium">{bowler.name}</span>
                <span className="font-mono text-mist">
                  {bowler.overs}-{bowler.maidens}-{bowler.runs}-{bowler.wickets}
                </span>
              </div>

              <p className="text-xs font-mono uppercase tracking-widest text-mist mb-2 mt-5">
                This over
              </p>
              <div className="flex gap-2">
                {recentBalls.map((b, i) => (
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
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <button className="rounded-full bg-cyan text-ink px-6 py-2.5 text-sm font-semibold hover:bg-chalk transition-colors">
              Full Scorecard
            </button>
            <button className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-chalk hover:border-cyan hover:text-cyan transition-colors">
              Watch Live
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
