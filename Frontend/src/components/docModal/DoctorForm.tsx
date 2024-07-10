import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios/Axios";
import Select, { SingleValue, MultiValue } from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PageLayout from "../layout/PageLayout";
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
  gender: string;
  password: string;
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
    gender: "",
    password: "",
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
        gender: data.gender || "",
        last_name: data.last_name || "",
        street: data.address?.street || "",
        postcode: data.address?.postcode || "",
        city: data.address?.city || "",
        state: data.address?.state || "",
        country: data.address?.country || "",
        phone_number: data.phone_number || "",
        password: "",
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
    <form onSubmit={internalHandleSubmit} className="space-y-8">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Personal Information */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <Select
              id="title"
              options={[
                { value: "Mr.", label: "Mr." },
                { value: "Mrs.", label: "Mrs." },
                { value: "Ms.", label: "Ms." },
                { value: "Dr.", label: "Dr." },
                { value: "Prof.", label: "Prof." },
              ]}
              className="basic-single-select"
              classNamePrefix="select"
              value={{ value: formData.title, label: formData.title }}
              onChange={(selectedOption) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  title: selectedOption?.value || "",
                }))
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Gender
            </label>
            <Select
              id="gender"
              options={[
                { value: "female", label: "Female" },
                { value: "male", label: "Male" },
                { value: "diverse", label: "Diverse" },
                { value: "not disclosed", label: "Not Disclosed" },
              ]}
              className="basic-single-select"
              classNamePrefix="select"
              value={{ value: formData.gender, label: formData.gender }}
              onChange={(selectedOption) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  gender: selectedOption?.value || "",
                }))
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date_of_birth"
            >
              Date of Birth
            </label>
            <DatePicker
              id="date_of_birth"
              selected={formData.date_of_birth}
              onChange={(date) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  date_of_birth: date,
                }))
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="first_name"
            >
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="first_name"
              name="first_name"
              type="text"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="last_name"
            >
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="last_name"
              name="last_name"
              type="text"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone_number"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone_number"
              name="phone_number"
              type="tel"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
          </div>
        </div>
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
              name="street"
              type="text"
              value={formData.street}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="postcode"
            >
              Postal Code
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="postcode"
              name="postcode"
              type="text"
              value={formData.postcode}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="state"
            >
              State
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="state"
              name="state"
              type="text"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="country"
            >
              Country
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="country"
              name="country"
              type="text"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
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
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">One-Time Password</h2>
        <div className="grid gap-4">
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {data ? "Update Patient" : "Add Patient"}
        </button>
      </div>
    </form>
  );
};

export default DoctorForm;
