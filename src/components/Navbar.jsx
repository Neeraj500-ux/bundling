import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  Menu,
  Radio,
  X,
} from "lucide-react";
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

  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  const reduceMotion = useReducedMotion();

  // Update the glass background and active section on scroll.
  useEffect(() => {
    let frame = 0;

    const updateNavigation = () => {
      frame = 0;

      setScrolled(window.scrollY > 24);

      const sections = LINKS.map((link) => ({
        href: link.href,
        element: document.getElementById(link.href.slice(1)),
      })).filter((section) => section.element);

      const offset =
        (headerRef.current?.getBoundingClientRect().height || 96) + 100;

      let current = sections[0]?.href || "#home";

      for (const section of sections) {
        if (section.element.getBoundingClientRect().top <= offset) {
          current = section.href;
        }
      }

      setActive(current);
    };

    const scheduleUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateNavigation);
      }
    };

    updateNavigation();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Close the mobile menu when the desktop layout appears.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    const handleChange = () => {
      if (media.matches) setOpen(false);
    };

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  // Lock background scrolling and keep keyboard focus inside the menu.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      panelRef.current?.querySelector("a")?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const controls = [
        toggleRef.current,
        ...Array.from(
          panelRef.current?.querySelectorAll(
            'a[href], button:not([disabled])'
          ) || []
        ),
      ].filter(Boolean);

      const first = controls[0];
      const last = controls[controls.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const navigateTo = (event, href) => {
    const section = document.getElementById(href.slice(1));

    setActive(href);
    setOpen(false);

    // Keep native anchor behavior if the destination is not present.
    if (!section) return;

    event.preventDefault();

    const headerHeight =
      headerRef.current?.getBoundingClientRect().height || 96;

    const target =
      section.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      20;

    window.scrollTo({
      top: Math.max(0, target),
      behavior: reduceMotion ? "auto" : "smooth",
    });

    if (window.location.hash !== href) {
      window.history.pushState(null, "", href);
    }
  };

  const duration = reduceMotion ? 0 : 0.25;

  return (
    <>
      <style>{`
        .crest-nav {
          --crest-accent: #67e8f9;
          --crest-text: #f8fafc;
          --crest-muted: #a6b4c8;
        }

        .crest-nav a,
        .crest-nav button {
          -webkit-tap-highlight-color: transparent;
        }

        .crest-nav a:focus-visible,
        .crest-nav button:focus-visible {
          outline: 2px solid var(--crest-accent);
          outline-offset: 5px;
        }

        .crest-nav-shell {
          isolation: isolate;
          background: linear-gradient(
            115deg,
            rgba(255,255,255,0.085),
            rgba(255,255,255,0.025) 48%,
            rgba(103,232,249,0.065)
          );
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow:
            0 16px 48px rgba(0,0,0,0.22),
            inset 0 1px 0 rgba(255,255,255,0.07);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          transition:
            background 300ms ease,
            border-color 300ms ease,
            box-shadow 300ms ease;
        }

        .crest-nav-shell[data-scrolled="true"] {
          background: linear-gradient(
            120deg,
            rgba(6,15,27,0.95),
            rgba(10,23,36,0.93)
          );
          border-color: rgba(103,232,249,0.16);
          box-shadow:
            0 20px 60px rgba(0,0,0,0.35),
            0 0 28px rgba(103,232,249,0.035),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .crest-brand-icon {
          background: linear-gradient(
            145deg,
            rgba(103,232,249,0.17),
            rgba(103,232,249,0.025)
          );
          border: 1px solid rgba(103,232,249,0.22);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
          transition: box-shadow 300ms ease, border-color 300ms ease;
        }

        .crest-brand:hover .crest-brand-icon {
          border-color: rgba(103,232,249,0.55);
          box-shadow: 0 0 24px rgba(103,232,249,0.17);
        }

        .crest-live {
          isolation: isolate;
          background: linear-gradient(120deg, #a5f3fc, #67e8f9 55%, #22d3ee);
          box-shadow:
            0 8px 24px rgba(34,211,238,0.17),
            inset 0 1px 0 rgba(255,255,255,0.65);
          transition: transform 250ms ease, box-shadow 250ms ease;
        }

        .crest-live::before {
          content: "";
          position: absolute;
          top: -40%;
          left: -65%;
          width: 40%;
          height: 180%;
          transform: skewX(-22deg);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.6),
            transparent
          );
          transition: left 600ms ease;
          pointer-events: none;
        }

        .crest-live:hover::before {
          left: 130%;
        }

        .crest-live:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(34,211,238,0.28);
        }

        .crest-live-dot {
          animation: crestPulse 2s ease-in-out infinite;
        }

        @keyframes crestPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(6,78,59,0.25);
          }
          55% {
            box-shadow: 0 0 0 5px rgba(6,78,59,0);
          }
        }

        .crest-mobile-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(103,232,249,0.25) transparent;
          overscroll-behavior: contain;
        }

        @media (prefers-reduced-motion: reduce) {
          .crest-nav *,
          .crest-nav *::before,
          .crest-nav *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <header
        ref={headerRef}
        className="crest-nav fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
          className="relative mx-auto max-w-7xl"
        >
          <div
            data-scrolled={scrolled || open}
            className="crest-nav-shell relative rounded-[20px] sm:rounded-[24px]"
          >
            {/* Soft accent along the top edge */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/45 to-transparent"
            />

            <nav
              aria-label="Main navigation"
              className="relative flex h-[72px] items-center justify-between gap-3 px-3 sm:h-[80px] sm:px-5 lg:px-6"
            >
              {/* Brand */}
              <a
                href="#home"
                onClick={(event) => navigateTo(event, "#home")}
                className="crest-brand group flex shrink-0 items-center gap-2.5 sm:gap-3"
                aria-label="Crestline home"
              >
                <div className="crest-brand-icon flex h-10 w-10 items-center justify-center rounded-[14px] sm:h-11 sm:w-11">
                  <CricketBall className="h-7 w-7 transition-transform duration-500 group-hover:rotate-[35deg] group-hover:scale-110 sm:h-8 sm:w-8" />
                </div>

                <div className="flex flex-col">
                  <span className="font-display text-[18px] font-bold leading-none tracking-[0.09em] text-white sm:text-[21px]">
                    CRESTLINE
                    <span className="text-cyan-300">.</span>
                  </span>

                  <span className="mt-1.5 text-[8px] font-semibold uppercase tracking-[0.28em] text-slate-400 sm:text-[9px]">
                    The spirit of cricket
                  </span>
                </div>
              </a>

              {/* Desktop links */}
              <ul className="hidden items-center gap-0.5 lg:flex xl:gap-1">
                {LINKS.map((link) => {
                  const selected = active === link.href;

                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(event) => navigateTo(event, link.href)}
                        aria-current={selected ? "location" : undefined}
                        className={`group relative flex items-center justify-center rounded-xl px-3 py-3 text-[13px] font-semibold transition-colors duration-300 xl:px-3.5 ${
                          selected
                            ? "text-cyan-200"
                            : "text-slate-300 hover:text-white"
                        }`}
                      >
                        {selected && (
                          <motion.span
                            layoutId="crest-desktop-active"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 32,
                              duration,
                            }}
                            className="absolute inset-0 rounded-xl border border-cyan-200/15 bg-cyan-300/[0.08]"
                          />
                        )}

                        <span className="absolute inset-0 rounded-xl bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <span className="relative z-10">{link.label}</span>

                        {selected && (
                          <motion.span
                            layoutId="crest-desktop-line"
                            transition={{ duration }}
                            className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.65)]"
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* Desktop CTA */}
              <a
                href="#live"
                onClick={(event) => navigateTo(event, "#live")}
                className="crest-live relative hidden shrink-0 items-center gap-2 overflow-hidden rounded-xl px-4 py-3 text-[13px] font-bold text-slate-950 lg:inline-flex xl:px-5"
              >
                <Radio className="h-4 w-4" />
                <span>Watch Live</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              {/* Mobile controls */}
              <div className="flex items-center gap-2 lg:hidden">
                <a
                  href="#live"
                  onClick={(event) => navigateTo(event, "#live")}
                  aria-label="Watch live cricket"
                  className="hidden items-center gap-2 rounded-xl border border-cyan-200/20 bg-cyan-300/10 px-3 py-2.5 text-xs font-bold text-cyan-200 min-[380px]:inline-flex"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.65)]"
                  />
                  LIVE
                </a>

                <button
                  ref={toggleRef}
                  type="button"
                  onClick={() => setOpen((value) => !value)}
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  aria-controls="crest-mobile-menu"
                  className={`relative flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300 ${
                    open
                      ? "border-cyan-200/30 bg-cyan-300/10 text-cyan-200"
                      : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={open ? "close" : "menu"}
                      initial={{ opacity: 0, rotate: -35, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 35, scale: 0.8 }}
                      transition={{ duration: reduceMotion ? 0 : 0.15 }}
                    >
                      {open ? (
                        <X className="h-5 w-5" />
                      ) : (
                        <Menu className="h-5 w-5" />
                      )}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </nav>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {open && (
              <motion.div
                ref={panelRef}
                id="crest-mobile-menu"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration }}
                className="absolute inset-x-0 top-full mt-3 overflow-hidden rounded-[24px] border border-white/10 bg-[#081321]/95 shadow-[0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:hidden"
              >
                <div className="crest-mobile-scroll max-h-[calc(100dvh-120px)] overflow-y-auto p-4 sm:p-5">
                  <div className="mb-3 flex items-center justify-between border-b border-white/[0.07] px-2 pb-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                      Explore Crestline
                    </span>

                    <span className="flex items-center gap-1.5 rounded-full border border-cyan-300/15 bg-cyan-300/5 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-cyan-200">
                      <Radio className="h-3 w-3" />
                      Cricket hub
                    </span>
                  </div>

                  <ul className="space-y-1.5">
                    {LINKS.map((link, index) => {
                      const selected = active === link.href;

                      return (
                        <motion.li
                          key={link.href}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.2,
                            delay: reduceMotion ? 0 : index * 0.025,
                          }}
                        >
                          <a
                            href={link.href}
                            onClick={(event) =>
                              navigateTo(event, link.href)
                            }
                            aria-current={
                              selected ? "location" : undefined
                            }
                            className={`group flex items-center justify-between rounded-[14px] border px-4 py-3.5 transition-colors duration-200 ${
                              selected
                                ? "border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200"
                                : "border-transparent text-slate-300 hover:border-white/5 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <span className="flex items-center gap-4">
                              <span
                                aria-hidden="true"
                                className={`text-[10px] font-semibold tabular-nums ${
                                  selected
                                    ? "text-cyan-300/70"
                                    : "text-slate-600"
                                }`}
                              >
                                {String(index + 1).padStart(2, "0")}
                              </span>

                              <span className="text-sm font-semibold">
                                {link.label}
                              </span>
                            </span>

                            <ChevronRight
                              className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
                                selected
                                  ? "text-cyan-300"
                                  : "text-slate-600"
                              }`}
                            />
                          </a>
                        </motion.li>
                      );
                    })}
                  </ul>

                  <div className="mt-4 border-t border-white/[0.07] pt-4">
                    <a
                      href="#live"
                      onClick={(event) => navigateTo(event, "#live")}
                      className="crest-live relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-[14px] px-5 py-4 text-sm font-bold text-slate-950"
                    >
                      <span className="flex items-center gap-2.5">
                        <Radio className="h-[18px] w-[18px]" />
                        Watch Live Cricket
                      </span>

                      <ArrowUpRight className="h-[18px] w-[18px]" />
                    </a>

                    <p className="mt-3 text-center text-[10px] tracking-wide text-slate-500">
                      Every match. Every moment.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      {/* Tap outside the mobile menu to close it */}
      <AnimatePresence>
        {open && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            onClick={() => {
              setOpen(false);
              toggleRef.current?.focus();
            }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}