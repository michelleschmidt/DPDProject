import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Appointment, Patient, Doctor, Availability } from "../Types";
import axiosInstance from "../../axios/Axios";
import { API_ENDPOINTS } from "../../axios/ConstantsAxios";

interface AddAppointmentModalProps {
  isOpen: boolean;
  onSubmit: (appointment: Omit<Appointment, "id">) => void;
  onClose: () => void;
  preselectedDoctor?: Doctor;
  preselectedPatientId?: number;
  sendby: "Admin" | "Patient";
}

type AppointmentReasons = {
  [key: string]: string[];
};

const appointmentReasons: AppointmentReasons = {
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

const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({
  isOpen,
  onClose,
  sendby,
  onSubmit,
  preselectedPatientId,
  preselectedDoctor,
}) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [availabilitiesFetched, setAvailabilitiesFetched] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(
    preselectedDoctor || null
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentReasonCategory, setAppointmentReasonCategory] =
    useState("");
  const [appointmentReasonSubcategory, setAppointmentReasonSubcategory] =
    useState("");
  const [bookTranslation, setBookTranslation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedDoctor) {
      setSelectedDoctor(preselectedDoctor);
    } else {
      console.log("No preselected doctor provided");
    }
  }, [preselectedDoctor]);

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      if (preselectedPatientId) {
        const response = await axiosInstance.get(
          `/api/users/${preselectedPatientId}`
        );
        setPatients([response.data]);
        setSelectedPatient(response.data);
      } else {
        const response = await axiosInstance.get(API_ENDPOINTS.GET_PATIENTS);
        console.log("Fetched all patients:", response.data);
        setPatients(response.data);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
      setError("Failed to fetch patients. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [preselectedPatientId]);

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.GET_DOCTORS);
      setDoctors(response.data || []);
    } catch (error) {
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
      if (response.data && Array.isArray(response.data)) {
        setAvailabilities(response.data);
        setAvailabilitiesFetched(true);
      } else {
        throw new Error("Unexpected response format for availabilities");
      }
    } catch (error: any) {
      console.error("Error fetching availabilities:", error);
      setError(`Failed to fetch availabilities. ${error.message}`);
      setAvailabilities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDoctor && selectedDoctor.userId) {
      fetchDoctorAvailability(selectedDoctor.userId);
    } else {
      console.log("No doctor selected or invalid doctor data");
      setAvailabilities([]);
      setAvailabilitiesFetched(false);
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
      .filter((a) => a.availability_date.startsWith(dateString) && a.active)
      .map((a) => a.availability_date.split("T")[1].substring(0, 5));
  };

  const handlePatientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const patient = patients.find((p) => p.userId === Number(e.target.value));
    setSelectedPatient(patient || null);
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const doctor = doctors.find((d) => d.userId === Number(e.target.value));
    setSelectedDoctor(doctor || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted and user_id", preselectedPatientId);

    let patientId = preselectedPatientId || selectedPatient?.userId;

    if (!patientId || !selectedDoctor || !selectedDate || !selectedTime) {
      console.log("Form validation failed");
      console.log("Selected Patient:", selectedPatient);
      console.log("Selected Doctor:", selectedDoctor);
      console.log("Selected Date:", selectedDate);
      console.log("Selected Time:", selectedTime);
      setError("Please fill in all required fields.");
      return;
    }

    const newAppointment = {
      user_id: patientId,
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

    console.log("New appointment data:", newAppointment);

    try {
      setLoading(true);
      setError(null);

      let response;
      if (sendby === "Admin") {
        console.log("Sending request as Admin");
        response = await axiosInstance.post(
          "/api/appointments/create-new",
          newAppointment
        );
      } else if (sendby === "Patient") {
        console.log("Sending request as Patient");
        response = await axiosInstance.post(
          "/api/appointments/new",
          newAppointment
        );
      }

      console.log("Response received:", response);

      if (response && response.data) {
        console.log("Appointment added successfully:", response.data);
        onSubmit(response.data);
        onClose();
      } else {
        console.log("No response data");
        throw new Error("No response data received");
      }
    } catch (error: any) {
      console.error("Error adding appointment:", error);
      setError(
        `Failed to add appointment. ${
          error.response?.data?.error || error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Appointment</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Patient Selection */}
          <div>
            <label>Patient:</label>
            {preselectedPatientId ? (
              <p>
                {selectedPatient?.first_name} {selectedPatient?.last_name}
              </p>
            ) : (
              <select
                onChange={handlePatientChange}
                value={selectedPatient?.userId || ""}
              >
                <option value="">Select a patient</option>
                {patients.map((patient) => (
                  <option key={patient.userId} value={patient.userId}>
                    {patient.first_name} {patient.last_name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Doctor Selection */}
          <div>
            <label>Doctor:</label>
            {preselectedDoctor ? (
              <p>
                {preselectedDoctor.title} {preselectedDoctor.first_name}{" "}
                {preselectedDoctor.last_name}
              </p>
            ) : (
              <select
                onChange={handleDoctorChange}
                value={selectedDoctor?.userId || ""}
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.userId} value={doctor.userId}>
                    {doctor.title} {doctor.first_name} {doctor.last_name} -{" "}
                    {doctor.specialization?.area_of_specialization}
                  </option>
                ))}
              </select>
            )}
          </div>

          {selectedDoctor && availabilitiesFetched && (
            <>
              <div>
                <label>Select Date:</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setSelectedTime(null);
                  }}
                  includeDates={getAvailableDates()}
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select an available date"
                  className="w-full p-2 border rounded"
                />
              </div>

              {selectedDate && (
                <div>
                  <label>Select Time:</label>
                  {getAvailableTimeSlots(selectedDate).map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 rounded ${
                        selectedTime === time
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          <div>
            <label>Appointment Reason:</label>
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

          {appointmentReasonCategory && (
            <div>
              <label>Specific Reason:</label>
              <select
                value={appointmentReasonSubcategory}
                onChange={(e) =>
                  setAppointmentReasonSubcategory(e.target.value)
                }
                className="w-full p-2 border rounded"
              >
                <option value="">Select a specific reason</option>
                {appointmentReasons[appointmentReasonCategory].map(
                  (subcategory: string) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  )
                )}
              </select>
            </div>
          )}

          <div>
            <label>
              <input
                type="checkbox"
                checked={bookTranslation}
                onChange={(e) => setBookTranslation(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              Book Translation
            </label>
            <p>
              Check this if translation services for this appointment are
              needed.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Add Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointmentModal;
