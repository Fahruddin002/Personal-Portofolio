"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  PaperPlaneTilt,
  CheckCircle,
  Warning,
  EnvelopeSimple,
  LinkedinLogo,
  GithubLogo,
  InstagramLogo,
  MapPin,
  ArrowUpRight
} from "@phosphor-icons/react";
import { profile } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

type Status = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  message: string;
  website: string; // honeypot
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const contactItems = [
  {
    name: "Email",
    icon: <EnvelopeSimple size={22} weight="fill" />,
    href: `mailto:${profile.email}`,
    value: profile.email,
    external: false
  },
  {
    name: "LinkedIn",
    icon: <LinkedinLogo size={22} weight="bold" />,
    href: `https://${profile.linkedin}`,
    value: profile.linkedin,
    external: true
  },
  {
    name: "GitHub",
    icon: <GithubLogo size={22} weight="bold" />,
    href: `https://${profile.github}`,
    value: profile.github,
    external: true
  },
  {
    name: "Instagram",
    icon: <InstagramLogo size={22} weight="bold" />,
    href: `https://${profile.instagram}`,
    value: profile.instagram,
    external: true
  }
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    website: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nama minimal 2 karakter";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Pesan wajib diisi";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Pesan minimal 10 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("loading");
    setErrorMessage("");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error || "Gagal mengirim pesan. Silakan coba lagi atau email langsung."
        );
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "", website: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setErrorMessage(
        error instanceof DOMException && error.name === "AbortError"
          ? "Pengiriman terlalu lama. Periksa koneksi lalu coba lagi."
          : error instanceof Error
            ? error.message
            : "Gagal mengirim pesan. Silakan coba lagi atau email langsung."
      );
      setStatus("error");
      setTimeout(() => setStatus("idle"), 7000);
    } finally {
      clearTimeout(timeout);
    }
  };

  const inputClasses = (fieldName: keyof FormErrors) =>
    `w-full px-3.5 sm:px-4 py-3 text-base leading-6 rounded-lg sm:rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 bg-white ${
      errors[fieldName]
        ? "border-red-400 bg-red-50/50"
        : "border-gray-200 focus:border-primary-blue"
    }`;

  const labelClasses =
    "block text-[13px] sm:text-sm font-medium text-text-primary mb-1.5 sm:mb-2";

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-dark-blue via-primary-blue to-dark-blue overflow-hidden"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "64px 64px"
        }}
      />
      <div className="absolute -top-24 -right-24 w-72 h-72 sm:-top-32 sm:-right-32 sm:w-96 sm:h-96 bg-accent-orange/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight"
          >
            Contact
          </motion.h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 64, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-1 rounded-full bg-accent-orange mt-5 mx-auto"
          />
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-5 lg:gap-10 max-w-2xl mx-auto lg:max-w-none">
          {/* Info kontak */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4"
          >
            {contactItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                title={item.value}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                whileHover={{ scale: 1.03, x: 6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.08 + 0.2 }}
                className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-white/[0.08] backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/[0.14] transition-colors duration-300"
              >
                <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-accent-orange/20 text-accent-orange">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] sm:text-sm font-medium text-white">{item.name}</p>
                  <p className="text-xs sm:text-sm text-gray-300 truncate">{item.value}</p>
                </div>
                <ArrowUpRight
                  size={18}
                  weight="bold"
                  className="hidden sm:block flex-shrink-0 ml-auto text-gray-400 group-hover:text-white transition-colors"
                />
              </motion.a>
            ))}

            <div className="sm:col-span-2 lg:col-span-1 flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-white/[0.08] backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10">
              <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-accent-orange/20 text-accent-orange">
                <MapPin size={22} weight="fill" />
              </span>
              <div className="min-w-0">
                <p className="text-[13px] sm:text-sm font-medium text-white">Lokasi</p>
                <p className="text-xs sm:text-sm text-gray-300 leading-snug">{profile.location}</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="min-w-0 w-full lg:col-span-3 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 xl:p-9 shadow-2xl shadow-dark-blue/30 space-y-4 sm:space-y-5"
          >
            {/* Honeypot anti-spam (tersembunyi dari manusia) */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={formData.website}
              onChange={handleChange}
              className="hidden"
            />

            {/* Nama */}
            <div>
              <label htmlFor="name" className={labelClasses}>
                Nama Lengkap
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama Anda"
                autoComplete="name"
                maxLength={100}
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputClasses("name")}
                disabled={status === "loading"}
              />
              {errors.name && (
                <motion.p
                  id="name-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 mt-1.5 sm:mt-2 text-xs sm:text-sm text-red-500"
                >
                  <Warning size={14} weight="fill" />
                  {errors.name}
                </motion.p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                autoComplete="email"
                maxLength={200}
                required
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClasses("email")}
                disabled={status === "loading"}
              />
              {errors.email && (
                <motion.p
                  id="email-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 mt-1.5 sm:mt-2 text-xs sm:text-sm text-red-500"
                >
                  <Warning size={14} weight="fill" />
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Pesan */}
            <div>
              <label htmlFor="message" className={labelClasses}>
                Pesan
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tulis pesan Anda di sini..."
                maxLength={5000}
                required
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`${inputClasses("message")} resize-none min-h-[120px] sm:min-h-[150px]`}
                disabled={status === "loading"}
              />
              {errors.message && (
                <motion.p
                  id="message-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 mt-1.5 sm:mt-2 text-xs sm:text-sm text-red-500"
                >
                  <Warning size={14} weight="fill" />
                  {errors.message}
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
              whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
              className={`w-full min-h-[48px] flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ${
                status === "loading"
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-accent-orange text-white hover:bg-orange-600 shadow-lg shadow-accent-orange/25"
              }`}
            >
              {status === "loading" ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="w-5 h-5 border-2 border-gray-300 border-t-accent-orange rounded-full"
                  />
                  Mengirim...
                </>
              ) : (
                <>
                  <PaperPlaneTilt size={18} weight="bold" />
                  Kirim Pesan
                </>
              )}
            </motion.button>

            {status === "success" && (
              <motion.div
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 p-3.5 sm:p-4 bg-emerald-50 text-emerald-700 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium"
              >
                <CheckCircle size={18} weight="fill" className="flex-shrink-0 mt-0.5" />
                <span className="break-words">
                  Pesan berhasil dikirim! Saya akan segera membalas.
                </span>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                role="alert"
                aria-live="assertive"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 p-3.5 sm:p-4 bg-red-50 text-red-600 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium"
              >
                <Warning size={18} weight="fill" className="flex-shrink-0 mt-0.5" />
                <span className="break-words">
                  {errorMessage || "Gagal mengirim pesan. Silakan coba lagi."}{" "}
                  <a
                    href={`mailto:${profile.email}`}
                    className="underline underline-offset-2 hover:text-red-700"
                  >
                    Email langsung
                  </a>
                </span>
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
