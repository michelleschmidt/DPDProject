import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import GenericForm, { FormField } from "../../components/forms/GenericForm";
import axiosInstance from "../../Axios";

const ProfileScreen = () => {
  const [user, setUser] = useState({
    contactInfo: {
      phoneNumber: "",
      email: "",
    },
    emergencyContact: {
      name: "",
      phoneNumber: "",
    },
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    preferredLanguage: [],
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [languages, setLanguages] = useState<
    { id: number; language_name: string }[]
  >([]);

  axiosInstance
    .get("/api/users/:id")
    .then((response) => {
      setUser(response.data);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      setError("Failed to load user data");
    });

  useEffect(() => {
    // Fetch languages
    axiosInstance
      .get("/api/search/languages")
      .then((response) => setLanguages(response.data))
      .catch((error) => console.error("Error fetching languages:", error));
  }, []);

  const handleSubmit = (formData: any) => {
    axiosInstance
      .put("/api/users/:id", formData)
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
        setSuccess("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Profile update error:", error);
        setError("Failed to update profile");
      });
  };

  const fields: FormField[] = [
    {
      name: "contactInfo.phoneNumber",
      type: "text",
      label: "Phone Number",
      placeholder: "Phone Number",
    },
    {
      name: "contactInfo.email",
      type: "email",
      label: "Email",
      placeholder: "Email",
    },
    {
      name: "emergencyContact.name",
      type: "text",
      label: "Emergency Contact Name",
      placeholder: "Emergency Contact Name",
    },
    {
      name: "emergencyContact.phoneNumber",
      type: "text",
      label: "Emergency Contact Phone Number",
      placeholder: "Emergency Contact Phone Number",
    },
    {
      name: "address.street",
      type: "text",
      label: "Street",
      placeholder: "Street",
    },
    {
      name: "address.city",
      type: "text",
      label: "City",
      placeholder: "City",
    },
    {
      name: "address.zip",
      type: "text",
      label: "Zip",
      placeholder: "Zip",
    },
    {
      name: "preferredLanguage",
      type: "select",
      label: "Preferred Language",
      options: languages.map((lang) => lang.language_name),
      placeholder: "Select preferred language",
      multiple: true,
    },
    {
      name: "newPassword",
      type: "password",
      label: "New Password",
      placeholder: "New Password",
    },
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm Password",
    },
  ];

  return (
    <Container>
      <Header />
      <Row>
        <Col md={6} className="mx-auto">
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <GenericForm
            fields={fields}
            onSubmit={handleSubmit}
            buttonText="Update Profile"
            initialData={user}
          />
        </Col>
      </Row>
      <Footer isFixed={false} />
    </Container>
  );
};

export default ProfileScreen;
