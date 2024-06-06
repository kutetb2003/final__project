import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import exact from "prop-types-exact";
import "./style.scss";

const Header = ({ title, description, url }) => {
  return (
    <div className="heading" style={{ backgroundImage: `url(${url})` }}>
      <Container>
        <Row>
          <Col xl={12}>
            <h4>{title}</h4>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <h2>{description}</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

Header.propTypes = exact({
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
});

export default Header;
