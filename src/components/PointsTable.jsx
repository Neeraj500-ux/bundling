import { motion } from "framer-motion";
import { standings } from "../data/cricketData";

export default function PointsTable() {
  return (
    <section id="standings" className="py-24 sm:py-28 bg-ink">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="mb-10">
          <p className="text-mist text-sm font-mono">Continental Trophy</p>
          <h2 className="font-display text-3xl sm:text-4xl text-chalk mt-1">
            TOURNAMENT STANDINGS
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 overflow-hidden"
        >
          {/* Desktop table */}
          <table className="w-full hidden sm:table">
            <thead>
              <tr className="bg-navy text-left text-xs uppercase tracking-widest text-mist">
                <th className="py-4 px-5 font-medium">Pos</th>
                <th className="py-4 px-5 font-medium">Team</th>
                <th className="py-4 px-5 font-medium text-center">P</th>
                <th className="py-4 px-5 font-medium text-center">W</th>
                <th className="py-4 px-5 font-medium text-center">L</th>
                <th className="py-4 px-5 font-medium text-center">NRR</th>
                <th className="py-4 px-5 font-medium text-center">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr
                  key={row.pos}
                  className={`border-t border-white/5 font-mono text-sm ${
                    row.pos <= 4 ? "bg-cyan/[0.04]" : ""
                  }`}
                >
                  <td className="py-4 px-5 text-mist">{row.pos}</td>
                  <td className="py-4 px-5 text-chalk font-sans font-medium">{row.team}</td>
                  <td className="py-4 px-5 text-center text-mist">{row.played}</td>
                  <td className="py-4 px-5 text-center text-mist">{row.won}</td>
                  <td className="py-4 px-5 text-center text-mist">{row.lost}</td>
                  <td className="py-4 px-5 text-center text-mist">{row.nrr}</td>
                  <td className="py-4 px-5 text-center text-cyan font-bold">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-white/5">
            {standings.map((row) => (
              <div
                key={row.pos}
                className={`p-5 ${row.pos <= 4 ? "bg-cyan/[0.04]" : ""}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans font-medium text-chalk">
                    {row.pos}. {row.team}
                  </span>
                  <span className="font-mono text-cyan font-bold">{row.points} pts</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs text-mist">
                  <div>
                    <div className="text-chalk">{row.played}</div>P
                  </div>
                  <div>
                    <div className="text-chalk">{row.won}</div>W
                  </div>
                  <div>
                    <div className="text-chalk">{row.lost}</div>L
                  </div>
                  <div>
                    <div className="text-chalk">{row.nrr}</div>NRR
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
