import React, { useState, useEffect } from "react";
import { Form, Col, Row, Container, Button, Alert } from "react-bootstrap";
import { updateTodo, getTodoById } from "../todo/helper/todo";
import { isAuthenticated } from "../auth/helper/index";
import Navigation from "../core/Navigation";

const UpdateTodo = ({ match }) => {
  const {
    user: { _id },
    token,
  } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    status: "",
    priority: "",
    error: "",
    success: false,
  });

  const { name, description, status, priority, error, success } = values;

  //loading todo
  const loadTodos = (todoId) => {
    getTodoById(todoId, _id, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          status: data.status,
          priority: data.priority,
          error: "",
        });
      }
    });
  };

  useEffect(() => {
    loadTodos(match.params.todoId);
  }, []);

  //on submit
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });
    updateTodo(match.params.todoId, _id, token, values).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
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

  //handle change
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  //success message
  const successMessage = () => (
    <Container>
      <Alert
        variant="success"
        className="mt-5 text-center"
        style={{ display: success ? "" : "none" }}
      >
        <h5>Todo updated successfully</h5>
      </Alert>
    </Container>
  );

  //error message
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

  //todo update form
  const updateTodoForm = () => {
    return (
      <div>
        <Container>
          <h1
            className="text-center mt-4"
            style={{ color: "grey", fontWeight: "bold" }}
          >
            Update Todo
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
                  Update
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
      {updateTodoForm()}
      {errorMessage()}
      {successMessage()}
    </div>
  );
};

export default UpdateTodo;
