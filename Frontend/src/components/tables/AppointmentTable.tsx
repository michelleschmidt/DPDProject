import React, { useState, useEffect } from "react";
import { Appointment, Patient, Doctor } from "../Types";
import EditDoctorModal from "../docModal/EditModal";
import EditPatientModal from "../patientModal/EditModal";
import DeleteConfirmationModal from "../appointmentModal/DeleteConfirmationModal";
import EditAppointmentModal from "../appointmentModal/EditModal";
import axiosInstance from "../../Axios";

interface AppointmentTableProps {
  appointments: Appointment[];
  fetchAppointments: (doctorId?: number) => Promise<void>; // Updated to accept doctorId as optional
  doctorId?: number; // Optional doctorId
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments,
  fetchAppointments,
  doctorId,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
  };

  const getStatusColor = (completed: boolean) => {
    return completed
      ? "bg-green-200 text-green-800"
      : "bg-yellow-200 text-yellow-800";
  };

  useEffect(() => {
    if (doctorId !== undefined) {
      fetchAppointments(doctorId);
    }
  }, [doctorId, fetchAppointments]);

  const handleDoctorClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsEditModalOpen(true);
  };

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedDoctor(null);
    setSelectedPatient(null);
    setSelectedAppointment(null);
    setIsEditModalOpen(false);
  };

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsEditModalOpen(true);
  };

  const handleDelete = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedAppointment) return;
    try {
      await axiosInstance.delete(`/api/appointments/${selectedAppointment.id}`);
      console.log("Deleted Appointment:", selectedAppointment);
      setIsDeleteModalOpen(false);
      fetchAppointments(doctorId); // Adjusted to pass doctorId directly
    } catch (error) {
      console.error("Error deleting appointment:", error);
      setIsDeleteModalOpen(false);
    }
  };

  const handleUpdateSuccess = async () => {
    await fetchAppointments(doctorId); // Adjusted to pass doctorId directly
    handleCloseModal();
  };

  const linkStyle =
    "text-blue-600 hover:text-blue-800 cursor-pointer transition duration-300 border-b border-transparent hover:border-blue-800";

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">
              Doctor
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">
              Patient
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">
              Date & Time
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">
              Reason
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">
              Status
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr
              key={appointment.id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-4 px-4">
                {appointment.doctor ? (
                  <span
                    onClick={() => handleDoctorClick(appointment.doctor)}
                    className={linkStyle}
                  >
                    {`${appointment.doctor.first_name} ${appointment.doctor.last_name}`}
                  </span>
                ) : (
                  "Unknown Doctor"
                )}
              </td>
              <td className="py-4 px-4">
                {appointment.patient ? (
                  <span
                    onClick={() => handlePatientClick(appointment.patient)}
                    className={linkStyle}
                  >
                    {`${appointment.patient.first_name} ${appointment.patient.last_name}`}
                  </span>
                ) : (
                  "Unknown Patient"
                )}
              </td>
              <td className="py-4 px-4">
                {formatDateTime(appointment.appointmentDate) ||
                  "No date provided"}
              </td>
              <td className="py-4 px-4">
                {appointment.appointmentReason
                  ? `${appointment.appointmentReason.reason || ""} - ${
                      appointment.appointmentReason.notes || ""
                    }`
                  : "No Reason Provided"}
              </td>
              <td className="py-4 px-4">
                <span
                  className={`py-1 px-3 rounded-full text-xs font-medium ${getStatusColor(
                    appointment.completed
                  )}`}
                >
                  {appointment.completed ? "Completed" : "Pending"}
                </span>
              </td>
              <td className="py-4 px-4">
                <button
                  onClick={() => handleEdit(appointment)}
                  className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(appointment)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      {isEditModalOpen && selectedPatient && (
        <EditPatientModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          patient={selectedPatient}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      {isEditModalOpen && selectedDoctor && (
        <EditDoctorModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          doctor={selectedDoctor}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      {isEditModalOpen && selectedAppointment && (
        <EditAppointmentModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          appointment={selectedAppointment}
          onSubmit={handleUpdateSuccess}
        />
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default AppointmentTable;
