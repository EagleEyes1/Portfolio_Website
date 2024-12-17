import React, { useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import AOS from "aos";
import styles from "./Portfolio.module.css";

const Portfolio = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <Container fluid className={styles.portcontent}>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className={styles.headport} data-aos="fade-down">
            <h4>Portfolio</h4>
            <h1>My Project</h1>
          </div>
          <div className={styles.swiper} data-aos="zoom-in">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              autoplay={{
                delay: 7000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                1400: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
              }}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              modules={[Autoplay, EffectCoverflow, Pagination]}
              onAutoplayTimeLeft={onAutoplayTimeLeft}
              className={styles.mySwiper}
            >
              <SwiperSlide className={styles.imgswipe}>
                <img
                  src={require("../../assets/images/mock1.png")}
                  alt="mock1"
                />
                <div className={styles.blockimg}>
                  <Button
                    onClick={() =>
                      window.open(
                        "https://github.com/EagleEyes1/Mini-Project",
                        "rel=noopener noreferrer"
                      )
                    }
                    variant="primary"
                  >
                    Check Code
                  </Button>
                </div>
              </SwiperSlide>
              <SwiperSlide className={styles.imgswipe}>
                <img
                  src={require("../../assets/images/mock2.png")}
                  alt="mock2"
                />
                <div className={styles.blockimg}>
                  <Button
                    onClick={() =>
                      window.open(
                        "https://github.com/Capstone-7/FrontEnd",
                        "rel=noopener noreferrer"
                      )
                    }
                    variant="primary"
                  >
                    Check Code
                  </Button>
                </div>
              </SwiperSlide>
              <SwiperSlide className={styles.imgswipe}>
                <img
                  src={require("../../assets/images/mock5.png")}
                  alt="mock3"
                />
                <div className={styles.blockimg}>
                  <Button
                    onClick={() =>
                      window.open(
                        "https://github.com/EagleEyes1/naktaraso",
                        "rel=noopener noreferrer"
                      )
                    }
                    variant="primary"
                  >
                    Check Code
                  </Button>
                </div>
              </SwiperSlide>
              <SwiperSlide className={styles.imgswipeandro}>
                <img
                  src={require("../../assets/images/mock4.png")}
                  alt="mock4"
                />
                <div className={styles.blockimgandro}>
                  <Button
                    onClick={() =>
                      window.open(
                        "https://github.com/MovieAppProgate/Kelompok9_MovieApp",
                        "rel=noopener noreferrer"
                      )
                    }
                    variant="primary"
                  >
                    Check Code
                  </Button>
                </div>
              </SwiperSlide>
              <div className={styles.autoplayprogress} slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
              </div>
            </Swiper>
          </div>
        </Col>
      </Row>
      <Row className={styles.skillcontent}>
        <Col lg={6} md={12} sm={12} className={styles.colcontent}>
          <div data-aos="fade-right">
            <h3 className={styles.titleskill}>
              <span>CV</span> and <span>Skills</span>
            </h3>
          </div>
          <div className={styles.titlep} data-aos="fade-right">
            <p>
              I am proficient in the process of creating application websites in
              the form of android, ios, or web. I can use flutter, reactjs, and
              can create RestAPI and consume it. below I attach two forms of my
              cv, please feel free to check.
            </p>
          </div>
          <div className={styles.cvbutton} data-aos="fade-right">
            <Button
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/1oUjXKnYQec0tQ16meux2p5wnGec7WZqI/view?usp=sharing",
                  "rel=noopener noreferrer"
                )
              }
              variant="primary"
            >
              Design CV
            </Button>
            <Button
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/11GpbWpBv5W-Cheh5kNT_vhPyZ3bxw8B-/view?usp=sharing",
                  "rel=noopener noreferrer"
                )
              }
              variant="primary"
            >
              ATS CV
            </Button>
          </div>
        </Col>
        <Col lg={6} md={12} sm={12} className={styles.imgcontent}>
          <Image
            data-aos="fade-left"
            src={require("../../assets/images/skills.png")}
            style={{
              width: "20vw",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Portfolio;
