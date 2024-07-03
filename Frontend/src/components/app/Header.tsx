import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Image from "../../assets/icon/LOGO.png";
import { useAuth } from "../auth/AuthContext";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRootPath = location.pathname === "/";
  const { logout } = useAuth(); // Destructure logout from useAuth

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to the root path after logging out
  };

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
                  Booking
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  My Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/" onClick={handleLogout}>
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
