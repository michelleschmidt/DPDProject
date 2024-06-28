import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Image from "../assets/icon/LOGO.png";

const Header: React.FC = () => {
  const location = useLocation();
  const isRootPath = location.pathname === "/";

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
          HealthConnect
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isRootPath && (
              <>
                <Nav.Link as={Link} to="/booking">
                  Patients
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Doctors
                </Nav.Link>
                <Nav.Link as={Link} to="/booking">
                  Live Translators
                </Nav.Link>
                <Nav.Link as={Link} to="/logout">
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
