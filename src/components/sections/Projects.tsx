"use client";

import { useState, useEffect, useCallback, useRef, type TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  GithubLogo,
  X,
  FolderOpen,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import Image from "next/image";
import { projects, Project } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

// Satu proyek bisa punya beberapa gambar (images[]) — fallback ke gambar utama
const getImages = (project: Project): string[] =>
  project.images && project.images.length > 0 ? project.images : [project.image];

export default function Projects() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Jumlah kartu yang tampil default (tetap seperti sekarang: 6)
  const VISIBLE_COUNT = 6;
  const [showAll, setShowAll] = useState(false);

  const selectedProject = projects.find((p) => p.id === selectedId) ?? null;

  const visibleProjects = showAll ? projects : projects.slice(0, VISIBLE_COUNT);

  // Reset galeri ke gambar pertama tiap proyek dibuka
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    setImageIndex(0);
  }, [selectedProject?.id]);

  const modalImages = selectedProject ? getImages(selectedProject) : [];
  const hasManyImages = modalImages.length > 1;

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Tunggu animasi exit selesai sebelum menghapus konten
    setTimeout(() => setSelectedId(null), 150);
  }, []);

  const openModal = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  // Swipe horizontal untuk galeri di layar sentuh
  const touchStartX = useRef<number | null>(null);
  const onGalleryTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onGalleryTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || !hasManyImages) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      setImageIndex((i) =>
        delta < 0
          ? Math.min(i + 1, modalImages.length - 1)
          : Math.max(i - 1, 0),
      );
    }
    touchStartX.current = null;
  };

  // Lock body scroll saat modal terbuka
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Escape untuk menutup modal, panah untuk galeri
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) closeModal();
      else if (isModalOpen && hasManyImages) {
        if (e.key === "ArrowRight")
          setImageIndex((i) => Math.min(i + 1, modalImages.length - 1));
        else if (e.key === "ArrowLeft")
          setImageIndex((i) => Math.max(i - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isModalOpen, closeModal, hasManyImages, modalImages.length]);

  return (
    <section id="projects" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Project" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{
                duration: 0.75,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
              onClick={() => openModal(project.id)}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-dark-blue/10 transition-shadow duration-300 cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openModal(project.id);
                }
              }}
              aria-label={`Lihat detail proyek ${project.title}`}
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] overflow-hidden bg-dark-blue">
                <Image
                  src={getImages(project)[0]}
                  alt={`Thumbnail ${project.title}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/80 via-dark-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category badge — solid biar terbaca di gambar apa pun */}
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white bg-dark-blue/90 backdrop-blur-md border border-white/15 rounded-full shadow-md">
                  {project.category}
                </span>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-dark-blue text-sm font-semibold rounded-full shadow-lg">
                    <FolderOpen size={16} weight="bold" />
                    Lihat Detail
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-dark-blue mb-2 group-hover:text-primary-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-medium text-primary-blue bg-primary-blue/10 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2.5 py-1 text-xs font-medium text-text-secondary bg-gray-100 rounded-md">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Toggle jumlah proyek */}
        {projects.length > VISIBLE_COUNT && (
          <div className="mt-12 flex justify-center">
            <motion.button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 border-2 border-dark-blue/20 text-dark-blue font-semibold rounded-full hover:bg-dark-blue hover:text-white transition-colors"
            >
              {showAll ? "Tampilkan Lebih Sedikit" : "Lihat Semua Proyek"}
              {showAll ? (
                <ArrowUpRight size={18} weight="bold" className="-rotate-90" />
              ) : (
                <ArrowUpRight size={18} weight="bold" className="rotate-45" />
              )}
            </motion.button>
          </div>
        )}
      </div>

      {/* Modal detail proyek */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-dark-blue/80 backdrop-blur-sm p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.title}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[1000px] max-h-[calc(100dvh-48px)] flex flex-col bg-white rounded-3xl shadow-2xl"
            >
              {/* Close button — offset keluar pojok biar gampang diklik */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute -top-3 -right-3 z-20 p-2.5 rounded-full bg-white text-dark-blue shadow-lg hover:bg-accent-orange hover:text-white transition-colors"
                aria-label="Tutup detail proyek"
              >
                <X size={20} weight="bold" />
              </button>

              {/* Galeri gambar — contain, gambar utuh di bg netral */}
              <div
                className="relative flex-shrink-0 overflow-hidden rounded-t-3xl bg-gray-100"
                onTouchStart={onGalleryTouchStart}
                onTouchEnd={onGalleryTouchEnd}
              >
                {/* Padding horizontal 56px biar panah nggak nutupin gambar */}
                <div className="relative h-[40vh] sm:h-[60vh] px-14">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={imageIndex}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={modalImages[imageIndex]}
                        alt={selectedProject.title}
                        fill
                        draggable={false}
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 1000px"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Badge kategori — pill putih semi-transparan */}
                <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 px-3 py-1 text-xs font-semibold text-dark-blue bg-white/90 backdrop-blur-[6px] border border-white/50 rounded-full shadow-sm">
                  {selectedProject.category}
                </span>

                {hasManyImages && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setImageIndex((i) => Math.max(i - 1, 0))
                      }
                      aria-label="Gambar sebelumnya"
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/80 text-dark-blue shadow-md hover:bg-accent-orange hover:text-white transition-colors"
                    >
                      <CaretLeft size={20} weight="bold" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setImageIndex((i) =>
                          Math.min(i + 1, modalImages.length - 1),
                        )
                      }
                      aria-label="Gambar berikutnya"
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/80 text-dark-blue shadow-md hover:bg-accent-orange hover:text-white transition-colors"
                    >
                      <CaretRight size={20} weight="bold" />
                    </button>
                    <span className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 px-2.5 py-1 text-xs font-semibold text-dark-blue bg-white/90 backdrop-blur-[6px] border border-white/50 rounded-full shadow-sm">
                      {imageIndex + 1} / {modalImages.length}
                    </span>
                  </>
                )}
              </div>

              {/* Content — scroll tipis, gutter stabil supaya layout nggak loncat */}
              <div className="flex-1 min-h-0 overflow-y-auto rounded-b-3xl p-6 sm:p-8 [scrollbar-width:thin] [scrollbar-gutter:stable] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
                <h3 className="text-2xl font-bold text-dark-blue mb-4">
                  {selectedProject.title}
                </h3>

                <p className="text-text-secondary leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {/* Highlights */}
                {selectedProject.highlights.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-dark-blue uppercase tracking-wider mb-3">
                      Poin Utama
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedProject.highlights.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-orange flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech stack */}
                <div>
                  <h4 className="text-sm font-bold text-dark-blue uppercase tracking-wider mb-3">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium text-primary-blue bg-primary-blue/10 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
                  {selectedProject.githubUrl ? (
                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-dark-blue text-white text-sm font-semibold rounded-full hover:bg-primary-blue transition-colors"
                    >
                      <GithubLogo size={18} weight="bold" />
                      Lihat di GitHub
                    </motion.a>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-text-secondary text-sm font-semibold rounded-full">
                      <GithubLogo size={18} weight="bold" />
                      Link GitHub menyusul
                    </span>
                  )}

                  {selectedProject.liveUrl && (
                    <motion.a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-orange text-white text-sm font-semibold rounded-full hover:bg-orange-600 transition-colors"
                    >
                      <ArrowUpRight size={18} weight="bold" />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}