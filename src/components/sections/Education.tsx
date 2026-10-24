"use client";

import { motion } from "framer-motion";
import {
  CalendarBlank,
  MapPin,
  Medal,
  GraduationCap,
} from "@phosphor-icons/react";
import Image from "next/image";
import { educationHistory } from "@/data/portfolio";

export default function EducationCards() {
  return (
    <div className="max-w-4xl mx-auto space-y-3">
      {educationHistory.map((item) => {
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3, boxShadow: "0 14px 28px rgba(0,0,0,0.12)", transition: { type: "spring", stiffness: 300, damping: 22 } }}
            className="bg-white rounded-2xl px-4 py-5 shadow-[0_6px_20px_rgba(0,0,0,0.10)] transition-shadow duration-300"
          >
            {/* Header bar — logo & jenis sekolah; tahun + alamat turun ke baris kedua di mobile */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-3">
              {/* Logo + jenis sekolah + institusi */}
              <div className="flex min-w-0 flex-1 items-center gap-3">
                {/* Logo institusi */}
                <div className="flex-shrink-0 w-11 h-11 rounded-lg border border-gray-200 bg-white p-1 flex items-center justify-center overflow-hidden">
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt={`Logo ${item.institution}`}
                      width={36}
                      height={36}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <GraduationCap
                      size={22}
                      weight="duotone"
                      className="text-primary-blue"
                    />
                  )}
                </div>

                {/* Jenis sekolah + institusi */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-dark-blue leading-tight break-words">
                    {item.level}
                  </h3>
                  <p className="mt-0.5 text-sm text-gray-900 font-medium break-words">
                    {item.institution}
                  </p>
                </div>
              </div>

              {/* Tahun + alamat */}
              <div className="flex min-w-0 flex-wrap items-start gap-x-4 gap-y-1 text-[11px] sm:text-xs text-gray-600 md:ml-auto md:max-w-[55%] md:justify-end md:text-right">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarBlank
                    size={12}
                    weight="regular"
                    className="flex-shrink-0"
                  />
                  {item.startYear} – {item.endYear}
                </span>
                <span className="inline-flex min-w-0 items-start gap-1.5">
                  <MapPin
                    size={12}
                    weight="regular"
                    className="flex-shrink-0 mt-0.5"
                  />
                  <span className="break-words">{item.location}</span>
                </span>
              </div>
            </div>

            {/* Field + badge GPA */}
            {item.field && (
              <p className="mt-1.5 text-xs text-text-secondary">
                Field: {item.field}
              </p>
            )}
            <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#ecfeff] border border-[#a5f3fc] px-2.5 py-0.5 text-[11px] font-bold text-[#0e7490]">
              <Medal size={12} weight="fill" />
              {item.gpa}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
