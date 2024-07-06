import React, { useState, useEffect } from "react";
import axiosInstance from "../../Axios";
import AppointmentTable from "../../components/tables/AppointmentTable";
import { Appointment } from "../../components/Types";
import PageLayout from "../../components/layout/PageLayout";
import DeleteConfirmationModal from "../../components/appointmentModal/DeleteConfirmationModal";
import EditAppointmentModal from "../../components/appointmentModal/EditModal";
import AddAppointmentModal from "../../components/appointmentModal/AddModal";

const ManageAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<Appointment[]>(
        "/api/appointments/"
      );
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("Failed to fetch appointments. Please try again.");
      setLoading(false);
    }
  };

  const handleDelete = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDeleteModalOpen(true);
  };

  const handleAddAppointment = () => {
    console.log("Opening Add Appointment Modal"); // Add this line for debugging
    setIsAddModalOpen(true);
  };

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    fetchAppointments(); // Refresh the list when the modal is closed
  };

  const confirmDelete = async () => {
    if (!selectedAppointment) return;
    try {
      await axiosInstance.delete(`/api/appointments/${selectedAppointment.id}`);
      console.log("Deleted Appointment:", selectedAppointment);
      setIsDeleteModalOpen(false);
      fetchAppointments(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting appointment:", error);
      setIsDeleteModalOpen(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <PageLayout text="Manage Appointments">
      <div className="flex min-h-screen pb-20 justify-center w-full">
        <div className="flex flex-col gap-10 w-[86%] py-10">
          <div className="p-6 w-full flex-flex-col gap-8 h-full bg-white shadow-custom rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl text-blue-600 font-semibold">
                Appointments
              </h1>
              <button
                onClick={handleAddAppointment}
                className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition duration-300"
              >
                Add Appointment
              </button>
            </div>
            <AppointmentTable
              appointments={appointments}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
      {isAddModalOpen && (
        <AddAppointmentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={() => {
            fetchAppointments();
            setIsAddModalOpen(false);
          }}
        />
      )}
      <AddAppointmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={fetchAppointments}
      />
    </PageLayout>
  );
};

export default ManageAppointments;
