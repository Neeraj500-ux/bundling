import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function VideoModal({ item, onClose }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!item) return;
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/90 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-navy overflow-hidden"
          >
            <div className="aspect-video bg-ink flex items-center justify-center">
              <div className="text-center px-6">
                <span className="inline-block rounded-full bg-cyan/15 text-cyan text-xs font-mono uppercase tracking-widest px-3 py-1 mb-3">
                  {item.category}
                </span>
                <p className="text-mist text-sm">
                  Highlight playback would stream here in production.
                </p>
              </div>
            </div>
            <div className="p-5 flex items-start justify-between gap-4">
              <div>
                <h3 id="video-modal-title" className="font-display text-lg text-chalk tracking-wide">
                  {item.title}
                </h3>
                <p className="text-sm text-mist mt-1 font-mono">{item.duration}</p>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close video"
                className="shrink-0 w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-chalk hover:border-cyan hover:text-cyan transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
