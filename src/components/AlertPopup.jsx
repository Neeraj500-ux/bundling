import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, BellRing } from "lucide-react";
import { useToast } from "../context/ToastContext";

const STORAGE_KEY = "crestline-alert-popup-dismissed";

export default function AlertPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setOpen(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, "1");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("That email address doesn't look right.", "error");
      return;
    }
    showToast("You're subscribed to live match alerts.", "success");
    dismiss();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-label="Get live match alerts"
          className="fixed bottom-5 right-5 z-[80] w-[calc(100%-2.5rem)] sm:w-80 rounded-2xl border border-cyan/30 bg-navy/95 backdrop-blur-md p-5 shadow-2xl"
        >
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute top-3 right-3 text-mist hover:text-chalk"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="w-9 h-9 rounded-full bg-cyan/15 flex items-center justify-center mb-3">
            <BellRing className="w-4 h-4 text-cyan" />
          </div>
          <h3 className="font-semibold text-chalk text-sm">Get live match alerts</h3>
          <p className="text-xs text-mist mt-1.5 leading-relaxed">
            Wickets, milestones and close finishes — sent the moment they
            happen.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <label htmlFor="popup-email" className="sr-only">
              Email address
            </label>
            <input
              id="popup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 min-w-0 rounded-full bg-white/5 border border-white/10 px-3.5 py-2 text-xs text-chalk placeholder:text-mist/70 focus:outline-none focus:border-cyan"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-cyan text-ink px-4 py-2 text-xs font-semibold hover:bg-chalk transition-colors"
            >
              Enable
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
