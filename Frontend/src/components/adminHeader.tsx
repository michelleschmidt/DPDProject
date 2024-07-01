import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import "../App.css";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg" className="flex-column sidebar">
      <Navbar.Brand>Admin Dashboard</Navbar.Brand>
      <Nav className="flex-column">
        <Nav.Link onClick={() => navigate("/admindashboard")}>
          Dashboard
        </Nav.Link>
        <Nav.Link onClick={() => navigate("/appointments")}>
          Appointments
        </Nav.Link>
        <Nav.Link onClick={() => navigate("/doctors")}>Doctors</Nav.Link>
        <Nav.Link onClick={() => navigate("/patients")}>Patients</Nav.Link>
        <Nav.Link onClick={() => navigate("/settings")}>Settings</Nav.Link>
      </Nav>
      <Button variant="danger" className="mt-3 logout-button">
        Logout
      </Button>
    </Navbar>
  );
};

export default Sidebar;
