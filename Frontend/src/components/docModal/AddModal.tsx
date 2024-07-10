import React from "react";
import axiosInstance from "../../axios/Axios";
import DoctorForm, { FormData } from "./DoctorForm";
import Button from "../../utils/Button";

interface AddDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDoctorModal: React.FC<AddDoctorModalProps> = ({ isOpen, onClose }) => {
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
      date_of_birth: formData.date_of_birth
        ? formData.date_of_birth.toISOString().split("T")[0]
        : null,
      specialization_id: formData.specialization?.value,
      languages: formData.languages.map((lang) => lang.value),
      role: "doctor",
    };

    axiosInstance
      .post("/api/users/admin-create", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Doctor</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <DoctorForm handleSubmit={handleRegister} onClose={onClose} />
      </div>
    </div>
  );
};

export default AddDoctorModal;
