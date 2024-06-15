import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_ROOT } from "../utils/constants.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HrLine from "../../Components/HorizontalLine";
import "./style.scss";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(id)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_ROOT}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>; // Xử lý khi không tìm thấy sản phẩm

  return (
    <div className="productDetail">
      <Container>
        <Row>
          <Col>
            <img src={product.thumbnail} alt={product.title} className="productDetail__image" />
          </Col>
          <Col>
            <div className="productDetail__info">
              <h1 className="productDetail__title">{product.title}</h1>
              <p className="productDetail__description">{product.description}</p>
              <p className="productDetail__price">Price: ${product.price}</p>
            </div>
          </Col>
        </Row>
        <HrLine />
      </Container>
    </div>
  );
};

export default ProductDetail;
