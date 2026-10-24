"use client";

import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import { ArrowRight, DownloadSimple } from "@phosphor-icons/react";
import Image from "next/image";
import { profile, socialLinks } from "@/data/portfolio";
import { socialIconMap } from "@/components/ui/SocialIcons";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center overflow-hidden bg-gradient-to-br from-dark-blue via-primary-blue to-dark-blue">
      {/* Grid overlay halus */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Blob dekoratif */}
      <motion.div
        animate={{ x: [0, 24, 0], y: [0, -18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-80 h-80 bg-accent-orange/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -28, 0], y: [0, 24, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -right-32 w-[28rem] h-[28rem] bg-white/[0.07] rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Kiri: konten — order 3 di mobile (setelah foto & medsos) */}
          <div className="order-3 lg:order-1 lg:col-span-7 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-normal leading-[1.15]"
            >
              <span className="block">Halo, saya</span>
              <span className="block mt-3 sm:mt-4 text-accent-orange">
                {profile.name}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed lg:mx-0 mx-auto"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-9 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="#projects">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent-orange text-white font-semibold rounded-full hover:bg-orange-600 transition-colors shadow-lg shadow-accent-orange/25"
                >
                  Lihat Karya
                  <ArrowRight size={18} weight="bold" />
                </motion.span>
              </Link>
              <Link href={profile.cvUrl} download>
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white hover:text-dark-blue transition-colors"
                >
                  <DownloadSimple size={18} weight="bold" />
                  Unduh CV
                </motion.span>
              </Link>
            </motion.div>

            </div>

          {/* Medsos — order 2 di mobile (langsung di bawah foto), kolom kiri bawah desktop */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="order-2 lg:order-3 lg:col-span-7 flex gap-3 justify-center lg:justify-start"
          >
            {socialLinks.map((social, index) => {
              const Icon = socialIconMap[social.name];
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 + 0.5 }}
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-accent-orange transition-colors duration-300 border border-white/10"
                  aria-label={social.name}
                >
                  {Icon}
                </motion.a>
              );
            })}
          </motion.div>

          {/* Kanan: foto profil — order 1 di mobile (paling atas), kanan desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Ring teks berputar — animasi dekoratif, selalu berputar */}
              <MotionConfig reducedMotion="never">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-6"
                aria-hidden="true"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <path
                      id="hero-text-ring"
                      d="M 100,100 m -88,0 a 88,88 0 1,1 176,0 a 88,88 0 1,1 -176,0"
                      fill="none"
                    />
                  </defs>
                  <text
                    fill="rgba(255,255,255,0.85)"
                    fontSize="8"
                    fontWeight="600"
                    letterSpacing="4.5"
                    style={{ fontFamily: "inherit" }}
                  >
                    <textPath href="#hero-text-ring" textLength="535">
                      Available for Work * Available for Collaboration *
                    </textPath>
                  </text>
                </svg>
              </motion.div>
              </MotionConfig>

              {/* Glow di belakang foto */}
              <div className="absolute inset-0 rounded-full bg-accent-orange/20 blur-2xl scale-110" />

              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shadow-dark-blue/50"
              >
                <Image
                  src={profile.photo}
                  alt={`Foto ${profile.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 320px, 320px"
                  priority
                />
              </motion.div>

              {/* Badge mengambang */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-2 -left-2 sm:left-0 px-4 py-2.5 bg-white rounded-2xl shadow-xl flex items-center gap-2.5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-blue/10">
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="text-primary-blue -rotate-45"
                  />
                </span>
                <div>
                  <p className="text-xs text-text-secondary leading-tight">
                    Role
                  </p>
                  <p className="text-sm font-bold text-dark-blue leading-tight">
                    Machine Learning &amp; Computer Vision
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-gray-300"
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-5 h-9 border-2 border-gray-400/60 rounded-full flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
