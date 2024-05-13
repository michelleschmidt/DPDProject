import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <Container fluid className="bg-light text-center">
      <p>
        &copy; {new Date().getFullYear()} Michelle Schmidt, Olivia Okoro, Sabine
        Kopp, Yesle Soh
      </p>
    </Container>
  );
}

export default Footer;
