import { useState } from "react";
import { MessageCircle, Camera, Video, ArrowUp } from "lucide-react";
import CricketBall from "./CricketBall";
import { useToast } from "../context/ToastContext";

const LINK_GROUPS = [
  {
    title: "Quick Links",
    links: ["Home", "About", "Matches", "Players", "Contact"],
  },
  {
    title: "Tournaments",
    links: ["Continental Trophy", "Coastal Series", "Rising Stars Cup"],
  },
  {
    title: "Support",
    links: ["Help Center", "Broadcast Partners", "Advertise", "Careers"],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("That email address doesn't look right.", "error");
      return;
    }
    showToast("Subscribed! Check your inbox for a welcome note.", "success");
    setEmail("");
  };

  return (
    <footer className="relative bg-ink border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <CricketBall className="w-8 h-8" />
              <span className="font-display text-xl tracking-wide text-chalk">CRESTLINE</span>
            </div>
            <p className="text-sm text-mist max-w-xs">
              Live scores, expert analysis and highlights for fans who follow
              every over, not just the result.
            </p>
            <form onSubmit={handleSubmit} className="mt-5 flex gap-2 max-w-xs">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 min-w-0 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-chalk placeholder:text-mist/70 focus:outline-none focus:border-cyan"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-cyan text-ink px-4 py-2 text-sm font-semibold hover:bg-chalk transition-colors"
              >
                Join
              </button>
            </form>
          </div>

          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-chalk mb-4">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((l) => (
                  <li key={l}>
                    <a href="#home" className="text-sm text-mist hover:text-cyan transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-14 pt-6 border-t border-white/5">
          <p className="text-xs text-mist text-center sm:text-left">
            © 2026 Crestline Cricket. All rights reserved. ·{" "}
            <a href="#home" className="hover:text-cyan">Privacy Policy</a> ·{" "}
            <a href="#home" className="hover:text-cyan">Terms</a>
          </p>
          <div className="flex items-center gap-4">
            {[MessageCircle, Camera, Video].map((Icon, i) => (
              <a
                key={i}
                href="#home"
                aria-label="Social media link"
                className="text-mist hover:text-cyan transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
            <a
              href="#home"
              aria-label="Back to top"
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-mist hover:text-cyan hover:border-cyan transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
