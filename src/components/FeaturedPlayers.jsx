import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Shield, Trophy, Users, Zap } from "lucide-react";
import { featuredPlayers } from "../data/cricketData";
import useCountUp from "../hooks/useCountUp";

const numeric = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};
const initials = (name = "Player") => String(name).trim().split(/\s+/).slice(0, 2).map((word) => word[0]).join("").toUpperCase();

function StatCounter({ value, label, reduceMotion }) {
  const target = Math.max(0, numeric(value));
  const { ref, value: current } = useCountUp(target, { duration: 1200 });
  return <div ref={ref} className="cfp-stat"><strong>{value == null ? "—" : Math.round(reduceMotion ? target : numeric(current)).toLocaleString("en-IN")}</strong><small>{label}</small></div>;
}

function PlayerPortrait({ player }) {
  const [failed, setFailed] = useState(false);
  const image = player.image || player.imageUrl || player.photo || player.avatar;
  return (
    <div className="cfp-art">
      <div className="cfp-art-grid" aria-hidden="true" />
      <div className="cfp-art-ring" aria-hidden="true" />
      {typeof image === "string" && image && !failed ? <img className="cfp-photo" src={image} alt={player.name || "Cricket player"} loading="lazy" decoding="async" onError={() => setFailed(true)} /> : <div className="cfp-jersey" aria-hidden="true"><svg viewBox="0 0 220 240"><path d="M74 28 94 18 Q110 35 126 18 L146 28 202 79 168 115 151 99 155 220 Q110 235 65 220 L69 99 52 115 18 79Z" fill="currentColor" stroke="#9debd3" strokeOpacity=".22" strokeWidth="1.5" /><path d="M94 18 Q110 48 126 18" fill="none" stroke="#a9f1d8" strokeOpacity=".5" strokeWidth="3" /><path d="M74 28 94 48M146 28 126 48" stroke="#a9f1d8" strokeOpacity=".2" strokeWidth="2" /><path d="M72 162 Q110 145 153 162" fill="none" stroke="#8ddfc3" strokeOpacity=".12" strokeWidth="18" /></svg><span>{initials(player.name)}</span><small>CRESTLINE</small></div>}
      <span className="cfp-role">{player.role || "Player"}</span>
      <span className="cfp-team-tag"><Shield size={10} />{player.team || "Team to be confirmed"}</span>
    </div>
  );
}

