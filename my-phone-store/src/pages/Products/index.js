import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HrLine from "../../Components/HorizontalLine";
import Header from "../../Components/Header";
import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import { API_ROOT } from "../utils/constants.js";
import { Link } from "react-router-dom";
const Products = () => {
  const limit = 6;
  const [data, setData] = useState([]);
  const [pageActive, setPageActive] = useState(0);
  const [quantityPage, setQuantityPage] = useState(0);
  const [url, setUrl] = useState(`${API_ROOT}/products`);
  const [categoryActive, setCategoryActive] = useState("");
  useEffect(() => {
    fetchData(url);
  }, [url, pageActive]);

  const fetchData = async (url) => {
    try {
      const response1 = await fetch(url);
      const response2 = await fetch(
        `${url}${url.includes("?") ? "&" : "?"}_start=${
          limit * pageActive
        }&_limit=${limit}`
      );
      console.log(`${url}`);
      console.log(
        `${url}${url.includes("?") ? "&" : "?"}_start=${
          limit * pageActive
        }&_limit=${limit}`
      );
      if (!response1.ok || !response2.ok) {
        throw new Error("Network response was not ok");
      }

      const result1 = await response1.json();
      const result2 = await response2.json();
      setData(result2);
      setQuantityPage(Math.ceil(result1.length / limit));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFetchProduct = (brand) => {
    setPageActive(0);
    setCategoryActive(brand);
    setUrl(
      brand ? `${API_ROOT}/products?brand=${brand}` : `${API_ROOT}/products`
    );
  };

  const handleClickPagi = (e) => {
    setPageActive(e);
  };

  console.log(data);
  const backgroundUrl =
    "https://templatemo.com/templates/templatemo_546_sixteen_clothing/assets/images/products-heading.jpg";
  return (
    <>
      <div className="products" style={{ background: `url(${backgroundUrl})` }}>
        <Header
          title="NEW ARRIVALS"
          description="CELLPHONE PRODUCTS"
          url={backgroundUrl}
        />
      </div>
      <Outlet />
      <div className="product">
        <Container>
          <Row>
            <Col md={12}>
              <ul>
                <li
                  onClick={() => handleFetchProduct("")}
                  className={categoryActive === "" ? "product__active" : "zxc"}
                >
                  All Products
                </li>
                <li
                  onClick={() => handleFetchProduct("iphone")}
                  className={
                    categoryActive === "iphone" ? "product__active" : ""
                  }
                >
                  Iphone
                </li>
                <li
                  onClick={() => handleFetchProduct("samsung")}
                  className={
                    categoryActive === "samsung" ? "product__active" : ""
                  }
                >
                  Samsung
                </li>
                <li
                  onClick={() => handleFetchProduct("oppo")}
                  className={categoryActive === "oppo" ? "product__active" : ""}
                >
                  Oppo
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
        <HrLine />
        <Container>
          <Row>
            {data.map((item) => (
              <Col xl={4} lg={4} key={item.id}>
                <Link className = "link" to={`/products/detail/${item._id}`}>
                  <div className="product__all__item">
                    <img src={item.thumbnail} alt={item.title} />
                    <div className="product__all__item__overall">
                      <div className="product__all__item__overall--title">
                        {item.title}
                      </div>
                      <div className="product__all__item__overall--price">
                        ${item.price}
                      </div>
                    </div>
                    <div className="product__all__item__description">
                      {item.description}
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <ul className="pagination">
        {[...Array(quantityPage)].map((_, index) => {
          if (index >= pageActive - 1 && index <= pageActive + 2) {
            return (
              <li
                key={index}
                onClick={() => handleClickPagi(index)}
                className={pageActive === index ? "pagination--active" : ""}
              >
                {index + 1}
              </li>
            );
          }
          return null; // Nếu không thỏa mãn điều kiện, trả về null để không render
        })}
      </ul>
    </>
  );
};

export default Products;
