import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Trophy } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setError("Enter a valid email address to continue.");
      showToast("That email address doesn't look right.", "error");
      return;
    }
    setError("");
    showToast("You're in — match alerts are on their way.", "success");
    setEmail("");
  };

  return (
    <section className="relative py-24 sm:py-28 bg-ink overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
        <Trophy className="w-[420px] h-[420px] text-gold" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center"
      >
        <h2 className="font-display text-3xl sm:text-5xl text-chalk leading-tight">
          NEVER MISS A MATCH-WINNING MOMENT
        </h2>
        <p className="text-mist mt-4 max-w-md mx-auto">
          Get score alerts, match previews and highlight drops sent straight
          to your inbox.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 max-w-md mx-auto">
          <div className="relative rounded-full p-[1.5px] bg-gradient-to-r from-cyan via-royal to-gold">
            <div className="flex items-center gap-2 rounded-full bg-ink px-2 py-2">
              <Mail className="w-4 h-4 text-mist ml-3 shrink-0" />
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                aria-invalid={!!error}
                aria-describedby={error ? "newsletter-error" : undefined}
                className="flex-1 bg-transparent text-sm text-chalk placeholder:text-mist/70 focus:outline-none py-2"
              />
              <button
                type="submit"
                className="rounded-full bg-cyan text-ink px-5 py-2.5 text-sm font-semibold hover:bg-chalk transition-colors whitespace-nowrap"
              >
                Get Match Alerts
              </button>
            </div>
          </div>
          {error && (
            <p id="newsletter-error" className="text-red-400 text-sm mt-3">
              {error}
            </p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
