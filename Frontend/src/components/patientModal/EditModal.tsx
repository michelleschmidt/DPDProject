import React, { useState, useEffect } from "react";
import axiosInstance from "../../Axios";
import { Patient } from "../../components/Types";

interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
  onUpdateSuccess: () => void;
}

const EditPatientModal: React.FC<EditPatientModalProps> = ({
  isOpen,
  onClose,
  patient,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    // Add other patient fields here
  });

  useEffect(() => {
    if (isOpen && patient) {
      setFormData({
        first_name: patient.first_name,
        last_name: patient.last_name,
        email: patient.email,
        phone_number: patient.phone_number || "",
        address: patient.address,
        // Initialize other patient fields here
      });
    }
  }, [isOpen, patient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/api/users/patients/${patient.id}`, formData);
      onUpdateSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Edit Patient</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <label htmlFor="phone_number">Phone Number</label>
        <input
          type="text"
          id="phone_number"
          value={formData.phone_number}
          onChange={handleInputChange}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={formData.address}
          onChange={handleInputChange}
        />
        {/* Add other fields here */}
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditPatientModal;
