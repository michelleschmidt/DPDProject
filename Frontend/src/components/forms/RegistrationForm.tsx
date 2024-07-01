import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios";
import GenericForm, { FormField } from "./GenericForm";

interface Language {
  id: number;
  language_name: string;
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/api/search/languages")
      .then((response) => setLanguages(response.data))
      .catch((error) => console.error("Error fetching languages:", error));
  }, []);

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
      optionsdb: languages.map((language) => ({
        value: language.id.toString(), // Convert to string if number
        label: language.language_name,
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
    axiosInstance
      .post("/api/auth/register", formData)
      .then((response) => {
        console.log("Registration successful:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  return (
    <GenericForm
      fields={registrationFields}
      onSubmit={handleSubmit}
      buttonText="Register"
    />
  );
};

export default RegistrationForm;
