"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  description?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  title,
  eyebrow,
  description,
  align = "center"
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={
        isCenter ? "text-center mb-12" : "mb-10 max-w-2xl"
      }
    >
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-orange mb-3"
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl md:text-4xl font-bold text-dark-blue tracking-tight"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-4 text-text-secondary leading-relaxed ${
            isCenter ? "max-w-2xl mx-auto" : ""
          }`}
        >
          {description}
        </motion.p>
      )}

      {/* Underline accent */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: isCenter ? 64 : 96, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`h-1 rounded-full bg-accent-orange mt-5 ${
          isCenter ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
