import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import styles from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const toPort = () => {
    navigate("/portfolio");
  };

  const toContact = () => {
    navigate("/contact");
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <Container fluid className={styles.content}>
      <Row>
        <Col lg={3} md={6} sm={12} className={styles.homename}>
          <div data-aos="fade-right">
            <p className={styles.name}>
              Fahd Erlangga
              <br /> Braja Musti <span className={styles.dot}>.</span>
            </p>
            <hr className={styles.line} />
          </div>
          <div data-aos="fade-right" style={{ paddingTop: "30px" }}>
            <button onClick={toContact} className={styles.bcontact}>
              Contact Me
            </button>
          </div>
        </Col>
        <Col lg={6} md={6} sm={12} className={styles.homeimg}>
          <Image
            className={styles.images}
            data-aos="fade-up"
            src={require("../../assets/images/photo2.png")}
            style={{
              width: "41.2vw",
              paddingTop: "130px",
            }}
          />
        </Col>
        <Col lg={3} md={12} sm={12} className={styles.homedesc}>
          <div className={styles.titlejob} data-aos="fade-left">
            <h5>Introduction</h5>
            <h3>FullStack Developer</h3>
          </div>
          <div className={styles.descjob} data-aos="fade-left">
            <p>
              I am a recent graduate specializing in front-end as well as
              back-end development, I have a strong understanding of Flutter and
              ReactJs to React Native. I can also make RestAPI and consume it.
              Although I may be new to this field, I bring a new perspective and
              a hunger to learn and grow.
            </p>
          </div>
          <div className={styles.more} data-aos="fade-left">
            <p onClick={toPort}>
              See More <FontAwesomeIcon icon={faArrowDown} />
            </p>
          </div>
        </Col>
      </Row>
      {/* </Container> */}
    </Container>
  );
};

export default Home;
