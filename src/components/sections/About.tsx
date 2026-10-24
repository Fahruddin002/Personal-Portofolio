"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { galleryImages } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import EducationCards from "@/components/sections/Education";
import AboutGeneral from "@/components/sections/AboutGeneral";

type TabId = "general" | "education" | "gallery";

const tabs: { id: TabId; label: string }[] = [
  { id: "general", label: "General" },
  { id: "education", label: "Education" },
  { id: "gallery", label: "Gallery" },
];

export default function About() {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev === null ? prev : (prev + 1) % galleryImages.length,
    );
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev === null
        ? prev
        : (prev - 1 + galleryImages.length) % galleryImages.length,
    );

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="About Me" />

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-gray-100 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-5 sm:px-7 py-2.5 text-sm font-semibold transition-colors duration-200"
              >
                <span
                  className={`relative z-10 ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-text-secondary hover:text-dark-blue"
                  }`}
                >
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="about-tab"
                    className="absolute inset-0 rounded-full bg-primary-blue"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "general" && (
            <motion.div
              key="general"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <AboutGeneral />
            </motion.div>
          )}

          {activeTab === "education" && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <EducationCards />
            </motion.div>
          )}

          {activeTab === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {galleryImages.map((image, index) => (
                  <motion.button
                    key={image.id}
                    type="button"
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.03, y: -4, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openLightbox(index)}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2"
                    aria-label={`Buka gambar ${image.alt}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/70 via-dark-blue/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-sm font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {image.alt}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-dark-blue/90 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2.5 text-white hover:text-accent-orange transition-colors z-10"
              aria-label="Tutup"
            >
              <X size={28} weight="bold" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-accent-orange transition-colors z-10"
              aria-label="Sebelumnya"
            >
              <CaretLeft size={24} weight="bold" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                fill
                className="object-contain rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-accent-orange transition-colors z-10"
              aria-label="Berikutnya"
            >
              <CaretRight size={24} weight="bold" />
            </button>

            <div className="absolute bottom-8 left-0 right-0 text-center text-white text-sm">
              {galleryImages[lightboxIndex].alt} — {lightboxIndex + 1}/
              {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
