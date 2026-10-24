"use client";

import { useEffect, useMemo, useState } from "react";
import { techCategories, TechItem } from "@/data/portfolio";

function TechLogo({ item, active }: { item: TechItem; active: boolean }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <div className="tech-logo-wrap">
      <img
        src={item.logo}
        alt={item.name}
        width={72}
        height={72}
        loading="lazy"
        className={`tech-logo${active ? " is-active" : ""}`}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function TechMarqueeRow({
  items,
  reverse,
  activeNames,
}: {
  items: TechItem[];
  reverse: boolean;
  activeNames: string[];
}) {
  return (
    <div className="tech-marquee">
      <div
        className={`tech-marquee-track${
          reverse ? " tech-marquee-track--reverse" : ""
        }`}
      >
        <div className="tech-marquee-group">
          {items.map((item) => (
            <TechLogo
              key={item.name}
              item={item}
              active={activeNames.includes(item.name)}
            />
          ))}
        </div>
        {/* Duplikat untuk looping seamless */}
        <div className="tech-marquee-group" aria-hidden="true">
          {items.map((item) => (
            <TechLogo key={`dup-${item.name}`} item={item} active={false} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TechStack() {
  const allItems = useMemo(
    () => techCategories.flatMap((cat) => cat.items),
    [],
  );

  // Dua kelompok untuk dua baris (baris bawah dibalik urutannya)
  const mid = Math.ceil(allItems.length / 2);
  const rowTop = allItems.slice(0, mid);
  const rowBottom = [...allItems.slice(mid)].reverse();

  // Auto-highlight: tiap ±2.4s, 2-3 logo acak "menyala" lalu pudar kembali.
  // Tetap jalan walau reduced-motion aktif (hanya perubahan warna, bukan gerak).
  const [activeNames, setActiveNames] = useState<string[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      const count = 2 + Math.floor(Math.random() * 2); // 2-3
      const pool = [...allItems].sort(() => Math.random() - 0.5);
      setActiveNames(pool.slice(0, count).map((i) => i.name));
    }, 2400);
    return () => clearInterval(id);
  }, [allItems]);

  return (
    <section id="skills" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judul — gaya sama dengan SectionHeading "About Me" */}
        <div className="text-center mb-14 lg:mb-16">
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-blue tracking-tight">
              Tech Stacks
            </h2>
            <div className="h-1 rounded-full bg-accent-orange mt-5 mx-auto w-16" />
          </div>
        </div>

        {/* Dua baris marquee logo */}
        <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
          <TechMarqueeRow items={rowTop} reverse={false} activeNames={activeNames} />
          <TechMarqueeRow items={rowBottom} reverse activeNames={activeNames} />
        </div>
      </div>
    </section>
  );
}