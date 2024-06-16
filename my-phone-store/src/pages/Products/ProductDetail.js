import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_ROOT } from "../utils/constants";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import HrLine from "../../Components/HorizontalLine";
import Button from "../../Components/Button";
import "./detail.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoStar } from "react-icons/io5";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    productId: "",
    reviewerName: "",
    content: "",
    email: "",
    rating: "",
  });
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_ROOT}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
        productId: id,
        rating: parseInt(formData.rating), // Cập nhật _id trong formData với giá trị từ useParams()
      };
      console.log(formData._id);
      const response = await axios.put(
        `${API_ROOT}/products/${id}`,
        updatedFormData
      );
      if (response.status === 201) {
        // Clear form data after successful submission
        setFormData({
          reviewerName: "",
          content: "",
          email: "",
          rating: null,
        });
        // Optionally, update product details after adding review
        const updatedProduct = await axios.get(`${API_ROOT}/products/${id}`);
        setProduct(updatedProduct.data);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      // Handle error appropriately (e.g., show error message to user)
    }
  };
  return (
    <>
      <div className="productDetail">
        <Container>
          <Row>
            <Col lg={4}>
              <img src={`${product.thumbnail}`} alt="product"></img>
            </Col>
            <Col lg={8}>
              <div className="productDetail__title">{`${product.title}`}</div>
              <div className="productDetail__description">{`${product.description}`}</div>
              <div className="productDetail__tag">Price</div>
              <div className="productDetail__price">${`${product.price}`}</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    name="reviewerName"
                    value={formData.reviewerName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="E-mail Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    type="text"
                    placeholder="Your Review"
                    className="contact__form__message"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    type="text"
                    placeholder="Rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button type="submit" value="Send Review"></Button>
              </Form>
            </Col>
          </Row>
          <h2>Reviews:</h2>
          {product.reviews.length !== 0 &&
            product.reviews.map((review) => (
              <>
                <Row>
                  <Col>
                    <div className="productDetail__review" key={review._id}>
                      <div className="productDetail__review__name">
                      <img src="https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528" />
                        <div>{review.reviewerName}</div>
                        
                      </div>
                      <div className="productDetail__review__box">
                        <div className="productDetail__review__box__rating">
                          <div>
                            {review.rating}
                          </div>
                          <IoStar className="productDetail__review__box__rating--yellow"/>
                        </div>
                        <div className="productDetail__review__box__content">
                          {review.content}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <HrLine />
              </>
            ))}
          <HrLine />
        </Container>
      </div>
    </>
  );
};

export default ProductDetail;
