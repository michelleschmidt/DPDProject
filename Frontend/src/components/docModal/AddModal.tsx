import React, { useEffect, useState } from "react";
import axiosInstance from "../../Axios";
import Select from "react-select";
import { Specialization, Language } from "../Types";

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
  const [formData, setFormData] = useState({
    title: "",
    first_name: "",
    last_name: "",
    street: "",
    postalcode: "",
    city: "",
    state: "",
    country: "",
    phone_number: "",
    email: "",
    password: "",
    date_of_birth: "1980-01-01", // Hardcoded date of birth
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

  const handleLanguageChange = (selectedOptions: any) => {
    setSelectedLanguages(
      selectedOptions ? selectedOptions.map((option: any) => option.value) : []
    );
  };

  const handleSpecializationChange = (selectedOption: any) => {
    setSelectedSpecialization(selectedOption ? selectedOption.value : null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const address = {
      street: formData.street,
      postalcode: formData.postalcode,
      city: formData.city,
      state: formData.state,
      country: formData.country,
    };

    const postData = {
      ...formData,
      address,
      specialization_id: selectedSpecialization,
      languages: selectedLanguages,
      role: "doctor",
    };

    axiosInstance
      .post("/api/users/admin-create", postData)
      .then((response) => {
        console.log("Registration successful:", response.data);
        onClose();
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
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            {/* Personal Information */}
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div className="col-span-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                  />
                </div>
              </div>

              {/* Address Information */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="street"
                  >
                    Street and House Number
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="street"
                    type="text"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="postalcode"
                  >
                    Postal Code
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="postalcode"
                    type="text"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="city"
                    type="text"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="state"
                    type="text"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="country"
                    type="text"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="contact"
                >
                  Contact Information
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="contact"
                  type="text"
                />
              </div>

              {/* Specialization */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="specialization"
                >
                  Specialization
                </label>
                <Select
                  id="specialization"
                  options={specializations.map((specialization) => ({
                    value: specialization.id,
                    label: specialization.area_of_specialization,
                  }))}
                  className="basic-single-select"
                  classNamePrefix="select"
                  onChange={handleSpecializationChange}
                />
              </div>

              {/* Languages */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="languages"
                >
                  Languages
                </label>
                <Select
                  id="languages"
                  isMulti
                  options={languages.map((language) => ({
                    value: language.id,
                    label: language.language_name,
                  }))}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleLanguageChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={onClose}
                  className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Doctor
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorModal;
