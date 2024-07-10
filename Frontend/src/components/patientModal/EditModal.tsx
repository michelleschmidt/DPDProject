import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/Axios";
import PatientForm, { FormData } from "./PatientForm";
import DoctorTable from "../tables/DoctorTable";
import AppointmentTable from "../tables/AppointmentTable";
import { Doctor, Patient } from "../Types";

interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  patientId: number;
}

const EditPatientModal: React.FC<EditPatientModalProps> = ({
  isOpen,
  onClose,
  onUpdateSuccess,
  patientId,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isAppointmentTableExpanded, setIsAppointmentTableExpanded] =
    useState(false);
  const [isPatientFormExpanded, setIsPatientFormExpanded] = useState(true);
  const [isDoctorTableExpanded, setIsDoctorTableExpanded] = useState(false);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && patientId) {
      fetchAppointmentsForPatient(patientId.toString());
      fetchDoctorsForPatient();
      fetchPatients();
    }
  }, [isOpen, patientId]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/users/${patientId}`);
      const patient = response.data;
      const mappedPatient = {
        userId: patient.id.toString(),
        first_name: patient.first_name,
        last_name: patient.last_name,
        email: patient.email,
        role: patient.role,
        address: {
          street: patient.address?.street || "",
          city: patient.address?.city || "",
          state: patient.address?.state || "",
          country: patient.address?.country || "",
          postcode: patient.address?.postal_code || "",
        },
        languages:
          patient.languages?.map((lang: any) => ({
            id: lang.id,
            language_name: lang.language_name,
          })) || [],
        title: patient.title,
        phone_number: patient.phone_number,
        date_of_birth: patient.date_of_birth
          ? new Date(patient.date_of_birth)
          : new Date(),
        insurance: patient.insurance_type,
        accessibility_needs: patient.accessibility_needs,
        emergency_contact_details: patient.emergency_contact_details,
        gender: patient.gender,
      };
      setPatients([mappedPatient]);
      console.log("Fetched patient: ", mappedPatient);
    } catch (error: any) {
      console.error("Error fetching patient:", error);
      setError("Failed to fetch patient. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointmentsForPatient = async (patientId: string) => {
    try {
      const response = await axiosInstance.get(
        `/api/appointments/user/${patientId}`
      );
      console.log("Appointments response:", response.data);
      if (response.data && Array.isArray(response.data)) {
        const processedAppointments = response.data.map((appointment: any) => ({
          id: appointment.id,
          doctor: {
            first_name: appointment.doctor?.first_name || "Unknown",
            last_name: appointment.doctor?.last_name || "Doctor",
          },
          patient: {
            first_name: appointment.user?.first_name || "Unknown",
            last_name: appointment.user?.last_name || "Patient",
          },
          appointmentDate: appointment.availability?.availability_date || null,
          appointmentReason: {
            reason:
              appointment.appointment_reason?.reason || "No Reason Provided",
            notes: appointment.appointment_reason?.notes || "",
          },
          completed: appointment.completed || false,
        }));
        setAppointments(processedAppointments);
      } else {
        console.error(
          "Unexpected response format for appointments:",
          response.data
        );
        setError("Failed to fetch appointments. Unexpected data format.");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("Failed to fetch appointments. Please try again.");
    }
  };

  const fetchDoctorsForPatient = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/api/appointments/user-doctors/${patientId}`
      );
      if (response.data && Array.isArray(response.data)) {
        const processedDoctors: Doctor[] = response.data.map((doctor: any) => ({
          userId: doctor.id,
          id: doctor.id, // Add this line to include the id property
          title: doctor.doctor_name.split(" ")[0] || "",
          first_name: doctor.doctor_name.split(" ")[1] || "",
          last_name: doctor.doctor_name.split(" ").slice(2).join(" ") || "",
          email: doctor.email || "",
          role: "doctor",
          address: {
            street: doctor.address?.street || "",
            city: doctor.address?.city || "",
            state: doctor.address?.state || "",
            country: doctor.address?.country || "",
            postcode: doctor.address?.postal_code || "",
          },
          languages: doctor.languages.map((lang: string) => ({
            language_name: lang,
            id: 0, // You might want to generate a unique id or fetch it from the API
          })),
          phone_number: doctor.phone_number || "",
          date_of_birth: doctor.date_of_birth
            ? new Date(doctor.date_of_birth)
            : undefined,
          gender: doctor.gender || "",
          specialization: {
            id: doctor.specialization?.id || 0, // Add this line to include the id in specialization
            area_of_specialization:
              doctor.area_of_specialization || "Not specified",
          },
        }));
        setDoctors(processedDoctors);
      } else {
        console.error("Unexpected response format for doctors:", response.data);
        setError("Failed to fetch doctors. Unexpected data format.");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError("Failed to fetch doctors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      setError(null);
      const updatedPatient = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number,
        title: formData.title,
        date_of_birth: formData.date_of_birth,
        insurance_type: formData.insurance_type,
        accessibility_needs: formData.accessibility_needs,
        address: {
          street: formData.address.street,
          postal_code: formData.address.postcode,
          city: formData.address.city,
          state: formData.address.state,
          country: formData.address.country,
        },
        emergency_contact_details: {
          name: formData.emergency_contact_details.name,
          phone_number: formData.emergency_contact_details.phone_number,
          relationship: formData.emergency_contact_details.relationship,
        },
        languages: formData.languages.map((lang) => lang.value),
        gender: formData.gender,
      };

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
      console.log("Request payload:", updatedPatient);
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

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Patient </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-8">
          <button
            className="w-full text-left font-semibold bg-gray-200 p-2 rounded"
            onClick={() => setIsPatientFormExpanded(!isPatientFormExpanded)}
          >
            {isPatientFormExpanded ? "▼" : "►"} Edit Patient
          </button>
          {isPatientFormExpanded && patientId !== undefined && (
            <PatientForm
              patientId={patientId.toString()}
              handleSubmit={handleSubmit}
              onClose={onClose}
            />
          )}
        </div>
        <div className="mt-8">
          <button
            className="w-full text-left font-semibold bg-gray-200 p-2 rounded"
            onClick={() =>
              setIsAppointmentTableExpanded(!isAppointmentTableExpanded)
            }
          >
            {isAppointmentTableExpanded ? "▼" : "►"} Patient's Appointments (
            {appointments.length})
          </button>
          {isAppointmentTableExpanded && patientId !== undefined && (
            <AppointmentTable
              appointments={appointments}
              fetchAppointments={() =>
                fetchAppointmentsForPatient(patientId.toString())
              }
              patientId={Number(patientId)}
            />
          )}
        </div>
        <div className="mt-4">
          <button
            className="w-full text-left font-semibold bg-gray-200 p-2 rounded"
            onClick={() => setIsDoctorTableExpanded(!isDoctorTableExpanded)}
          >
            {isDoctorTableExpanded ? "▼" : "►"} Patient's Doctors (
            {doctors.length})
          </button>
          {isDoctorTableExpanded && (
            <DoctorTable
              doctors={doctors}
              loading={loading}
              error={error}
              onRefresh={() => fetchDoctorsForPatient()}
            />
          )}
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default EditPatientModal;
