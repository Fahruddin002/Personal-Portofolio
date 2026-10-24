"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  CaretLeft,
  CaretRight,
  Certificate,
} from "@phosphor-icons/react";
import { aboutCertificates, AboutCertificate } from "@/data/portfolio";

// Satu sertifikat bisa punya beberapa gambar (images[]) — fallback ke image utama
const getImages = (cert: AboutCertificate): string[] =>
  cert.images && cert.images.length > 0 ? cert.images : [cert.image];

interface MarqueeRowProps {
  items: AboutCertificate[];
  reverse: boolean;
  duration: string;
  onOpen: (cert: AboutCertificate) => void;
}

function MarqueeRow({ items, reverse, duration, onOpen }: MarqueeRowProps) {
  return (
    <div className="marquee">
      <div
        className={`marquee-track${reverse ? " marquee-track--reverse" : ""}`}
        style={{ animationDuration: duration }}
      >
        <div className="marquee-group">
          {items.map((cert) => (
            <CertificateCard key={cert.title} cert={cert} onOpen={onOpen} />
          ))}
        </div>
        {/* Duplikat kelompok untuk looping seamless -50% */}
        <div className="marquee-group" aria-hidden="true">
          {items.map((cert) => (
            <CertificateCard
              key={`dup-${cert.title}`}
              cert={cert}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CertImage({
  src,
  alt,
  eager,
}: {
  src: string;
  alt: string;
  eager: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Fallback hanya muncul lewat onError (gambar 404 / belum ada file)
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f1f5f9] to-[#e2e8f0]">
        <Certificate size={28} weight="duotone" className="text-[#94a3b8]" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className="w-full h-full object-cover"
    />
  );
}

function CertificateCard({
  cert,
  onOpen,
}: {
  cert: AboutCertificate;
  onOpen: (cert: AboutCertificate) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(cert)}
      aria-label={`Buka sertifikat ${cert.title}`}
      className="group w-[130px] sm:w-[150px] flex-shrink-0 rounded-xl bg-white border border-[#e5e7eb] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden text-left transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#145374] focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[16/10] w-full bg-[#f3f4f6] border-b border-[#e5e7eb] overflow-hidden">
        <CertImage src={getImages(cert)[0]} alt={cert.title} eager={false} />
      </div>
      <div className="p-2.5">
        <p className="text-[13px] font-semibold text-gray-900 truncate">
          {cert.title}
        </p>
        <p className="mt-0.5 text-[11px] text-[#6b7280] truncate">{cert.issuer}</p>
      </div>
    </button>
  );
}

function Lightbox({
  cert,
  onClose,
}: {
  cert: AboutCertificate | null;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const images = cert ? getImages(cert) : [];

  // Reset ke gambar pertama tiap sertifikat dibuka
  useEffect(() => {
    setIndex(0);
  }, [cert]);

  useEffect(() => {
    if (!cert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight")
        setIndex((i) => Math.min(i + 1, images.length - 1));
      else if (e.key === "ArrowLeft")
        setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cert, images.length, onClose]);

  const hasMany = images.length > 1;

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-dark-blue/85 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 text-white hover:bg-accent-orange transition-colors"
          >
            <X size={26} weight="bold" />
          </button>

          {hasMany && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex((i) => Math.max(i - 1, 0));
                }}
                aria-label="Sebelumnya"
                className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-accent-orange transition-colors"
              >
                <CaretLeft size={24} weight="bold" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex((i) => Math.min(i + 1, images.length - 1));
                }}
                aria-label="Berikutnya"
                className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-accent-orange transition-colors"
              >
                <CaretRight size={24} weight="bold" />
              </button>
            </>
          )}

          <motion.div
            onClick={(e) => e.stopPropagation()}
            key={index}
            initial={{ opacity: 0, scale: 0.96, x: 0 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="relative aspect-[16/10] w-full bg-[#f3f4f6]">
              <CertImage src={images[index]} alt={cert.title} eager />
            </div>
            <div className="px-5 py-4 border-t border-gray-100">
              <p className="text-sm font-bold text-gray-900">{cert.title}</p>
              <p className="mt-0.5 text-xs text-text-secondary">{cert.issuer}</p>
              {hasMany && (
                <p className="mt-1.5 text-[11px] font-medium text-[#6b7280]">
                  {index + 1} / {images.length}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function CertificateMarquee() {
  const [open, setOpen] = useState<AboutCertificate | null>(null);

  const mid = Math.ceil(aboutCertificates.length / 2);
  const rowTop = aboutCertificates.slice(0, mid);
  const rowBottom = [...aboutCertificates.slice(mid)].reverse();

  return (
    <div>
      <p className="mb-5 text-center text-[13px] font-bold uppercase tracking-[0.12em] text-gray-900">
        Certificates
      </p>

      <div className="flex flex-col gap-4">
        <MarqueeRow
          items={rowTop}
          reverse={false}
          duration="52s"
          onOpen={setOpen}
        />
        <MarqueeRow
          items={rowBottom}
          reverse
          duration="46s"
          onOpen={setOpen}
        />
      </div>

      <Lightbox cert={open} onClose={() => setOpen(null)} />
    </div>
  );
}