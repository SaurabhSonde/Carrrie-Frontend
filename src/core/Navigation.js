import React from "react";
import "./css/Navigation.css";
import { Navbar, Nav } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";

const Navigation = () => {
  const {
    user: { name, email },
  } = isAuthenticated();
  return (
    <Navbar collapseOnSelect expand="lg" className="navigation">
      <Navbar.Brand>
        <Link to="/user/todo" className="logo">
          To<span>do</span>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="primary-nav mr-auto">
          <i className="bi bi-person-circle"></i>
          <Link to="/user/todo">{name}</Link>
          <i className="bi bi-envelope"></i>
          <Link to="/user/todo">{email}</Link>
        </Nav>
        <Nav className="secondary-nav">
          <Link to="/user/create/todo">
            <i className="bi bi-plus"></i>
          </Link>
          {isAuthenticated() && (
            <Link to="/signin">
              <i
                className="bi bi-box-arrow-right"
                onClick={() => {
                  signout(() => {
                    <Redirect to="/signin" />;
                  });
                }}
              ></i>
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
