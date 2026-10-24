export type ExperienceType = "full-time" | "part-time";

export interface ExperienceGalleryItem {
  src: string; // path gambar di /public (contoh: "/images/experiences/guru-1.jpg")
  caption?: string; // opsional: teks alt/caption foto
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  logo: string | null; // path logo instansi (null => fallback inisial)
  location: string;
  period: string;
  type: ExperienceType;
  description: string;
  contributions: string[]; // penanda **teks** = tebal, `teks` = inline-code
  gallery: (string | ExperienceGalleryItem)[]; // kosong [] => bagian GALERI tidak dirender
}

// Urutan: terbaru di atas.
export const experiences: Experience[] = [
  {
    id: "guru-smkn1-tinangkung",
    role: "Guru/Pengajar – Teknik Komputer dan Jaringan (TKJ)",
    organization: "SMKN 1 Tinangkung",
    logo: "/images/education/SMKN%201%20Tinangkung-Photoroom.png",
    location: "Banggai Kepulauan, Sulawesi Tengah, Indonesia",
    period: "Sep 2026 - Sekarang",
    type: "full-time",
    description:
      "Mengajar dan mendampingi siswa jurusan Teknik Komputer dan Jaringan dalam memahami konsep jaringan komputer serta menerapkannya melalui kegiatan praktik.",
    contributions: [
      "Mengajar materi **jaringan komputer**, perangkat jaringan, **OSI, TCP/IP, IPv4, VLAN, dan routing**.",
      "Membimbing **konfigurasi dan troubleshooting jaringan** menggunakan perangkat jaringan dan `Cisco Packet Tracer`.",
      "Menyusun **materi dan praktik** berdasarkan **Alur Tujuan Pembelajaran (ATP)**.",
    ],
    // Cara menambah galeri: isi array di bawah, mis. "/images/experiences/guru-1.jpg"
    // (atau { src: "...", caption: "..." }). Bagian "GALERI:" otomatis muncul.
    gallery: [],
  },
  {
    id: "asisten-data-mining-untad",
    role: "Asisten Praktikum - Data Mining",
    organization: "Universitas Tadulako",
    logo: "/images/education/Universitas%20Tadulako.png",
    location: "Palu, Sulawesi Tengah, Indonesia",
    period: "Sep 2025 - Nov 2025",
    type: "part-time",
    description:
      "Memberikan pendampingan teknis dalam praktikum Data Mining, dengan menghubungkan konsep pengolahan dan analisis data dengan penerapan metode Data Mining secara langsung.",
    contributions: [
      "Membimbing **16 mahasiswa** dalam **data preprocessing**, eksplorasi data, dan penerapan **algoritma Data Mining**.",
      "Mendampingi penyelesaian kendala teknis selama **pengolahan dan analisis data**.",
      "Melakukan **review dan evaluasi** hasil praktikum serta memberikan umpan balik.",
    ],
    gallery: [],
  },
  {
    id: "asisten-gis-untad",
    role: "Asisten Praktikum - Geographic Information System (GIS)",
    organization: "Universitas Tadulako",
    logo: "/images/education/Universitas%20Tadulako.png",
    location: "Palu, Sulawesi Tengah, Indonesia",
    period: "Sep 2025 - Nov 2025",
    type: "part-time",
    description:
      "Memberikan pendampingan teknis dalam praktikum GIS, dengan menghubungkan konsep data spasial dengan penerapan pengolahan, visualisasi, dan analisis data geografis.",
    contributions: [
      "Membimbing **35 mahasiswa** dalam **pengolahan dan visualisasi data spasial** menggunakan perangkat lunak GIS.",
      "Mendampingi pengelolaan **layer, atribut, dan data geografis** untuk kebutuhan analisis.",
      "Membantu **troubleshooting teknis** selama proses pemetaan dan pengolahan data.",
    ],
    gallery: [],
  },
];

// Normalisasi item galeri: string polos => { src, caption: undefined }
export function normalizeGallery(
  items: (string | ExperienceGalleryItem)[]
): ExperienceGalleryItem[] {
  return items.map((item) =>
    typeof item === "string" ? { src: item } : item
  );
}
