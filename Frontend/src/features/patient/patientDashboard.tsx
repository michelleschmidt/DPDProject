import React, { useEffect, useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import { MdOutlineMail, MdOutlineLocationOn, MdDelete } from "react-icons/md";
import { FaPhone, FaCalendarAlt, FaSearch } from "react-icons/fa";
import "../../Web.css";
import { Appointment, Doctor } from "../../components/Types";
import axiosInstance from "../../axios/Axios";
import { useAuth } from "../../components/auth/AuthContext";
import Button from "../../utils/Button";
import DeleteConfirmationModal from "../../components/appointmentModal/DeleteConfirmationModal";
import {
  BsFillTelephoneForwardFill,
  BsFillTelephoneXFill,
} from "react-icons/bs";
import ViewAppointmentModal from "../../components/appointmentModal/ViewAppointment";

const PatientDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const { userData } = useAuth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
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
        const mappedAppointments = response.data.map((appointment: any) => ({
          ...appointment,
          doctor: {
            ...appointment.doctor,
            userId: appointment.doctor_id,
          },
          book_translation: appointment.bookTranslation,
        }));
        setAppointments(mappedAppointments);
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
      const response = await axiosInstance.get(
        `/api/appointments/user-doctors/${userData?.userId}`
      );
      if (response.data && Array.isArray(response.data)) {
        const mappedDoctors: Doctor[] = response.data.map((doctor: any) => ({
          userId: doctor.id,
          specialization: {
            id: doctor.specialization_id || 0,
            area_of_specialization: doctor.area_of_specialization,
          },
          first_name: doctor.doctor_name.split(" ")[1],
          last_name: doctor.doctor_name.split(" ")[2],
          title: doctor.doctor_name.split(" ")[0],
          email: doctor.email || "",
          phone_number: doctor.phone_number || "",
          address: {
            street: doctor.street || "",
            postcode: doctor.postcode || "",
            city: doctor.city || "",
            state: doctor.state || "",
            country: doctor.country || "",
          },
          languages: doctor.languages || [],
        }));
        setDoctors(mappedDoctors);
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

  const handleAddAppointment = (newAppointment: Omit<Appointment, "id">) => {
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
    setSelectedAppointment(null);
    setIsViewModalOpen(false);
  };

  const openAddAppointmentModal = (doctor: Doctor) => {
    setSelectedDoctorForNewAppointment(doctor);
    setIsAddModalOpen(true);
  };

  const openViewAppointmentModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsViewModalOpen(true);
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

  const toggleBookTranslation = (appointmentId: number) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? {
              ...appointment,
              bookTranslation: !appointment.bookTranslation,
            }
          : appointment
      )
    );
  };

  return (
    <PageLayout text="Dashboard">
      <div className="h-full w-full p-6 bg-gray-100">
        <h1 className="text-3xl font-semibold text-blue-600 mb-6">
          Welcome to Your Health Dashboard, {userData?.first_name}{" "}
          {userData?.last_name}
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">
            Upcoming Appointments
          </h2>
          <Button
            text="Book a new appointment"
            onClick={() => {
              setIsAddModalOpen(true);
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
                      onClick={() => toggleBookTranslation(appointment.id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      {appointment.bookTranslation ? (
                        <BsFillTelephoneForwardFill size={40} />
                      ) : (
                        <BsFillTelephoneXFill size={40} />
                      )}
                    </button>
                    <button
                      onClick={() => openViewAppointmentModal(appointment)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaSearch size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                  {appointment.bookTranslation && (
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => alert("Calling Translator...")}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400"
                      >
                        Call Translator
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4">No upcoming appointments.</p>
          )}
        </div>

        {/* Doctors section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-blue- mb-4">My Doctors</h2>
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
                <Button
                  onClick={() => openAddAppointmentModal(doctor)}
                  text="Book Appointment"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Modals */}
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => confirmDelete()}
        />
        {isViewModalOpen && selectedAppointment && (
          <ViewAppointmentModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            appointmentId={selectedAppointment.id}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default PatientDashboard;
