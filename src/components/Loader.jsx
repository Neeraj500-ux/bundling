import { motion } from "framer-motion";
import CricketBall from "./CricketBall";

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
      >
        <CricketBall className="w-14 h-14" />
      </motion.div>
      <p className="mt-6 font-mono text-xs tracking-[0.3em] text-mist uppercase">
        Taking guard
      </p>
    </motion.div>
  );
}
