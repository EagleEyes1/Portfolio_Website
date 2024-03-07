import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./Navbars.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Navbars = () => {
  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container fluid className="ps-5 pe-5">
        <Navbar.Brand href="/">
          <span className={styles.fe}>FE</span>
          <span className={styles.titik}>.</span>
        </Navbar.Brand>
        <Navbar.Toggle
          className={styles.navbutton}
          aria-controls="navbarScroll"
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav className={styles.collapselink} navbarScroll>
            <Nav.Link className={styles.navhome} href="/">
              Home
            </Nav.Link>
            <Nav.Link className={styles.navport} href="/portfolio">
              Portfolio
            </Nav.Link>
            <Nav.Link className={styles.navcontact} href="/contact">
              Contact
            </Nav.Link>
          </Nav>
          <Nav className={styles.navcollapsetwo}>
            <Nav.Link className={styles.navslash} href="#" disabled>
              I
            </Nav.Link>
            <Nav.Link
              className={styles.navlinkedin}
              target="_blank"
              href="https://www.linkedin.com/in/fahd-erlangga-134133247/"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </Nav.Link>
            <Nav.Link
              className={styles.navinsta}
              target="_blank"
              href="https://www.instagram.com/fahd_erlangga/"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
