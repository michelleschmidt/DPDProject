import React, { useState, useEffect } from "react";
import { Doctor } from "../features/admin/manageDoctors";
import axiosInstance from "../Axios";
import Select, { SingleValue, MultiValue } from "react-select";

interface EditDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
}

interface Language {
  id: number;
  language_name: string;
}

interface Specialization {
  id: number;
  area_of_specialization: string;
}

const EditDoctorModal: React.FC<EditDoctorModalProps> = ({
  isOpen,
  onClose,
  doctor,
}) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<number[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState<
    number | null
  >(null);

  const [formData, setFormData] = useState({
    title: "",
    first_name: "",
    last_name: "",
    street: "",
    postcode: "",
    city: "",
    state: "",
    country: "",
    phone_number: "",
    email: "",
    date_of_birth: "",
    specialization: null as SingleValue<{
      value: number;
      label: string;
    }> | null,
    languages: [] as { value: number; label: string }[],
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && doctor) {
      fetchDoctorDetails(doctor.id.toString());
    }
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
  }, [isOpen, doctor]);

  const fetchDoctorDetails = async (doctorId: string) => {
    try {
      setError(null);
      const response = await axiosInstance.get(`/api/users/doctor/${doctorId}`);
      const data = response.data;
      setFormData({
        title: data.title || "",
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        street: data.address?.street || "",
        postcode: data.address?.postcode || "",
        city: data.address?.city || "",
        state: data.address?.state || "",
        country: data.address?.country || "",
        phone_number: data.phone_number || "",
        email: data.email || "",
        date_of_birth: data.date_of_birth || "",
        specialization: data.specialization
          ? {
              value: data.specialization.id,
              label: data.specialization.area_of_specialization,
            }
          : null,
        languages: data.languages
          ? data.languages.map(
              (lang: { id: number; language_name: string }) => ({
                value: lang.id,
                label: lang.language_name,
              })
            )
          : [],
      });
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      setError("Failed to fetch doctor details. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSpecializationChange = (
    selectedOption: SingleValue<{ value: number; label: string }> | null
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      specialization: selectedOption,
    }));
  };

  const handleLanguageChange = (
    selectedOptions: MultiValue<{ value: number; label: string }>
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      languages: selectedOptions.map((option) => ({
        value: option.value,
        label: option.label,
      })),
    }));
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const updatedDoctor = {
        ...doctor!,
        title: formData.title,
        first_name: formData.first_name,
        last_name: formData.last_name,
        address: {
          street: formData.street,
          postcode: formData.postcode,
          city: formData.city,
          state: formData.state,
          country: formData.country,
        },
        phone_number: formData.phone_number,
        email: formData.email,
        date_of_birth: formData.date_of_birth,
        specialization: formData.specialization
          ? {
              id: formData.specialization.value,
              area_of_specialization: formData.specialization.label,
            }
          : null,
        languages: formData.languages.map((lang) => ({
          id: lang.value,
          language_name: lang.label,
        })),
      };

      const response = await axiosInstance.put(
        `/api/users/${updatedDoctor.id}`,
        updatedDoctor
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Doctor updated successfully");
        onClose();
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error: any) {
      console.error("Error updating doctor:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        setError(
          `Failed to update doctor. Server responded with: ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("Failed to update doctor. No response received from server.");
      } else {
        console.error("Error message:", error.message);
        setError(`Failed to update doctor: ${error.message}`);
      }
    }
  };

  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl w-2/3 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          Edit Doctor: {doctor.title} {doctor.first_name} {doctor.last_name}
        </h2>
        <form onSubmit={handleSaveChanges}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="street"
                className="block text-sm font-medium text-gray-700"
              >
                Street
              </label>
              <input
                type="text"
                id="street"
                value={formData.street}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="postcode"
                className="block text-sm font-medium text-gray-700"
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postcode"
                value={formData.postcode}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                value={formData.state}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                value={formData.country}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="specialization"
                className="block text-sm font-medium text-gray-700"
              >
                Specialization
              </label>
              <Select
                id="specialization"
                isMulti={false}
                value={formData.specialization}
                onChange={handleSpecializationChange}
                options={[
                  { value: 1, label: "Specialization 1" },
                  { value: 2, label: "Specialization 2" },
                  // Add more options as needed
                ]}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="languages"
                className="block text-sm font-medium text-gray-700"
              >
                Languages
              </label>
              <Select
                isMulti={true}
                id="languages"
                value={formData.languages}
                onChange={handleLanguageChange}
                options={[
                  { value: 1, label: "Language 1" },
                  { value: 2, label: "Language 2" },
                  // Add more options as needed
                ]}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
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

export default EditDoctorModal;
