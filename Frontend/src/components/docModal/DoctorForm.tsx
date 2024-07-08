import React, { useEffect, useState } from "react";
import axiosInstance from "../../Axios";
import Select, { SingleValue, MultiValue } from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Language, Specialization, Doctor } from "../Types";

interface DoctorFormProps {
  data?: Doctor;
  handleSubmit: (formData: FormData) => void;
  onClose: () => void;
}

export interface FormData {
  title: string;
  first_name: string;
  last_name: string;
  street: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
  phone_number: string;
  email: string;
  date_of_birth: Date | null;
  specialization: SingleValue<{ value: number; label: string }> | null;
  languages: { value: number; label: string }[];
}

const DoctorForm: React.FC<DoctorFormProps> = ({
  handleSubmit,
  data,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>({
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
    date_of_birth: null,
    specialization: null,
    languages: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [languages, setLanguages] = useState<
    { value: number; label: string }[]
  >([]);
  const [specializations, setSpecializations] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [languagesResponse, specializationsResponse] = await Promise.all([
          axiosInstance.get("/api/search/languages"),
          axiosInstance.get("/api/search/specializations"),
        ]);
        setLanguages(
          languagesResponse.data.map((lang: Language) => ({
            value: lang.id,
            label: lang.language_name,
          }))
        );
        setSpecializations(
          specializationsResponse.data.map((spec: Specialization) => ({
            value: spec.id,
            label: spec.area_of_specialization,
          }))
        );
      } catch (error) {
        console.error("Error fetching options:", error);
        setError("Failed to fetch options. Please try again.");
      }
    };

    fetchOptions();

    if (data) {
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
        date_of_birth: data.date_of_birth ? new Date(data.date_of_birth) : null,
        specialization: data.specialization
          ? {
              value: data.specialization.id,
              label: data.specialization.area_of_specialization,
            }
          : null,
        languages: data.languages
          ? data.languages.map((lang: Language) => ({
              value: lang.id,
              label: lang.language_name,
            }))
          : [],
      });
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      date_of_birth: date,
    }));
  };

  const handleSpecializationChange = (
    selectedOption: SingleValue<{ value: number; label: string }>
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
      languages: selectedOptions as { value: number; label: string }[],
    }));
  };

  const internalHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(formData);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={internalHandleSubmit}>
      <div className="mb-4">
        {/* Personal Information */}
        <div className="grid grid-cols-5 gap-4 mb-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <select
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select title</option>
              {["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."].map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4 col-span-4">
            <div className="col-span-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="first_name"
              >
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="last_name"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="date_of_birth">Date of Birth</label>
              <DatePicker
                id="date_of_birth"
                selected={formData.date_of_birth}
                onChange={handleDateChange}
                className="w-full p-2 border rounded"
              />
            </div>
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
              value={formData.street}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-1">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="postcode"
            >
              Postal Code
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="postcode"
              type="text"
              value={formData.postcode}
              onChange={handleInputChange}
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
              value={formData.city}
              onChange={handleInputChange}
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
              value={formData.state}
              onChange={handleInputChange}
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
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone_number"
          >
            Contact Information
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone_number"
            type="text"
            value={formData.phone_number}
            onChange={handleInputChange}
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
            options={specializations}
            className="basic-single-select"
            classNamePrefix="select"
            value={formData.specialization}
            onChange={(selectedOption) =>
              handleSpecializationChange(selectedOption)
            }
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
            options={languages}
            className="basic-multi-select"
            classNamePrefix="select"
            value={formData.languages}
            onChange={(selectedOptions) =>
              handleLanguageChange(selectedOptions)
            }
          />
        </div>

        {/* Email and Password */}
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
              value={formData.email}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
            {data ? "Update Doctor" : "Add Doctor"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default DoctorForm;
