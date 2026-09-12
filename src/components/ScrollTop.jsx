import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(window.scrollY > 600);
      setProgress(distance > 0 ? Math.max(0, Math.min(1, window.scrollY / distance)) : 0);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    observer?.observe(document.documentElement);
    if (document.body) observer?.observe(document.body);
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <style>{`
        .crest-scroll-top {
          position:fixed;
          left:20px;
          bottom:calc(20px + env(safe-area-inset-bottom, 0px));
          z-index:40;
          width:54px;
          height:54px;
          display:grid;
          place-items:center;
          padding:0;
          border:1px solid rgba(147,245,223,.2);
          border-radius:18px;
          background:linear-gradient(145deg,rgba(24,48,61,.95),rgba(6,19,31,.95));
          color:#a7f6e3;
          backdrop-filter:blur(20px);
          -webkit-backdrop-filter:blur(20px);
          box-shadow:0 10px 30px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.1);
          cursor:pointer;
          -webkit-tap-highlight-color:transparent;
          transition:border-color .25s,box-shadow .25s,color .25s;
        }
        .crest-scroll-top:hover {
          color:#e4fff7;
          border-color:rgba(147,245,223,.45);
          box-shadow:0 14px 35px rgba(0,0,0,.35),0 0 24px rgba(117,235,213,.12);
        }
        .crest-scroll-top:focus-visible { outline:2px solid #a7f6e3; outline-offset:5px; }
        .crest-scroll-ring { position:absolute; inset:4px; width:44px; height:44px; transform:rotate(-90deg); pointer-events:none; }
        .crest-scroll-arrow { position:relative; display:flex; align-items:center; justify-content:center; }
        @media(max-width:640px) { .crest-scroll-top { left:16px; bottom:calc(16px + env(safe-area-inset-bottom, 0px)); } }
        @media(prefers-reduced-motion:reduce) { .crest-scroll-top { transition:none; } }
      `}</style>
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            className="crest-scroll-top"
            aria-label="Back to top"
            title="Back to top"
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.9 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            whileHover={reduceMotion ? undefined : { y: -4 }}
            whileTap={reduceMotion ? undefined : { scale: 0.94 }}
            onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" })}
          >
            <svg className="crest-scroll-ring" viewBox="0 0 44 44" aria-hidden="true">
              <circle cx="22" cy="22" r="19" fill="none" stroke="rgba(167,246,227,.08)" strokeWidth="1.5" />
              <motion.circle cx="22" cy="22" r="19" fill="none" stroke="#a7f6e3" strokeWidth="1.5" strokeLinecap="round" pathLength="1" strokeDasharray="1 1" initial={false} animate={{ strokeDashoffset: 1 - progress }} transition={{ duration: reduceMotion ? 0 : 0.12 }} />
            </svg>
            <span className="crest-scroll-arrow"><ArrowUp size={19} strokeWidth={2} aria-hidden="true" /></span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
