import React from "react";
import axiosInstance from "./Axios"; // Import the Axios instance
import GenericForm, { FormField } from "./components/forms/GenericForm";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useHistory for redirection

interface AuthSideProps {
  onSubmit: (
    email: string,
    password: string,
    name: string,
    title: string,
    firstname: string,
    healthInsuranceType: string,
    dob: string,
    role: string,
    oneTimePassword: string,
    gender: string,
    preferredLanguage: string[],
    contactInformation?: string,
    emergencyContactDetails?: string,
    address?: string,
    accessibilityNeeds?: string
  ) => void;
}

const AuthSide: React.FC<AuthSideProps> = ({ onSubmit }) => {
  const history = useNavigate();
  const [isRegistration, setIsRegistration] = React.useState<boolean>(false);

  const handleNotRegisteredClick = () => {
    setIsRegistration(true);
  };

  const handleAlreadyRegisteredClick = () => {
    setIsRegistration(false);
  };

  const fields: FormField[] = [
    {
      name: "emailDoctor",
      type: "email",
      label: "Email address",
      placeholder: "Enter email",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
    },
  ];

  const registrationFields: FormField[] = [
    {
      name: "role",
      type: "select",
      label: "Register as",
      options: ["patient", "doctor"],
      placeholder: "Select role",
    },
    {
      name: "name",
      type: "text",
      label: "Full Name",
      placeholder: "Enter full name",
    },
    {
      name: "dob",
      type: "date",
      label: "Date of Birth",
      showTimeSelect: false, // Do not show time selection
    },
    {
      name: "contactInformation",
      type: "text",
      label: "Contact Information",
      placeholder: "Enter contact information",
    },
    {
      name: "emergencyContactDetails",
      type: "text",
      label: "Emergency Contact Details",
      placeholder: "Enter emergency contact details",
    },
    {
      name: "address",
      type: "text",
      label: "Address",
      placeholder: "Enter address",
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
        "nopreference",
      ],
      placeholder: "Select preferred language",
      multiple: true,
    },
    {
      name: "accessibilityNeeds",
      type: "text",
      label: "Accessibility Needs",
      placeholder: "Enter accessibility needs",
    },
    {
      name: "healthInsuranceType",
      type: "select",
      label: "Health Insurance Type",
      options: ["public", "private"],
      placeholder: "Select type",
    },
  ];

  const handleSubmit = (formData: any) => {
    if (isRegistration) {
      // Register request
      axiosInstance
        .post("/register", formData)
        .then((response) => {
          console.log("Registration successful:", response.data);
          // Redirect to dashboard after successful registration
          history("/dashboard");
        })
        .catch((error) => {
          console.error("Registration error:", error);
          // Handle registration error
        });
    } else {
      // Login request
      axiosInstance
        .post("/login", {
          email: formData.emailDoctor,
          password: formData.password,
        })
        .then((response) => {
          console.log("Login successful:", response.data);
          // Redirect to dashboard after successful login
          history("/dashboard");
        })
        .catch((error) => {
          console.error("Login error:", error);
          // Handle login error
        });
    }
  };

  return (
    <>
      <Header />
      <Button
        className="centered-button"
        variant="link"
        onClick={() => setIsRegistration(!isRegistration)}
      >
        {isRegistration ? "Already have an account? Sign In" : "Register Here"}
      </Button>
      {isRegistration ? (
        <GenericForm
          fields={registrationFields}
          onSubmit={handleSubmit}
          buttonText="Register"
        />
      ) : (
        <GenericForm
          fields={fields}
          onSubmit={handleSubmit}
          buttonText="Sign In"
        />
      )}
      <Footer />
    </>
  );
};

export default AuthSide;
