export interface Project {
  id: number;
  title: string;
  description: string;
  highlights: string[];
  image: string; // gambar utama (thumbnail kartu + fallback)
  images?: string[]; // opsional: beberapa gambar sekaligus (galeri di modal detail)
  techStack: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
}

export interface EducationItem {
  id: number;
  level: string; // SD/Primary school, SLTP/Junior high school, dst
  institution: string; // Nama sekolah
  location: string; // Kota
  major: string | null; // Fakultas/Jurusan
  gpa: string | null; // Nilai / IPK
  period: string; // Periode
  type: "education" | "experience";
}

export interface Skill {
  name: string;
  proficiency: number;
}

export interface TechItem {
  name: string;
  icon: string;
  logo: string; // path PNG lokal di /public/images/tech/
}

export interface TechCategory {
  name: string;
  items: TechItem[];
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Deteksi Penyakit Daun Tomat (ResNet-50)",
    description:
      "Sistem deteksi penyakit daun tomat berbasis Computer Vision dan Deep Learning menggunakan arsitektur ResNet-50 untuk membantu identifikasi penyakit berdasarkan citra daun tomat.",
    highlights: [
      "Mengolah dataset 5 kelas melalui preprocessing dan image augmentation.",
      "Menerapkan ResNet-50 transfer learning untuk klasifikasi citra.",
      "Mencapai akurasi 98,67% dan mengintegrasikan model dengan sistem rekomendasi berbasis JSON.",
    ],
    image: "/images/projects/Deteksi%20Penyakit%20Tomat-1a.png",
    images: [
      "/images/projects/Deteksi%20Penyakit%20Tomat-1a.png",
      "/images/projects/Deteksi%20Penyakit%20Tomat-1b.png",
      "/images/projects/Deteksi%20Penyakit%20Tomat-1c.png",
      "/images/projects/Deteksi%20Penyakit%20Tomat-1d.png",
    ],
    techStack: ["Python", "TensorFlow", "Deep Learning", "Computer Vision"],
    category: "Deep Learning",
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 2,
    title: "SIKELOR — Sistem Informasi Kebudayaan & Edukasi Rakyat",
    description:
      "Solusi Computer Vision berbasis AI untuk mengenali artefak budaya Sulawesi Tengah dan mengintegrasikannya ke dalam platform edukasi berbasis web.",
    highlights: [
      "Mengembangkan model YOLOv8 dan TensorFlow untuk deteksi artefak berbasis citra.",
      "Melakukan data preprocessing dan Missing Values Imputation.",
      "Mengintegrasikan model ML dengan web menggunakan React, Vite, Tailwind CSS, Node.js, Express, Flask, dan RESTful API.",
    ],
    image: "/images/projects/sikelor-1a.jpg",
    images: [
      "/images/projects/sikelor-1a.jpg",
      "/images/projects/sikelor-1b.jpg",
      "/images/projects/sikelor-1c.jpg",
    ],
    techStack: [
      "YOLOv8",
      "TensorFlow",
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Flask",
      "REST API",
    ],
    category: "AI & Web",
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 3,
    title: "Analisis Profit Superstore & Strategi Pertumbuhan",
    description:
      "Analisis data penjualan Global Superstore untuk mengidentifikasi faktor yang memengaruhi profitabilitas dan menghasilkan rekomendasi strategi berbasis data.",
    highlights: [
      "Menganalisis data menggunakan Spreadsheets, Google Colab, dan Power BI.",
      "Menghasilkan Profit Margin 11,61%, rata-rata diskon 14,29%, dan kontribusi profit segmen Consumer sebesar 51,62%.",
      "Mengembangkan dashboard interaktif dan rekomendasi strategi diskon, produk, inventori, retensi pelanggan, dan pasar.",
    ],
    image: "/images/projects/Analisis%20Profi-1a.jpg",
    images: [
      "/images/projects/Analisis%20Profi-1a.jpg",
      "/images/projects/Analisis%20Profi-1b.jpg",
    ],
    techStack: ["Google Colab", "Power BI", "Pandas", "NumPy", "Python"],
    category: "Data Analytics",
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 4,
    title: "Simulasi Jaringan Multi-Router dengan OSPF & VLAN",
    description:
    "Perancangan dan simulasi jaringan multi-router dengan segmentasi VLAN dan pengalamatan IP otomatis menggunakan Cisco Packet Tracer.",
    highlights: [
      "Mengonfigurasi routing dinamis OSPF pada topologi multi-router redundan untuk memastikan konektivitas antar-segmen jaringan.",
      "Mengimplementasikan VLAN, trunking, dan inter-VLAN routing untuk segmentasi dan komunikasi antar-VLAN.",
      "Mengonfigurasi DHCP untuk distribusi alamat IP otomatis, serta menguji konektivitas menggunakan ping dan simulasi PDU.",
    ],
    image: "/images/projects/Cisco-1a.png",
    techStack: ["Cisco Packet Tracer", "OSPF", "VLAN", "DHCP"],
    category: "Networking",
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 5,
    title: "Sistem Absensi dan Penilaian Kelas",
    description:
      "Website sederhana untuk membantu guru mengelola absensi dan penilaian siswa dalam satu sistem. Aplikasi ini dirancang untuk memudahkan pencatatan kehadiran, pengelolaan nilai tugas, UTS, dan UAS, serta menghasilkan rekap data siswa secara lebih terstruktur.",
    highlights: [
      "Pengelolaan data siswa kelas secara terstruktur.",
      "Pencatatan dan rekap absensi siswa.",
      "Pengelolaan nilai tugas, UTS, dan UAS.",
      "Rekap nilai dan absensi yang dapat diekspor ke Excel.",
    ],
    image: "/images/projects/absensi-1a.png",
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Tailwind CSS",
      "Node.js",
      "MySQL",
    ],
    category: "Web Development",
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 6,
    title: "Personal Portfolio",
    description:
    "Website portofolio pribadi yang menampilkan profil, pengalaman, pendidikan, keterampilan, serta berbagai proyek yang telah saya kerjakan. Website ini dirancang sebagai media untuk memperkenalkan kemampuan dan perjalanan saya di bidang teknologi secara profesional dan interaktif.",
    highlights: [
      "Menampilkan profil dan deskripsi diri secara profesional.",
      "Menampilkan pengalaman, pendidikan, dan tech stack.",
      "Menampilkan proyek dan kontribusi yang telah dikerjakan.",
      "Desain responsif dan modern untuk berbagai perangkat.",
    ],
    image: "/images/projects/Porto-1a.png",
    techStack: ["Next.js", "React", "Tailwind CSS", "JavaScript", "Vercel"],
    category: "Web Development",
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 7,
    title: "BonuaKane — Web Pemesanan Nasi Padang",
    description:
    "Website pemesanan makanan untuk memudahkan pengguna dalam melihat menu dan melakukan pemesanan secara online.",
    highlights: [
      "Mengembangkan antarmuka website menggunakan HTML, CSS, dan JavaScript.",
      "Membuat fitur tampilan daftar menu dan pemesanan.",
      "Menerapkan desain antarmuka yang sederhana dan responsif untuk meningkatkan kemudahan penggunaan.",
    ],
    image: "/images/projects/BonuaKane-1a.png",
    images: [
      "/images/projects/BonuaKane-1a.png",
      "/images/projects/BonuaKane-1b.png",
      "/images/projects/BonuaKane-1c.png",
      "/images/projects/BonuaKane-1d.png",
    ],
    techStack: ["HTML", "CSS", "JavaScript"],
    category: "Web Development",
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 8,
    title: "Implementasi Transformasi Perspektif Citra",
    description:
    "Proyek pengolahan citra untuk mengubah perspektif gambar menggunakan metode Perspective Transformation dan Homography.",
    highlights: [
      "Mengolah citra menggunakan Python dan OpenCV.",
      "Menentukan titik koordinat sumber dan tujuan untuk melakukan transformasi perspektif.",
      "Menghasilkan citra dengan perspektif yang telah disesuaikan dari sudut pandang berbeda.",
    ],
    image: "/images/projects/4.svg",
    techStack: ["Python", "OpenCV", "Computer Vision"],
    category: "Computer Vision",
    liveUrl: "",
    githubUrl: "",
  },
];

