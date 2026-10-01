import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import AOS from "aos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faFileLines,
  faDownload,
  faGlobe,
  faMobileScreen,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "./Portfolio.module.css";

const projectsData = [
  {
    id: 1,
    title: "Naktaraso Official Website",
    category: "web",
    categoryLabel: "Web Platform",
    description:
      "Website resmi brand kuliner Naktaraso dengan katalog menu interaktif, showcase sajian, profil resto, dan tata letak responsif bernuansa elegan.",
    image: require("../../assets/images/mock5.png"),
    tags: ["React.js", "Bootstrap", "Web Platform", "UI/UX"],
    github: "https://github.com/EagleEyes1/naktaraso",
    demo: "https://naktaraso.com/",
    isMobile: false,
  },
  {
    id: 2,
    title: "Capstone Web Application",
    category: "web",
    categoryLabel: "Web Application",
    description:
      "Aplikasi web capstone kolaboratif berskala tim dengan integrasi REST API, arsitektur modular komponen React, dan antarmuka pengguna responsif.",
    image: require("../../assets/images/mock2.png"),
    tags: ["React.js", "Team Project", "REST API", "Vercel"],
    github: "https://github.com/Capstone-7/FrontEnd",
    demo: "https://tescapstonewebsite.vercel.app/",
    isMobile: false,
  },
  {
    id: 3,
    title: "E-Commerce Mini Project",
    category: "web",
    categoryLabel: "E-Commerce",
    description:
      "Aplikasi Perpustakaan berbasis toko online interaktif dengan fitur katalog produk, pengelolaan keranjang belanja (cart), navigasi dinamis, dan tampilan modern.",
    image: require("../../assets/images/mock1.png"),
    tags: ["React.js", "State Management", "E-Commerce", "CSS Modules"],
    github: "https://github.com/EagleEyes1/Mini-Project",
    demo: "https://mini-project-omega.vercel.app/",
    isMobile: false,
  },
  {
    id: 4,
    title: "MovieApp Mobile Experience",
    category: "mobile",
    categoryLabel: "Mobile Application",
    description:
      "Aplikasi mobile penjelajah film populer dengan informasi sinopsis lengkap, rating, penelusuran genre, dan antarmuka mobile-first yang bersih.",
    image: require("../../assets/images/mock4.png"),
    tags: ["Mobile App", "Android", "Movie API", "UI Design"],
    github: "https://github.com/MovieAppProgate/Kelompok9_MovieApp",
    demo: null,
    isMobile: true,
  },
];

