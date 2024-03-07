import React, { useState, useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import AOS from "aos";
import styles from "./Contact.module.css";

const Contact = () => {
  const form = useRef();

  const [state, setState] = useState({
    fname: "",
    email: "",
    message: "",
  });

  const sendSubmit = (e) => {
    e.preventDefault();
    if (state.fname && state.email && state.message) {
      // console.log(state);
      Swal.fire({
        color: "#dce5e5",
        background: "#2c2d32",
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Send now!",
      }).then((result) => {
        if (result.isConfirmed) {
          emailjs
            .sendForm("service_nut4nlh", "template_nja011r", form.current, {
              publicKey: "UnEmWlvYUEi16i5sh",
            })
            .then(
              () => {
                Swal.fire({
                  color: "#dce5e5",
                  background: "#2c2d32",
                  title: "Sent!",
                  text: "Your file has been sent.",
                  icon: "success",
                });
              },
              (error) => {
                console.log("FAILED...", error.text);
              }
            );
        }
        setState({
          fname: "",
          email: "",
          message: "",
        });
        // console.log(state);
      });
    } else {
      Swal.fire({
        color: "#dce5e5",
        background: "#2c2d32",
        position: "top",
        title: "SweetAlert2 is working!",
        showConfirmButton: false,
      });
    }
  };

  const onChange = (e) => {
    // console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <Container fluid className={styles.contcontent}>
      <Row className={styles.controw}>
        <Col lg={6} md={12} sm={12} className={styles.floatform}>
          <Form ref={form} onSubmit={sendSubmit} data-aos="fade-right">
            <FloatingLabel label="Your Name" className={styles.nameinput}>
              <Form.Control
                onChange={onChange}
                name="fname"
                type="text"
                value={state.fname}
                placeholder="name"
                required
              />
            </FloatingLabel>
            <FloatingLabel label="Your Email" className={styles.nameinput}>
              <Form.Control
                onChange={onChange}
                name="email"
                type="email"
                value={state.email}
                placeholder="name@example.com"
                required
              />
            </FloatingLabel>
            <FloatingLabel className={styles.messinput} label="Message">
              <Form.Control
                onChange={onChange}
                name="message"
                value={state.message}
                as="textarea"
                placeholder="Leave a comment here"
                required
              />
            </FloatingLabel>
            <Button
              value="Send"
              type="submit"
              className={styles.button}
              variant="primary"
            >
              Send
            </Button>
          </Form>
        </Col>
        <Col lg={6} md={12} sm={12} className={styles.contactimg}>
          <Image
            data-aos="fade-left"
            src={require("../../assets/images/1.png")}
            style={{
              width: "41.2vw",
              paddingTop: "130px",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
