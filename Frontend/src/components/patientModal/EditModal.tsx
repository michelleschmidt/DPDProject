import React, { useState, useEffect } from "react";
import axiosInstance from "../../Axios";
import Select, { MultiValue } from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppointmentTable from "../tables/AppointmentTable";
import DoctorTable from "../tables/DoctorTable";
import { Language } from "../Types";

interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  patientId: string;
}

interface FormData {
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
  preferredLanguage: { value: number; label: string } | null;
}

const EditPatientModal: React.FC<EditPatientModalProps> = ({
  isOpen,
  onClose,
  onUpdateSuccess,
  patientId,
}) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: "",
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
  const [isAppointmentTableExpanded, setIsAppointmentTableExpanded] =
    useState(false);
  const [isDoctorTableExpanded, setIsDoctorTableExpanded] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (isOpen && patientId) {
      fetchPatientDetails(patientId);
      fetchAppointmentsForPatient(patientId);
      fetchDoctorsForPatient(patientId);
    }
  }, [isOpen, patientId]);

  const fetchPatientDetails = async (patientId: string) => {
    try {
      setError(null);
      const response = await axiosInstance.get(
        `/api/users/patient/${patientId}`
      );
      const data = response.data;
      setFormData({
        title: data.title || "",
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

  const fetchAppointmentsForPatient = async (patientId: string) => {
    try {
      const response = await axiosInstance.get(
        `/api/appointments/patient/${patientId}`
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("Failed to fetch appointments. Please try again.");
    }
  };

  const fetchDoctorsForPatient = async (patientId: string) => {
    try {
      const response = await axiosInstance.get(
        `/api/doctors/patient/${patientId}`
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError("Failed to fetch doctors. Please try again.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      dob: date,
    }));
  };

  const handleLanguageChange = (
    selectedOptions: MultiValue<{ value: number; label: string }>
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      preferredLanguage: selectedOptions.length > 0 ? selectedOptions[0] : null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const updatedPatient = {
        ...formData,
        address: {
          street: formData.street,
          postcode: formData.postcode,
          city: formData.city,
          state: formData.state,
          country: formData.country,
        },
        preferredLanguage: formData.preferredLanguage
          ? formData.preferredLanguage.value
          : null,
      };

      console.log("Updated Patient Data:", updatedPatient);

      const response = await axiosInstance.put(
        `/api/users/${patientId}`,
        updatedPatient
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Patient updated successfully");
        onClose();
        onUpdateSuccess();
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error: any) {
      console.error("Error updating patient:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        setError(
          `Failed to update patient. Server responded with: ${
            error.response.data.error || error.response.statusText
          }`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("Failed to update patient. No response received from server.");
      } else {
        console.error("Error message:", error.message);
        setError(`Failed to update patient: ${error.message}`);
      }
    }
  };

  if (!isOpen) return null;

  const languageOptions = languages.map((lang) => ({
    value: lang.id,
    label: lang.language_name,
  }));
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl w-2/3 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Patient</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="preferredlanguage"
              className="block text-sm font-medium text-gray-700"
            >
              Languages
            </label>
            <Select
              name="preferredLanguage"
              options={languageOptions}
              value={
                formData.preferredLanguage ? [formData.preferredLanguage] : []
              }
              onChange={handleLanguageChange}
              className="mt-1 block w-full"
              isMulti={true}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email address
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
          {/* Add other fields (postcode, city, state, country, contactInformation, etc.) following the same pattern */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="insuranceType"
            >
              Insurance Type
            </label>
            <input
              type="text"
              name="insuranceType"
              id="insuranceType"
              value={formData.insuranceType}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="col-span-2 mt-4 flex justify-end">
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
              Update Patient
            </button>
          </div>
        </form>
      </div>
      {/* Appointment Table Section */}
      <div className="mt-8">
        <button
          className="w-full text-left font-semibold bg-gray-200 p-2 rounded"
          onClick={() =>
            setIsAppointmentTableExpanded(!isAppointmentTableExpanded)
          }
        >
          {isAppointmentTableExpanded ? "▼" : "►"} Doctor's Appointment
        </button>
        {isAppointmentTableExpanded && (
          <AppointmentTable
            appointments={appointments}
            fetchAppointments={() => fetchAppointmentsForPatient(patientId)}
            patientId={Number(patientId)}
          />
        )}
      </div>

      {/* Patient Table Section */}
      <div>
        <button
          className="w-full text-left font-semibold bg-gray-200 p-2 rounded"
          onClick={() => setIsDoctorTableExpanded(!isDoctorTableExpanded)}
        >
          {isDoctorTableExpanded ? "▼" : "►"} Doctor's Patients
        </button>
        {isDoctorTableExpanded && (
          <div className="mt-2">
            <DoctorTable
              doctors={doctors}
              onEdit={(doctor) => console.log("Edit doctor", doctor)}
              onDelete={(doctor) => console.log("Delete doctor", doctor)}
              DEFAULT_AVATAR={""}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default EditPatientModal;
