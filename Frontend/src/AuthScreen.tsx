import React, { useEffect, useState } from "react";
import axiosInstance from "./Axios"; // Import the Axios instance
import GenericForm, { FormField } from "./components/forms/GenericForm";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Map from "./components/Map";

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

const AuthSide: React.FC<AuthSideProps> = ({ onSubmit }) => {
  const history = useNavigate();
  const [isRegistration, setIsRegistration] = React.useState<boolean>(false);
  const [languages, setLanguages] = useState<Language[]>([]);
  const handleNotRegisteredClick = () => {
    setIsRegistration(true);
  };

  const handleAlreadyRegisteredClick = () => {
    setIsRegistration(false);
  };

  useEffect(() => {
    // Fetch languages from the backend
    axiosInstance.get('/api/search/languages')
      .then(response => setLanguages(response.data))
      .catch(error => console.error('Error fetching languages:', error));
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
      optionsdb: languages.map(language => ({
        value: language.id.toString(), // Convert to string if number
        label: language.language_name
      })),
      placeholder: "Select preferred language",
      multiple: true,
    },
    {
      name: "accessibilityNeeds",
      type: "text",
      label: "Accessibility Needs",
      placeholder: "Enter accessibility needs",
    },
    // {
    //   name: "healthInsuranceType",
    //   type: "select",
    //   label: "Health Insurance Type",
    //   options: ["public", "private"],
    //   placeholder: "Select type",
    // },
  ];






  const handleSubmit = (formData: any) => {
    if (isRegistration) {
      // Register request
      axiosInstance
        .post("https://health-connect-kyp7.onrender.com/api/auth/register", {


          title: formData.title, // Assuming title is a constant or derived from other fields
          first_name: formData.first_name,
          last_name: formData.name,
          date_of_birth: formData.dob,
          phone_number: formData.contactInformation,
          email: formData.emailDoctor,
          password: formData.password,
          role: formData.role,
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            postcode: formData.postcode,
            country: formData.country
          },
          accessibility_needs: formData.accessibilityNeeds,
          emergency_contact_details: {
            name: formData.emergency_contact,
            relationship: formData.relationship,
            phone_number: formData.phone_number
          },
          languages: formData.preferredLanguage
        })
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

      <div className="centered-button">
              <Button
        variant="link"
        onClick={() => setIsRegistration(!isRegistration)}
      >
        {isRegistration ? "Already have an account? Sign In" : "Register Here"}
      </Button>
      </div>
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
         
          <div className="map-container-login">
            <Map radius={0} setUserLocation={function (value: React.SetStateAction<UserLocation | null>): void {
            throw new Error("Function not implemented.");
          } }            />
          </div>
        
      <Footer />
    </>
  );
};

export default AuthSide;
