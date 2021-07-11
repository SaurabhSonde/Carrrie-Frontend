import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const { email, password, error, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values });
          });
        }
      })
      .catch(console.log("Signin request failed"));
  };
  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Redirect to="/user/todo" />;
    }
  };
  const loadingMessage = () => {
    return (
      loading && (
        <Container>
          <Alert variant="info" className="mt-5 text-center">
            <h2>Loading...</h2>
          </Alert>
        </Container>
      )
    );
  };
  const errorMessage = () => (
    <Container>
      <Alert
        variant="danger"
        className="mt-5 text-center"
        style={{ display: error ? "" : "none" }}
      >
        <h5>{error}</h5>
      </Alert>
    </Container>
  );
  const signinForm = () => {
    return (
      <div>
        <Container>
          <h1
            className="text-center mt-4"
            style={{ color: "grey", fontWeight: "bold" }}
          >
            Signin Here
          </h1>
          <Row className="justify-content-md-center">
            <Col
              md={6}
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "grey",
              }}
              className="p-5"
            >
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={handleChange("email")}
                    value={email}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={handleChange("password")}
                    value={password}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={onSubmit}
                  style={{
                    marginTop: "10px",
                  }}
                >
                  Signin
                </Button>
              </Form>
              <h6
                style={{
                  marginTop: "10px",
                  color: "grey",
                  fontWeight: "bold",
                }}
              >
                Don't have an account.Please (<Link to="/">Signup Here</Link>)
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
  return (
    <div>
      {signinForm()}
      {performRedirect()}
      {loadingMessage()}
      {errorMessage()}
    </div>
  );
};

export default Signin;
