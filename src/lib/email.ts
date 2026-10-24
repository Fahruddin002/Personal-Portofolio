import nodemailer from "nodemailer";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function sendContactEmail({
  name,
  email,
  message
}: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const to = process.env.EMAIL_TO || user;

  // Gagal cepat + pesan jelas kalau env belum diisi
  if (!user || !pass || !to) {
    throw new Error(
      "Konfigurasi email belum lengkap. Isi EMAIL_USER, EMAIL_PASS, dan EMAIL_TO di .env.local"
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
    connectionTimeout: 6_000,
    greetingTimeout: 6_000,
    socketTimeout: 8_000
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  const mailOptions = {
    from: `"Portfolio Contact" <${user}>`,
    to,
    subject: `Pesan baru dari ${name} - Portofolio`,
    replyTo: email,
    text: `
Nama: ${name}
Email: ${email}

Pesan:
${message}
    `,
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #145374;">Pesan Baru dari Portofolio</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 8px 0; font-weight: bold; width: 80px;">Nama:</td>
      <td style="padding: 8px 0;">${safeName}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; font-weight: bold;">Email:</td>
      <td style="padding: 8px 0;">${safeEmail}</td>
    </tr>
  </table>
  <h3 style="color: #00334E; margin-top: 20px;">Pesan:</h3>
  <p style="line-height: 1.6; color: #111827; white-space: pre-line;">${safeMessage}</p>
</div>
    `
  };

  await transporter.sendMail(mailOptions);
}
