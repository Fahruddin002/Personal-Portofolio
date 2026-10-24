"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export interface LoadingScreenProps {
  onComplete?: () => void;
}

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
// ~1.8 detik dengan interval 50ms
const STEP = 100 / (1800 / 50);

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete?.(), 350);
          return 100;
        }
        return Math.min(100, prev + STEP);
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  const clamped = Math.round(progress);
  const dashOffset = CIRCUMFERENCE - (CIRCUMFERENCE * clamped) / 100;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-white"
    >
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Glow halus di belakang ring */}
        <div className="absolute inset-6 rounded-full bg-accent-orange/5 blur-2xl" />

        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 120 120"
          aria-hidden="true"
        >
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="6"
          />
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke="#EE6F57"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 80ms linear" }}
          />
        </svg>

        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl font-black text-primary-blue"
          >
            FA<span className="text-accent-orange">.</span>
          </motion.span>
          <p className="mt-1 text-xs font-medium text-text-secondary tabular-nums">
            {clamped}%
          </p>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-16 text-sm tracking-[0.2em] uppercase text-text-secondary/70"
      >
        Portofolio
      </motion.p>
    </motion.div>
  );
}