export const education: EducationItem[] = [
  {
    id: 1,
    level: "SD / Primary School",
    institution: "SDN Pembina Salakan",
    location: "Salakan",
    major: null,
    gpa: "85,00",
    period: "2011 - 2017",
    type: "education",
  },
  {
    id: 2,
    level: "SLTP / Junior High School",
    institution: "SMPN 1 Tinangkung",
    location: "Salakan",
    major: null,
    gpa: "87,00",
    period: "2017 - 2019",
    type: "education",
  },
  {
    id: 3,
    level: "SLTA / Senior High School",
    institution: "SMKN 1 Tinangkung",
    location: "Salakan",
    major: "Teknik Komputer & Jaringan (TKJ)",
    gpa: "89,00",
    period: "2019 - 2022",
    type: "education",
  },
  {
    id: 4,
    level: "Universitas / University",
    institution: "Universitas Tadulako",
    location: "Kota Palu",
    major: "Teknik Informatika",
    gpa: "3,84",
    period: "2022 - 2026",
    type: "education",
  },
];

export interface EducationHistoryItem {
  id: number;
  level: string;
  institution: string;
  field: string | null;
  startYear: number;
  endYear: number;
  location: string;
  gpa: string;
  logo: string;
  details: string[];
}

export const educationHistory: EducationHistoryItem[] = [
  {
    id: 1,
    level: "Bachelor of Informatics Engineering",
    institution: "Universitas Tadulako",
    field: "Informatics Engineering (Teknik Informatika)",
    startYear: 2022,
    endYear: 2026,
    location: "Kota Palu, Sulawesi Tengah, Indonesia",
    gpa: "IPK: 3,84 / 4,00",
    logo: "/images/education/Universitas%20Tadulako.png",
    details: [
      "Peminatan Sistem Cerdas — fokus Machine Learning, Computer Vision, dan Data.",
      "Mengerjakan penelitian deteksi penyakit daun tomat dengan arsitektur ResNet-50 (akurasi 98,67%).",
      "Aktif mengembangkan proyek AI dan web: SIKELOR, analitik data, dan aplikasi web.",
    ],
  },
  {
    id: 2,
    level: "Vocational High School",
    institution: "SMKN 1 Tinangkung",
    field: "Computer & Network Engineering (TKJ)",
    startYear: 2019,
    endYear: 2022,
    location: "Salakan, Sulawesi Tengah, Indonesia",
    gpa: "Nilai: 89,00 / 100",
    logo: "/images/education/SMKN%201%20Tinangkung-Photoroom.png",
    details: [
      "Mendalami Teknik Komputer & Jaringan (TKJ).",
      "Belajar jaringan komputer: routing OSPF, VLAN, dan konfigurasi perangkat Cisco / MikroTik.",
    ],
  },
  {
    id: 3,
    level: "Junior High School",
    institution: "SMPN 1 Tinangkung",
    field: null,
    startYear: 2017,
    endYear: 2019,
    location: "Salakan, Sulawesi Tengah, Indonesia",
    gpa: "Nilai: 87,00 / 100",
    logo: "/images/education/SMPN%201%20Tinangkung.png",
    details: [],
  },
  {
    id: 4,
    level: "Primary School",
    institution: "SDN Pembina Salakan",
    field: null,
    startYear: 2011,
    endYear: 2017,
    location: "Salakan, Sulawesi Tengah, Indonesia",
    gpa: "Nilai: 85,00 / 100",
    logo: "/images/education/SDN%20Pembina%20Salakan.png",
    details: [],
  },
];

