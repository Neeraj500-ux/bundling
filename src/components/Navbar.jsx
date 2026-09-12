import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Radio } from "lucide-react";
import CricketBall from "./CricketBall";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Matches", href: "#matches" },
  { label: "Teams", href: "#standings" },
  { label: "Players", href: "#players" },
  { label: "Highlights", href: "#highlights" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/85 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 h-18 py-3">
        <a href="#home" className="flex items-center gap-2.5 group">
          <CricketBall className="w-8 h-8 transition-transform duration-300 group-hover:rotate-45" />
          <span className="font-display text-xl tracking-wide text-chalk">
            CRESTLINE
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {LINKS.map((link) => (
            <li key={link.href} className="relative">
              <a
                href={link.href}
                onClick={() => setActive(link.href)}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  active === link.href ? "text-cyan" : "text-mist hover:text-chalk"
                }`}
              >
                {link.label}
                {active === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-cyan rounded-full"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#live"
          className="hidden lg:inline-flex items-center gap-2 rounded-full bg-cyan text-ink px-5 py-2.5 text-sm font-semibold hover:bg-chalk transition-colors"
        >
          <Radio className="w-4 h-4" />
          Watch Live
        </a>

        <button
          className="lg:hidden text-chalk p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-ink/95 backdrop-blur-md border-b border-white/5"
          >
            <ul className="px-5 py-4 flex flex-col gap-4">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => {
                      setActive(link.href);
                      setOpen(false);
                    }}
                    className="block text-base text-mist hover:text-chalk py-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <a
                href="#live"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan text-ink px-5 py-3 text-sm font-semibold mt-2"
              >
                <Radio className="w-4 h-4" />
                Watch Live
              </a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
