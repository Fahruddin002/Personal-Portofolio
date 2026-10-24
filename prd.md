# Product Requirements Document (PRD)

## Personal Portfolio Website

---

## 1. Project Overview

### 1.1 Objective

Membangun website portofolio pribadi yang responsif, satu bahasa Indonesia, dengan tampilan modern sesuai referensi yang diberikan.

### 1.2 Tech Stack

- **Next.js**
- **Tailwind CSS** untuk styling
- **React Router DOM** untuk routing (built-in di Next.js via file-based routing)
- **Framer Motion** untuk animasi
- **Nodemailer** untuk contact form (built-in API routes)

---

## 2. Color Palette (Light Mode Only)

| Warna          | Kode    | RGB                | Penggunaan            |
| -------------- | ------- | ------------------ | --------------------- |
| Background     | #FFFFFF | rgb(255, 255, 255) | Background utama      |
| Primary Blue   | #145374 | rgb(20, 83, 116)   | Aksen, tombol utama   |
| Dark Blue      | #00334E | rgb(0, 51, 78)     | Navbar, section bg    |
| Accent Orange  | #EE6F57 | rgb(238, 111, 87)  | CTA button, highlight |
| Text Primary   | #111827 | rgb(17, 24, 39)    | Text utama            |
| Text Secondary | #6B7280 | rgb(107, 114, 128) | Text sekunder         |

---

## 3. Struktur Komponen & Halaman

### 3.1 Loading Screen

**Referensi**: https://faliq-portfolio.vercel.app/

- Animated loading dengan nama/logo
- Progress indicator ring
- Smooth transition ke halaman berikutnya
- Duration: 1.5-2 detik

### 3.2 Navbar

**Referensi**: https://lamzdev.com/

**Fitur**:

- Fixed position (sticky)
- Transparent background → gelap pada scroll
- Navigation items:
  - Beranda (Home)
  - Tentang (About)
  - Portofolio
  - Kontak (Contact)
- Mobile: hamburger menu dengan animation
- Hover animation pada link

### 3.3 Hero Section (Beranda)

**Referensi**: https://lamzdev.com/

**Komponen**:

- Nama / Title besar dengan animasi
- Sub-title / tagline
- CTA button primary (View Work)
- Social media icons
- Background gradient (dark blue → primary blue)
- Scroll-down indicator

### 3.4 About Section

**Referensi**: https://faliq-portfolio.vercel.app/

**Sub-sections**:

1. **General**
   - Photo profil circular
   - Deskripsi diri singkat (2-3 paragraf)
   - Skills list dengan proficiency bar
   - Download CV button

2. **Education**
   - Timeline card untuk tiap pendidikan
   - Title, institusi, tanggal, deskripsi singkat
   - Icon calendar/timeline

3. **Gallery**
   - Grid foto aktivitas/hobi (3 kolom desktop, 1 mobile)
   - Lightbox effect pada klik
   - Navigation arrow

### 3.5 Portfolio Section

**Referensi**: https://ekawahyu-portofolio.vercel.app/

**Sub-sections**:

1. **Projects**
   - Grid project (2 kolom mobile, 3 desktop)
   - Thumbnail gambar dengan hover overlay
   - Judul, deskripsi singkat
   - Tech stack icons
   - Link ke GitHub / Live demo

2. **Certificates**
   - Card dengan nama sertifikat
   - Institution, tanggal, badge verifikasi
   - QR code atau link verifikasi

3. **Tech Stack**
   - Icons teknologi dengan animation
   - Grouped by category (Frontend, Backend, Tools, etc.)

### 3.6 Contact Section

**Referensi**: https://lamzdev.com/

**Komponen**:

- Form kontak (nama, email, pesan)
- Validasi form
- Email / LinkedIn / GitHub links
- Social media icons grid
- Map integration (opsional - Google Maps embed)

### 3.7 Footer

**Referensi**: https://portofolio-davin-eta.vercel.app/

**Elemen**:

- Copyright text (dinamis tahun)
- Social media links
- Quick navigation links
- Back to top button

---

## 4. Responsivitas & Breakpoints

| Breakpoint             | Devices       | Layout                        |
| ---------------------- | ------------- | ----------------------------- |
| Mobile (<640px)        | Smartphone    | Single column, hamburger menu |
| Tablet (640px-768px)   | Tablet        | 2 column grid                 |
| Desktop (768px-1024px) | Laptop small  | 3 column grid                 |
| XL (>1024px)           | Desktop large | Full layout                   |

---

## 5. Animasi & Transisi

- Fade in pada section saat scroll (Intersection Observer)
- Slide up effect dengan stagger
- Hover animations pada buttons/cards (scale, color)
- Smooth page transitions dengan Framer Motion

---

## 6. SEO & Performansi

- Meta tags optimization (title, description, og tags)
- Open Graph tags untuk social sharing
- Sitemap.xml (otomatis by Next.js)
- robots.txt
- Image optimization (next/image)
- Built-in code splitting Next.js
- Font optimization (.next/font)

---

## 7. Daftar File yang Akan Dibuat

```
/portofolio-faruk
├── next.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── .env.local
├── public/
│   ├── favicon.ico
│   ├── profile.jpg
│   └── images/
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx (Home)
    │   ├── about/
    │   │   └── page.tsx
    │   ├── portfolio/
    │   │   └── page.tsx
    │   ├── contact/
    │   │   └── page.tsx
    │   └── api/
    │       └── contact/
    │           └── route.ts
    ├── components/
    │   ├── ui/
    │   │   ├── Button.tsx
    │   │   └── Card.tsx
    │   ├── Layout/
    │   │   └── Navbar.tsx
    │   ├── sections/
    │   │   ├── Hero.tsx
    │   │   ├── General.tsx
    │   │   ├── Education.tsx
    │   │   ├── Gallery.tsx
    │   │   ├── Projects.tsx
    │   │   ├── Certificates.tsx
    │   │   └── ContactForm.tsx
    │   └── LoadingScreen.tsx
    └── lib/
        └── email.ts (nodemailer config)
```

---

## 8. API Contact (Built-in Next.js)

### Endpoint

```
POST /api/contact
```

### Request Body

```json
{
  "name": "Nama Pengguna",
  "email": "email@example.com",
  "message": "Pesan yang dikirim"
}
```

### Response

```json
{
  "success": true
}
```

---

## 9. Environment Variables

```env
# .env.local
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=your_email@gmail.com
```

---

_Dokumen dibuat: 30 September 2026_
_Versi: 1.3 (updated: Next.js + API Routes + Contact Form)_
