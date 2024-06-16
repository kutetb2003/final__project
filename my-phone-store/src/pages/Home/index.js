import SwiperComp from "../../Components/Swiper";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HrLine from "../../Components/HorizontalLine";
import "./style.scss";
import { useState, useEffect } from "react";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_ROOT } from "../utils/constants.js";
import { FaChevronRight } from "react-icons/fa";
import Popup from "../../Components/Popup";
import Cookies from "js-cookie";

const Home = () => {
  const [latestProduct, setLatestProduct] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_ROOT}/products`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLatestProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    let popupClosed = Cookies.get("popupClosed");
    if (!popupClosed) {
      Cookies.set("popupClosed", "false", { expires: 1 });
      popupClosed = "false";
    }

    if (popupClosed === "false") {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePopup = () => {
    Cookies.set("popupClosed", "true", { expires: 1 });
    setShowPopup(false);
  };

  return (
    <>
      <SwiperComp />
      {showPopup && <Popup onClose={handleClosePopup} />}
      <div className="latestProduct">
        <div className="latestProduct__header">
          <Container>
            <Row>
              <Col className="latestProduct__header__title">Latest Products</Col>
              <Col className="latestProduct__header__button">
                <FaChevronRight />
                <div className="latestProduct__header__button--active">
                  <Link to="/products">VIEW ALL PRODUCTS</Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <HrLine />
        <div className="latestProduct__list">
          <Container>
            <Row>
              {latestProduct.slice(-9).map((item, index) => (
                <Col lg={4} md={6} sm = {12} key={index}>
                    <div className="latestProduct__list__item">
                      <img src={item.thumbnail} alt={item.title} />
                      <div className="latestProduct__list__item__overall">
                        <div className="latestProduct__list__item__overall--title">
                          {item.title}
                        </div>
                        <div className="latestProduct__list__item__overall--price">
                          ${item.price}
                        </div>
                      </div>
                      <div className="latestProduct__list__description">
                        {item.description}
                      </div>
                    </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
      <div className="shortAbout">
        <div className="shortAbout__title">
          <Container>
            <Row>
              <Col>
                <div>About CELLPHONE SELLING</div>
              </Col>
            </Row>
          </Container>
        </div>
        <HrLine />
        <div className="shortAbout__content">
          <Container>
            <Row>
              <Col xl={6} lg={6} md={6}>
                <div className="shortAbout__content--title">
                  Discover the Best Mobile Devices
                </div>
                <div className="shortAbout__content--description">
                  Welcome to our store, your ultimate destination for the latest
                  and greatest mobile devices. Our template is free to use for
                  your business websites. However, please note that you do not
                  have permission to redistribute the downloadable ZIP file on
                  any template collection website. Contact us for more
                  information.
                </div>
                <ul>
                  <li>Cutting-edge smartphones</li>
                  <li>High-performance tablets</li>
                  <li>Accessories for every device</li>
                  <li>Expert customer service</li>
                  <li>Competitive prices and special offers</li>
                </ul>
                <Button id={"btnReadMore"} value={"Read More"} />
              </Col>
              <Col cl={6} lg={6} md={12}>
                <div className="shortAbout__content--image">
                  <img
                    src="https://templatemo.com/templates/templatemo_546_sixteen_clothing/assets/images/feature-image.jpg"
                    alt="Feature"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Home;
