import React, { useEffect, useState } from "react";
import axiosInstance from "../../Axios";
import "react-datepicker/dist/react-datepicker.css";
import PatientForm, { FormData } from "./PatientForm";

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
  const handleSubmit = async (formData: FormData) => {
    try {
      const postData = {
        title: formData.title,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password, // Make sure this is included in your FormData
        date_of_birth: formData.dob
          ? formData.dob.toISOString().split("T")[0]
          : null,
        phone_number: formData.phone_number,
        gender: formData.gender, // Make sure this is included in your FormData
        insurance_type: formData.insuranceType || "public",
        address: {
          street: formData.street,
          postcode: formData.postcode,
          city: formData.city,
          state: formData.state,
          country: formData.country,
        },
        accessibility_needs: formData.accessibilityNeeds || "none",
        emergency_contact_details: formData.emergency_contact || null,
        language: formData.preferredLanguage?.value,
      };
      console.log("Submitting data:", postData);

      const token = localStorage.getItem("token");

      const response = await axiosInstance.post(
        "/api/auth/register",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("Registration successful:", response.data);
      onClose();
      onUpdateSuccess();
    } catch (error: any) {
      console.error("Registration error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        alert(
          `Registration failed: ${
            error.response.data.error ||
            error.response.data.message ||
            error.message
          }`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("Registration failed: No response received from server");
      } else {
        console.error("Error message:", error.message);
        alert(`Registration failed: ${error.message}`);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl w-2/3 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Patient</h2>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
        <PatientForm handleSubmit={handleSubmit} onClose={onClose} />
      </div>
    </div>
  );
};

export default AddPatientModal;
