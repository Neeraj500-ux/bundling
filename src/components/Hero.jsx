import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Play, Radio, Trophy, Zap } from "lucide-react";

const RECENT_BALLS = ["1", "4", "0", "W", "2", "6"];
const FEATURES = [
  { icon: Radio, title: "Ball by ball", detail: "Follow every delivery" },
  { icon: Play, title: "Match highlights", detail: "Relive the big moments" },
  { icon: Trophy, title: "Player insights", detail: "Get closer to the game" },
];

function StadiumScene() {
  const id = useId().replace(/:/g, "");
  return (
    <svg className="crh-stadium" viewBox="0 0 1000 850" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-field`}>
          <stop offset="0" stopColor="#20a779" stopOpacity=".35" />
          <stop offset="1" stopColor="#06131e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d7fbff" stopOpacity=".19" />
          <stop offset="1" stopColor="#d7fbff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="530" cy="745" rx="630" ry="320" fill={`url(#${id}-field)`} />
      {[0, 1, 2, 3].map((row) => (
        <ellipse key={row} cx="530" cy="720" rx={430 + row * 45} ry={115 + row * 30} fill="none" stroke="#6de6d6" strokeOpacity={0.12 - row * 0.02} />
      ))}
      <path d="M465 690 L535 690 L555 845 L445 845 Z" fill="#d8bd79" opacity=".08" />
      {[130, 875].map((x) => (
        <g key={x}>
          <path d={`M${x - 48} 190 L${x + 48} 190 L${x + 280} 800 L${x - 280} 800 Z`} fill={`url(#${id}-beam)`} />
          <rect x={x - 3} y="195" width="6" height="480" fill="#29414d" opacity=".65" />
          <rect x={x - 50} y="145" width="100" height="54" rx="8" fill="#152936" stroke="#6c9ca8" strokeOpacity=".3" />
          {Array.from({ length: 18 }, (_, i) => (
            <rect key={i} x={x - 41 + (i % 6) * 15} y={154 + Math.floor(i / 6) * 13} width="9" height="7" rx="2" fill="#e3fcff" opacity=".8" />
          ))}
        </g>
      ))}
    </svg>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : delay },
  });

  return (
    <section id="home" className="crh-root">
      <style>{`
        .crh-root { position:relative; isolation:isolate; overflow:hidden; background:#06101b; color:#f4f9ff; min-height:100svh; padding:156px 24px 40px; font-family:inherit; }
        .crh-root *, .crh-root *::before, .crh-root *::after { box-sizing:border-box; }
        .crh-root a { text-decoration:none; -webkit-tap-highlight-color:transparent; }
        .crh-root a:focus-visible { outline:2px solid #8af5e5; outline-offset:6px; }
        .crh-ambient { position:absolute; inset:0; z-index:-2; background:radial-gradient(ellipse at 85% 30%,rgba(26,137,161,.17),transparent 48%),radial-gradient(ellipse at 10% 0%,rgba(42,84,137,.12),transparent 45%),linear-gradient(180deg,#091420,#06101b); }
        .crh-grid { position:absolute; inset:0; z-index:-1; opacity:.1; background-image:linear-gradient(#8cc2ca 1px,transparent 1px),linear-gradient(90deg,#8cc2ca 1px,transparent 1px); background-size:76px 76px; mask-image:linear-gradient(180deg,black,transparent 75%); }
        .crh-stadium { position:absolute; right:-16%; bottom:0; width:90%; height:100%; z-index:-1; opacity:.8; pointer-events:none; }
        .crh-wrap { width:100%; max-width:1220px; margin:0 auto; }
        .crh-main { display:grid; grid-template-columns:1.1fr 1fr; gap:64px; align-items:center; min-height:550px; }
        .crh-eyebrow { display:inline-flex; align-items:center; gap:9px; padding:9px 13px; border:1px solid #83efd72b; border-radius:999px; background:#66e9cc09; color:#a3f4e4; font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; }
        .crh-dot { width:6px; height:6px; border-radius:50%; background:#81f5db; box-shadow:0 0 14px #81f5db88; flex-shrink:0; }
        .crh-heading { margin:24px 0 0; font-size:clamp(64px,7.5vw,108px); font-weight:900; line-height:.97; letter-spacing:-.065em; }
        .crh-heading span { display:block; }
        .crh-heading .crh-gradient { background:linear-gradient(110deg,#f0fffd,#86f3df 45%,#53cbe9); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .crh-description { max-width:450px; margin:26px 0 0; font-size:16px; line-height:1.8; color:#a0b2c5; }
        .crh-actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:30px; }
        .crh-button { display:inline-flex; align-items:center; justify-content:center; gap:10px; min-height:52px; padding:14px 21px; border-radius:14px; font-size:13px; font-weight:750; transition:transform .25s,background .25s,box-shadow .25s; }
        .crh-primary { color:#062025; background:linear-gradient(120deg,#b5fff0,#77eddd,#79d9ef); box-shadow:0 8px 28px #56e3d21a,inset 0 1px 0 #ffffffaa; }
        .crh-primary:hover { transform:translateY(-3px); box-shadow:0 14px 34px #56e3d230; }
        .crh-secondary { color:#e6f1fb; background:#ffffff05; border:1px solid #ffffff24; }
        .crh-secondary:hover { transform:translateY(-3px); background:#ffffff0d; }
        .crh-footnote { display:flex; align-items:center; gap:8px; margin-top:18px; color:#71899e; font-size:11px; }
        .crh-visual { position:relative; padding:38px 0; min-width:0; }
        .crh-orbit { position:absolute; width:440px; height:440px; top:50%; left:50%; transform:translate(-50%,-50%); border:1px solid #94f8e811; border-radius:50%; box-shadow:0 0 0 35px #94f8e803,0 0 0 70px #94f8e803; z-index:-1; }
        .crh-card { position:relative; border:1px solid #b9e8e42b; border-radius:26px; padding:26px; background:linear-gradient(135deg,#142939e8,#091722ed); backdrop-filter:blur(22px); box-shadow:0 30px 90px #00000055,inset 0 1px 0 #ffffff10; }
        .crh-card::before { content:''; position:absolute; top:-1px; left:30px; right:30px; height:1px; background:linear-gradient(90deg,transparent,#a3f5df99,transparent); }
        .crh-card-top { display:flex; align-items:center; justify-content:space-between; gap:10px; padding-bottom:22px; border-bottom:1px solid #ffffff0d; }
        .crh-match-tag { display:flex; align-items:center; gap:7px; color:#98eddc; font-size:10px; font-weight:750; letter-spacing:1.4px; text-transform:uppercase; }
        .crh-format { font-size:10px; color:#8ba4b7; border:1px solid #ffffff12; border-radius:7px; padding:5px 8px; }
        .crh-team { display:flex; align-items:center; gap:12px; margin-top:23px; }
        .crh-team-icon { display:grid; place-items:center; width:42px; height:46px; border:1px solid #95efd538; border-radius:12px; background:#7eeacb0c; color:#a9f8df; font-size:12px; font-weight:800; }
        .crh-team strong { display:block; font-size:14px; }
        .crh-team small { display:block; font-size:10px; color:#839caf; margin-top:5px; }
        .crh-score-row { display:flex; justify-content:space-between; align-items:end; gap:12px; margin-top:22px; }
        .crh-score { font-size:68px; line-height:1; letter-spacing:-4px; font-weight:850; font-variant-numeric:tabular-nums; }
        .crh-score span { color:#7b97ab; font-size:36px; letter-spacing:-2px; }
        .crh-overs { text-align:right; color:#d4e2ed; font-size:13px; padding-bottom:4px; }
        .crh-overs small { display:block; margin-top:7px; color:#7794a9; font-size:10px; }
        .crh-opponent { display:flex; justify-content:space-between; gap:12px; padding:15px 0; margin-top:18px; border-top:1px solid #ffffff0b; color:#8ea6b9; font-size:11px; }
        .crh-opponent strong { color:#c3d3df; font-weight:600; }
        .crh-chase { padding:14px; background:linear-gradient(100deg,#77eddd0b,#77eddd03); border:1px solid #83eddb19; border-radius:12px; }
        .crh-chase-top { display:flex; justify-content:space-between; gap:8px; color:#c2d4df; font-size:11px; }
        .crh-chase-top strong { color:#94f3db; }
        .crh-progress { height:4px; margin-top:12px; border-radius:4px; background:#ffffff0a; overflow:hidden; }
        .crh-progress span { display:block; height:100%; width:80.25%; background:linear-gradient(90deg,#42b8b6,#a9ffe0); border-radius:4px; }
        .crh-recent { display:flex; justify-content:space-between; align-items:center; gap:10px; margin-top:20px; }
        .crh-recent-label { color:#7290a5; font-size:9px; letter-spacing:1.4px; text-transform:uppercase; }
        .crh-balls { display:flex; gap:6px; }
        .crh-ball { display:grid; place-items:center; width:29px; height:29px; border:1px solid #ffffff0c; background:#ffffff05; border-radius:9px; color:#b6cbda; font-size:10px; font-weight:750; }
        .crh-boundary { color:#a2f5df; background:#76e4bc12; border-color:#76e4bc20; }
        .crh-wicket { color:#ffb9ad; background:#ff897612; border-color:#ff897620; }
        .crh-float { position:absolute; right:-12px; top:8px; display:flex; align-items:center; gap:10px; padding:12px 15px; border:1px solid #d6ece324; background:#132a34f5; border-radius:14px; box-shadow:0 14px 40px #00000040; }
        .crh-float-icon { display:grid; place-items:center; color:#f4d79a; width:31px; height:31px; border-radius:10px; background:#f4d79a0d; }
        .crh-float strong { display:block; font-size:11px; }
        .crh-float small { display:block; margin-top:3px; color:#7895a6; font-size:9px; }
        .crh-sample { margin:12px 0 0; text-align:center; color:#627e92; font-size:10px; }
        .crh-bottom { display:flex; align-items:center; justify-content:space-between; gap:24px; margin-top:48px; padding-top:26px; border-top:1px solid #ffffff0c; }
        .crh-features { display:flex; gap:40px; flex-wrap:wrap; }
        .crh-feature { display:flex; gap:11px; align-items:center; }
        .crh-feature-icon { display:grid; place-items:center; width:37px; height:37px; border:1px solid #ffffff12; border-radius:11px; color:#95cfce; background:#ffffff03; }
        .crh-feature strong { display:block; font-size:11px; font-weight:650; }
        .crh-feature small { display:block; color:#6b879b; font-size:10px; margin-top:5px; }
        .crh-scroll { display:inline-flex; align-items:center; gap:10px; color:#91a9bb; font-size:10px; white-space:nowrap; }
        .crh-scroll span { display:grid; place-items:center; width:33px; height:39px; border:1px solid #ffffff1c; border-radius:14px; }
        @media(min-width:1500px) { .crh-root { display:flex; align-items:center; } }
        @media(max-width:1100px) { .crh-main { gap:32px; } .crh-heading { font-size:82px; } .crh-features { gap:24px; } .crh-float { right:0; } }
        @media(max-width:900px) { .crh-root { padding-top:136px; } .crh-main { grid-template-columns:1fr; gap:24px; min-height:0; } .crh-content { max-width:640px; } .crh-heading { font-size:clamp(64px,11vw,90px); } .crh-visual { width:100%; max-width:520px; margin:0 auto; padding-top:45px; padding-bottom:0; } .crh-stadium { width:150%; right:-35%; opacity:.5; } .crh-bottom { margin-top:35px; } .crh-scroll { display:none; } .crh-features { width:100%; justify-content:space-between; } }
        @media(max-width:540px) { .crh-root { padding:122px 20px 28px; } .crh-eyebrow { font-size:9px; letter-spacing:1.5px; } .crh-heading { margin-top:22px; font-size:clamp(52px,13.8vw,74px); } .crh-description { font-size:14px; line-height:1.8; margin-top:22px; } .crh-actions { display:grid; grid-template-columns:1fr; gap:10px; margin-top:25px; } .crh-button { min-height:51px; } .crh-footnote { justify-content:center; font-size:10px; } .crh-main { gap:15px; } .crh-card { padding:20px; border-radius:21px; } .crh-score { font-size:62px; } .crh-score span { font-size:32px; } .crh-float { padding:10px 12px; top:6px; right:8px; } .crh-recent { flex-wrap:wrap; } .crh-features { display:grid; grid-template-columns:1fr; gap:18px; } .crh-feature strong { font-size:12px; } .crh-feature small { font-size:11px; } .crh-orbit { width:320px; height:320px; } }
        @media(prefers-reduced-motion:reduce) { .crh-root *, .crh-root *::before, .crh-root *::after { animation:none!important; transition:none!important; } }
      `}</style>
      <div className="crh-ambient" aria-hidden="true" />
      <div className="crh-grid" aria-hidden="true" />
      <StadiumScene />
      <div className="crh-wrap">
        <div className="crh-main">
          <div className="crh-content">
            <motion.div {...reveal()} className="crh-eyebrow">
              <span className="crh-dot" /> The game. The passion. The moment.
            </motion.div>
            <motion.h1 {...reveal(0.08)} className="crh-heading">
              <span>FEEL EVERY</span><span className="crh-gradient">BALL.</span>
            </motion.h1>
            <motion.p {...reveal(0.16)} className="crh-description">
              From the first delivery to the final roar. Follow the scores, relive the highlights, and get closer to the players who make cricket unforgettable.
            </motion.p>
            <motion.div {...reveal(0.24)} className="crh-actions">
              <a href="#matches" className="crh-button crh-primary">Explore Matches <ArrowUpRight size={18} /></a>
              <a href="#highlights" className="crh-button crh-secondary"><Play size={15} /> Watch Highlights</a>
            </motion.div>
            <motion.div {...reveal(0.3)} className="crh-footnote"><Zap size={12} /> Your front-row seat to everything cricket.</motion.div>
          </div>
          <motion.div {...reveal(0.2)} className="crh-visual">
            <div className="crh-orbit" aria-hidden="true" />
            <article className="crh-card" aria-label="Sample match scorecard">
              <div className="crh-card-top">
                <div className="crh-match-tag"><Radio size={13} /> Match centre</div>
                <span className="crh-format">T20 · INNINGS 2</span>
              </div>
              <div className="crh-team">
                <div className="crh-team-icon" aria-hidden="true">NF</div>
                <div><strong>Northshore Falcons</strong><small>Chasing a target of 233</small></div>
              </div>
              <div className="crh-score-row">
                <div className="crh-score" aria-label="187 runs for 4 wickets">187<span>/4</span></div>
                <div className="crh-overs">16.3 overs<small>RUN RATE · 11.33</small></div>
              </div>
              <div className="crh-opponent"><span>Coastal Strikers</span><strong>232/6 <span>(20)</span></strong></div>
              <div className="crh-chase">
                <div className="crh-chase-top"><span>Falcons need <strong>46 off 21</strong></span><span>RRR <strong>13.14</strong></span></div>
                <div className="crh-progress" aria-hidden="true"><span /></div>
              </div>
              <div className="crh-recent">
                <span className="crh-recent-label">Last 6 deliveries</span>
                <div className="crh-balls" aria-label="Last six balls: one, four, dot ball, wicket, two, six">
                  {RECENT_BALLS.map((ball, index) => <span key={index} className={`crh-ball ${ball === "W" ? "crh-wicket" : ["4", "6"].includes(ball) ? "crh-boundary" : ""}`}>{ball}</span>)}
                </div>
              </div>
            </article>
            <motion.div className="crh-float" animate={reduceMotion ? {} : { y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
              <span className="crh-float-icon"><Trophy size={16} /></span><div><strong>Every run matters.</strong><small>Stay close to the action</small></div>
            </motion.div>
            <p className="crh-sample">Illustrative match score · Demo data</p>
          </motion.div>
        </div>
        <motion.div {...reveal(0.35)} className="crh-bottom">
          <div className="crh-features">
            {FEATURES.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="crh-feature"><span className="crh-feature-icon"><Icon size={16} /></span><div><strong>{title}</strong><small>{detail}</small></div></div>
            ))}
          </div>
          <a href="#live" className="crh-scroll">Explore the match centre <span><ChevronDown size={17} /></span></a>
        </motion.div>
      </div>
    </section>
  );
}
