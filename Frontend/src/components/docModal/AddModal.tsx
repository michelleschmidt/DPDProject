import React, { useEffect, useState } from "react";
import axiosInstance from "../../Axios";
import Select, { MultiValue } from "react-select";
import { Specialization, Language } from "../Types";
import DoctorForm, { FormData } from "./DoctorForm"; // Ensure to import FormData from DoctorForm

interface AddDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDoctorModal: React.FC<AddDoctorModalProps> = ({ isOpen, onClose }) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<number[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState<
    number | null
  >(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    first_name: "",
    last_name: "",
    street: "",
    postcode: "",
    city: "",
    state: "",
    country: "",
    contact: "",
    email: "",
    date_of_birth: null,
    specialization: null,
    languages: [],
  });

  useEffect(() => {
    axiosInstance
      .get("/api/search/languages")
      .then((response) => setLanguages(response.data))
      .catch((error) => console.error("Error fetching languages:", error));

    axiosInstance
      .get("/api/search/specializations")
      .then((response) => setSpecializations(response.data))
      .catch((error) =>
        console.error("Error fetching specializations:", error)
      );
  }, []);

  const handleLanguageChange = (
    selectedOption: MultiValue<{ value: number; label: string }>
  ) => {
    const selectedValues = selectedOption
      ? selectedOption.map((option) => option.value)
      : [];
    setSelectedLanguages(selectedValues);
  };

  const handleSpecializationChange = (selectedOption: any) => {
    setSelectedSpecialization(selectedOption ? selectedOption.value : null);
  };

  const handleRegister = (formData: FormData) => {
    const postData = {
      ...formData,
      address: {
        street: formData.street,
        postcode: formData.postcode,
        city: formData.city,
        state: formData.state,
        country: formData.country,
      },
      specialization_id: selectedSpecialization,
      languages: selectedLanguages,
      role: "doctor",
    };

    axiosInstance
      .post("/api/users/admin-create", postData)
      .then((response) => {
        console.log("Registration successful:", response.data);
        onClose(); // Close modal after successful registration
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl w-2/3 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add New Doctor</h2>
        <DoctorForm
          handleSubmit={handleRegister}
          onClose={onClose} // Pass onClose handler to DoctorForm
        />
      </div>
    </div>
  );
};

export default AddDoctorModal;
