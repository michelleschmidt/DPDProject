import React, { useEffect, useState } from "react";
import axiosInstance from "../../Axios";
import "react-datepicker/dist/react-datepicker.css";
import PatientForm from "./PatientForm";

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
}

const AddPatientModal: React.FC<AddPatientModalProps> = ({
  isOpen,
  onClose,
  onUpdateSuccess,
}) => {
  const handleSubmit = async (formData: any) => {
    try {
      const postData = {
        ...formData,
        address: {
          street: formData.street,
          postcode: formData.postcode,
          city: formData.city,
          state: formData.state,
          country: formData.country,
        },
        preferredLanguage: formData.preferredLanguage
          ? formData.preferredLanguage.value
          : null,
      };

      const response = await axiosInstance.post(
        "/api/users/admin-create",
        postData
      );
      console.log("Registration successful:", response.data);
      onClose();
      onUpdateSuccess();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl w-2/3 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add New Patient</h2>
        <PatientForm handleSubmit={handleSubmit} onClose={onClose} />
      </div>
    </div>
  );
};

export default AddPatientModal;
