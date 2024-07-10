import React, { useEffect, useState } from "react";
import { Patient, Language } from "../Types";
import axiosInstance from "../../axios/Axios";
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
    postcode: string;
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
      postcode: "",
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
          postcode: data.address?.postcode || "",
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
                { value: "Female", label: "Female" },
                { value: "Male", label: "Male" },
                { value: "Diverse", label: "Diverse" },
                { value: "Not Disclosed", label: "Not Disclosed" },
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
              onChange={handleDateChange}
              className="w-full p-2 border rounded"
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
          {" "}
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
                value={formData.address.street}
                onChange={handleAddressChange}
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
                value={formData.address.postcode}
                onChange={handleAddressChange}
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
                value={formData.address.city}
                onChange={handleAddressChange}
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
                value={formData.address.state}
                onChange={handleAddressChange}
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
                value={formData.address.country}
                onChange={handleAddressChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Emergency Contact</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="emergency_contact_name"
            >
              Name
            </label>
            <input
              type="text"
              id="emergency_contact_name"
              name="name"
              value={formData.emergency_contact_details.name}
              onChange={handleEmergencyContactChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="emergency_contact_phone"
            >
              Phone
            </label>
            <input
              type="tel"
              id="emergency_contact_phone"
              name="phone_number"
              value={formData.emergency_contact_details.phone_number}
              onChange={handleEmergencyContactChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="col-span-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="emergency_contact_relationship"
            >
              Relationship
            </label>
            <input
              type="text"
              id="emergency_contact_relationship"
              name="relationship"
              value={formData.emergency_contact_details.relationship}
              onChange={handleEmergencyContactChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Medical Information</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="mb-4">
            <div>
              <label
                htmlFor="insurance_type"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Insurance Type
              </label>
              <Select
                id="insurance_type"
                options={[
                  { value: "private", label: "private" },
                  { value: "public", label: "public" },
                ]}
                className="basic-single-select"
                classNamePrefix="select"
                value={{
                  value: formData.insurance_type,
                  label: formData.insurance_type,
                }}
                onChange={(selectedOption) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    insurance_type: selectedOption?.value || "",
                  }))
                }
              />
            </div>
          </div>
          <div className="mb-4">
            {" "}
            <div>
              <label
                htmlFor="accessibility_needs"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Accessibility Needs
              </label>
              <input
                type="text"
                id="accessibility_needs"
                name="accessibility_needs"
                value={formData.accessibility_needs}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
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
