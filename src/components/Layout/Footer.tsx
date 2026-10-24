"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp } from "@phosphor-icons/react";
import { profile, socialLinks } from "@/data/portfolio";
import { socialIconMap } from "@/components/ui/SocialIcons";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Project", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-dark-blue text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <h3 className="text-2xl font-black tracking-tight">
              FA<span className="text-accent-orange">.</span>
            </h3>
            <p className="mt-3 text-gray-300 text-sm leading-relaxed max-w-sm">
              {profile.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.06 }}
                  className="p-2.5 bg-white/10 rounded-xl hover:bg-accent-orange transition-colors duration-300"
                  aria-label={social.name}
                >
                  {socialIconMap[social.name]}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3"
          >
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent-orange transition-colors text-sm inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-4"
          >
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-gray-300 hover:text-accent-orange transition-colors text-sm break-all"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://${profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-accent-orange transition-colors text-sm"
                >
                  {profile.linkedin}
                </a>
              </li>
              <li className="text-gray-400 text-sm">{profile.location}</li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} {profile.name}.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08, y: -2, transition: { type: "spring", stiffness: 300, damping: 22 } }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 rounded-full text-sm font-medium hover:bg-accent-orange transition-colors duration-300"
            aria-label="Kembali ke atas"
          >
            <ArrowUp
              size={16}
              weight="bold"
              className="group-hover:-translate-y-0.5 transition-transform"
            />
            Kembali ke Atas
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
