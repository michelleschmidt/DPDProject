import React, { useEffect, useState } from "react";
import axiosInstance from "./Axios"; // Import the Axios instance
import GenericForm, { FormField } from "./components/forms/GenericForm";
import Footer from "./components/Footer";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MapLogin from "./components/MapLogin";
import { useAuth } from "./components/auth/AuthContext";
import Header from "./components/Header";

interface UserLocation {
  latitude: number;
  longitude: number;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface User {
  id: number;
  email: string;
  role: string;
  language_name: string;
  address: string;
}

interface UserLocation {
  latitude: number;
  longitude: number;
}
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
  isRegistration: boolean;
}

interface Language {
  id: number;
  language_name: string;
}

interface Language {
  id: number;
  language_name: string;
}

const AuthSide: React.FC<AuthSideProps> = ({ onSubmit }) => {
  const history = useNavigate();
  const [isRegistration, setIsRegistration] = React.useState<boolean>(false);
  const { login } = useAuth();
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    // Fetch languages from the backend
    axiosInstance
      .get("/api/search/languages")
      .then((response) => setLanguages(response.data))
      .catch((error) => console.error("Error fetching languages:", error));
  }, []);

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
      name: "title",
      type: "text",
      label: "Title",
      placeholder: "Dr, Ms., Mr, Prof",
    },
    {
      name: "first_name",
      type: "text",
      label: "First Name",
      placeholder: "Enter First name",
    },
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
      name: "title",
      type: "text",
      label: "Title",
      placeholder: "Dr, Ms., Mr, Prof",
    },
    {
      name: "first_name",
      type: "text",
      label: "First Name",
      placeholder: "Enter First name",
    },
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
    {
      name: "name",
      type: "text",
      label: "last Name",
      placeholder: "Enter Last name",
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
      placeholder: "+49 (0) 12368544",
    },
    {
      name: "emergency_contact",
      type: "text",
      label: "Emergency Contact Person",
      placeholder: "Enter Name",
    },
    {
      name: "relationship",
      type: "text",
      label: "Relationship",
      placeholder: "Brother, Father, Mother",
      placeholder: "+49 (0) 12368544",
    },
    {
      name: "emergency_contact",
      type: "text",
      label: "Emergency Contact Person",
      placeholder: "Enter Name",
    },
    {
      name: "relationship",
      type: "text",
      label: "Relationship",
      placeholder: "Brother, Father, Mother",
    },
    {
      name: "phone_number",
      type: "text",
      label: "Phone Number",
      placeholder: "+49(0)1236547",
    },

    {
      name: "street",
      type: "text",
      label: "Street",
      placeholder: "Enter street name and house number",
    },
    {
      name: "postcode",
      type: "text",
      label: "Postcode",
      placeholder: "Enter postcode",
    },
    {
      name: "city",
      type: "text",
      label: "City",
      placeholder: "Enter City",
    },
    {
      name: "state",
      name: "phone_number",
      type: "text",
      label: "Phone Number",
      placeholder: "+49(0)1236547",
    },

    {
      name: "street",
      type: "text",
      label: "Street",
      placeholder: "Enter street name and house number",
    },
    {
      name: "postcode",
      type: "text",
      label: "Postcode",
      placeholder: "Enter postcode",
    },
    {
      name: "city",
      type: "text",
      label: "City",
      placeholder: "Enter City",
    },
    {
      name: "state",
      type: "text",
      label: "State",
      placeholder: "Enter State",
    },
    {
      name: "country",
      type: "text",
      label: "Country",
      placeholder: "Enter Country",
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
    console.log("Form Submitted with data:", formData); // Log form data

    if (isRegistration) {
      // Register request
      axiosInstance
        .post("/api/auth/register", formData)
        .then((response) => {
          console.log("Registration successful:", response.data);
          // Redirect to dashboard after successful registration
          history("/");
        })
        .catch((error) => {
          console.error("Registration error:", error);
          // Handle registration error
        });
    } else {
      // Login request
      axiosInstance
        .post("/api/auth/login", {
          email: formData.emailDoctor,
          password: formData.password,
        })
        .then((response) => {
          const { token, user } = response.data;
          console.log("Login successful:", response.data);
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          login(response.data.token);
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
    </div>
  );
};

export default AuthSide;
