// URL publik situs. Set NEXT_PUBLIC_SITE_URL di Vercel saat domain berubah.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://portofolio-faruk.vercel.app"
).replace(/\/$/, "");
