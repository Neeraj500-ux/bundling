import { stats } from "../data/cricketData";
import useCountUp from "../hooks/useCountUp";

function StatItem({ value, suffix, label }) {
  const { ref, value: current } = useCountUp(value, { duration: 1600 });
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl sm:text-5xl text-chalk">
        {current}
        <span className="text-cyan">{suffix}</span>
      </div>
      <p className="text-mist text-sm mt-2 font-mono uppercase tracking-widest">{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-24 sm:py-28 bg-ink overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_50%_0%,#22d3ee_0%,transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {stats.map((s) => (
            <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
