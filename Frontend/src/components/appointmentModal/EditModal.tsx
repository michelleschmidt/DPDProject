import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Appointment, Patient, Doctor, Availability } from "../Types";
import axiosInstance from "../../axios/Axios";

interface EditAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (appointment: Appointment) => void;
  appointment: Appointment;
}

const appointmentReasons = {
  "Regular consultation": [
    "Routine Check-up",
    "Diagnostic appointment",
    "Follow Up appointment",
    "Non-urgent medical issue",
    "Other",
  ],
  "Acute Consultation": [
    "Sudden worsening of chronic condition",
    "Acute infection",
    "Acute pain",
  ],
  "Preventive Health Check-Ups": [
    "Annual Health Check-Up",
    "Cancer Screening",
    "Well-Child Visit",
    "Vaccination appointment",
    "Other",
  ],
};

const EditAppointmentModal: React.FC<EditAppointmentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  appointment,
}) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null); // State for selected time
  const [appointmentReasonCategory, setAppointmentReasonCategory] =
    useState<string>("");
  const [appointmentReasonSubcategory, setAppointmentReasonSubcategory] =
    useState<string>("");
  const [bookTranslation, setBookTranslation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && appointment) {
      setSelectedPatient(appointment.patient);
      setSelectedDoctor(appointment.doctor);
      const appointmentDate = new Date(appointment.appointmentDate);
      const appointmentTime = appointmentDate
        .toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
        .substring(0, 5); // Extract time portion only

      setSelectedDate(appointmentDate);
      setSelectedTime(appointmentTime); // Initialize selectedTime from appointment

      const reason = appointment.appointmentReason?.reason || "";
      const subcategory = appointment.appointmentReason?.notes || "";

      setAppointmentReasonCategory(reason);
      setAppointmentReasonSubcategory(subcategory);

      setBookTranslation(appointment.bookTranslation);
    }
  }, [isOpen, appointment]);

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/users/patients");
      setPatients(response.data);
    } catch (error: any) {
      console.error("Error fetching patients:", error);
      setError("Failed to fetch patients. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/users");
      setDoctors(response.data);
    } catch (error: any) {
      console.error("Error fetching doctors:", error);
      setError("Failed to fetch doctors. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchPatients();
      fetchDoctors();
    }
  }, [isOpen, fetchPatients, fetchDoctors]);

  const fetchDoctorAvailability = useCallback(async (doctorId: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(
        `/api/availabilities/doctor/${doctorId}`
      );
      setAvailabilities(response.data);
    } catch (error: any) {
      console.error("Error fetching availabilities:", error);
      setError(`Failed to fetch availabilities. ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      fetchDoctorAvailability(selectedDoctor.userId);
    }
  }, [selectedDoctor, fetchDoctorAvailability]);

  const getAvailableDates = () => {
    const dates = [
      ...new Set(availabilities.map((a) => a.availability_date.split("T")[0])),
    ];
    return dates.map((date) => new Date(date));
  };

  const getAvailableTimeSlots = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return availabilities
      .filter((a) => a.availability_date.startsWith(dateString))
      .map((a) => a.availability_date.split("T")[1].substring(0, 5));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPatient && selectedDoctor && selectedDate && selectedTime) {
      const newAppointment = {
        user_id: selectedPatient.userId,
        doctor_id: selectedDoctor.userId,
        availability_id: availabilities.find(
          (a) =>
            a.availability_date.startsWith(
              selectedDate.toISOString().split("T")[0]
            ) && a.availability_date.includes(selectedTime)
        )?.id,
        appointment_reason: {
          reason: appointmentReasonCategory,
          notes: appointmentReasonSubcategory,
        },
        book_translation: bookTranslation,
      };

      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.put(
          `/api/appointments/${appointment.id}`,
          newAppointment
        );
        console.log("Appointment updated successfully:", response.data);
        onSubmit(response.data);
        onClose();
      } catch (error: any) {
        console.error("Error updating appointment:", error);
        setError(
          `Failed to update appointment. ${
            error.response?.data?.error || error.message
          }`
        );
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white p-6 rounded-lg max-w-md w-full m-4">
        <h2 className="text-2xl font-bold mb-4">Edit Appointment</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient selection */}
          <div>
            <label className="block mb-1">Patient:</label>
            <select
              value={selectedPatient?.userId || ""}
              onChange={(e) =>
                setSelectedPatient(
                  patients.find((p) => p.userId === Number(e.target.value)) ||
                    null
                )
              }
              className="w-full p-2 border rounded"
            >
              {patients.map((patient) => (
                <option key={patient.userId} value={patient.userId}>
                  {patient.first_name} {patient.last_name}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor selection */}
          <div>
            <label className="block mb-1">Doctor:</label>
            <select
              value={selectedDoctor?.userId || ""}
              onChange={(e) =>
                setSelectedDoctor(
                  doctors.find((d) => d.userId === Number(e.target.value)) ||
                    null
                )
              }
              className="w-full p-2 border rounded"
            >
              {doctors.map((doctor) => (
                <option key={doctor.userId} value={doctor.userId}>
                  {doctor.first_name} {doctor.last_name}
                </option>
              ))}
            </select>
          </div>

          {/* Current Appointment Date and Time */}
          <div>
            <label className="block mb-1">Current Appointment:</label>
            <p className="font-semibold">
              {appointment &&
                new Date(appointment.appointmentDate).toLocaleString()}
            </p>
          </div>

          {/* Date selection */}
          <div>
            <label className="block mb-1">Select New Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date) => {
                setSelectedDate(date);
                setSelectedTime(null); // Reset selectedTime when selecting a new date
              }}
              includeDates={getAvailableDates()}
              dateFormat="MMMM d, yyyy"
              placeholderText="Select an available date"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Time selection */}
          {selectedDate && (
            <div>
              <label className="block mb-1">Select New Time:</label>
              <div className="grid grid-cols-3 gap-2">
                {getAvailableTimeSlots(selectedDate).map((time) => {
                  const isCurrentTime = time === selectedTime; // Compare directly with selectedTime

                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 rounded ${
                        isCurrentTime
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Appointment Reason Category */}
          <div>
            <label className="block mb-1">Appointment Reason:</label>
            <select
              value={appointmentReasonCategory}
              onChange={(e) => {
                setAppointmentReasonCategory(e.target.value);
                setAppointmentReasonSubcategory("");
              }}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a reason category</option>
              {Object.keys(appointmentReasons).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Appointment Reason Subcategory */}
          {appointmentReasonCategory && (
            <div>
              <label className="block mb-1">Specific Reason:</label>
              <select
                value={appointmentReasonSubcategory}
                onChange={(e) =>
                  setAppointmentReasonSubcategory(e.target.value)
                }
                className="w-full p-2 border rounded"
              >
                <option value="">Select a specific reason</option>
                {appointmentReasons[
                  appointmentReasonCategory as keyof typeof appointmentReasons
                ]?.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Book translation checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={bookTranslation}
              onChange={(e) => setBookTranslation(e.target.checked)}
              className="mr-2"
            />
            <label>Book Translation</label>
          </div>

          {/* Submit and Cancel buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Update Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
