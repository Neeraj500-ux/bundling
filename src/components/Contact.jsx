import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Camera, Video, CheckCircle2, X } from "lucide-react";

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.subject.trim()) next.subject = "Please add a subject.";
    if (!form.message.trim()) next.message = "Please write a short message.";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setShowSuccess(true);
      setForm(initialForm);
    }
  };

  const fields = [
    { id: "name", label: "Name", type: "text" },
    { id: "email", label: "Email", type: "email" },
    { id: "phone", label: "Phone (optional)", type: "tel" },
    { id: "subject", label: "Subject", type: "text" },
  ];

  return (
    <section id="contact" className="py-24 sm:py-28 bg-navy">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12">
        <div>
          <p className="text-mist text-sm font-mono">Get in Touch</p>
          <h2 className="font-display text-3xl sm:text-4xl text-chalk mt-1">CONTACT US</h2>
          <p className="text-mist mt-4 max-w-sm">
            Questions, feedback or a story tip? Send us a message and the
            editorial team will get back to you.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-sm text-mist">
              <Mail className="w-4 h-4 text-cyan shrink-0" />
              hello@crestlinecricket.com
            </div>
            <div className="flex items-center gap-3 text-sm text-mist">
              <Phone className="w-4 h-4 text-cyan shrink-0" />
              +1 (555) 019-2244
            </div>
            <div className="flex items-center gap-3 text-sm text-mist">
              <MapPin className="w-4 h-4 text-cyan shrink-0" />
              14 Meridian Way, Port Aza
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            {[MessageCircle, Camera, Video].map((Icon, i) => (
              <a
                key={i}
                href="#contact"
                aria-label="Social media link"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-mist hover:text-cyan hover:border-cyan transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-white/10 bg-ink/60 p-6 sm:p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            {fields.map((f) => (
              <div key={f.id} className={f.id === "subject" ? "sm:col-span-2" : ""}>
                <label htmlFor={f.id} className="block text-xs font-mono uppercase tracking-widest text-mist mb-2">
                  {f.label}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  value={form[f.id]}
                  onChange={update(f.id)}
                  aria-invalid={!!errors[f.id]}
                  aria-describedby={errors[f.id] ? `${f.id}-error` : undefined}
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-chalk focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
                />
                {errors[f.id] && (
                  <p id={`${f.id}-error`} className="text-red-400 text-xs mt-1.5">
                    {errors[f.id]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-mist mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              value={form.message}
              onChange={update("message")}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-chalk focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors resize-none"
            />
            {errors.message && (
              <p id="message-error" className="text-red-400 text-xs mt-1.5">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-cyan text-ink py-3 text-sm font-semibold hover:bg-chalk transition-colors"
          >
            Send Message
          </button>
        </motion.form>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" onClick={() => setShowSuccess(false)} />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 rounded-2xl border border-cyan/30 bg-navy p-8 text-center max-w-sm"
            >
              <button
                onClick={() => setShowSuccess(false)}
                aria-label="Close"
                className="absolute top-3 right-3 text-mist hover:text-chalk"
              >
                <X className="w-4 h-4" />
              </button>
              <CheckCircle2 className="w-12 h-12 text-cyan mx-auto mb-4" />
              <h3 className="font-display text-xl text-chalk">MESSAGE SENT</h3>
              <p className="text-mist text-sm mt-2">
                Thanks for reaching out — the team will reply within one
                business day.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
