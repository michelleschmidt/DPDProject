import React, { useEffect, useState } from "react";
import { Patient, Language } from "../Types";
import axiosInstance from "../../Axios";
import { SingleValue } from "react-select";
import DatePicker from "react-datepicker";
import Select from "react-select";

interface PatientFormProps {
  data?: Patient;
  handleSubmit: (formData: FormData) => void;
  patientId?: string;
  onClose: () => void;
}

export interface FormData {
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  dob: Date | null;
  postcode: string;
  city: string;
  state: string;
  country: string;
  contactInformation: string;
  emergency_contact: string;
  relationship: string;
  phone_number: string;
  street: string;
  accessibilityNeeds: string;
  insuranceType: string;
  gender: string;
  password: string;
  preferredLanguage: { value: number; label: string } | null;
}

const PatientForm: React.FC<PatientFormProps> = ({
  data,
  handleSubmit,
  patientId,
  onClose,
}) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    gender: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    dob: null,
    postcode: "",
    city: "",
    state: "",
    country: "",
    contactInformation: "",
    emergency_contact: "",
    relationship: "",
    phone_number: "",
    street: "",
    accessibilityNeeds: "",
    insuranceType: "",
    preferredLanguage: null,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await axiosInstance.get("/api/search/languages");
      setLanguages(response.data);
    } catch (error) {
      console.error("Error fetching languages:", error);
      setError("Failed to fetch languages. Please try again.");
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchPatientDetails(patientId);
    }
  }, [patientId]);

  const fetchPatientDetails = async (patientId: string) => {
    try {
      setError(null);
      const response = await axiosInstance.get(`/api/users/${patientId}`);
      const data = response.data;
      setFormData({
        title: data.title || "",
        gender: data.gender || "",
        password: data.password || "",
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        dob: data.dob ? new Date(data.dob) : null,
        postcode: data.address?.postcode || "",
        city: data.address?.city || "",
        state: data.address?.state || "",
        country: data.address?.country || "",
        contactInformation: data.contactInformation || "",
        emergency_contact: data.emergency_contact || "",
        relationship: data.relationship || "",
        phone_number: data.phone_number || "",
        street: data.address?.street || "",
        accessibilityNeeds: data.accessibilityNeeds || "",
        insuranceType: data.insuranceType || "",
        preferredLanguage: data.preferredLanguage
          ? {
              value: data.preferredLanguage.id,
              label: data.preferredLanguage.language_name,
            }
          : null,
      });
    } catch (error) {
      console.error("Error fetching patient details:", error);
      setError("Failed to fetch patient details. Please try again.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, dob: date }));
  };

  const handleLanguageChange = (selectedOption: any) => {
    setFormData((prev) => ({ ...prev, preferredLanguage: selectedOption }));
  };

  const languageOptions = languages.map((lang) => ({
    value: lang.id,
    label: lang.language_name,
  }));

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(formData);
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
      {/* Form Fields */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="gender"
        >
          Gender
        </label>
        <select
          name="gender"
          id="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select gender</option>
          {["female", "male", "diverse", "not disclosed"].map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>
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
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="first_name"
        >
          First Name
        </label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="last_name"
        >
          Last Name
        </label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="dob"
        >
          Date of Birth
        </label>
        <DatePicker
          selected={formData.dob}
          onChange={handleDateChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="preferredLanguage"
        >
          Preferred Language
        </label>
        <Select
          name="preferredLanguage"
          options={languageOptions}
          value={formData.preferredLanguage}
          onChange={handleLanguageChange}
          className="mt-1 block w-full"
          isMulti={false}
        />
      </div>
      <div className="col-span-1">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="street"
        >
          Street
        </label>
        <input
          type="text"
          name="street"
          id="street"
          value={formData.street}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter street"
        />
      </div>
      <div className="col-span-1">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="postcode"
        >
          Postcode
        </label>
        <input
          type="text"
          name="postcode"
          id="postcode"
          value={formData.postcode}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter postcode"
        />
      </div>
      <div className="col-span-1">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="city"
        >
          City
        </label>
        <input
          type="text"
          name="city"
          id="city"
          value={formData.city}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter city"
        />
      </div>
      <div className="col-span-1">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="state"
        >
          State
        </label>
        <input
          type="text"
          name="state"
          id="state"
          value={formData.state}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter state"
        />
      </div>
      <div className="col-span-1">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="country"
        >
          Country
        </label>
        <input
          type="text"
          name="country"
          id="country"
          value={formData.country}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter country"
        />
      </div>
      <div className="col-span-2">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="contactInformation"
        >
          Contact Information
        </label>
        <textarea
          name="contactInformation"
          id="contactInformation"
          value={formData.contactInformation}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter contact information"
        />
      </div>
      <div className="col-span-1">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="emergency_contact"
        >
          Emergency Contact
        </label>
        <input
          type="text"
          name="emergency_contact"
          id="emergency_contact"
          value={formData.emergency_contact}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter emergency contact"
        />
      </div>
      <div className="col-span-1">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="relationship"
        >
          Relationship
        </label>
        <input
          type="text"
          name="relationship"
          id="relationship"
          value={formData.relationship}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter relationship"
        />
      </div>
      <div className="col-span-2">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="phone_number"
        >
          Phone Number
        </label>
        <input
          type="text"
          name="phone_number"
          id="phone_number"
          value={formData.phone_number}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter phone number"
        />
      </div>
      <div className="col-span-2">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="accessibilityNeeds"
        >
          Accessibility Needs
        </label>
        <textarea
          name="accessibilityNeeds"
          id="accessibilityNeeds"
          value={formData.accessibilityNeeds}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter accessibility needs"
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="insuranceType"
        >
          Insurance Type
        </label>
        <select
          name="insuranceType"
          id="insuranceType"
          value={formData.insuranceType}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select insurance type</option>
          {["public", "private"].map((insuranceType) => (
            <option key={insuranceType} value={insuranceType}>
              {insuranceType}
            </option>
          ))}
        </select>
      </div>
      <div className="col-span-2">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="text"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter insurance type"
        />
      </div>

      {error && (
        <div className="col-span-2 text-red-600 text-center">{error}</div>
      )}
      <div className="col-span-2 flex justify-between">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
