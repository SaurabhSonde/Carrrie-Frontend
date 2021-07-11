import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { getAllTodosById, deleteTodo } from "../todo/helper/todo";
import Navigation from "../core/Navigation";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    user: { _id },
    token,
  } = isAuthenticated();

  //loading all todos
  const loadTodos = () => {
    getAllTodosById(_id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError(false);
        setTodos(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      loadTodos();
    }, 150);
  }, []);

  //delete todo
  const deleteTheTodo = (todoId) => {
    deleteTodo(todoId, _id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        loadTodos();
      }
    });
  };

  //error message
  const errorMessage = () => (
    <Container>
      <Alert
        variant="danger"
        className="mt-5 text-center"
        style={{ display: error ? "" : "none" }}
      >
        <h5>{error}</h5>
        <h6
          style={{
            marginTop: "10px",
            color: "grey",
            fontWeight: "bold",
          }}
        >
          (<Link to="/user/create/todo">Create Here</Link>)
        </h6>
      </Alert>
    </Container>
  );

  //loading method
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

  //listing all users todo
  const todoListing = () => {
    return (
      <div>
        <Container style={{ marginTop: "30px" }}>
          <Row>
            <Col>
              <h5>Title</h5>
            </Col>
            <Col>
              <h4>Description</h4>
            </Col>
            <Col>
              <h4>Status</h4>
            </Col>
            <Col>
              <h4>Priority</h4>
            </Col>
            <Col></Col>
          </Row>
          {todos.map((todo, index) => {
            return (
              <ListGroup key={index}>
                <ListGroupItem variant="info" style={{ marginTop: "10px" }}>
                  <Row>
                    <Col>
                      <h5>{todo.name}</h5>
                    </Col>
                    <Col>
                      <p>{todo.description}</p>
                    </Col>
                    <Col>
                      <h4>{todo.status}</h4>
                    </Col>
                    <Col>
                      <h4>{todo.priority}</h4>
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <Link to={`/user/update/todo/${todo._id}/${_id}`}>
                        <i className="bi bi-pencil-square"></i>
                      </Link>

                      <i
                        className="bi bi-trash"
                        style={{
                          marginLeft: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          deleteTheTodo(todo._id);
                        }}
                      ></i>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            );
          })}
        </Container>
      </div>
    );
  };

  return (
    <div>
      <Navigation />
      {error ? (
        <div>{errorMessage()}</div>
      ) : (
        <div>
          {todoListing()}
          {loadingMessage()}
        </div>
      )}
    </div>
  );
};

export default Todo;
