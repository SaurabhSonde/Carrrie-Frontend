import React, { useState } from "react";
import { Form, Col, Row, Container, Button, Alert } from "react-bootstrap";
import { createTodo } from "../todo/helper/todo";
import { isAuthenticated } from "../auth/helper/index";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navigation from "../core/Navigation";
const CreateTodo = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    status: "",
    priority: "",
    error: "",
    success: false,
  });

  const { name, description, status, priority, error, success } = values;

  const {
    user: { _id },
    token,
  } = isAuthenticated();

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });
    createTodo(_id, token, values).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        errorMessage();
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          status: "",
          priority: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <Container>
      <Alert
        variant="success"
        className="mt-5 text-center"
        style={{ display: success ? "" : "none" }}
      >
        <h5>Todo created successfully</h5>
      </Alert>
    </Container>
  );

  const errorMessage = () => {
    <Container>
      <Alert
        variant="danger"
        className="mt-5 text-center"
        style={{ display: error ? "" : "none" }}
      >
        <h5>{error}</h5>
      </Alert>
    </Container>;
  };

  const createTodoForm = () => {
    return (
      <div>
        <Container>
          <h1
            className="text-center mt-4"
            style={{ color: "grey", fontWeight: "bold" }}
          >
            Create Todo
          </h1>
          <Row className="justify-content-md-center">
            <Col
              md={6}
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "grey",
              }}
              className="p-5 m-5"
            >
              <Form>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter Title"
                    onChange={handleChange("name")}
                    value={name}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Description"
                    onChange={handleChange("description")}
                    value={description}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    style={{ WebkitAppearance: "menulist" }}
                    onChange={handleChange("status")}
                    value={status}
                  >
                    <option>Pending</option>
                    <option>Half Done</option>
                    <option>Completed</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Priority</Form.Label>
                  <Form.Control
                    as="select"
                    style={{ WebkitAppearance: "menulist" }}
                    onChange={handleChange("priority")}
                    value={priority}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </Form.Control>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    marginTop: "10px",
                  }}
                  onClick={onSubmit}
                >
                  Create
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  return (
    <div>
      <Navigation />
      {createTodoForm()}
      {errorMessage()}
      {successMessage()}
    </div>
  );
};

export default CreateTodo;
