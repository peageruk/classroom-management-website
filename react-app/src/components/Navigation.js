import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("token"));
  });
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    console.log("logged out");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link as={NavLink} to="/account">
                  Account
                </Nav.Link>
                <Nav.Link as={NavLink} to="/zoom">
                  Zoom
                </Nav.Link>
                <Nav.Link as={NavLink} to="/class">
                  Class
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
