import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style.scss";
const HrLine = () => {
  return (
    <Container className = "HrLine">
      <Row>
        <Col className="HrLine__Element"></Col>
      </Row>
    </Container>
  );
};

export default HrLine;
