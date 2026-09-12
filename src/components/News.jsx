import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { newsArticles } from "../data/cricketData";

export default function News() {
  const { featured, list } = newsArticles;

  return (
    <section id="news" className="py-24 sm:py-28 bg-ink">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-mist text-sm font-mono">Newsroom</p>
            <h2 className="font-display text-3xl sm:text-4xl text-chalk mt-1">
              CRICKET NEWS
            </h2>
          </div>
          <a
            href="#news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-chalk hover:text-cyan transition-colors"
          >
            View All News
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.a
            href="#news"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="group rounded-2xl overflow-hidden border border-white/10 bg-navy/60 hover:border-cyan/30 transition-colors"
          >
            <div className="relative aspect-[16/9] bg-gradient-to-br from-pitch/40 via-navy to-ink overflow-hidden">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_70%_20%,#e8b54c_0%,transparent_55%)]" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs font-mono text-mist mb-3">
                <span className="text-cyan uppercase tracking-widest">{featured.category}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
              <h3 className="font-display text-2xl text-chalk tracking-wide leading-tight">
                {featured.title}
              </h3>
              <p className="text-mist text-sm mt-3 leading-relaxed">{featured.excerpt}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-chalk mt-5 group-hover:text-cyan transition-colors">
                Read Story
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </motion.a>

          <div className="grid sm:grid-cols-2 gap-5">
            {list.map((n, i) => (
              <motion.a
                href="#news"
                key={n.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-xl border border-white/10 bg-navy/50 p-5 hover:border-cyan/30 transition-colors flex flex-col"
              >
                <span className="text-[11px] font-mono uppercase tracking-widest text-gold">
                  {n.category}
                </span>
                <h4 className="text-sm font-medium text-chalk mt-2 leading-snug group-hover:text-cyan transition-colors">
                  {n.title}
                </h4>
                <div className="mt-auto pt-4 text-xs text-mist font-mono">
                  {n.date} · {n.readTime}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
