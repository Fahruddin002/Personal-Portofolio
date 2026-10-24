import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
// @ts-ignore Next.js processes global CSS imports at build time.
import "./globals.css";
import { ReactNode } from "react";
import ClientShell from "@/components/Layout/ClientShell";
import { siteUrl } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Fahruddin A. Lebe — Portofolio",
  description:
    "Portofolio pribadi Fahruddin A. Lebe, Machine Learning Engineer. Lihat proyek, sertifikat, dan hubungi saya untuk kolaborasi.",
  keywords: [
    "portofolio",
    "fahruddin",
    "machine learning engineer",
    "machine learning",
    "data science",
    "computer vision",
    "ai engineer",
    "react",
    "next.js",
    "indonesia",
  ],
  authors: [{ name: "Fahruddin A. Lebe" }],
  creator: "Fahruddin A. Lebe",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fahruddin A. Lebe — Portofolio",
    description:
      "Portofolio pribadi Fahruddin A. Lebe. Proyek, sertifikat, dan kontak untuk kolaborasi.",
    url: siteUrl,
    siteName: "Portofolio Fahruddin A. Lebe",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fahruddin A. Lebe — Portofolio",
    description: "Portofolio pribadi Fahruddin A. Lebe.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-background text-text-primary font-poppins overflow-x-hidden">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
