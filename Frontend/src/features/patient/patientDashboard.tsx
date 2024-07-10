import React, { useEffect, useState } from "react";
import {
  BsFillTelephoneForwardFill,
  BsFillTelephoneXFill,
} from "react-icons/bs";
import {
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaPhone,
  FaSearch,
} from "react-icons/fa";
import { MdDelete, MdOutlineLocationOn, MdOutlineMail } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "../../Web.css";
import axiosInstance from "../../axios/Axios";
import { Appointment, Doctor } from "../../components/Types";
import DeleteConfirmationModal from "../../components/appointmentModal/DeleteConfirmationModal";
import TranslationBookingModal from "../../components/appointmentModal/TranslationConfirmationModal";
import ViewAppointmentModal from "../../components/appointmentModal/ViewAppointment";
import { useAuth } from "../../components/auth/AuthContext";
import PageLayout from "../../components/layout/PageLayout";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isConfirmTranslationModalOpen, setIsConfirmTranslationModalOpen] =
    useState(false);
  const [
    selectedAppointmentForTranslation,
    setSelectedAppointmentForTranslation,
  ] = useState<Appointment | null>(null);

  const fetchAppointments = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/appointments/user-appointments`
      );
      if (response.data && Array.isArray(response.data)) {
        const mappedAppointments = response.data.map((appointment: any) => ({
          id: appointment.id,
          appointmentDate: appointment.availability.availability_date,
          appointmentReason: {
            reason: appointment.appointment_reason.reason,
            notes: appointment.appointment_reason.notes,
          },
          bookTranslation: appointment.book_translation,
          completed: appointment.completed,
          doctor: {
            userId: appointment.doctor_id,
            id: appointment.doctor_id, // Assuming doctor_id is also the userId
            first_name: appointment.doctor.first_name,
            last_name: appointment.doctor.last_name,
            title: appointment.doctor.title,
            address: appointment.doctor.address,
            specialization: appointment.doctor.specialization,
            // Add other required Doctor properties with default values if not available
            email: "",
            role: "doctor",
            languages: [],
            phone_number: "",
            date_of_birth: new Date(),
            gender: "",
          },
          patient: {
            userId: appointment.user_id,
            // Add other required Patient properties with default values
            first_name: "",
            last_name: "",
            address: {
              street: "",
              city: "",
              state: "",
              country: "",
              postcode: "",
            },
            languages: [],
            email: "",
            role: "patient",
            phone_number: "",
            date_of_birth: new Date(),
            gender: "",
            insurance: "",
          },
          availability: {
            id: appointment.availability_id,
            doctor_id: appointment.doctor_id,
            availability_date: appointment.availability.availability_date,
            active: true, // Assuming active is always true for booked appointments
          },
        }));
        console.log("Fetched appointments:", mappedAppointments);
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

  const handleDeleteClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDeleteModalOpen(true);
  };

  const handleViewAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsViewModalOpen(true);
  };

  const openConfirmTranslationModal = (appointment: Appointment) => {
    setSelectedAppointmentForTranslation(appointment);
    setIsConfirmTranslationModalOpen(true);
  };

  const toggleBookTranslation = async (appointment: Appointment) => {
    try {
      console.log(
        "Starting toggleBookTranslation for appointment:",
        appointment
      );

      // Toggle the book_translation value
      const updatedBookTranslation = !appointment.bookTranslation;
      console.log("Updating book_translation to:", updatedBookTranslation);

      const response = await axiosInstance.put(
        `/api/appointments/${appointment.id}`,
        { book_translation: updatedBookTranslation }
      );

      console.log("PUT request response:", response);

      if (response.status === 200 || response.status === 201) {
        console.log(
          "PUT request successful. Updated appointment:",
          response.data
        );

        // Fetch appointments again after successful PUT request
        console.log("Fetching updated appointments...");
        await fetchAppointments();

        console.log("State updated with new appointments");
      } else {
        console.error("PUT request failed. Status:", response.status);
      }
    } catch (error) {
      console.error("Error in toggleBookTranslation:", error);
    }
  };

  return (
    <PageLayout text="Dashboard">
      <div className="bg-blue-100 rounded-lg shadow-md p-6 mb-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-blue-700">
              Upcoming Appointments
            </h2>
            <button
              onClick={() => alert("Please use the app")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Book new appointment
            </button>
          </div>
          {appointments.length > 0 ? (
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {appointments.map((appointment) => {
                    const appointmentDate = new Date(
                      appointment.appointmentDate
                    );
                    const daysUntilAppointment = Math.ceil(
                      (appointmentDate.getTime() - new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    );

                    return (
                      <div
                        key={appointment.id}
                        className="w-full md:w-1/2 flex-shrink-0 px-2"
                      >
                        <div className="bg-white p-5 rounded-lg shadow-lg relative h-full">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-xl font-semibold text-blue-700">
                              {appointment.doctor.title}{" "}
                              {appointment.doctor.first_name}{" "}
                              {appointment.doctor.last_name}
                            </span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  openConfirmTranslationModal(appointment)
                                }
                                className="text-blue-500 hover:text-blue-700"
                              >
                                {appointment.bookTranslation ? (
                                  <BsFillTelephoneForwardFill size={20} />
                                ) : (
                                  <BsFillTelephoneXFill size={20} />
                                )}
                              </button>
                              <button
                                onClick={() =>
                                  handleViewAppointment(appointment)
                                }
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <FaSearch size={20} />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(appointment)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <MdDelete size={20} />
                              </button>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-start">
                              <FaCalendarAlt className="mr-2 text-blue-500 mt-1" />
                              <span>{appointmentDate.toDateString()}</span>
                            </div>
                            <div className="flex items-start">
                              <MdOutlineLocationOn className="mr-2 text-blue-500 mt-1" />
                              <span>{`${appointment.doctor.address.street}, ${appointment.doctor.address.postcode} ${appointment.doctor.address.city}, ${appointment.doctor.address.state}`}</span>
                            </div>
                            <p className="font-medium text-blue-600">
                              Appointment in {daysUntilAppointment} day
                              {daysUntilAppointment !== 1 ? "s" : ""}
                            </p>
                          </div>
                          <div className="mt-4 flex justify-center">
                            <button
                              onClick={() => alert("Calling Translator...")}
                              className={`bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 ${
                                appointment.bookTranslation
                                  ? "visible"
                                  : "invisible"
                              }`}
                            >
                              Call Translator
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
                disabled={currentIndex === 0}
              >
                <FaChevronLeft className="text-blue-500" />
              </button>
              <button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    Math.min(appointments.length - 1, prev + 1)
                  )
                }
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
                disabled={currentIndex === appointments.length - 1}
              >
                <FaChevronRight className="text-blue-500" />
              </button>
            </div>
          ) : (
            <p className="mt-4 text-gray-700">No upcoming appointments.</p>
          )}
        </div>

        <div className="bg-blue-100 pt-8 mt-8 border-t border-blue-200">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            My Doctors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.userId}
                className="bg-white p-5 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
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
                  onClick={() => openAddAppointmentModal(doctor)}
                  className="bg-blue-500 text-white hover:bg-blue-600 w-full py-2 px-4 rounded"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Modals */}
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
        {isViewModalOpen && selectedAppointment && (
          <ViewAppointmentModal
            isOpen={isViewModalOpen}
            onClose={handleCloseModal}
            appointment={selectedAppointment}
          />
        )}
        <TranslationBookingModal
          isOpen={isConfirmTranslationModalOpen}
          onClose={() => setIsConfirmTranslationModalOpen(false)}
          onConfirm={() => {
            if (selectedAppointmentForTranslation) {
              toggleBookTranslation(selectedAppointmentForTranslation);
              setIsConfirmTranslationModalOpen(false);
            }
          }}
        />
      </div>
    </PageLayout>
  );
};

export default PatientDashboard;
