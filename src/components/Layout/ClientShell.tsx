"use client";

import { useState, ReactNode } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Layout/Navbar";

export default function ClientShell({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <Navbar />
      <main>{children}</main>
    </MotionConfig>
  );
}
