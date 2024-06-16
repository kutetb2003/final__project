import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "../../Components/Button"; // Assuming correct path
import axios from "axios";
import Cookies from "js-cookie";
import { API_ROOT } from "../utils/constants";
import "./style.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Đặt isAdmin ban đầu là false
  const [dataAdmin, setDataAdmin] = useState([]); // Đặt dataAdmin ban đầu là một mảng rỗng

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.get(`${API_ROOT}/users`, {
        params: formData,
      });
      if (response.status === 200) {
        setIsLogin(true);
        if (response.data.user.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setError("Validation error: Please check your inputs.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLogin) {
      const form = document.querySelector("#form");
      form.classList.add("none");
    }
  }, [isLogin]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (isAdmin) {
          const response = await axios.get(`${API_ROOT}/contacts`);
          setDataAdmin(response.data);
          console.log("dataAdmin:", response.data);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    }

    fetchData();
  }, [isAdmin]);

  return (
    <>
      <div className="login" id="form">
        <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="User Name"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button type="submit" value="Log In"></Button>
                {error && <p className="error-message">{error}</p>}
              </Form>
            </Col>
            <Col lg={3}></Col>
          </Row>
        </Container>
      </div>
      {isLogin && !isAdmin && (
        <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              <div className="login__notification">
                Login successfully, happy shopping
              </div>
            </Col>
            <Col lg={3}></Col>
          </Row>
        </Container>
      )}
      {isLogin && isAdmin && (
        <Container>
          <Row>
            <Col>
              <h3 className="login__admin">Admin Dashboard</h3>
            </Col>
          </Row>
          <div>Comment of users</div>
          {dataAdmin.map((contact) => (
            <Row>
              <Col lg = {4}>
                <span>User Name : </span>
                <span className="login__user__name"> {`${contact.userName}`}</span>
              </Col>
              <Col lg = {8}>
                <div className = "login__user__mesage">Message : {`${contact.message}`}</div>
              </Col>
            </Row>
          ))}
        </Container>
      )}
    </>
  );
};

export default Login;
