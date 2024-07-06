import React, { useState, useEffect } from "react";
import axiosInstance from "../../Axios";
import Select, { SingleValue, MultiValue } from "react-select";
import PatientTable from "../tables/PatientTable";
import { Specialization, Language, Patient, Appointment } from "../Types";

interface EditAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  Appointment: Appointment | null;
  onUpdateSuccess: () => void; // Add this line
}

const EditAppointmentModal: React.FC<EditAppointmentModalProps> = ({
  isOpen,
  onClose,
  Appointment,
  onUpdateSuccess, // Add this line
}) => {
  const [isEditFormExpanded, setIsEditFormExpanded] = useState(true);
  const [isPatientTableExpanded, setIsPatientTableExpanded] = useState(false);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
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
    if (isOpen && Appointment) {
      fetchAppointmentDetails(Appointment.id.toString());
    }
    fetchLanguages();
    fetchSpecializations();
    fetchPatients();
  }, [isOpen, Appointment]);

  const fetchLanguages = async () => {
    try {
      const response = await axiosInstance.get("/api/search/languages");
      setLanguages(response.data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const fetchSpecializations = async () => {
    try {
      const response = await axiosInstance.get("/api/search/specializations");
      setSpecializations(response.data);
    } catch (error) {
      console.error("Error fetching specializations:", error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axiosInstance.get("/api/users/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const fetchAppointmentDetails = async (AppointmentId: string) => {
    try {
      setError(null);
      const response = await axiosInstance.get(
        `/api/users/Appointment/${AppointmentId}`
      );
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
      console.error("Error fetching Appointment details:", error);
      setError("Failed to fetch Appointment details. Please try again.");
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
      const updatedAppointment = {
        ...Appointment!,
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
        specialization_id: formData.specialization
          ? formData.specialization.value // Send only the ID
          : null,
        languages: formData.languages.map((lang) => lang.value), // Send only the IDs
      };

      console.log("Updated Appointment Data:", updatedAppointment); // Log the data

      const response = await axiosInstance.put(
        `/api/users/${updatedAppointment.id}`,
        updatedAppointment
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Appointment updated successfully");
        onClose();
        onUpdateSuccess(); // Add this line to call a callback function
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error: any) {
      console.error("Error updating Appointment:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        setError(
          `Failed to update Appointment. Server responded with: ${
            error.response.data.error || error.response.statusText
          }`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError(
          "Failed to update Appointment. No response received from server."
        );
      } else {
        console.error("Error message:", error.message);
        setError(`Failed to update Appointment: ${error.message}`);
      }
    }
  };

  if (!isOpen || !Appointment) return null;

  const languageOptions = languages.map((lang) => ({
    value: lang.id,
    label: lang.language_name,
  }));

  const specializationOptions = specializations.map((spec) => ({
    value: spec.id,
    label: spec.area_of_specialization,
  }));

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-2xl font-bold mb-4"></h2>

        {/* Edit Form Section */}
        <div className="mb-4">
          <button
            className="w-full text-left font-semibold bg-gray-200 p-2 rounded"
            onClick={() => setIsEditFormExpanded(!isEditFormExpanded)}
          >
            {isEditFormExpanded ? "▼" : "►"} Edit Appointment Information
          </button>
          {isEditFormExpanded && (
            <form className="mt-2" onSubmit={handleSaveChanges}>
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
                  options={specializationOptions}
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
                  options={languageOptions}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>

        {/* Patient Table Section */}
        <div>
          <button
            className="w-full text-left font-semibold bg-gray-200 p-2 rounded"
            onClick={() => setIsPatientTableExpanded(!isPatientTableExpanded)}
          >
            {isPatientTableExpanded ? "▼" : "►"} Appointment's Patients
          </button>
          {isPatientTableExpanded && (
            <div className="mt-2">
              <PatientTable
                patients={patients}
                onEdit={(patient) => console.log("Edit patient", patient)}
                onDelete={(patient) => console.log("Delete patient", patient)}
              />
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white p-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default EditAppointmentModal;
