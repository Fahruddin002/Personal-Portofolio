"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";

/**
 * Menu navigasi — urutan wajib.
 * Item disimpan di array (label, href); Get In Touch = item terakhir yang
 * dirender sebagai tombol CTA terpisah.
 */
const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Project", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Get In Touch", href: "#contact" },
] as const;

type NavItem = (typeof NAV_ITEMS)[number];

const MENU_ITEMS = NAV_ITEMS.slice(0, -1);
const CTA_ITEM = NAV_ITEMS[NAV_ITEMS.length - 1];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const headerRef = useRef<HTMLElement>(null);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const elements = NAV_ITEMS.map((item) =>
      document.getElementById(item.href.slice(1)),
    ).filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Solid saat discroll > 20px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll saat mobile menu terbuka
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Tutup panel saat klik di luar / Esc
  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  // Scroll halus + update hash tanpa lompat
  const scrollToSection = (href: string) => {
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
    history.replaceState(null, "", href);
    setIsOpen(false);
  };

  const activeHref = `#${activeSection}`;
  const isCtaActive = activeHref === CTA_ITEM.href;

  // Style shell bar — scrolled > 20px jadi lebih pekat
  const shellBg = scrolled
    ? "rgba(255,255,255,0.96)"
    : "rgba(255,255,255,0.88)";
  const shellShadow = scrolled
    ? "0 10px 32px rgba(0,51,78,0.18)"
    : "0 8px 28px rgba(0,51,78,0.12)";

  return (
    <header
      ref={headerRef}
      className="fixed top-4 left-0 right-0 z-40 flex justify-center max-md:justify-end max-md:px-4 pointer-events-none"
    >
      <nav
        aria-label="Navigasi utama"
        className="pointer-events-auto flex items-center rounded-full border px-1.5 py-1.5 transition-all duration-300"
        style={{
          background: shellBg,
          borderColor: "rgba(20,83,116,0.18)",
          boxShadow: shellShadow,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Item desktop */}
        <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
          {MENU_ITEMS.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <li key={item.label} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="pointer-events-none absolute inset-0 rounded-full border"
                    style={{
                      borderColor: "rgba(20,83,116,0.30)",
                      background: "rgba(20,83,116,0.06)",
                    }}
                  />
                )}
                <Link
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block rounded-full px-[18px] py-[10px] text-[15px] transition-[background,color] duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 ${
                    isActive
                      ? "font-bold text-primary-blue"
                      : "font-medium text-[#111827] hover:text-primary-blue hover:bg-[rgba(20,83,116,0.06)]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA Get In Touch — desktop */}
        <Link
          href={CTA_ITEM.href}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(CTA_ITEM.href);
          }}
          aria-current={isCtaActive ? "true" : undefined}
          className={`group relative ml-8 hidden md:inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[15px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 ${
            isCtaActive
              ? "ring-2 ring-white outline outline-2 outline-primary-blue"
              : ""
          }`}
          style={{
            background: "linear-gradient(180deg, #EE6F57 0%, #E0583F 100%)",
            boxShadow: isCtaActive
              ? "0 6px 18px rgba(238,111,87,0.55)"
              : "0 6px 18px rgba(238,111,87,0.45)",
          }}
        >
          {/* Pulse ring */}
          <span
            aria-hidden="true"
            className="nav-pulse pointer-events-none absolute inset-0 rounded-full"
            style={{
              borderRadius: "9999px",
              boxShadow: "0 0 0 0 rgba(238,111,87,0.5)",
            }}
          />
          <span className="relative">{CTA_ITEM.label}</span>
          <ArrowUpRight
            size={16}
            weight="bold"
            className="relative transition-transform duration-200 group-hover:translate-x-[3px]"
          />
        </Link>

        {/* Mobile: hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="md:hidden ml-1 flex h-10 w-10 items-center justify-center rounded-full text-[#111827] transition-colors duration-200 hover:bg-[rgba(20,83,116,0.06)] focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} weight="bold" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <List size={20} weight="bold" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Panel mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto absolute top-full mt-3 w-[min(90vw,320px)] rounded-[20px] border bg-white p-2"
            style={{
              borderColor: "rgba(20,83,116,0.18)",
              boxShadow: "0 12px 36px rgba(0,51,78,0.16)",
            }}
          >
            <ul className="list-none m-0 p-0">
              {MENU_ITEMS.map((item) => {
                const isActive = activeHref === item.href;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex h-11 items-center rounded-xl px-4 text-[15px] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-blue ${
                        isActive
                          ? "bg-[rgba(20,83,116,0.06)] font-bold text-primary-blue"
                          : "font-medium text-[#111827] hover:bg-[rgba(20,83,116,0.06)] hover:text-primary-blue"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href={CTA_ITEM.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(CTA_ITEM.href);
              }}
              className="mt-2 flex h-11 w-full items-center justify-center gap-1.5 rounded-xl text-[15px] font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-blue"
              style={{
                background: "linear-gradient(180deg, #EE6F57 0%, #E0583F 100%)",
              }}
            >
              {CTA_ITEM.label}
              <ArrowUpRight size={16} weight="bold" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
