"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  CalendarBlank,
  MapPin,
  Briefcase,
  CaretDown,
  X,
} from "@phosphor-icons/react";
import {
  experiences,
  normalizeGallery,
  type Experience,
  type ExperienceGalleryItem,
} from "@/data/experiences";
import { parseRich } from "@/lib/richText";
import SectionHeading from "@/components/ui/SectionHeading";

// Inisial instansi untuk fallback logo (contoh: "SMKN 1 Tinangkung" -> "ST")
function initials(name: string): string {
  const words = name.split(/\s+/).filter((w) => !/^\d+$/.test(w));
  return words
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function TypeBadge({ type }: { type: Experience["type"] }) {
  if (type === "full-time") {
    return (
      <span className="inline-flex items-center rounded-full bg-primary-blue/10 px-2.5 py-0.5 text-xs font-semibold text-primary-blue">
        Penuh waktu
      </span>
    );
  }
  // Paruh waktu — teks memakai varian accent-orange yang lebih gelap agar kontras AA di atas putih
  return (
    <span className="inline-flex items-center rounded-full bg-[rgba(238,111,87,0.12)] px-2.5 py-0.5 text-xs font-semibold text-[#C14F38]">
      Paruh waktu
    </span>
  );
}

function ExperienceCard({
  experience,
  defaultOpen,
  onOpenGallery,
  index,
}: {
  experience: Experience;
  defaultOpen: boolean;
  onOpenGallery: (cardId: string, index: number) => void;
  index: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelRef = useRef<HTMLDivElement>(null);

  // Konten tertutup: tandai inert agar tidak bisa difokus keyboard / dibaca AT
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (open) el.removeAttribute("inert");
    else el.setAttribute("inert", "");
  }, [open]);

  const toggle = () => setOpen((v) => !v);
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const gallery = normalizeGallery(experience.gallery);
  const panelId = `exp-panel-${experience.id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`rounded-2xl border bg-white p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-[border-color,box-shadow] duration-300 ${
        open
          ? "border-primary-blue/35 shadow-[0_8px_24px_rgba(0,0,0,0.10)]"
          : "border-gray-200 hover:border-primary-blue/35 hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
      }`}
    >
      {/* Header — seluruh area dapat diklik untuk buka/tutup */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        onKeyDown={handleKey}
        className="flex items-start gap-3 sm:gap-4 cursor-pointer select-none rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2"
      >
        {/* Logo instansi */}
        <div className="flex-shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-xl border border-gray-200 bg-white p-1 sm:p-1.5 flex items-center justify-center overflow-hidden">
          {experience.logo ? (
            <Image
              src={experience.logo}
              alt={`Logo ${experience.organization}`}
              width={56}
              height={56}
              loading="lazy"
              className="object-contain w-full h-full"
            />
          ) : (
            <span className="w-full h-full rounded-lg bg-primary-blue/10 text-primary-blue font-bold flex items-center justify-center text-sm sm:text-base">
              {initials(experience.organization)}
            </span>
          )}
        </div>

        {/* Judul + meta */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-text-primary leading-snug">
            {experience.role}
          </h3>
          <p className="mt-0.5 text-[15px] text-text-secondary">
            {experience.organization}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-text-secondary">
            <span className="inline-flex items-center gap-1.5">
              <CalendarBlank size={14} weight="regular" className="text-primary-blue" />
              {experience.period}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} weight="regular" className="text-primary-blue" />
              {experience.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase size={14} weight="regular" className="text-primary-blue" />
              <TypeBadge type={experience.type} />
            </span>
          </div>
        </div>

        {/* Chevron */}
        <div className="flex-shrink-0 self-start w-9 h-9 rounded-[10px] bg-primary-blue/10 text-primary-blue flex items-center justify-center transition-colors duration-300 hover:bg-primary-blue/15">
          <CaretDown
            size={18}
            weight="bold"
            className={`exp-chevron transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Panel konten — animasi tinggi via grid-template-rows 0fr -> 1fr */}
      <div
        id={panelId}
        role="region"
        className="exp-accordion grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div ref={panelRef} className="overflow-hidden min-h-0">
          <div className="mt-4 pt-4 sm:mt-5 sm:pt-5 border-t border-gray-200">
            <p className="text-sm sm:text-[15px] leading-relaxed text-text-secondary">
              {experience.description}
            </p>

            {/* Kontribusi */}
            {experience.contributions.length > 0 && (
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-dark-blue mb-3">
                  Kontribusi:
                </h4>
                <ul className="space-y-2">
                  {experience.contributions.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-text-secondary"
                    >
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-accent-orange flex-shrink-0" />
                      <span>{parseRich(point)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Galeri — hanya dirender bila datanya ada */}
            {gallery.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-dark-blue mb-3">
                  Galeri:
                </h4>
                <div className="exp-gallery-scroll flex gap-3 overflow-x-auto snap-x snap-proximity pb-2">
                  {gallery.map((item, i) => (
                    <button
                      key={`${item.src}-${i}`}
                      type="button"
                      onClick={() => onOpenGallery(experience.id, i)}
                      className="relative flex-shrink-0 snap-start w-[200px] aspect-[16/10] rounded-[10px] overflow-hidden border border-gray-200 bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2"
                      aria-label={`Buka foto ${item.caption ?? experience.organization + " " + (i + 1)}`}
                    >
                      <Image
                        src={item.src}
                        alt={item.caption ?? `Foto ${experience.organization} ${i + 1}`}
                        fill
                        loading="lazy"
                        sizes="200px"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Experience() {
  const [lightbox, setLightbox] = useState<{
    cardId: string;
    index: number;
  } | null>(null);

  const activeExp = lightbox
    ? experiences.find((e) => e.id === lightbox.cardId) ?? null
    : null;
  const activeImages: ExperienceGalleryItem[] = activeExp
    ? normalizeGallery(activeExp.gallery)
    : [];

  const closeLightbox = () => setLightbox(null);

  // Esc menutup lightbox + lock scroll body
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <section id="experience" className="py-24 bg-white">
      <div className="mx-auto max-w-[900px] px-6">
        <SectionHeading title="Work Experience" />

        <div className="space-y-4">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              defaultOpen={index === 0}
              index={index}
              onOpenGallery={(cardId, imgIndex) =>
                setLightbox({ cardId, index: imgIndex })
              }
            />
          ))}
        </div>
      </div>

      {/* Lightbox galeri */}
      <AnimatePresence>
        {lightbox && activeExp && activeImages[lightbox.index] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-dark-blue/90 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`Galeri ${activeExp.organization}`}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2.5 text-white hover:text-accent-orange transition-colors z-10"
              aria-label="Tutup"
            >
              <X size={28} weight="bold" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImages[lightbox.index].src}
                alt={
                  activeImages[lightbox.index].caption ??
                  `Foto ${activeExp.organization}`
                }
                fill
                className="object-contain rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </motion.div>

            {activeImages[lightbox.index].caption && (
              <div className="absolute bottom-8 left-0 right-0 text-center text-white text-sm px-4">
                {activeImages[lightbox.index].caption}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
