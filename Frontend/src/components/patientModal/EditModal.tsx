import React, { useState, useEffect } from "react";
import axiosInstance from "../../Axios";
import { Patient, Language } from "../../components/Types";

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
  const [formData, setFormData] = useState<Patient>({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    role: "patient",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      postcode: "",
    },
    languages: [],
    title: "",
    phone_number: "",
    insurance: "",
  });

  useEffect(() => {
    if (isOpen && patient) {
      setFormData(patient);
    }
  }, [isOpen, patient]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: {
        ...prevFormData.address,
        [name]: value,
      },
    }));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguages = Array.from(
      e.target.selectedOptions,
      (option) => ({
        id: parseInt(option.value),
        language_name: option.text,
      })
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      languages: selectedLanguages,
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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Edit Patient</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="first_name" className="block mb-1">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="phone_number" className="block mb-1">
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="insurance" className="block mb-1">
              Insurance
            </label>
            <input
              type="text"
              id="insurance"
              name="insurance"
              value={formData.insurance}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Address</label>
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.address.street}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.address.state}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.address.country}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="postcode"
              placeholder="Postcode"
              value={formData.address.postcode}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="languages" className="block mb-1">
              Languages
            </label>
            <select
              multiple
              id="languages"
              name="languages"
              value={
                formData.languages?.map((lang) => lang.id.toString()) || []
              }
              onChange={handleLanguageChange}
              className="w-full p-2 border rounded"
            >
              {/* Add language options here */}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatientModal;