const skillCategories = [
  {
    title: "Frontend (Primary Passion)",
    tagline: "Fokus utama: UI/UX interaktif & modern",
    skills: [
      { name: "Vue.js (Currently Active)", active: true },
      { name: "React.js", active: false },
      { name: "Laravel Blade", active: false },
      { name: "CI4 Frontend", active: false },
      { name: "JavaScript (ES6+)", active: false },
      { name: "HTML5 / CSS3 Modules", active: false },
      { name: "Bootstrap 5", active: false },
    ],
  },
  {
    title: "Backend & Fullstack",
    tagline: "Pengembangan REST API & Arsitektur MVC",
    skills: [
      { name: "Laravel (PHP)", active: false },
      { name: "CodeIgniter 4 (CI4)", active: false },
      { name: "Express.js (Node.js)", active: false },
      { name: "RESTful API Integration", active: false },
    ],
  },
  {
    title: "Mobile & Supporting Tools",
    tagline: "Aplikasi cross-platform & development workflow",
    skills: [
      { name: "Flutter", active: false },
      { name: "Android", active: false },
      { name: "Git & GitHub", active: false },
      { name: "Vercel Deployment", active: false },
      { name: "Postman", active: false },
    ],
  },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const filteredProjects =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((project) => project.category === activeFilter);

  return (
    <div className={styles.portWrapper}>
      {/* Header Section */}
      <div className={styles.headerSection} data-aos="fade-down">
        <div className={styles.badgeCategory}>Selected Works</div>
        <h1 className={styles.mainTitle}>
          Crafted with <span>Precision</span> & Passion
        </h1>
        <p className={styles.subtitle}>
          Eksplorasi proyek-proyek web dan mobile application yang telah saya
          kembangkan dengan fokus pada performa, estetika modern, dan pengalaman
          pengguna yang optimal.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterContainer} data-aos="fade-up">
        <button
          className={`${styles.filterBtn} ${
            activeFilter === "all" ? styles.filterBtnActive : ""
          }`}
          onClick={() => setActiveFilter("all")}
        >
          <FontAwesomeIcon icon={faLayerGroup} style={{ marginRight: "6px" }} />
          All Projects ({projectsData.length})
        </button>
        <button
          className={`${styles.filterBtn} ${
            activeFilter === "web" ? styles.filterBtnActive : ""
          }`}
          onClick={() => setActiveFilter("web")}
        >
          <FontAwesomeIcon icon={faGlobe} style={{ marginRight: "6px" }} />
          Web Applications
        </button>
        <button
          className={`${styles.filterBtn} ${
            activeFilter === "mobile" ? styles.filterBtnActive : ""
          }`}
          onClick={() => setActiveFilter("mobile")}
        >
          <FontAwesomeIcon icon={faMobileScreen} style={{ marginRight: "6px" }} />
          Mobile Apps
        </button>
      </div>

      {/* Projects Grid Showcase */}
      <div className={styles.projectsGrid}>
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className={styles.projectCard}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {/* Thumbnail Showcase */}
            <div className={styles.cardImageWrapper}>
              <span className={styles.cardTypeBadge}>
                {project.categoryLabel}
              </span>
              <img
                src={project.image}
                alt={project.title}
                className={
                  project.isMobile
                    ? styles.projectImageMobile
                    : styles.projectImage
                }
              />
            </div>

            {/* Content Details */}
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDescription}>{project.description}</p>

              {/* Tags */}
              <div className={styles.tagsList}>
                {project.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className={styles.tagPill}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className={styles.cardActions}>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnLive}
                  >
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    Live Demo
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnCode}
                >
                  <FontAwesomeIcon icon={faGithub} />
                  Source Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CV & Skills Section */}
      <div className={styles.skillsSection} data-aos="fade-up">
        <Row className={styles.skillsRow}>
          <Col lg={7} md={12} className={styles.skillsLeft}>
            <h2 className={styles.skillsSectionTitle}>
              Curriculum <span>Vitae</span> & Technical <span>Skills</span>
            </h2>
            <p className={styles.skillsDescription}>
              Fokus dan antusiasme terbesar saya berada pada bidang{" "}
              <strong style={{ color: "#d1bda0" }}>Front-End Development</strong>{" "}
              — saya sangat menyukai eksplorasi antarmuka web yang interaktif,
              estetik, dan dinamis. Saat ini saya paling aktif dan sering menggunakan{" "}
              <strong style={{ color: "#d1bda0" }}>Vue.js</strong> serta{" "}
              <strong style={{ color: "#d1bda0" }}>React.js</strong>.
              <br />
              <br />
              Di sisi lain, dengan pengalaman full-stack saya juga menguasai
              pengembangan backend & templating menggunakan{" "}
              <strong style={{ color: "#d1bda0" }}>Laravel</strong> (termasuk Blade
              frontend),{" "}
              <strong style={{ color: "#d1bda0" }}>CodeIgniter 4 (CI4)</strong> untuk
              backend maupun frontend, serta{" "}
              <strong style={{ color: "#d1bda0" }}>Express.js</strong> untuk
              arsitektur RESTful API yang cepat dan andal.
            </p>

            {/* Categorized Skills */}
            <div className={styles.skillsCategoriesWrapper}>
              {skillCategories.map((group, groupIdx) => (
                <div key={groupIdx} className={styles.skillCategoryGroup}>
                  <div className={styles.skillCategoryHeader}>
                    <span className={styles.skillCategoryTitle}>
                      {group.title}
                    </span>
                    <span className={styles.skillCategoryTagline}>
                      {group.tagline}
                    </span>
                  </div>
                  <div className={styles.skillPillsGroup}>
                    {group.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className={`${styles.skillPillItem} ${
                          skill.active ? styles.skillPillActive : ""
                        }`}
                      >
                        <span
                          className={`${styles.skillDot} ${
                            skill.active ? styles.activeDot : ""
                          }`}
                        ></span>
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CV Download Buttons */}
            <div className={styles.cvButtons}>
              <button
                className={styles.btnCvPrimary}
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1oUjXKnYQec0tQ16meux2p5wnGec7WZqI/view?usp=sharing",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <FontAwesomeIcon icon={faFileLines} />
                Design Resume (CV)
              </button>
              <button
                className={styles.btnCvOutline}
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/11GpbWpBv5W-Cheh5kNT_vhPyZ3bxw8B-/view?usp=sharing",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <FontAwesomeIcon icon={faDownload} />
                ATS Friendly CV
              </button>
            </div>
          </Col>

          <Col lg={5} md={12} className={styles.skillsRight}>
            <div className={styles.skillsIllustrationWrapper}>
              <Image
                src={require("../../assets/images/skills.png")}
                alt="Technical Skills Illustration"
                className={styles.skillsImg}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Portfolio;
