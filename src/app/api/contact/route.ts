import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

// Nodemailer butuh Node runtime (bukan Edge)
export const runtime = "nodejs";

const LIMITS = { name: 100, email: 200, message: 5000 };

// ponytail: rate limit in-memory, reset saat cold start / beda instance.
// Pindah ke Upstash/DB kalau spam jadi masalah nyata.
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.reset) {
    if (hits.size > 1000) hits.clear();
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Terlalu banyak percobaan. Coba lagi beberapa menit lagi." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: "Format request tidak valid" },
        { status: 400 }
      );
    }

    // Honeypot: bot mengisi field tersembunyi, manusia tidak
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    if (
      name.length > LIMITS.name ||
      email.length > LIMITS.email ||
      message.length > LIMITS.message
    ) {
      return NextResponse.json(
        { success: false, error: "Teks yang dikirim terlalu panjang" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Format email tidak valid" },
        { status: 400 }
      );
    }

    await sendContactEmail({ name, email, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error && error.message.includes("Konfigurasi email")
            ? "Layanan email belum dikonfigurasi. Silakan hubungi lewat email langsung."
            : "Gagal mengirim pesan. Silakan coba lagi atau email langsung."
      },
      { status: 500 }
    );
  }
}
