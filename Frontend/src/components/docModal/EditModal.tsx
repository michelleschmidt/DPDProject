import React, { useState, useEffect } from "react";
import axiosInstance from "../../Axios";
import Select, { SingleValue, MultiValue } from "react-select";
import PatientTable from "../tables/PatientTable";
import AppointmentTable from "../tables/AppointmentTable";
import DoctorForm, { FormData } from "./DoctorForm";
import {
  Specialization,
  Language,
  Patient,
  Doctor,
  Appointment,
} from "../Types";
import AvailabilityManagerModal from "../availabilityModal/AvailabilityManagerModal";

interface EditDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
  onUpdateSuccess: () => void;
}

const EditDoctorModal: React.FC<EditDoctorModalProps> = ({
  isOpen,
  onClose,
  doctor,
  onUpdateSuccess,
}) => {
  const [isEditFormExpanded, setIsEditFormExpanded] = useState(true);
  const [isPatientTableExpanded, setIsPatientTableExpanded] = useState(false);
  const [isAppointmentTableExpanded, setIsAppointmentTableExpanded] =
    useState(false);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
  const [selectedDoctorForAvailability, setSelectedDoctorForAvailability] =
    useState<number | null>(null);

  useEffect(() => {
    if (isOpen && doctor) {
      fetchLanguages();
      fetchSpecializations();
      fetchPatientsForDoctor();
      fetchAppointmentsForDoctor(doctor.id);
    }
  }, [isOpen, doctor]);

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

  const fetchPatientsForDoctor = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/appointments/doctor-patients/${doctor!.id}"
      );
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const fetchAppointmentsForDoctor = async (doctorId: number) => {
    if (!doctorId) return;
    try {
      const response = await axiosInstance.get(
        `/api/appointments/doctor/${doctorId}`
      );
      const formattedAppointments = response.data.map((appointment: any) => ({
        ...appointment,
        doctor: {
          first_name: doctor?.first_name || "Unknown",
          last_name: doctor?.last_name || "Doctor",
        },
        appointmentDate:
          appointment.availability?.availability_date || "No date provided",

        appointmentReason: {
          reason:
            appointment.appointment_reason?.reason || "No Reason Provided",
          notes: appointment.appointment_reason?.notes || "",
        },
      }));
      setAppointments(formattedAppointments);
      console.log("Fetched and formatted appointments:", formattedAppointments);
    } catch (error) {
      console.error("Error fetching appointments for doctor:", error);
      setError("Failed to fetch appointments. Please try again.");
    }
  };

  const handleSaveChanges = async (formData: FormData) => {
    try {
      setError(null);
      const updatedDoctor = {
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
        email: formData.email,
        date_of_birth: formData.date_of_birth,
        specialization_id: formData.specialization?.value,
        languages: formData.languages.map((lang) => lang.value).filter(Boolean),
        phone_number: formData.phone_number,
      };

      console.log("Updated Doctor Data:", updatedDoctor);

      const response = await axiosInstance.put(
        `/api/users/${doctor!.id}`,
        updatedDoctor,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Server response:", response.data);
      onClose();
      onUpdateSuccess();
    } catch (error: any) {
      console.error("Error updating doctor:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        setError(
          `Failed to update doctor: ${
            error.response.data.message || error.message
          }`
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        setError("Failed to update doctor: No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        setError(`Failed to update doctor: ${error.message}`);
      }
    }
  };

  if (!isOpen || !doctor) return null;

  function openAvailabilityModal(id: number) {
    setSelectedDoctorForAvailability(id);
    setIsAvailabilityModalOpen(true);
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-2xl font-bold mb-4">
          Edit {doctor.title} {doctor.first_name} {doctor.last_name}
        </h2>

        <div className="flex space-x-4">
          <button
            type="button"
            className="flex-1 bg-blue-500 text-white p-2 rounded"
            onClick={() => {
              openAvailabilityModal(doctor.id);
            }}
          >
            Manage availabilities
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-red-500 text-white p-2 rounded"
          >
            Close
          </button>
        </div>
        {isAvailabilityModalOpen && selectedDoctorForAvailability !== null && (
          <AvailabilityManagerModal
            isOpen={isAvailabilityModalOpen}
            onClose={() => setIsAvailabilityModalOpen(false)}
            doctorId={selectedDoctorForAvailability}
          />
        )}

        {/* Edit Form Section */}
        <div className="mb-4">
          <button
            className="w-full text-left font-semibold bg-gray-200 p-2 rounded"
            onClick={() => setIsEditFormExpanded(!isEditFormExpanded)}
          >
            {isEditFormExpanded ? "▼" : "►"} Edit Doctor Information
          </button>
          {isEditFormExpanded && (
            <DoctorForm
              data={doctor}
              handleSubmit={handleSaveChanges}
              onClose={onClose}
            />
          )}
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
              fetchAppointments={() => fetchAppointmentsForDoctor(doctor?.id)}
              doctorId={doctor?.id}
            />
          )}
        </div>

        {/* Patient Table Section */}
        <div>
          <button
            className="w-full text-left font-semibold bg-gray-200 p-2 rounded"
            onClick={() => setIsPatientTableExpanded(!isPatientTableExpanded)}
          >
            {isPatientTableExpanded ? "▼" : "►"} Doctor's Patients
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
      </div>
    </div>
  );
};

export default EditDoctorModal;
