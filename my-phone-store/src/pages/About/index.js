import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HrLine from "../../Components/HorizontalLine";
import Header from "../../Components/Header";
import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const About = () => {
  const backgroundUrl =
    "https://templatemo.com/templates/templatemo_546_sixteen_clothing/assets/images/about-heading.jpg";
  return (
    <>
      <div className="about">
        <Header title="About us" description="our team" url={backgroundUrl} />
        <div className="about__block">
          <Container>
            <Row>
              <Col>
                <div className="about__block__title">Our Background</div>
              </Col>
            </Row>
          </Container>
          <HrLine />
          <div className="about__block__content">
            <Container>
              <Row>
                <Col xl={6} lg={6}>
                  <div className="about__block__content__image">
                    <img src="https://templatemo.com/templates/templatemo_546_sixteen_clothing/assets/images/feature-image.jpg"></img>
                  </div>
                </Col>
                <Col xl={6} lg={6}>
                  <div className="about__block__content__paragraph">
                    <div className="about__block__content__paragraph__title">
                      Who we are & What we do?
                    </div>
                    <div className="about__block__content__paragraph__description--1">
                      We are a dynamic and innovative company dedicated to
                      providing top-tier solutions in the tech industry. Our
                      team consists of highly skilled professionals who are
                      passionate about leveraging technology to solve real-world
                      problems.
                    </div>
                    <div className="about__block__content__paragraph__description--2">
                      At our company, we specialize in developing cutting-edge
                      software and hardware solutions tailored to meet the
                      unique needs of our clients. From custom software
                      development to IT consulting, we offer a comprehensive
                      range of services designed to enhance operational
                      efficiency and drive business growth.
                    </div>
                    <HrLine />
                    <ul>
                      <li>
                        <FaFacebookF />
                      </li>
                      <li>
                        <FaTwitter />
                      </li>
                      <li>
                        <FaLinkedinIn />
                      </li>
                      <li>
                        <FaInstagram />
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div className="about__member">
          <Container>
            <Row>
              <Col>
                <div className="about__member__heading">
                  OUR TEAM MEMBER
                </div>
              </Col>
            </Row>
          </Container>
          <HrLine></HrLine>
          <Container>
            <Row>
              <Col xl = {4} lg = {4}>
                <div className="about__member__item">
                  <div className="about__member__item__image">
                    <img src = "https://templatemo.com/templates/templatemo_546_sixteen_clothing/assets/images/team_01.jpg"></img>
                  </div>
                  <div className="about__member__item__info">
                    <div className="about__member__item__info__name">
                      Tạ Xuân Thắng
                    </div>
                    <div className="about__member__item__info__position">
                      Tù trưởng
                    </div>
                    <div className="about__member__item__info__description">
                      A highly experienced professional who consistently strives for excellence in his work and continuously seeks to improve himself.
                    </div>
                  </div>
                </div>
              </Col>
              <Col xl = {4} lg = {4}>
                <div className="about__member__item">
                  <div className="about__member__item__image">
                    <img src = "https://templatemo.com/templates/templatemo_546_sixteen_clothing/assets/images/team_05.jpg"></img>
                  </div>
                  <div className="about__member__item__info">
                    <div className="about__member__item__info__name">
                      Trần Danh Kiệt
                    </div>
                    <div className="about__member__item__info__position">
                      Ceo
                    </div>
                    <div className="about__member__item__info__description">
                      A a dedicated and proactive team member, always ready to take on new challenges and contribute innovative ideas.
                    </div>
                  </div>
                </div>
              </Col>
              <Col xl = {4} lg = {4}>
                <div className="about__member__item">
                  <div className="about__member__item__image">
                    <img src = "https://templatemo.com/templates/templatemo_546_sixteen_clothing/assets/images/team_03.jpg"></img>
                  </div>
                  <div className="about__member__item__info">
                    <div className="about__member__item__info__name">
                      Hoàng Ngọc Thành
                    </div>
                    <div className="about__member__item__info__position">
                      Tù Phó
                    </div>
                    <div className="about__member__item__info__description">
                      A reliable and detail-oriented employee, known for her strong work ethic and commitment to delivering high-quality results.
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default About;
