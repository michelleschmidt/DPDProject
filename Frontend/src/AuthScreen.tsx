import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";

interface AuthSideProps {
  onSubmit: (
    email: string,
    password: string,
    name: string,
    healthInsuranceType: string,
    dob: string,
    role: string,
    emailDoctor: string,
    oneTimePassword: string,
    gender: string,
    preferredLanguage: string[],
    contactInformation?: string,
    emergencyContactDetails?: string,
    address?: string,
    accessibilityNeeds?: string
  ) => void;
}

const AuthSide: React.FC<AuthSideProps> = ({ onSubmit = () => {} }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [healthInsuranceType, setHealthInsuranceType] = useState<string>("");
  const [dob, setDOB] = useState<string>("");
  const [isRegistration, setIsRegistration] = useState<boolean>(false);
  const [role, setRole] = useState<string>("patient"); // New state for role
  const [emailDoctor, setEmailDoctor] = useState<string>("");
  const [oneTimePassword, setOneTimePassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [contactInformation, setContactInformation] = useState<string[]>([]);
  const [emergencyContactDetails, setEmergencyContactDetails] =
    useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [preferredLanguage, setPreferredLanguage] = useState<string[]>([]);
  const [accessibilityNeeds, setAccessibilityNeeds] = useState<string>("");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguages = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setPreferredLanguage(selectedLanguages);

    // If "No preferred language" is selected, deselect all other options
    if (selectedLanguages.includes("nopreference")) {
      setPreferredLanguage(["nopreference"]);
    } else {
      // Remove "nopreference" if it was selected before
      const updatedLanguages = preferredLanguage.filter(
        (lang) => lang !== "nopreference"
      );
      setPreferredLanguage(updatedLanguages);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // If no language selected, set "No preferred language"
    const languages =
      preferredLanguage.length === 0 ||
      preferredLanguage.includes("nopreference")
        ? undefined
        : preferredLanguage
            .filter((lang) => lang !== "nopreference")
            .join(", ");
    onSubmit(
      email,
      password,
      name, // Wrap single values in an array
      healthInsuranceType,
      dob,
      role,
      emailDoctor,
      oneTimePassword,
      gender,
      contactInformation,
      emergencyContactDetails,
      address,
      languages, // Pass the adjusted preferred languages here
      accessibilityNeeds
    );
  };

  const handleNotRegisteredClick = () => {
    setIsRegistration(true);
  };

  const handleAlreadyRegisteredClick = () => {
    setIsRegistration(false);
  };

  return (
    <>
      <Header />
      <Form onSubmit={handleSubmit} className="auth-form">
        {isRegistration ? (
          <>
            <Form.Group controlId="formRole">
              <Form.Label>Register as</Form.Label>
              <Form.Select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </Form.Select>
            </Form.Group>

            {role === "patient" && (
              <>
                <Form.Group controlId="formGender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="formName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formDOB">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter date of birth"
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formContactInformation">
                  <Form.Label>Contact Information</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter contact information"
                    value={contactInformation.join(", ")} // Join array elements into a string
                    onChange={(e) =>
                      setContactInformation(e.target.value.split(", "))
                    } // Split string into an array
                  />
                </Form.Group>

                <Form.Group controlId="formEmergencyContactDetails">
                  <Form.Label>Emergency Contact Details</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter emergency contact details"
                    value={emergencyContactDetails}
                    onChange={(e) => setEmergencyContactDetails(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formPreferredLanguage">
                  <Form.Label>Preferred Language</Form.Label>
                  <Form.Select
                    name="preferredLanguage"
                    multiple
                    value={preferredLanguage}
                    onChange={handleLanguageChange}
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="chinese">Chinese</option>
                    <option value="nopreference">
                      No preferred language required
                    </option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="formAccessibilityNeeds">
                  <Form.Label>Accessibility Needs</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter accessibility needs"
                    value={accessibilityNeeds}
                    onChange={(e) => setAccessibilityNeeds(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formHealthInsuranceType">
                  <Form.Label>Health Insurance Type</Form.Label>
                  <Form.Select
                    name="healthInsuranceType"
                    value={healthInsuranceType}
                    onChange={(e) => setHealthInsuranceType(e.target.value)}
                  >
                    <option value="">Select type</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}

            {role === "doctor" && (
              <>
                <Form.Group controlId="formEmailDoctor">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    value={emailDoctor}
                    onChange={(e) => setEmailDoctor(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formOneTimePassword">
                  <Form.Label>One Time Password</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter one-time password sent by us"
                    value={oneTimePassword}
                    onChange={(e) => setOneTimePassword(e.target.value)}
                  />
                </Form.Group>
              </>
            )}
          </>
        ) : (
          <>
            <Form.Group controlId="formEmailDoctor">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={emailDoctor}
                onChange={(e) => setEmailDoctor(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </>
        )}

        <Button variant="primary" type="submit" className="auth-button">
          {isRegistration ? "Register" : "Sign In"}
        </Button>

        {isRegistration ? (
          <Button variant="link" onClick={handleAlreadyRegisteredClick}>
            Already Registered?
          </Button>
        ) : (
          <Button variant="link" onClick={handleNotRegisteredClick}>
            Not Registered Yet?
          </Button>
        )}
      </Form>
      <Footer />
    </>
  );
};

export default AuthSide;
