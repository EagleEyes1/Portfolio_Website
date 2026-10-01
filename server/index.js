const path = require("path");
// Pastikan membaca .env dari direktori server terlepas dari mana perintah dijalankan
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Portfolio SMTP Mailer Service is running" });
});

// Endpoint kirim pesan form kontak
app.post("/api/contact", async (req, res) => {
  const { fname, email, message, subject } = req.body;

  // Validasi input
  if (!fname || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Nama, email, dan pesan wajib diisi.",
    });
  }

  // Cek apakah kredensial SMTP sudah dikonfigurasi di .env
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const receiverEmail = process.env.RECEIVER_EMAIL || smtpUser;

  if (!smtpUser || !smtpPass) {
    console.warn("⚠️ PERINGATAN: SMTP_USER atau SMTP_PASS di server/.env belum diisi!");
    return res.status(500).json({
      success: false,
      message:
        "Konfigurasi SMTP belum lengkap di server/.env. Silakan masukkan SMTP_USER dan App Password (SMTP_PASS).",
    });
  }

  try {
    const cleanPass = smtpPass.replace(/\s+/g, "");

    // Inisialisasi transporter Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
      auth: {
        user: smtpUser,
        pass: cleanPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const emailSubject = subject || `Pesan Baru Portfolio dari ${fname}`;

    // Template Email HTML Elegan & Modern
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #1a1b1e;
            color: #dce5e5;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #232428;
            border: 1px solid rgba(209, 189, 160, 0.3);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }
          .header {
            background: linear-gradient(135deg, #2c2d32 0%, #1e1f23 100%);
            border-bottom: 2px solid #d1bda0;
            padding: 24px 30px;
            text-align: center;
          }
          .header h2 {
            margin: 0;
            color: #d1bda0;
            font-size: 24px;
            letter-spacing: 1px;
          }
          .content {
            padding: 30px;
          }
          .field {
            margin-bottom: 20px;
            background: rgba(44, 45, 50, 0.6);
            padding: 14px 18px;
            border-radius: 10px;
            border-left: 3px solid #d1bda0;
          }
          .field-label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #d1bda0;
            margin-bottom: 5px;
            font-weight: bold;
          }
          .field-value {
            font-size: 15px;
            color: #ffffff;
            line-height: 1.5;
            word-break: break-word;
          }
          .message-box {
            background: rgba(30, 31, 35, 0.8);
            border: 1px solid rgba(209, 189, 160, 0.2);
            border-radius: 10px;
            padding: 18px;
            margin-top: 15px;
            white-space: pre-wrap;
            color: #e5ecec;
            line-height: 1.6;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #8c989b;
            border-top: 1px solid rgba(220, 229, 229, 0.08);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>✉️ Pesan Baru dari Form Portfolio</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Nama Pengirim</div>
              <div class="field-value">${fname}</div>
            </div>
            <div class="field">
              <div class="field-label">Alamat Email Pengirim</div>
              <div class="field-value">
                <a href="mailto:${email}" style="color: #d1bda0; text-decoration: none;">${email}</a>
              </div>
            </div>
            <div class="field">
              <div class="field-label">Waktu Diterima</div>
              <div class="field-value">${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB</div>
            </div>
            <div class="field">
              <div class="field-label">Isi Pesan</div>
              <div class="message-box">${message}</div>
            </div>
          </div>
          <div class="footer">
            Pesan ini dikirimkan otomatis melalui formulir kontak Portfolio Website Fahd Erlangga.
          </div>
        </div>
      </body>
      </html>
    `;

    // Kirim email
    const mailOptions = {
      from: `"Portfolio Contact Form" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: emailSubject,
      text: `Pesan dari: ${fname} (${email})\n\n${message}`,
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email berhasil dikirim dari ${fname} (${email}) ke ${receiverEmail}`);

    return res.status(200).json({
      success: true,
      message: "Pesan Anda berhasil dikirim! Saya akan segera merespons.",
    });
  } catch (error) {
    console.error("❌ Gagal mengirim email:", error);
    return res.status(500).json({
      success: false,
      message: `Gagal mengirim email: ${error.message}`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio SMTP Server berjalan di http://localhost:${PORT}`);
});
