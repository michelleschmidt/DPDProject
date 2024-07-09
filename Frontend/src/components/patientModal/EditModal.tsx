import React, { useState, useEffect } from "react";
import axiosInstance from "../../Axios";
import AppointmentTable from "../tables/AppointmentTable";
import DoctorTable from "../tables/DoctorTable";
import PatientForm from "./PatientForm";

interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  patientId?: number;
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

  useEffect(() => {
    if (isOpen && patientId) {
      fetchAppointmentsForPatient(patientId.toString());
      fetchDoctorsForPatient(patientId.toString());
    }
  }, [isOpen, patientId]);

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

  const fetchDoctorsForPatient = async (patientId: string) => {
    try {
      const response = await axiosInstance.get(
        `/api/appointments/user-doctors/${patientId}`
      );
      console.log("Doctors response:", response.data);
      if (response.data && Array.isArray(response.data)) {
        const processedDoctors = response.data.map((doctor: any) => ({
          id: doctor.id,
          title: doctor.title || "",
          first_name: doctor.first_name || "",
          last_name: doctor.last_name || "",
          profileImage: doctor.profileImage || "",
          specialization: {
            area_of_specialization:
              doctor.specialization?.area_of_specialization || "Not specified",
          },
          languages: doctor.languages || [],
        }));
        setDoctors(processedDoctors);
      } else {
        console.error("Unexpected response format for doctors:", response.data);
        setError("Failed to fetch doctors. Unexpected data format.");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError("Failed to fetch doctors. Please try again.");
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      setError(null);
      const updatedPatient = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number,
        title: formData.title,
        date_of_birth: formData.date_of_birth,
        insurance_type: formData.insurance,
        accessibility_needs: formData.accessibility_needs,
        address: {
          street: formData.street,
          postal_code: formData.postcode,
          city: formData.city,
          state: formData.state,
        },
        emergency_contact_details: {
          name: formData.emergency_contact_name,
          phone_number: formData.emergency_contact_phone,
          relationship: formData.emergency_contact_relationship,
        },
        languages: formData.languages.map((lang: any) => ({
          language_name: lang.value,
        })),
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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl w-2/3 max-h-[90vh] overflow-y-auto relative">
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 bg-red-500 text-white p-2 rounded"
          >
            Close
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">Edit Patient</h2>
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
              onEdit={(doctor) => console.log("Edit doctor", doctor)}
              onDelete={(doctor) => console.log("Delete doctor", doctor)}
              DEFAULT_AVATAR={""}
            />
          )}
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default EditPatientModal;
