import React from "react";
import axiosInstance from "../../axios/Axios";
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
        password: formData.password,
        date_of_birth: formData.date_of_birth
          ? formData.date_of_birth.toISOString().split("T")[0]
          : null,
        phone_number: formData.phone_number,
        gender: formData.gender,
        insurance_type: formData.insurance_type || "public",
        address: {
          street: formData.address.street,
          postcode: formData.address.postcode,
          city: formData.address.city,
          state: formData.address.state,
          country: formData.address.country,
        },
        accessibility_needs: formData.accessibility_needs || "none",
        emergency_contact_details: formData.emergency_contact_details || null,
        languages: formData.languages.map((lang) => lang.value),
      };

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

      onClose();
      onUpdateSuccess();
    } catch (error: any) {
      console.error("Registration error:", error);
      let errorMessage = "An unexpected error occurred";
      if (error.response) {
        errorMessage =
          error.response.data.error ||
          error.response.data.message ||
          error.message;
      } else if (error.request) {
        errorMessage = "No response received from server";
      } else {
        errorMessage = error.message;
      }
      alert(`Registration failed: ${errorMessage}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Patient</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg
              className="w-6 h-6"
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
        <PatientForm handleSubmit={handleSubmit} onClose={onClose} />
      </div>
    </div>
  );
};

export default AddPatientModal;
