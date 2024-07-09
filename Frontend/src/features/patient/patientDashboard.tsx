import React, { useEffect, useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import {
  MdOutlineMail,
  MdOutlineLocationOn,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import { FaPhone, FaCalendarAlt } from "react-icons/fa";
import "../../Web.css";
import { Appointment, Doctor, Patient } from "../../components/Types";
import axiosInstance from "../../Axios";
import { useAuth } from "../../components/auth/AuthContext";
import Button from "../../utils/Button";
import EditAppointmentUserModal from "../../components/appointmentModal/EditAppointmentUser";
import DeleteConfirmationModal from "../../components/appointmentModal/DeleteConfirmationModal";
import AddAppointmentModal from "../../components/appointmentModal/AddModal";

const PatientDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const { userData } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDoctorForNewAppointment, setSelectedDoctorForNewAppointment] =
    useState<Doctor | null>(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(
    null
  );

  const fetchAppointments = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/appointments/user-appointments`
      );
      if (response.data && Array.isArray(response.data)) {
        const mappedAppointments = response.data.map((appointment) => ({
          ...appointment,
          doctor: {
            ...appointment.doctor,
            userId: appointment.doctor_id, // Add userId to the doctor object
          },
          book_translation: appointment.bookTranslation,
        }));
        setAppointments(mappedAppointments);
        console.log("Appointments: ", mappedAppointments);
      } else {
        console.error(
          "Unexpected response format for appointments:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      console.log("ID: ", userData?.userId);
      const response = await axiosInstance.get(
        `/api/appointments/user-doctors`
      );
      if (response.data && Array.isArray(response.data)) {
        const mappedDoctors = response.data.map((doctor: any) => ({
          ...doctor,
          specialization: {
            area_of_specialization: doctor.area_of_specialization,
          },
          first_name: doctor.doctor_name.split(" ")[1],
          last_name: doctor.doctor_name.split(" ")[2],
          title: doctor.doctor_name.split(" ")[0],
          email: doctor.email,
          phone_number: doctor.phone_number,
          address: {
            street: doctor.street,
            postcode: doctor.postcode,
            city: doctor.city,
            state: doctor.state,
          },
        }));
        setDoctors(mappedDoctors);
        console.log(mappedDoctors);
      } else {
        console.error("Unexpected response format for doctors:", response.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, [userData]);

  const handleEditAppointment = (appointmentId: number) => {
    const appointment = appointments.find((app) => app.id === appointmentId);
    if (
      appointment &&
      appointment.doctor &&
      appointment.doctor.specialization &&
      appointment.doctor.userId
    ) {
      setSelectedAppointment(appointment);
      setIsEditModalOpen(true);
    } else {
      console.error("Incomplete appointment data:", appointment);
      // Handle the error, maybe show a message to the user
    }
  };

  const handleAddAppointment = (newAppointment: Omit<Appointment, "id">) => {
    // Assuming your backend generates the ID and returns the full appointment
    axiosInstance
      .post("/api/appointments", newAppointment)
      .then((response) => {
        const appointmentWithId: Appointment = response.data;
        setAppointments((prevAppointments) => [
          ...prevAppointments,
          appointmentWithId,
        ]);
        setIsAddModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding appointment:", error);
        // Handle error (e.g., show an error message to the user)
      });
  };

  const handleDeleteAppointment = (appointmentId: number) => {
    setAppointmentToDelete(appointmentId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (appointmentToDelete !== null) {
      try {
        await axiosInstance.delete(`/api/appointments/${appointmentToDelete}`);
        setAppointments((prev) =>
          prev.filter((appointment) => appointment.id !== appointmentToDelete)
        );
      } catch (error) {
        console.error("Error deleting appointment:", error);
      } finally {
        setIsDeleteModalOpen(false);
        setAppointmentToDelete(null);
      }
    }
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleOpenAddModal = (doctor: Doctor) => {
    setSelectedDoctorForNewAppointment(doctor);
    setIsAddModalOpen(true);
  };

  const handleUpdateSuccess = (updatedAppointment: Appointment) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === updatedAppointment.id
          ? {
              ...appointment,
              ...updatedAppointment,
              doctor: {
                ...appointment.doctor,
                ...updatedAppointment.doctor,
              },
            }
          : appointment
      )
    );
    handleCloseModal();
  };

  return (
    <PageLayout text="Dashboard">
      <div className="h-full w-full p-6 bg-gray-100">
        <h1 className="text-3xl font-semibold text-blue-600 mb-6">
          Welcome to Your Health Dashboard, {userData?.first_name}
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">
            Upcoming Appointments
          </h2>
          <Button
            text="Book a new appointment"
            onClick={() => {
              /* Handle booking */
            }}
          />
          {appointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">
                      {appointment.doctor.title} {appointment.doctor.first_name}{" "}
                      {appointment.doctor.last_name}
                    </span>
                    <p>
                      <strong>Specialization:</strong>{" "}
                      {appointment.doctor.specialization.area_of_specialization}
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    <span>
                      {new Date(
                        appointment.availability.availability_date
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-start mb-2">
                    <MdOutlineLocationOn className="mr-2 text-blue-500 mt-1" />
                    {`${appointment.doctor.address.street}, ${appointment.doctor.address.postcode} ${appointment.doctor.address.city}, ${appointment.doctor.address.state}`}
                  </div>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={() => handleEditAppointment(appointment.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4">No upcoming appointments.</p>
          )}
        </div>

        {/* Doctors section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">
            My Doctors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor) => (
              <div key={doctor.userId} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  {doctor.title} {doctor.first_name} {doctor.last_name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {doctor.specialization?.area_of_specialization ||
                    "Not specified"}
                </p>
                <div className="flex items-center mb-1">
                  <MdOutlineMail className="mr-2 text-blue-500" />
                  <span className="text-sm">{doctor.email}</span>
                </div>
                <div className="flex items-center mb-2">
                  <FaPhone className="mr-2 text-blue-500" />
                  <span className="text-sm">{doctor.phone_number}</span>
                </div>
                <button
                  onClick={() => handleOpenAddModal(doctor)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Modals */}
        {isEditModalOpen && selectedAppointment && (
          <EditAppointmentUserModal
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
        {isAddModalOpen && selectedDoctorForNewAppointment && (
          <AddAppointmentModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={handleAddAppointment}
            preselectedPatientId={userData?.userId}
            preselectedDoctor={selectedDoctorForNewAppointment}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default PatientDashboard;