export const techCategories: TechCategory[] = [
  {
    name: "Programming Languages",
    items: [
      { name: "Python", icon: "python", logo: "/images/tech/Python.svg" },
      { name: "SQL", icon: "sql", logo: "/images/tech/sql-server.svg" },
      { name: "JavaScript", icon: "javascript", logo: "/images/tech/js.svg" },
      { name: "HTML", icon: "html", logo: "/images/tech/html.svg" },
      { name: "CSS", icon: "css", logo: "/images/tech/css-3.svg" },
    ],
  },
  {
    name: "AI & Machine Learning",
    items: [
      {
        name: "Machine Learning",
        icon: "machinelearning",
        logo: "/images/tech/machine-learning.svg",
      },
      {
        name: "Deep Learning",
        icon: "deeplearning",
        logo: "/images/tech/deep-learning.svg",
      },
      {
        name: "Computer Vision",
        icon: "computervision",
        logo: "/images/tech/computer-vision.svg",
      },
      {
        name: "TensorFlow",
        icon: "tensorflow",
        logo: "/images/tech/TensorFlow.svg",
      },
      {
        name: "Scikit-learn",
        icon: "scikit",
        logo: "/images/tech/scikit-learn.svg",
      },
      { name: "OpenCV", icon: "opencv", logo: "/images/tech/OpenCV.svg" },
    ],
  },
  {
    name: "Data & Analytics",
    items: [
      { name: "Pandas", icon: "pandas", logo: "/images/tech/Pandas.svg" },
      { name: "NumPy", icon: "numpy", logo: "/images/tech/NumPy.svg" },
      {
        name: "Matplotlib",
        icon: "matplotlib",
        logo: "/images/tech/Matplotlib.svg",
      },
      { name: "Power BI", icon: "powerbi", logo: "/images/tech/Power-Bi.svg" },
      {
        name: "Google Colab",
        icon: "colab",
        logo: "/images/tech/google%20Colab.svg",
      },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "React", icon: "react", logo: "/images/tech/React.svg" },
      { name: "Next.js", icon: "next", logo: "/images/tech/Next.js.svg" },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
        logo: "/images/tech/Tailwind%20CSS.svg",
      },
      { name: "Vite.js", icon: "vite", logo: "/images/tech/Vite.js.svg" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js", icon: "node", logo: "/images/tech/Node.js.svg" },
      { name: "Flask", icon: "flask", logo: "/images/tech/Flask.svg" },
      { name: "Postman", icon: "postman", logo: "/images/tech/Postman.svg" },
    ],
  },
  {
    name: "Database",
    items: [{ name: "MySQL", icon: "mysql", logo: "/images/tech/MySQL.svg" }],
  },
  {
    name: "Networking",
    items: [
      {
        name: "Cisco Packet Tracer",
        icon: "cisco",
        logo: "/images/tech/cisco.svg",
      },
      {
        name: "MikroTik / Winbox",
        icon: "mikrotik",
        logo: "/images/tech/Mikrotik.svg",
      },
    ],
  },
  {
    name: "Tools",
    items: [
      { name: "Git", icon: "git", logo: "/images/tech/Git.svg" },
      { name: "GitHub", icon: "github", logo: "/images/tech/GitHub.svg" },
      { name: "Vercel", icon: "vercel", logo: "/images/tech/Vercel.svg" },
      { name: "VS Code", icon: "vscode", logo: "/images/tech/VSCode.svg" },
    ],
  },
];

