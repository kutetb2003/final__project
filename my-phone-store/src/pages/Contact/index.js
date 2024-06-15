import React, { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HrLine from "../../Components/HorizontalLine";
import Header from "../../Components/Header";
import Button from "../../Components/Button";
import Form from "react-bootstrap/Form";
import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { API_ROOT } from "../utils/constants.js";

const Contact = () => {
  const [formData, setFormData] = useState({
    userName: "",
    emailAddress: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(`${API_ROOT}/contacts`, formData);
      if (response.status === 201) {
        setFormData({ userName: "", emailAddress: "", message: "" });
        setSuccess("Your message has been sent successfully!");
        console.log("success", success);
      }

    } catch (error) {
      setError("There was an error sending your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const backgroundUrl =
    "https://templatemo.com/templates/templatemo_546_sixteen_clothing/assets/images/contact-heading.jpg";

  return (
    <>
      <div className="contact">
        <Header
          title="CONTACT US"
          description="LET’S GET IN TOUCH"
          url={backgroundUrl}
        />
        <div className="contact__block">
          <Container>
            <Row>
              <Col>
                <div className="contact__block__heading">Our Location On Maps</div>
              </Col>
            </Row>
          </Container>
          <HrLine />
          <Container>
            <Row>
              <Col xl={8} lg={8}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8858.8622680493!2d105.7588698630447!3d21.00494940694133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad3f5eb40863%3A0xdcd0af3100a5065b!2sVincom%20Mega%20Mall%20Smart%20City!5e0!3m2!1svi!2s!4v1717654359695!5m2!1svi!2s"
                  width="100%"
                  height="80%"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Col>
              <Col xl={4} lg={4}>
                <h4 className="contact__block__title">About our office</h4>
                <div className="contact__block__description--1">
                  Our office is designed to foster creativity and collaboration
                  among team members. Located in the heart of the city, the space
                  features an open-plan layout with modern furnishings and plenty
                  of natural light.
                </div>
                <div className="contact__block__description--2">
                  The office culture is centered around inclusivity and mutual
                  respect, creating a welcoming environment for everyone. Regular
                  team-building activities and social events help strengthen
                  relationships and build a sense of community among staff.
                </div>
                <HrLine />
                <ul>
                  <li><FaFacebookF /></li>
                  <li><FaTwitter /></li>
                  <li><FaLinkedinIn /></li>
                  <li><FaInstagram /></li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="contact__form">
          <div className="contact__form__heading">
            <Container>
              <Row>
                <Col>Send Us A Message</Col>
              </Row>
            </Container>
          </div>
          <HrLine />
          <div className="contact__form__block">
            <Container>
              <Row>
                <Col xl={8} lg={8}>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Full Name"
                        name="userName"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="email"
                        placeholder="E-mail Address"
                        name="emailAddress"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        as="textarea"
                        type="text"
                        placeholder="Your Message"
                        className="contact__form__message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Button type="submit" value="Send Message" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </Form>
                  {error && <div className="error">{error}</div>}
                  {success && <div className="success">{success}</div>}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;