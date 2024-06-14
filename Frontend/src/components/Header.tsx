import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Image from "../assets/icon/LOGO.png";

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          <img
            src={Image}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="HealthHub logo"
          />
          HealthHub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/booking"
              disabled={location.pathname === "/"}
            >
              Booking
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/profile"
              disabled={location.pathname === "/"}
            >
              My Profile
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/logout"
              disabled={location.pathname === "/"}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