export const galleryImages: GalleryImage[] = [
  { id: 1, src: "/images/gallery/1.jpeg", alt: "" },
  { id: 2, src: "/images/gallery/2.jpeg", alt: "" },
  { id: 3, src: "/images/gallery/3.jpeg", alt: "" },
  { id: 4, src: "/images/gallery/4.jpeg", alt: "" },
  { id: 5, src: "/images/gallery/5.jpeg", alt: "" },
  { id: 6, src: "/images/gallery/6.jpeg", alt: "" },
];

export const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/fahruddin-a-lebe/" },
  { name: "GitHub", href: "https://github.com/Fahruddin002" },
  { name: "Instagram", href: "https://www.instagram.com/faruk.l_" },
];

export interface AboutCertificate {
  title: string;
  issuer: string;
  image: string; // gambar utama (dipakai sebagai thumbnail kartu)
  images?: string[]; // opsional: beberapa gambar sekaligus (mis. 2 halaman sertifikat)
}

// Sertifikat untuk tab General di section About (marquee).
// Title = nama file gambar tanpa suffix -1a/1b/1c; issuer sesuai aturan.
export const aboutCertificates: AboutCertificate[] = [
  {
    title: "Belajar Analisis Data dengan Python",
    issuer: "Dicoding Indonesia",
    image: "/certificates/Belajar%20Analisis%20Data%20dengan%20Python-1a.png",
    images: [
      "/certificates/Belajar%20Analisis%20Data%20dengan%20Python-1a.png",
      "/certificates/Belajar%20Analisis%20Data%20dengan%20Python-1b.png",
    ],
  },
  {
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    image: "/certificates/Belajar%20Dasar%20AI-1a.png",
    images: [
      "/certificates/Belajar%20Dasar%20AI-1a.png",
      "/certificates/Belajar%20Dasar%20AI-1b.png",
    ],
  },
  {
    title: "Belajar Dasar Git dengan GitHub",
    issuer: "Dicoding Indonesia",
    image: "/certificates/Belajar%20Dasar%20Git%20dengan%20GitHub-1a.png",
    images: [
      "/certificates/Belajar%20Dasar%20Git%20dengan%20GitHub-1a.png",
      "/certificates/Belajar%20Dasar%20Git%20dengan%20GitHub-1b.png",
      "/certificates/Belajar%20Dasar%20Git%20dengan%20GitHub-1c.png",
    ],
  },
  {
    title: "Belajar Dasar SQL",
    issuer: "Dicoding Indonesia",
    image: "/certificates/Belajar%20Dasar%20SQL-1a.png",
    images: [
      "/certificates/Belajar%20Dasar%20SQL-1a.png",
      "/certificates/Belajar%20Dasar%20SQL-1b.png",
      "/certificates/Belajar%20Dasar%20SQL-1c.png",
    ],
  },
  {
    title: "Belajar Dasar Visualisasi Data",
    issuer: "Dicoding Indonesia",
    image: "/certificates/Belajar%20Dasar%20Visualisasi%20Data-1a.png",
    images: [
      "/certificates/Belajar%20Dasar%20Visualisasi%20Data-1a.png",
      "/certificates/Belajar%20Dasar%20Visualisasi%20Data-1b.png",
    ],
  },
  {
    title: "Belajar Fundamental Pemrosesan Data",
    issuer: "Dicoding Indonesia",
    image: "/certificates/Belajar%20Fundamental%20Pemrosesan%20Data-1a.png",
    images: [
      "/certificates/Belajar%20Fundamental%20Pemrosesan%20Data-1a.png",
      "/certificates/Belajar%20Fundamental%20Pemrosesan%20Data-1b.png",
    ],
  },
  {
    title: "Belajar Machine Learning Untuk Pemula",
    issuer: "Dicoding Indonesia",
    image: "/certificates/Belajar%20Machine%20Learning%20Untuk%20Pemula-1a.png",
    images: [
      "/certificates/Belajar%20Machine%20Learning%20Untuk%20Pemula-1a.png",
      "/certificates/Belajar%20Machine%20Learning%20Untuk%20Pemula-1b.png",
      "/certificates/Belajar%20Machine%20Learning%20Untuk%20Pemula-1c.png",
    ],
  },
  {
    title: "Belajar Pengembangan Machine Learning",
    issuer: "Dicoding Indonesia",
    image: "/certificates/Belajar%20Pengembangan%20Machine%20Learning-1a.png",
    images: [
      "/certificates/Belajar%20Pengembangan%20Machine%20Learning-1a.png",
      "/certificates/Belajar%20Pengembangan%20Machine%20Learning-1b.png",
      "/certificates/Belajar%20Pengembangan%20Machine%20Learning-1c.png",
    ],
  },
  {
    title: "Belajar Prinsip Pemrograman SOLID",
    issuer: "Dicoding Indonesia",
    image: "/certificates/Belajar%20Prinsip%20Pemrograman%20SOLID-1a.png",
    images: [
      "/certificates/Belajar%20Prinsip%20Pemrograman%20SOLID-1a.png",
      "/certificates/Belajar%20Prinsip%20Pemrograman%20SOLID-1b.png",
    ],
  },
  {
    title: "Data Analytics and Gen AI",
    issuer: "RevoU",
    image: "/certificates/Data%20Analytics%20and%20Gen%20AI-1a.png",
    images: [
      "/certificates/Data%20Analytics%20and%20Gen%20AI-1a.png",
      "/certificates/Data%20Analytics%20and%20Gen%20AI-1b.png",
    ],
  },
  {
    title: "Machine Learning Engineer",
    issuer: "Coding Camp powered by DBS Foundation",
    image: "/certificates/Machine%20Learning%20Engineer.png",
  },
  {
    title: "Machine Learning Terapan",
    issuer: "Dicoding Indonesia",
    image: "/certificates/Machine%20Learning%20Terapan-1a.png",
    images: [
      "/certificates/Machine%20Learning%20Terapan-1a.png",
      "/certificates/Machine%20Learning%20Terapan-1b.png",
      "/certificates/Machine%20Learning%20Terapan-1c.png",
    ],
  },
  {
    title: "Memulai Dasar Pemrograman",
    issuer: "Dicoding Indonesia",
    image: "/certificates/Memulai%20Dasar%20Pemrograman-1a.png",
    images: [
      "/certificates/Memulai%20Dasar%20Pemrograman-1a.png",
      "/certificates/Memulai%20Dasar%20Pemrograman-1b.png",
      "/certificates/Memulai%20Dasar%20Pemrograman-1c.png",
    ],
  },
  {
    title: "Memulai Pemrograman dengan Python",
    issuer: "Dicoding Indonesia",
    image: "/certificates/Memulai%20Pemrograman%20dengan%20Python-1a.png",
    images: [
      "/certificates/Memulai%20Pemrograman%20dengan%20Python-1a.png",
      "/certificates/Memulai%20Pemrograman%20dengan%20Python-1b.png",
      "/certificates/Memulai%20Pemrograman%20dengan%20Python-1c.png",
    ],
  },
  {
    title: "Programming Logic 101",
    issuer: "Dicoding Indonesia",
    image: "/certificates/Programming%20Logic%20101-1a.png",
    images: [
      "/certificates/Programming%20Logic%20101-1a.png",
      "/certificates/Programming%20Logic%20101-1b.png",
    ],
  },
  {
    title: "Studi Independen Batch 7",
    issuer: "Kampus Merdeka",
    image: "/certificates/Studi%20Independen%20Batch%207.png",
  },
];

