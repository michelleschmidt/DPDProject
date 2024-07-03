import { Container } from "react-bootstrap";
import "../../App.css"; // Import your custom CSS file

interface FooterProps {
  isFixed: boolean; // Explicitly define the type of isFixed
}
function Footer({ isFixed }: FooterProps) {
  // Determine which CSS class to apply based on the prop
  const footerClass = isFixed ? "fixed-footer" : "relative-footer";

  return (
    <Container fluid className={`bg-light text-center ${footerClass}`}>
      <p>
        &copy; {new Date().getFullYear()} Michelle Schmidt, Olivia Okoro, Sabine
        Kopp, Yesle Soh
      </p>
    </Container>
  );
}

export default Footer;
