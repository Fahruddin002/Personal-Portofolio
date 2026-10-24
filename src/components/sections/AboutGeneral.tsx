"use client";

import { Fragment, ReactNode } from "react";
import { motion } from "framer-motion";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { aboutParagraphs, socialLinks, profile } from "@/data/portfolio";
import { socialIconMap } from "@/components/ui/SocialIcons";
import CertificateMarquee from "@/components/sections/CertificateMarquee";

// Ubah teks dengan penanda **kata** menjadi <strong>
function renderRichText(text: string): ReactNode[] {
  return text.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-bold">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export default function AboutGeneral() {
  const linkedin = socialLinks.find((s) => s.name === "LinkedIn");
  const github = socialLinks.find((s) => s.name === "GitHub");
  const instagram = socialLinks.find((s) => s.name === "Instagram");

  const socials: { label: string; href: string; icon: ReactNode }[] = [
    {
      label: "LinkedIn",
      href: linkedin?.href ?? "",
      icon: socialIconMap["LinkedIn"],
    },
    {
      label: "Email",
      href: `mailto:${profile.email}`,
      icon: <EnvelopeSimple size={20} weight="bold" />,
    },
    {
      label: "GitHub",
      href: github?.href ?? "",
      icon: socialIconMap["GitHub"],
    },
    {
      label: "Instagram",
      href: instagram?.href ?? "",
      icon: socialIconMap["Instagram"],
    },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      {/* Grid dua kolom: minmax(0,1fr) biar kolom tidak melebar karena track marquee */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-10 lg:gap-14">
        {/* Kolom kiri: teks perkenalan */}
        <div className="min-w-0 text-left text-text-primary">
          <div className="space-y-5 text-base lg:text-lg leading-[1.55]">
            {aboutParagraphs.map((paragraph, i) => (
              <p key={i}>{renderRichText(paragraph)}</p>
            ))}
          </div>
        </div>

        {/* Kolom kanan: sertifikat + ikon sosial */}
        <div className="relative min-w-0 overflow-hidden">
          <CertificateMarquee />

          <div className="mt-8 flex items-center justify-center gap-3">
            {socials.map((s, index) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                whileHover={{ scale: 1.15, y: -3, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.08 }}
                className="p-3 bg-primary-blue/10 backdrop-blur-sm rounded-xl text-primary-blue hover:bg-accent-orange hover:text-white transition-colors duration-300 border border-primary-blue/20"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}