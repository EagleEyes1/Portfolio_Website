import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import AOS from "aos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPaperPlane,
  faLocationDot,
  faUser,
  faCommentDots,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "./Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fname.trim() || !formData.email.trim() || !formData.message.trim()) {
      Swal.fire({
        color: "#dce5e5",
        background: "#232428",
        icon: "warning",
        title: "Form Belum Lengkap",
        text: "Silakan isi nama, email, dan pesan Anda sebelum mengirim.",
        confirmButtonColor: "#d1bda0",
      });
      return;
    }

    // Konfirmasi pengiriman
    const confirmResult = await Swal.fire({
      color: "#dce5e5",
      background: "#232428",
      title: "Kirim Pesan Sekarang?",
      text: "Pesan Anda akan dikirimkan langsung ke inbox email saya melalui server SMTP.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d1bda0",
      cancelButtonColor: "#3a3b40",
      confirmButtonText: "Ya, Kirim!",
      cancelButtonText: "Batal",
    });

    if (!confirmResult.isConfirmed) return;

    setIsSubmitting(true);

    try {
      // Dinamis: Di production (Vercel) menggunakan serverless endpoint /api/contact,
      // di development lokal menggunakan http://localhost:5000/api/contact
      const apiUrl =
        process.env.NODE_ENV === "production"
          ? "/api/contact"
          : "http://localhost:5000/api/contact";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        Swal.fire({
          color: "#dce5e5",
          background: "#232428",
          icon: "success",
          title: "Pesan Terkirim!",
          text: data.message || "Terima kasih! Pesan Anda telah berhasil diterima.",
          confirmButtonColor: "#d1bda0",
        });

        // Reset form
        setFormData({
          fname: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(data.message || "Gagal mengirim email.");
      }
    } catch (error) {
      console.error("Contact Form Error:", error);
      Swal.fire({
        color: "#dce5e5",
        background: "#232428",
        icon: "error",
        title: "Gagal Mengirim Pesan",
        html: `
          <div style="font-size: 0.95rem; text-align: left; line-height: 1.6; color: #b5bfbf;">
            <p style="margin-bottom: 8px;">${error.message}</p>
            <hr style="border-color: rgba(209, 189, 160, 0.2);" />
            <small style="color: #9ea8ab;">
              <strong>Petunjuk:</strong> Pastikan backend API aktif dengan perintah <code>npm run server</code> dan konfigurasi SMTP (Gmail App Password) di <code>server/.env</code> sudah diisi.
            </small>
          </div>
        `,
        confirmButtonColor: "#d1bda0",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactWrapper}>
      <div className={styles.contactContainer}>
        {/* Header Section */}
        <div className={styles.headerSection} data-aos="fade-down">
          <div className={styles.badgeCategory}>Get in Touch</div>
          <h1 className={styles.mainTitle}>
            Let's Build Something <span>Exceptional</span> Together
          </h1>
          <p className={styles.subtitle}>
            Tertarik untuk berkolaborasi, mendiskusikan proyek baru, atau sekadar
            menyapa? Kirimkan pesan melalui formulir di bawah atau hubungi saya
            langsung melalui kontak yang tersedia.
          </p>
        </div>

        {/* Content Section */}
        <Row className={styles.contactRow}>
          {/* Kolom Kiri: Direct Info */}
          <Col lg={5} md={12} className={styles.infoColumn} data-aos="fade-right">
            <div className={styles.infoCard}>
              <div className={styles.infoCardTop}>
                <h3>Contact Information</h3>
                <p>
                  Saya selalu terbuka untuk mendiskusikan peluang proyek web/mobile,
                  kesempatan freelance, atau diskusi teknologi.
                </p>

                <div className={styles.directContactList}>
                  <div className={styles.directContactItem}>
                    <div className={styles.iconCircle}>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div className={styles.contactMeta}>
                      <span className={styles.contactLabel}>Email Address</span>
                      <span className={styles.contactValue}>fahderlangga@gmail.com</span>
                    </div>
                  </div>

                  <div className={styles.directContactItem}>
                    <div className={styles.iconCircle}>
                      <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    <div className={styles.contactMeta}>
                      <span className={styles.contactLabel}>Location</span>
                      <span className={styles.contactValue}>Indonesia</span>
                    </div>
                  </div>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.directContactItem}
                  >
                    <div className={styles.iconCircle}>
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </div>
                    <div className={styles.contactMeta}>
                      <span className={styles.contactLabel}>LinkedIn</span>
                      <span className={styles.contactValue}>Fahd Erlangga</span>
                    </div>
                  </a>

                  <a
                    href="https://github.com/EagleEyes1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.directContactItem}
                  >
                    <div className={styles.iconCircle}>
                      <FontAwesomeIcon icon={faGithub} />
                    </div>
                    <div className={styles.contactMeta}>
                      <span className={styles.contactLabel}>GitHub</span>
                      <span className={styles.contactValue}>@EagleEyes1</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Status Badge */}
              <div className={styles.availabilityBadge}>
                <span className={styles.pulseDot}></span>
                <span>Available for freelance & collaboration</span>
              </div>
            </div>
          </Col>

          {/* Kolom Kanan: Contact Form */}
          <Col lg={7} md={12} className={styles.formColumn} data-aos="fade-left">
            <div className={styles.formCard}>
              <h3>Send Me a Message</h3>
              <p className={styles.formCardSub}>
                Formulir ini terhubung langsung ke server SMTP pribadi.
              </p>

              <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    <FontAwesomeIcon icon={faUser} />
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    placeholder="Contoh: Budi Santoso"
                    className={styles.textInput}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    <FontAwesomeIcon icon={faEnvelope} />
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@perusahaan.com"
                    className={styles.textInput}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    <FontAwesomeIcon icon={faCommentDots} />
                    Subjek / Judul Pesan (Opsional)
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Diskusi Proyek Web / Penawaran Kolaborasi"
                    className={styles.textInput}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    <FontAwesomeIcon icon={faCommentDots} />
                    Isi Pesan
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tuliskan detail pesan, kebutuhan proyek, atau pertanyaan Anda di sini..."
                    className={styles.textareaInput}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.btnSubmit}
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon
                        icon={faCircleNotch}
                        className={styles.spinner}
                      />
                      <span>Mengirim Email...</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} />
                      <span>Kirim Pesan</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Contact;
