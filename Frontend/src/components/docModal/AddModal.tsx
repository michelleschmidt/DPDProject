import React from "react";
import axiosInstance from "../../Axios";
import DoctorForm, { FormData } from "./DoctorForm";

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
        <h2 className="text-xl font-bold mb-4">Add New Doctor</h2>
        <DoctorForm handleSubmit={handleRegister} onClose={onClose} />
      </div>
    </div>
  );
};

export default AddDoctorModal;
