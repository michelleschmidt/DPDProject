import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import GenericForm, { FormField } from "../../components/forms/GenericForm";

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
    preferredLanguage: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (formData: any) => {
    // Call API to update user profile
    // For demo purposes, just log the updated user data
    console.log("Updated user data:", formData);
    setSuccess("Profile updated successfully!");
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
      options: [
        "English",
        "Spanish",
        "French",
        "German",
        "Chinese",
        "Arabic",
        "No Preference",
      ],
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
      <Footer />
    </Container>
  );
};

export default ProfileScreen;
