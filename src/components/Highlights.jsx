import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { highlights } from "../data/cricketData";
import VideoModal from "./VideoModal";

export default function Highlights() {
  const [active, setActive] = useState(null);

  return (
    <section id="highlights" className="py-24 sm:py-28 bg-navy">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-10">
          <p className="text-mist text-sm font-mono">Watch Again</p>
          <h2 className="font-display text-3xl sm:text-4xl text-chalk mt-1">
            MATCH HIGHLIGHTS
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((h, i) => (
            <motion.button
              key={h.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setActive(h)}
              className="group text-left rounded-2xl overflow-hidden border border-white/10 bg-ink/60 hover:border-cyan/40 transition-colors"
            >
              <div className="relative aspect-video bg-gradient-to-br from-royal/40 via-navy to-ink flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,#22d3ee_0%,transparent_60%)]" />
                <span className="relative z-10 w-12 h-12 rounded-full bg-chalk/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-5 h-5 text-ink ml-0.5" fill="currentColor" />
                </span>
                <span className="absolute bottom-2 right-2 bg-ink/80 text-chalk text-[11px] font-mono px-2 py-0.5 rounded">
                  {h.duration}
                </span>
              </div>
              <div className="p-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold">
                  {h.category}
                </span>
                <h3 className="text-sm font-medium text-chalk mt-1.5 leading-snug">
                  {h.title}
                </h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <VideoModal item={active} onClose={() => setActive(null)} />
    </section>
  );
}
