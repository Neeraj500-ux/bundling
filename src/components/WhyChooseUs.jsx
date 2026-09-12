import { motion } from "framer-motion";
import { Radio, MessageSquare, Film, BarChart3, Brain, BellRing } from "lucide-react";

const FEATURES = [
  {
    icon: Radio,
    title: "Live Scores",
    text: "Ball-tracked scores that update the instant the umpire signals, from the first over to the last.",
  },
  {
    icon: MessageSquare,
    title: "Ball-by-Ball Commentary",
    text: "Follow the story of every over with commentary written by people who know the game.",
  },
  {
    icon: Film,
    title: "Match Highlights",
    text: "Key moments trimmed and published within minutes of the final ball being bowled.",
  },
  {
    icon: BarChart3,
    title: "Player Statistics",
    text: "Career numbers, current form and head-to-head records, always up to date.",
  },
  {
    icon: Brain,
    title: "Expert Analysis",
    text: "Tactical breakdowns from analysts who explain the why behind every big decision.",
  },
  {
    icon: BellRing,
    title: "Instant Notifications",
    text: "Wickets, milestones and close finishes pushed to you the moment they happen.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 sm:py-28 bg-navy">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-10">
          <p className="text-mist text-sm font-mono">Built for Fans</p>
          <h2 className="font-display text-3xl sm:text-4xl text-chalk mt-1">
            WHY CHOOSE CRESTLINE
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-2xl border border-white/10 bg-ink/50 p-6 hover:border-cyan/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-cyan/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-cyan" />
              </div>
              <h3 className="font-semibold text-chalk">{f.title}</h3>
              <p className="text-sm text-mist mt-2 leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
