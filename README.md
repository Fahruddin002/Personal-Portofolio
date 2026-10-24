# Portofolio Fahruddin A. Lebe

Website portofolio pribadi — responsif, bahasa Indonesia, light mode.

## Tech Stack

- **Next.js 15** (App Router, file-based routing)
- **Tailwind CSS** — styling
- **Framer Motion** — animasi
- **Nodemailer** — contact form via API route
- **TypeScript**

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Konfigurasi Email

Edit `.env.local`:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=your_email@gmail.com
NEXT_PUBLIC_SITE_URL=https://portofolio-faruk.vercel.app
```

Gunakan [Google App Password](https://myaccount.google.com/apppasswords), bukan password biasa.

Saat deploy ke Vercel, tambahkan keempat variabel di atas pada
**Project → Settings → Environment Variables** (Production dan Preview),
lalu redeploy. `.env.local` tidak ikut ter-upload karena sudah di-gitignore.

## Struktur

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata SEO
│   ├── page.tsx            # Beranda (semua section)
│   ├── about/page.tsx      # Tentang
│   ├── portfolio/page.tsx  # Portofolio
│   ├── contact/page.tsx    # Kontak
│   ├── sitemap.ts          # Sitemap otomatis
│   └── api/contact/route.ts
├── components/
│   ├── Layout/             # Navbar, Footer, ClientShell
│   ├── sections/           # Hero, About, Projects, Certificates, TechStack, ContactForm
│   ├── ui/                 # SectionHeading, SocialIcons, TechIcon
│   └── LoadingScreen.tsx   # Circular progress ring
├── data/portfolio.ts       # SEMUA KONTEN (profil, proyek, sertifikat, pendidikan, skills, tech)
└── lib/email.ts            # Nodemailer config
```

## Customisasi Konten

Semua konten ada di **`src/data/portfolio.ts`**:

- `profile` — nama, role, tagline, email, lokasi, social links, CV, foto
- `projects` — daftar proyek (dengan kategori)
- `certificates` — daftar sertifikat (dengan credential ID)
- `education` — riwayat pendidikan
- `skills` — keahlian + proficiency bar
- `techCategories` — teknologi dikelompokkan per kategori
- `galleryImages` — foto galeri
- `socialLinks` — link media sosial

## Aset

Ganti file placeholder di `public/`:

- `public/profile.svg` → foto profil (`profile.jpg` juga didukung)
- `public/images/gallery/*.svg` → foto galeri
- `public/images/projects/*.svg` → thumbnail proyek
- `public/favicon.svg` → favicon
- Tambahkan `public/cv.pdf` untuk tombol Unduh CV

## API

```
POST /api/contact
Content-Type: application/json

{ "name": "...", "email": "...", "message": "..." }
```

Response: `{ "success": true }`
