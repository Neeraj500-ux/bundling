import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, MapPin, Radio, Target, Trophy, Zap } from "lucide-react";
import { liveMatch } from "../data/cricketData";

const number = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};
const display = (value) => value ?? "—";
const initials = (name = "Team") => String(name).trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

export default function LiveScore({ streamUrl = "", isLive = false }) {
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();
  const match = liveMatch || {};
  const { teamA = {}, teamB = {}, target, runRate, requiredRate, bowler = {}, venue, tournament } = match;
  const batsmen = Array.isArray(match.batsmen) ? match.batsmen : [];
  const recentBalls = Array.isArray(match.recentBalls) ? match.recentBalls : [];
  const targetNumber = number(target);
  const progress = targetNumber > 0 ? Math.max(0, Math.min(100, (number(teamA.score) / targetNumber) * 100)) : 0;
  const runsNeeded = Math.max(0, targetNumber - number(teamA.score));
  const safeStream = /^https?:\/\//i.test(streamUrl) ? streamUrl : "";
  const ease = { duration: reduceMotion ? 0 : 0.55, ease: "easeOut" };

  return (
    <section id="live" className="cls-root">
      <style>{`
        .cls-root { position:relative; isolation:isolate; overflow:hidden; background:#08131f; color:#edf6ff; padding:90px 24px; scroll-margin-top:115px; font-family:inherit; }
        .cls-root *, .cls-root *::before, .cls-root *::after { box-sizing:border-box; }
        .cls-root button,.cls-root a { font:inherit; -webkit-tap-highlight-color:transparent; }
        .cls-root button { cursor:pointer; }
        .cls-root a { text-decoration:none; }
        .cls-root button:focus-visible,.cls-root a:focus-visible { outline:2px solid #93f5df; outline-offset:5px; }
        .cls-glow { position:absolute; width:520px; height:520px; top:5%; left:-260px; z-index:-1; border-radius:50%; background:radial-gradient(circle,#35ccbb12,transparent 70%); pointer-events:none; }
        .cls-glow-right { left:auto; right:-260px; top:35%; background:radial-gradient(circle,#4896e618,transparent 70%); }
        .cls-wrap { max-width:1120px; margin:auto; }
        .cls-heading-row { display:flex; align-items:center; justify-content:space-between; gap:24px; margin-bottom:30px; }
        .cls-eyebrow { display:flex; align-items:center; gap:8px; color:#92e9d5; font-size:10px; font-weight:750; text-transform:uppercase; letter-spacing:2px; }
        .cls-title { margin:12px 0 0; font-size:clamp(30px,4vw,48px); font-weight:850; line-height:1.1; letter-spacing:-1.8px; }
        .cls-title span { color:#99f2df; }
        .cls-subtitle { margin:12px 0 0; color:#7992a8; font-size:13px; line-height:1.6; }
        .cls-status { display:flex; align-items:center; gap:9px; border:1px solid #87e8d329; border-radius:999px; background:#81e9ce08; color:#a2f2df; padding:10px 14px; font-size:10px; font-weight:750; letter-spacing:1px; white-space:nowrap; }
        .cls-dot { position:relative; width:6px; height:6px; background:#91efda; border-radius:50%; }
        .cls-dot-live::after { content:''; position:absolute; inset:-4px; border:1px solid #91efda55; border-radius:50%; animation:cls-pulse 2s ease-out infinite; }
        .cls-board { position:relative; border:1px solid #b4e4e322; border-radius:28px; padding:26px; background:linear-gradient(135deg,#142737d9,#091722f2); box-shadow:0 25px 85px #00000035,inset 0 1px 0 #ffffff09; backdrop-filter:blur(22px); }
        .cls-board::before { content:''; position:absolute; top:-1px; left:40px; right:40px; height:1px; background:linear-gradient(90deg,transparent,#a2f5df88,transparent); }
        .cls-meta { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; padding-bottom:22px; }
        .cls-venue { display:flex; align-items:center; gap:8px; color:#8ea8bc; font-size:11px; line-height:1.6; }
        .cls-venue svg { flex-shrink:0; color:#93d3ce; }
        .cls-meta-tag { color:#819db1; font-size:9px; letter-spacing:1.3px; text-transform:uppercase; border:1px solid #ffffff12; padding:7px 10px; border-radius:8px; }
        .cls-teams { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .cls-team { min-width:0; position:relative; overflow:hidden; padding:23px; border:1px solid #ffffff10; background:#ffffff02; border-radius:20px; transition:transform .3s,border-color .3s; }
        .cls-team:hover { transform:translateY(-3px); border-color:#8cddcf35; }
        .cls-team-active { border-color:#87e5cd2b; background:linear-gradient(130deg,#72e4cd0b,#72e4cd02); }
        .cls-team-top { display:flex; align-items:center; gap:12px; }
        .cls-crest { display:grid; place-items:center; flex-shrink:0; width:42px; height:46px; border-radius:13px; border:1px solid #b7d8e222; background:#91c8d208; color:#bad7e5; font-size:12px; font-weight:850; }
        .cls-team-active .cls-crest { color:#a3f4dd; border-color:#98efd436; background:#81e8c90a; }
        .cls-team-name { min-width:0; }
        .cls-team-name h3 { margin:0; font-size:14px; font-weight:700; line-height:1.5; overflow-wrap:anywhere; }
        .cls-team-name p { margin:4px 0 0; color:#7a96ab; font-size:10px; }
        .cls-score-row { display:flex; align-items:end; justify-content:space-between; gap:12px; margin-top:24px; }
        .cls-score { font-size:clamp(45px,5vw,65px); font-weight:850; letter-spacing:-3px; line-height:1; font-variant-numeric:tabular-nums; }
        .cls-team-active .cls-score { color:#a0f6df; }
        .cls-score span { color:#7390a7; font-size:.5em; letter-spacing:-1px; }
        .cls-overs { padding-bottom:3px; text-align:right; font-size:13px; color:#c2d5e3; white-space:nowrap; }
        .cls-overs small { display:block; margin-top:6px; font-size:9px; color:#6a879e; letter-spacing:1px; }
        .cls-chase { margin-top:20px; border:1px solid #ffffff0d; border-radius:17px; padding:20px; background:#030c151f; }
        .cls-chase-top { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
        .cls-chase-text { display:flex; align-items:center; gap:9px; color:#a4bccd; font-size:12px; line-height:1.6; }
        .cls-chase-text svg { color:#a0efd9; flex-shrink:0; }
        .cls-chase-text strong { color:#b3f8e3; }
        .cls-target { font-size:10px; color:#6e8ca3; }
        .cls-progress { margin-top:16px; height:6px; background:#ffffff09; border-radius:99px; overflow:hidden; }
        .cls-progress-fill { position:relative; height:100%; background:linear-gradient(90deg,#37abb1,#8ef1d8); border-radius:99px; overflow:hidden; }
        .cls-progress-fill::after { content:''; position:absolute; inset:0; width:40%; background:linear-gradient(90deg,transparent,#ffffff55,transparent); animation:cls-shine 3s linear infinite; }
        .cls-metrics { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-top:18px; }
        .cls-metric { padding:14px; border:1px solid #ffffff0c; border-radius:12px; background:#ffffff02; }
        .cls-metric small { display:block; font-size:9px; letter-spacing:1.1px; color:#718ca2; text-transform:uppercase; }
        .cls-metric strong { display:block; margin-top:8px; color:#d4e6f2; font-size:20px; font-weight:750; font-variant-numeric:tabular-nums; }
        .cls-detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:24px; }
        .cls-panel { min-width:0; padding:20px; border:1px solid #ffffff0c; border-radius:17px; background:#ffffff02; }
        .cls-panel-heading { margin:0 0 15px; font-size:10px; color:#7894aa; letter-spacing:1.7px; font-weight:650; text-transform:uppercase; }
        .cls-player { display:flex; align-items:center; justify-content:space-between; gap:10px; padding:10px 0; border-top:1px solid #ffffff08; }
        .cls-player:first-of-type { border-top:0; }
        .cls-player-name { display:flex; align-items:center; gap:7px; min-width:0; font-size:12px; color:#a4bed0; overflow-wrap:anywhere; }
        .cls-striker { color:#ebf8ff; font-weight:650; }
        .cls-player-score { color:#c6dce9; font-size:12px; white-space:nowrap; font-variant-numeric:tabular-nums; }
        .cls-player-score small { color:#6c8aa1; font-size:10px; }
        .cls-figures { display:grid; grid-template-columns:repeat(4,1fr); gap:6px; margin-top:16px; }
        .cls-figure { text-align:center; background:#ffffff03; padding:9px 3px; border-radius:9px; }
        .cls-figure strong { display:block; color:#c1d9e7; font-size:13px; }
        .cls-figure small { display:block; margin-top:5px; color:#6b879e; font-size:8px; }
        .cls-ball-row { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; padding-top:22px; margin-top:22px; border-top:1px solid #ffffff0c; }
        .cls-ball-label { color:#839eb3; font-size:10px; letter-spacing:1px; text-transform:uppercase; }
        .cls-balls { display:flex; flex-wrap:wrap; gap:7px; }
        .cls-ball { min-width:34px; min-height:34px; padding:7px; display:grid; place-items:center; border-radius:10px; border:1px solid #ffffff10; background:#ffffff05; color:#a9c1d3; font-size:11px; font-weight:750; }
        .cls-boundary { background:#9ef3d414; color:#afffe2; border-color:#9ef3d427; }
        .cls-wicket { background:#ff8f7f12; color:#ffb8ac; border-color:#ff8f7f28; }
        .cls-actions { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px; margin-top:25px; }
        .cls-buttons { display:flex; flex-wrap:wrap; gap:10px; }
        .cls-button { display:inline-flex; align-items:center; justify-content:center; gap:9px; border-radius:12px; padding:13px 18px; min-height:46px; font-size:12px!important; font-weight:750!important; transition:transform .25s,box-shadow .25s; }
        .cls-button:hover { transform:translateY(-2px); }
        .cls-primary { background:linear-gradient(120deg,#b7ffec,#7ee9d8); color:#082327; border:0; box-shadow:0 8px 24px #78e7ce12; }
        .cls-secondary { color:#bed8e7; background:#ffffff03; border:1px solid #ffffff20; }
        .cls-note { color:#647e94; font-size:10px; line-height:1.6; }
        .cls-rotated { transform:rotate(180deg); }
        .cls-expanded { overflow:hidden; }
        .cls-table-wrap { overflow-x:auto; margin-top:22px; border:1px solid #ffffff0e; border-radius:14px; }
        .cls-table { width:100%; border-collapse:collapse; text-align:left; min-width:360px; }
        .cls-table caption { text-align:left; padding:16px; color:#a5c4d7; font-size:12px; font-weight:650; }
        .cls-table th { background:#ffffff04; color:#6f91a8; font-size:10px; font-weight:650; }
        .cls-table th,.cls-table td { padding:12px 16px; border-top:1px solid #ffffff08; }
        .cls-table td { color:#b9d1e2; font-size:12px; }
        .cls-empty { color:#7894aa; font-size:12px; line-height:1.7; }
        @keyframes cls-pulse { 0% { transform:scale(.8);opacity:1; } 100% { transform:scale(1.7);opacity:0; } }
        @keyframes cls-shine { 0% { transform:translateX(-150%); } 100% { transform:translateX(400%); } }
        @media(max-width:800px) { .cls-root { padding:70px 20px; } .cls-board { padding:20px; } .cls-team { padding:18px; } .cls-detail-grid { gap:14px; } .cls-panel { padding:16px; } }
        @media(max-width:600px) { .cls-root { padding:58px 16px; } .cls-heading-row { align-items:flex-start; gap:12px; } .cls-title { font-size:32px; letter-spacing:-1.2px; } .cls-status { font-size:8px; padding:8px 10px; margin-top:3px; } .cls-eyebrow { font-size:8px; letter-spacing:1.4px; } .cls-subtitle { font-size:11px; } .cls-board { padding:16px; border-radius:22px; } .cls-teams,.cls-detail-grid { grid-template-columns:1fr; gap:12px; } .cls-team { padding:19px; } .cls-score { font-size:58px; } .cls-meta { gap:10px; padding-bottom:17px; } .cls-chase { padding:15px; } .cls-metrics { gap:7px; } .cls-metric { padding:11px 9px; } .cls-metric small { font-size:8px; letter-spacing:.5px; } .cls-metric strong { font-size:18px; } .cls-actions { align-items:stretch; } .cls-buttons { display:grid; width:100%; grid-template-columns:1fr; } .cls-note { width:100%; text-align:center; } }
        @media(prefers-reduced-motion:reduce) { .cls-root *,.cls-root *::before,.cls-root *::after { animation:none!important; transition:none!important; } }
      `}</style>
      <motion.div aria-hidden="true" className="cls-glow" animate={reduceMotion ? {} : { y: [0, 45, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div aria-hidden="true" className="cls-glow cls-glow-right" animate={reduceMotion ? {} : { y: [0, -40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <div className="cls-wrap">
        <div className="cls-heading-row">
          <div><div className="cls-eyebrow"><Trophy size={13} /> {tournament || "Crestline match centre"}</div><h2 className="cls-title">Every run. <span>Right here.</span></h2><p className="cls-subtitle">The scoreboard, the players, and the story of the chase.</p></div>
          <span className="cls-status"><span className={`cls-dot ${isLive ? "cls-dot-live" : ""}`} />{isLive ? "LIVE MATCH" : "MATCH CENTRE"}</span>
        </div>
        <motion.div className="cls-board" initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={ease}>
          <div className="cls-meta"><div className="cls-venue"><MapPin size={14} /> {venue || "Venue to be confirmed"}</div><span className="cls-meta-tag">Score overview</span></div>
          <div className="cls-teams">
            {[{ team: teamA, chasing: true }, { team: teamB, chasing: false }].map(({ team, chasing }, index) => (
              <article key={index} className={`cls-team ${chasing ? "cls-team-active" : ""}`}>
                <div className="cls-team-top"><div className="cls-crest" aria-hidden="true">{initials(team.name)}</div><div className="cls-team-name"><h3>{team.name || `Team ${index + 1}`}</h3><p>{chasing ? "Batting · Chasing" : "First innings"}</p></div></div>
                <div className="cls-score-row"><div className="cls-score" aria-label={`${display(team.score)} runs for ${display(team.wickets)} wickets`}>{display(team.score)}<span>/{display(team.wickets)}</span></div><div className="cls-overs">{display(team.overs)}<small>OVERS</small></div></div>
              </article>
            ))}
          </div>
          <div className="cls-chase">
            <div className="cls-chase-top"><div className="cls-chase-text"><Target size={16} /><span>{targetNumber > 0 ? runsNeeded > 0 ? <>Need <strong>{runsNeeded} runs</strong> to reach the target</> : <strong>Target reached</strong> : "Awaiting a chase target"}</span></div><span className="cls-target">TARGET · {display(target)}</span></div>
            <div className="cls-progress" role="progressbar" aria-label="Runs scored towards target" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
              <motion.div className="cls-progress-fill" initial={reduceMotion ? false : { width: 0 }} whileInView={{ width: `${progress}%` }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 1.2, ease: "easeOut" }} />
            </div>
            <div className="cls-metrics">{[{ label: "Run rate", value: runRate }, { label: "Required rate", value: requiredRate }, { label: "Runs needed", value: targetNumber > 0 ? runsNeeded : null }].map((metric) => <div key={metric.label} className="cls-metric"><small>{metric.label}</small><strong>{display(metric.value)}</strong></div>)}</div>
          </div>
          <div className="cls-detail-grid">
            <div className="cls-panel"><h3 className="cls-panel-heading">At the crease</h3>{batsmen.length ? batsmen.map((batter, index) => <div className="cls-player" key={`${batter.name}-${index}`}><span className={`cls-player-name ${batter.onStrike ? "cls-striker" : ""}`}>{batter.onStrike && <Zap size={12} aria-label="On strike" />}{batter.name || "Batter"}</span><span className="cls-player-score">{display(batter.runs)} <small>({display(batter.balls)})</small></span></div>) : <p className="cls-empty">Batting details are not available yet.</p>}</div>
            <div className="cls-panel"><h3 className="cls-panel-heading">Current bowler</h3><div className="cls-player"><span className="cls-player-name cls-striker">{bowler.name || "Awaiting bowling details"}</span></div><div className="cls-figures">{[{ label: "Overs", value: bowler.overs }, { label: "Maidens", value: bowler.maidens }, { label: "Runs", value: bowler.runs }, { label: "Wickets", value: bowler.wickets }].map((stat) => <div key={stat.label} className="cls-figure"><strong>{display(stat.value)}</strong><small>{stat.label}</small></div>)}</div></div>
          </div>
          <div className="cls-ball-row"><span className="cls-ball-label">Recent deliveries</span><div className="cls-balls">{recentBalls.length ? recentBalls.map((ball, index) => { const value = String(ball); return <motion.span key={`${index}-${value}`} className={`cls-ball ${value.toUpperCase() === "W" ? "cls-wicket" : ["4", "6"].includes(value) ? "cls-boundary" : ""}`} initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.25, delay: reduceMotion ? 0 : index * 0.04 }} whileHover={reduceMotion ? undefined : { y: -4, scale: 1.06 }}>{value}</motion.span>; }) : <span className="cls-empty">No deliveries available.</span>}</div></div>
          <div className="cls-actions"><div className="cls-buttons"><button type="button" className="cls-button cls-primary" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded} aria-controls="crestline-score-details">{expanded ? "Hide Score Details" : "View Score Details"}<ChevronDown size={15} className={expanded ? "cls-rotated" : ""} /></button>{safeStream ? <a className="cls-button cls-secondary" href={safeStream} target="_blank" rel="noopener noreferrer"><Radio size={14} /> Watch Live <ArrowUpRight size={15} /></a> : <a className="cls-button cls-secondary" href="#highlights"><Radio size={14} /> Watch Highlights <ArrowUpRight size={15} /></a>}</div><span className="cls-note">{isLive ? "Match in progress" : "Match snapshot · Scores from your cricket data"}</span></div>
          <AnimatePresence initial={false}>{expanded && <motion.div id="crestline-score-details" className="cls-expanded" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.3 }}><div className="cls-table-wrap"><table className="cls-table"><caption>Current batting details</caption><thead><tr><th scope="col">Batter</th><th scope="col">Runs</th><th scope="col">Balls</th><th scope="col">Strike rate</th></tr></thead><tbody>{batsmen.length ? batsmen.map((batter, index) => <tr key={`${batter.name}-${index}`}><td>{batter.name}{batter.onStrike ? " *" : ""}</td><td>{display(batter.runs)}</td><td>{display(batter.balls)}</td><td>{number(batter.balls) > 0 ? ((number(batter.runs) / number(batter.balls)) * 100).toFixed(1) : "—"}</td></tr>) : <tr><td colSpan={4}>Batting details are not available yet.</td></tr>}</tbody></table></div></motion.div>}</AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
