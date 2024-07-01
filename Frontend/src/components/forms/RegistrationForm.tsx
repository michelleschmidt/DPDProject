import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios";
import GenericForm, { FormField } from "./GenericForm";
import "../../App.css";

interface Language {
  id: number;
  language_name: string;
}

interface RegistrationFormField extends FormField {
  onFieldChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<number>(1); // Default to English
  const [formFields, setFormFields] = useState<RegistrationFormField[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/api/search/languages")
      .then((response) => setLanguages(response.data))
      .catch((error) => console.error("Error fetching languages:", error));
  }, []);

  useEffect(() => {
    setFormFields(getRegistrationFields(selectedLanguage));
  }, [selectedLanguage, languages]);

  const handleLanguageChange = (
    name: string,
    value: string | string[] | Date | boolean | null
  ) => {
    if (name === "preferredLanguage" && typeof value === "string") {
      setSelectedLanguage(parseInt(value));
    }
  };

  const getRegistrationFields = (
    languageId: number
  ): RegistrationFormField[] => {
    const isFrench = languageId === 3;
    return [
      {
        name: "preferredLanguage",
        type: "select",
        label: isFrench ? "Langue Préférée" : "Preferred Language",
        optionsdb: languages.map((language) => ({
          value: language.id.toString(),
          label: language.language_name,
        })),
        placeholder: isFrench
          ? "Choisir la langue préférée"
          : "Select preferred language",
        multiple: false,
      },
      {
        name: "emailDoctor",
        type: "email",
        label: isFrench ? "Adresse e-mail" : "Email address",
        placeholder: isFrench ? "Entrer l'email" : "Enter email",
      },
      {
        name: "password",
        type: "password",
        label: isFrench ? "Mot de passe" : "Password",
        placeholder: isFrench ? "Entrer le mot de passe" : "Enter password",
      },
      {
        name: "title",
        type: "text",
        label: isFrench ? "Titre" : "Title",
        placeholder: isFrench ? "Dr, Mme, M., Prof" : "Dr, Ms., Mr, Prof",
      },
      {
        name: "first_name",
        type: "text",
        label: isFrench ? "Prénom" : "First Name",
        placeholder: isFrench ? "Entrer le prénom" : "Enter First name",
      },
      {
        name: "name",
        type: "text",
        label: isFrench ? "Nom de famille" : "Last Name",
        placeholder: isFrench ? "Entrer le nom de famille" : "Enter Last name",
      },
      {
        name: "dob",
        type: "date",
        label: isFrench ? "Date de naissance" : "Date of Birth",
        showTimeSelect: false,
      },
      {
        name: "postcode",
        type: "text",
        label: isFrench ? "Code postal" : "Postcode",
        placeholder: isFrench ? "Entrer le code postal" : "Enter postcode",
      },
      {
        name: "city",
        type: "text",
        label: isFrench ? "Ville" : "City",
        placeholder: isFrench ? "Entrer la ville" : "Enter City",
      },
      {
        name: "state",
        type: "text",
        label: isFrench ? "État" : "State",
        placeholder: isFrench ? "Entrer l'État" : "Enter State",
      },
      {
        name: "country",
        type: "text",
        label: isFrench ? "Pays" : "Country",
        placeholder: isFrench ? "Entrer le pays" : "Enter Country",
      },
      {
        name: "contactInformation",
        type: "text",
        label: isFrench ? "Informations de contact" : "Contact Information",
        placeholder: isFrench ? "+49 (0) 12368544" : "+49 (0) 12368544",
      },
      {
        name: "emergency_contact",
        type: "text",
        label: isFrench ? "Contact d'urgence" : "Emergency Contact Person",
        placeholder: isFrench ? "Entrer le nom" : "Enter Name",
      },
      {
        name: "relationship",
        type: "text",
        label: isFrench ? "Relation" : "Relationship",
        placeholder: isFrench ? "Frère, Père, Mère" : "Brother, Father, Mother",
      },
      {
        name: "phone_number",
        type: "text",
        label: isFrench ? "Numéro de téléphone" : "Phone Number",
        placeholder: isFrench ? "+49(0)1236547" : "+49(0)1236547",
      },
      {
        name: "street",
        type: "text",
        label: isFrench ? "Rue" : "Street",
        placeholder: isFrench
          ? "Entrer le nom de la rue et le numéro de maison"
          : "Enter street name and house number",
      },
      {
        name: "accessibilityNeeds",
        type: "text",
        label: isFrench ? "Besoins d'accessibilité" : "Accessibility Needs",
        placeholder: isFrench
          ? "Entrer les besoins d'accessibilité"
          : "Enter accessibility needs",
      },
    ];
  };

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
    <div className="regForm">
      <GenericForm
        fields={formFields}
        onSubmit={handleSubmit}
        buttonText={selectedLanguage === 3 ? "S'inscrire" : "Register"}
        onFieldChange={handleLanguageChange}
      />
    </div>
  );
};

export default RegistrationForm;
