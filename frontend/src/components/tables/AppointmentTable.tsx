import React, { useState, useEffect } from "react";
import { Appointment, Patient, Doctor } from "../Types";
import EditDoctorModal from "../docModal/EditModal";
import EditPatientModal from "../patientModal/EditModal";
import DeleteConfirmationModal from "../appointmentModal/DeleteConfirmationModal";
import EditAppointmentModal from "../appointmentModal/EditModal";
import axiosInstance from "../../axios/Axios";

interface AppointmentTableProps {
  appointments: Appointment[];
  fetchAppointments: (doctorId?: number) => Promise<void>;
  doctorId?: number;
  patientId?: number;
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
  const [searchTerm, setSearchTerm] = useState("");
  const [translationFilter, setTranslationFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (doctorId !== undefined) {
      fetchAppointments(doctorId);
    }
  }, [doctorId, fetchAppointments]);

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
    setIsDeleteModalOpen(false);
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
      setIsDeleteModalOpen(false);
      fetchAppointments(doctorId);
    } catch (error) {
      console.error("Error deleting appointment:", error);
      setIsDeleteModalOpen(false);
    }
  };

  const handleUpdateSuccess = async () => {
    await fetchAppointments(doctorId);
    handleCloseModal();
  };

  const linkStyle =
    "text-blue-600 hover:text-blue-800 cursor-pointer transition duration-300 border-b border-transparent hover:border-blue-800";

  const filteredAppointments = appointments.filter((appointment) => {
    const doctorName =
      `${appointment.doctor?.first_name} ${appointment.doctor?.last_name}`.toLowerCase();
    const patientName =
      `${appointment.patient?.first_name} ${appointment.patient?.last_name}`.toLowerCase();
    const matchesSearch =
      doctorName.includes(searchTerm.toLowerCase()) ||
      patientName.includes(searchTerm.toLowerCase());
    const matchesTranslation =
      !translationFilter || appointment.bookTranslation;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && appointment.completed) ||
      (statusFilter === "pending" && !appointment.completed);

    return matchesSearch && matchesTranslation && matchesStatus;
  });

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Search doctor or patient"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={translationFilter}
            onChange={(e) => setTranslationFilter(e.target.checked)}
            className="mr-2"
          />
          Translation Service
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="font-medium">
            <th className="text-left w-[26%]">Doctor</th>
            <th className="text-left w-[21%]">Patient</th>
            <th className="text-left w-[21%]">Date & Time</th>
            <th className="text-left w-[21%]">Reason</th>
            <th className="text-left w-[21%]">Status</th>
            <th className="text-left w-[26%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment) => (
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
                  className="mr-2 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(appointment)}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-100"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditModalOpen && selectedDoctor && (
        <EditDoctorModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          onUpdateSuccess={handleUpdateSuccess}
          doctorId={selectedDoctor.userId}
        />
      )}
      {isEditModalOpen && selectedPatient && (
        <EditPatientModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          patientId={selectedPatient.userId}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
      {isEditModalOpen && selectedAppointment && (
        <EditAppointmentModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleUpdateSuccess}
          appointment={selectedAppointment}
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