function PlayerCard({ player, index }) {
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();
  const detailsId = useId();
  return (
    <motion.article className="cfp-card" initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : Math.min(index * 0.07, 0.28) }}>
      <PlayerPortrait player={player} />
      <div className="cfp-content">
        <div className="cfp-player-label"><span /> PLAYER SPOTLIGHT</div>
        <h3>{player.name || "Player name unavailable"}</h3>
        <p className="cfp-team">{player.team || "Team to be confirmed"}</p>
        <div className="cfp-stats"><StatCounter value={player.matches} label="Matches" reduceMotion={reduceMotion} /><StatCounter value={player.runs} label="Runs" reduceMotion={reduceMotion} /><StatCounter value={player.wickets} label="Wickets" reduceMotion={reduceMotion} /><div className="cfp-stat"><strong>{player.strikeRate == null ? "—" : numeric(player.strikeRate).toFixed(1)}</strong><small>Strike rate</small></div></div>
        <button type="button" className="cfp-profile" aria-expanded={expanded} aria-controls={detailsId} onClick={() => setExpanded((value) => !value)}><span>{expanded ? "Close Profile" : "Player Profile"}</span>{expanded ? <ChevronDown size={15} className="cfp-chevron" /> : <ArrowUpRight size={15} />}</button>
        <AnimatePresence initial={false}>{expanded && <motion.div className="cfp-details" id={detailsId} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.25 }}><div className="cfp-details-inner"><p>{player.bio || player.description || `Explore the available cricket statistics for ${player.name || "this player"}.`}</p><dl><div><dt>Role</dt><dd>{player.role || "—"}</dd></div><div><dt>Team</dt><dd>{player.team || "—"}</dd></div>{player.battingStyle && <div><dt>Batting</dt><dd>{player.battingStyle}</dd></div>}{player.bowlingStyle && <div><dt>Bowling</dt><dd>{player.bowlingStyle}</dd></div>}</dl></div></motion.div>}</AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function FeaturedPlayers() {
  const players = Array.isArray(featuredPlayers) ? featuredPlayers.filter(Boolean) : [];
  const reduceMotion = useReducedMotion();
  return (
    <section id="players" className="cfp-root">
      <style>{`
        .cfp-root { position:relative; isolation:isolate; overflow:hidden; padding:90px 24px; background:#07121e; color:#edf7ff; font-family:inherit; scroll-margin-top:115px; }
        .cfp-root *, .cfp-root *::before, .cfp-root *::after { box-sizing:border-box; }
        .cfp-glow { position:absolute; top:-220px; right:-180px; width:620px; height:620px; border-radius:50%; background:radial-gradient(circle,#60cfba0d,transparent 70%); z-index:-1; pointer-events:none; }
        .cfp-wrap { max-width:1220px; margin:auto; }
        .cfp-heading { display:flex; justify-content:space-between; align-items:end; gap:24px; margin-bottom:34px; }
        .cfp-eyebrow { display:flex; align-items:center; gap:8px; color:#a1ecd8; font-size:10px; letter-spacing:2px; font-weight:750; text-transform:uppercase; }
        .cfp-title { margin:13px 0 0; font-size:clamp(30px,4vw,48px); font-weight:850; letter-spacing:-1.8px; line-height:1.1; }
        .cfp-title span { color:#a1f1dc; }
        .cfp-description { margin:13px 0 0; max-width:490px; color:#7c98ae; font-size:13px; line-height:1.8; }
        .cfp-count { display:flex; align-items:center; gap:9px; color:#91b3c7; border:1px solid #ffffff12; border-radius:12px; padding:12px 15px; font-size:11px; white-space:nowrap; background:#ffffff02; }
        .cfp-count svg { color:#9be8d5; }
        .cfp-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:20px; align-items:start; }
        .cfp-card { position:relative; min-width:0; border:1px solid #b4dfe21c; border-radius:22px; overflow:hidden; background:linear-gradient(145deg,#142535,#0a1723); box-shadow:0 14px 35px #00000020; transition:border-color .3s,box-shadow .3s; }
        .cfp-card:hover { border-color:#a1edda50; box-shadow:0 20px 50px #00000038,0 0 25px #7fe1c608; }
        .cfp-art { position:relative; height:240px; overflow:hidden; isolation:isolate; background:radial-gradient(ellipse at 50% 65%,#245a596b,transparent 70%),linear-gradient(145deg,#172f40,#0b1c2b); }
        .cfp-art::after { content:''; position:absolute; inset:0; z-index:2; background:linear-gradient(180deg,transparent 50%,#0e202ecf); pointer-events:none; }
        .cfp-art::before { content:''; position:absolute; top:-50%; left:-100%; width:40%; height:200%; background:linear-gradient(90deg,transparent,#d4fff408,transparent); transform:skewX(-20deg); z-index:3; transition:left .8s; pointer-events:none; }
        .cfp-card:hover .cfp-art::before { left:160%; }
        .cfp-art-grid { position:absolute; inset:0; background-image:linear-gradient(#a8e5d810 1px,transparent 1px),linear-gradient(90deg,#a8e5d810 1px,transparent 1px); background-size:34px 34px; opacity:.5; }
        .cfp-art-ring { position:absolute; width:190px; height:190px; left:50%; top:48%; transform:translate(-50%,-50%); border-radius:50%; border:1px solid #a2eddb18; box-shadow:0 0 0 20px #a2eddb04,0 0 0 42px #a2eddb03; transition:transform .7s; }
        .cfp-card:hover .cfp-art-ring { transform:translate(-50%,-50%) scale(1.1); }
        .cfp-photo { width:100%; height:100%; object-fit:cover; object-position:center 25%; display:block; transition:transform .65s; }
        .cfp-card:hover .cfp-photo { transform:scale(1.06); }
        .cfp-jersey { position:absolute; width:195px; height:215px; bottom:-20px; left:50%; transform:translateX(-50%) rotate(-5deg); color:#154738; filter:drop-shadow(0 18px 20px #00000044); transition:transform .65s; }
        .cfp-card:nth-child(4n+2) .cfp-jersey { color:#1c385a; }
        .cfp-card:nth-child(4n+3) .cfp-jersey { color:#453855; }
        .cfp-card:nth-child(4n+4) .cfp-jersey { color:#57442b; }
        .cfp-jersey svg { width:100%; height:100%; }
        .cfp-jersey span { position:absolute; top:78px; left:0; width:100%; text-align:center; font-size:38px; font-weight:900; letter-spacing:-2px; color:#e5ffedb3; }
        .cfp-jersey small { position:absolute; top:125px; left:0; width:100%; text-align:center; color:#e5ffed66; font-size:8px; letter-spacing:2.5px; }
        .cfp-card:hover .cfp-jersey { transform:translateX(-50%) translateY(-7px) rotate(0deg); }
        .cfp-role { position:absolute; top:14px; right:14px; z-index:4; max-width:calc(100% - 28px); border:1px solid #bef4e32b; border-radius:999px; padding:7px 10px; background:#081722bf; color:#b8f0df; font-size:9px; letter-spacing:.8px; line-height:1.4; overflow-wrap:anywhere; backdrop-filter:blur(12px); }
        .cfp-team-tag { position:absolute; bottom:15px; left:18px; right:18px; z-index:4; display:flex; align-items:center; gap:6px; color:#9bbcac; font-size:9px; letter-spacing:.5px; line-height:1.6; }
        .cfp-team-tag svg { flex-shrink:0; }
        .cfp-content { padding:20px; }
        .cfp-player-label { display:flex; align-items:center; gap:6px; color:#6f9eaa; font-size:8px; font-weight:650; letter-spacing:1.8px; }
        .cfp-player-label span { width:4px; height:4px; border-radius:50%; background:#a1ebd8; }
        .cfp-content h3 { margin:11px 0 0; color:#eaf6ff; font-size:20px; line-height:1.3; font-weight:750; letter-spacing:-.5px; overflow-wrap:anywhere; }
        .cfp-team { margin:7px 0 0; color:#7e9ab0; font-size:11px; line-height:1.6; }
        .cfp-stats { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:6px; margin-top:20px; padding:17px 0; border-top:1px solid #ffffff0d; border-bottom:1px solid #ffffff0d; }
        .cfp-stat { min-width:0; text-align:center; }
        .cfp-stat strong { display:block; color:#d5edee; font-size:15px; line-height:1.4; font-weight:750; font-variant-numeric:tabular-nums; overflow-wrap:anywhere; }
        .cfp-stat small { display:block; margin-top:5px; color:#68899e; font-size:8px; line-height:1.4; }
        .cfp-profile { display:flex; align-items:center; justify-content:space-between; gap:10px; width:100%; min-height:44px; margin-top:17px; border:1px solid #a7ddda22; border-radius:11px; padding:12px 14px; background:#89e0ca05; color:#c0e3e4; font:inherit; font-size:11px; font-weight:650; cursor:pointer; -webkit-tap-highlight-color:transparent; transition:background .25s,color .25s,border-color .25s; }
        .cfp-profile:hover { background:#89e0ca10; border-color:#a7ddda50; color:#dffff6; }
        .cfp-profile:focus-visible { outline:2px solid #a4efda; outline-offset:4px; }
        .cfp-profile svg { color:#8dc6c3; flex-shrink:0; }
        .cfp-chevron { transform:rotate(180deg); }
        .cfp-details { overflow:hidden; }
        .cfp-details-inner { padding-top:16px; }
        .cfp-details p { margin:0; font-size:11px; line-height:1.8; color:#89a7ba; }
        .cfp-details dl { margin:13px 0 0; }
        .cfp-details dl div { display:flex; justify-content:space-between; align-items:start; gap:12px; padding:9px 0; border-top:1px solid #ffffff08; font-size:10px; line-height:1.6; }
        .cfp-details dt { color:#6b8b9f; flex-shrink:0; }
        .cfp-details dd { color:#b5d0db; text-align:right; margin:0; overflow-wrap:anywhere; }
        .cfp-empty { color:#8aa8b8; padding:24px; border:1px solid #ffffff12; border-radius:16px; font-size:13px; }
        .cfp-footer { margin:25px 0 0; display:flex; align-items:center; gap:7px; color:#5e7d92; font-size:10px; line-height:1.6; }
        @media(max-width:1100px) { .cfp-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } .cfp-art { height:265px; } .cfp-jersey { width:215px; height:235px; } .cfp-jersey span { top:87px; } .cfp-jersey small { top:135px; } .cfp-stat strong { font-size:18px; } .cfp-stat small { font-size:9px; } }
        @media(max-width:600px) { .cfp-root { padding:58px 18px; } .cfp-heading { align-items:start; flex-direction:column; gap:17px; margin-bottom:25px; } .cfp-title { font-size:34px; letter-spacing:-1.2px; } .cfp-description { font-size:12px; } .cfp-grid { grid-template-columns:1fr; gap:20px; } .cfp-card { border-radius:21px; } .cfp-art { height:260px; } .cfp-content { padding:21px; } .cfp-content h3 { font-size:23px; } .cfp-team { font-size:12px; } .cfp-stat strong { font-size:19px; } .cfp-stat small { font-size:9px; } .cfp-profile { min-height:48px; font-size:12px; } .cfp-count { padding:9px 12px; font-size:10px; } }
        @media(prefers-reduced-motion:reduce) { .cfp-root *,.cfp-root *::before,.cfp-root *::after { animation:none!important; transition:none!important; } }
      `}</style>
      <motion.div className="cfp-glow" aria-hidden="true" animate={reduceMotion ? {} : { x: [0, -40, 0], y: [0, 30, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />
      <div className="cfp-wrap"><div className="cfp-heading"><div><div className="cfp-eyebrow"><Trophy size={13} /> Player watch</div><h2 className="cfp-title">The talent. <span>The impact.</span></h2><p className="cfp-description">Meet the players behind the performances. Explore their numbers and get closer to the names that shape the game.</p></div><span className="cfp-count"><Users size={14} />{players.length} featured {players.length === 1 ? "player" : "players"}</span></div>{players.length ? <div className="cfp-grid">{players.map((player, index) => <PlayerCard key={player.id ?? `${player.name}-${index}`} player={player} index={index} />)}</div> : <p className="cfp-empty">Featured players will appear here when player data is available.</p>}<p className="cfp-footer"><Shield size={12} />Statistics from your player data · Photos appear when provided</p></div>
    </section>
  );
}