// Teks perkenalan tab General. Kata kunci dibungkus **...** agar dirender tebal.
export const aboutParagraphs: string[] = [
  "Halo, saya **Faruk**! Saya lulusan **S1 Teknik Informatika Universitas Tadulako** dengan peminatan **Sistem Cerdas**, dan memiliki ketertarikan pada dunia teknologi, khususnya **Machine Learning, Computer Vision, Data, dan Web Development**.",
  "Selama perkuliahan dan berbagai proyek yang saya kerjakan, saya terbiasa membangun solusi berbasis teknologi — mulai dari mengolah dan menganalisis data, mengembangkan model **Machine Learning**, hingga membangun aplikasi web. Saya juga terbiasa menggunakan **Python, SQL**, dan berbagai tools pengembangan untuk menyelesaikan permasalahan nyata.",
  "Saya senang belajar melalui praktik, mencoba teknologi baru, dan mencari solusi ketika menghadapi masalah. Saya terus mengembangkan kemampuan dan mengeksplorasi hal-hal baru untuk memperdalam pemahaman di bidang **Sistem Cerdas, Data, dan IT**.",
];

export const profile = {
  name: "Fahruddin A. Lebe",
  role: "Machine Learning Engineer",
  tagline:
    "Machine Learning & Data Enthusiast yang berfokus pada pengembangan solusi cerdas, pengolahan data, dan penerapan teknologi untuk menyelesaikan berbagai permasalahan.",
  email: "faruklebe025@gmail.com",
  location: "Banggai Kepulauan, Sulawesi Tengah, Indonesia",
  linkedin: "www.linkedin.com/in/fahruddin-a-lebe",
  github: "github.com/Fahruddin002",
  instagram: "www.instagram.com/faruk.l_",
  cvUrl: "/cv.pdf",
  photo: "/profile.jpeg",
};
