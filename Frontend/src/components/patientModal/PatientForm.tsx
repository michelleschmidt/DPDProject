import React, { useEffect, useState } from "react";
import { Patient, Language } from "../Types";
import axiosInstance from "../../Axios";
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
  date_of_birth: Date | null;
  phone_number: string;
  address: {
    street: string;
    postal_code: string;
    city: string;
    state: string;
    country: string;
  };
  emergency_contact_details: {
    name: string;
    phone_number: string;
    relationship: string;
  };
  accessibility_needs: string;
  insurance_type: string;
  gender: string;
  languages: { value: number; label: string }[];
  password: string;
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
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: null,
    phone_number: "",
    address: {
      street: "",
      postal_code: "",
      city: "",
      state: "",
      country: "",
    },
    emergency_contact_details: {
      name: "",
      phone_number: "",
      relationship: "",
    },
    accessibility_needs: "",
    insurance_type: "",
    gender: "",
    languages: [],
    password: "",
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
        password: data.password || "",
        title: data.title || "",
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        date_of_birth: data.date_of_birth ? new Date(data.date_of_birth) : null,
        phone_number: data.phone_number || "",
        address: {
          street: data.address?.street || "",
          postal_code: data.address?.postal_code || "",
          city: data.address?.city || "",
          state: data.address?.state || "",
          country: data.address?.country || "",
        },
        emergency_contact_details: {
          name: data.emergency_contact_details?.name || "",
          phone_number: data.emergency_contact_details?.phone_number || "",
          relationship: data.emergency_contact_details?.relationship || "",
        },
        accessibility_needs: data.accessibility_needs || "",
        insurance_type: data.insurance_type || "",
        gender: data.gender || "",
        languages:
          data.languages?.map((lang: Language) => ({
            value: lang.id,
            label: lang.language_name,
          })) || [],
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleEmergencyContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      emergency_contact_details: {
        ...prev.emergency_contact_details,
        [name]: value,
      },
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, date_of_birth: date }));
  };

  const handleLanguageChange = (selectedOptions: any) => {
    setFormData((prev) => ({ ...prev, languages: selectedOptions }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(formData);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
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
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
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
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
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
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="date_of_birth"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <DatePicker
              selected={formData.date_of_birth}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
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
              isMulti
              options={languages.map((lang) => ({
                value: lang.id,
                label: lang.language_name,
              }))}
              value={formData.languages}
              onChange={handleLanguageChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="grid grid-cols-2 gap-4">
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
              name="email"
              value={formData.email}
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
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.address.street}
              onChange={handleAddressChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="postal_code">Postal Code</label>
            <input
              type="text"
              id="postal_code"
              name="postal_code"
              value={formData.address.postal_code}
              onChange={handleAddressChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.address.city}
              onChange={handleAddressChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.address.state}
              onChange={handleAddressChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.address.country}
              onChange={handleAddressChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Emergency Contact</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="emergency_contact_name">Name</label>
            <input
              type="text"
              id="emergency_contact_name"
              name="name"
              value={formData.emergency_contact_details.name}
              onChange={handleEmergencyContactChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="emergency_contact_phone">Phone</label>
            <input
              type="tel"
              id="emergency_contact_phone"
              name="phone_number"
              value={formData.emergency_contact_details.phone_number}
              onChange={handleEmergencyContactChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="emergency_contact_relationship">Relationship</label>
            <input
              type="text"
              id="emergency_contact_relationship"
              name="relationship"
              value={formData.emergency_contact_details.relationship}
              onChange={handleEmergencyContactChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Medical Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="insurance_type">Insurance Type</label>
            <input
              type="text"
              id="insurance_type"
              name="insurance_type"
              value={formData.insurance_type}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="accessibility_needs">Accessibility Needs</label>
            <input
              type="text"
              id="accessibility_needs"
              name="accessibility_needs"
              value={formData.accessibility_needs}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
