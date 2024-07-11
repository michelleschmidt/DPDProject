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
  FaLanguage,
} from "react-icons/fa";
import { MdDelete, MdOutlineLocationOn, MdOutlineMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "../../Web.css";
import axiosInstance from "../../axios/Axios";
import { Appointment, Doctor } from "../../components/Types";
import DeleteConfirmationModal from "../../components/appointmentModal/DeleteConfirmationModal";
import TranslationBookingModal from "../../components/appointmentModal/TranslationConfirmationModal";
import ViewAppointmentModal from "../../components/appointmentModal/ViewAppointment";
import { useAuth } from "../../components/auth/AuthContext";
import PageLayout from "../../components/layout/PageLayout";
import AddAppointmentModal from "../../components/appointmentModal/AddModal";

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
  const [currentAppointmentIndex, setCurrentAppointmentIndex] = useState(0);
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  const [isConfirmTranslationModalOpen, setIsConfirmTranslationModalOpen] =
    useState(false);
  const [
    selectedAppointmentForTranslation,
    setSelectedAppointmentForTranslation,
  ] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
            id: appointment.doctor_id,
            first_name: appointment.doctor.first_name,
            last_name: appointment.doctor.last_name,
            title: appointment.doctor.title,
            address: appointment.doctor.address,
            specialization: appointment.doctor.specialization,
            email: "",
            role: "doctor",
            languages: [],
            phone_number: "",
            date_of_birth: new Date(),
            gender: "",
          },
          patient: {
            userId: appointment.user_id,
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
            active: true,
          },
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
      setLoading(true);
      const response = await axiosInstance.get(
        `/api/appointments/user-doctors/${userData?.userId}`
      );
      if (response.data && Array.isArray(response.data)) {
        const processedDoctors: Doctor[] = response.data.map((doctor: any) => ({
          userId: doctor.id,
          id: doctor.id,
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
            id: 0,
          })),
          phone_number: doctor.phone_number || "",
          date_of_birth: doctor.date_of_birth
            ? new Date(doctor.date_of_birth)
            : undefined,
          gender: doctor.gender || "",
          specialization: {
            id: doctor.specialization?.id || 0,
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

  useEffect(() => {
    if (userData) {
      fetchAppointments();
      fetchDoctors();
    }
  }, [userData]);

  const handleAddAppointmentSubmit = () => {
    setIsAddModalOpen(false);
    alert("Appointment successfully added");
    fetchAppointments();
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
      const updatedBookTranslation = !appointment.bookTranslation;
      const response = await axiosInstance.put(
        `/api/appointments/${appointment.id}`,
        { book_translation: updatedBookTranslation }
      );
      if (response.status === 200 || response.status === 201) {
        await fetchAppointments();
      } else {
        console.error("PUT request failed. Status:", response.status);
      }
    } catch (error) {
      console.error("Error in toggleBookTranslation:", error);
    }
  };

  const renderSlideshow = (
    items: any[],
    currentIndex: number,
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
    renderItem: (item: any) => JSX.Element
  ) => (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {renderItem(item)}
          </div>
        ))}
      </div>
      <button
        onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
        disabled={currentIndex === 0}
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={() =>
          setCurrentIndex((prev) => Math.min(items.length - 1, prev + 1))
        }
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
        disabled={currentIndex === items.length - 1}
      >
        <FaChevronRight />
      </button>
    </div>
  );

  const renderAppointment = (appointment: Appointment) => {
    const appointmentDate = new Date(appointment.appointmentDate);
    const daysUntilAppointment = Math.ceil(
      (appointmentDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg m-2">
        <h3 className="text-xl font-semibold mb-2">
          {appointment.doctor.title} {appointment.doctor.first_name}{" "}
          {appointment.doctor.last_name}
        </h3>
        <div className="flex items-center mb-2">
          <FaCalendarAlt className="mr-2 text-blue-500" />
          <span>{appointmentDate.toDateString()}</span>
        </div>
        <div className="flex items-center mb-2">
          <MdOutlineLocationOn className="mr-2 text-blue-500" />
          <span>{`${appointment.doctor.address.street}, ${appointment.doctor.address.postcode} ${appointment.doctor.address.city}, ${appointment.doctor.address.state}`}</span>
        </div>
        <p className="text-blue-600 font-semibold">
          Appointment in {daysUntilAppointment} day
          {daysUntilAppointment !== 1 ? "s" : ""}
        </p>
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => openConfirmTranslationModal(appointment)}
            className="text-blue-500 hover:text-blue-700"
          >
            {appointment.bookTranslation ? (
              <BsFillTelephoneForwardFill />
            ) : (
              <BsFillTelephoneXFill />
            )}
          </button>
          <button
            onClick={() => handleViewAppointment(appointment)}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaSearch />
          </button>
          <button
            onClick={() => handleDeleteClick(appointment)}
            className="text-red-500 hover:text-red-700"
          >
            <MdDelete />
          </button>
        </div>
        {appointment.bookTranslation && (
          <button
            onClick={() => alert("Calling Translator...")}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 w-full"
          >
            Call Translator
          </button>
        )}
      </div>
    );
  };

  const renderDoctor = (doctor: Doctor) => (
    <div className="bg-white p-6 rounded-lg shadow-lg m-2">
      {" "}
      {/* Added shadow-md class */}
      <h3 className="text-xl font-semibold mb-2">
        {doctor.title} {doctor.first_name} {doctor.last_name}
      </h3>
      <p className="text-gray-600 mb-2">
        {doctor.specialization?.area_of_specialization || "Not specified"}
      </p>
      <div className="flex items-center mb-4">
        <FaLanguage className="mr-2 text-blue-500" />
        <span className="text-sm">
          {doctor.languages.map((lang) => lang.language_name).join(", ")}
        </span>
      </div>
      <button
        onClick={() => openAddAppointmentModal(doctor)}
        className="bg-blue-500 text-white hover:bg-blue-600 w-full py-2 px-4 rounded"
      >
        Book Appointment
      </button>
    </div>
  );

  return (
    <PageLayout text="Dashboard">
      <div className="container mx-auto px-4 py-8 flex flex-col">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-blue-700">
              Upcoming Appointments
            </h2>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Book New Appointment
            </button>
          </div>
          {appointments.length > 0 ? (
            renderSlideshow(
              appointments,
              currentAppointmentIndex,
              setCurrentAppointmentIndex,
              renderAppointment
            )
          ) : (
            <p className="text-gray-600">No upcoming appointments.</p>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            My Doctors
          </h2>
          {doctors.length > 0 ? (
            renderSlideshow(
              doctors,
              currentDoctorIndex,
              setCurrentDoctorIndex,
              renderDoctor
            )
          ) : (
            <p className="text-gray-600">No doctors found.</p>
          )}
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
          appointment={selectedAppointment}
          onClose={handleCloseModal}
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
      {selectedDoctorForNewAppointment && (
        <AddAppointmentModal
          isOpen={isAddModalOpen}
          preselectedDoctor={selectedDoctorForNewAppointment}
          preselectedPatientId={userData?.userId}
          onSubmit={handleAddAppointmentSubmit}
          onClose={() => setIsAddModalOpen(false)}
          sendby="Patient"
        />
      )}
    </PageLayout>
  );
};

export default PatientDashboard;
