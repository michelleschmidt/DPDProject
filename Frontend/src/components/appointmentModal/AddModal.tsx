import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Appointment, Patient, Doctor, Availability } from "../Types";
import axiosInstance from "../../axios/Axios";

interface AddAppointmentModalProps {
  isOpen: boolean;
  onSubmit: (appointment: Omit<Appointment, "id">) => void;
  onClose: () => void;
  preselectedDoctor?: Doctor;
  preselectedPatientId?: number;
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
      console.log("Preselected doctor set:", preselectedDoctor);
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
        console.log("Fetched preselected patient:", response.data);
        setPatients([response.data]);
        setSelectedPatient(response.data);
      } else {
        const response = await axiosInstance.get("/api/users/patients");
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
      if (preselectedDoctor) {
        setDoctors([preselectedDoctor]);
      } else {
        const response = await axiosInstance.get("/api/users/");
        console.log("Fetched all doctors:", response.data);
        setDoctors(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError("Failed to fetch doctors. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [preselectedDoctor]);

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
        console.log("Fetched availabilities:", response.data);
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
      console.log("Fetching availabilities for doctor:", selectedDoctor.userId);
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
        const response = await axiosInstance.post(
          "/api/appointments/create-new",
          newAppointment
        );
        console.log("Appointment added successfully:", response.data);
        onSubmit(response.data);
        onClose();
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
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-xl w-2/3 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Appointment</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1">Patient:</label>
            {preselectedPatientId ? (
              <p>
                {selectedPatient?.first_name} {selectedPatient?.last_name}
              </p>
            ) : (
              <select
                value={selectedPatient?.userId || ""}
                onChange={handlePatientChange}
                className="w-full p-2 border rounded"
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

          <div>
            <label className="block mb-1">Doctor:</label>
            {preselectedDoctor ? (
              <p>
                {preselectedDoctor.title} {preselectedDoctor.first_name}{" "}
                {preselectedDoctor.last_name}
              </p>
            ) : (
              <select
                value={selectedDoctor?.userId || ""}
                onChange={handleDoctorChange}
                className="w-full p-2 border rounded"
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
                <label className="block mb-1">Select Date:</label>
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
                  <label className="block mb-1">Select Time:</label>
                  <div className="grid grid-cols-3 gap-2">
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
                </div>
              )}
            </>
          )}

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

          <div className="bg-blue-100 p-4 rounded-lg">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={bookTranslation}
                onChange={(e) => setBookTranslation(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-lg font-medium">Book Translation</span>
            </label>
            <p className="text-sm text-gray-600 mt-1">
              Check this if translation services for this appointment are
              needed.
            </p>
          </div>

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
              disabled={
                !selectedPatient ||
                !selectedDoctor ||
                !selectedDate ||
                !selectedTime ||
                !appointmentReasonCategory ||
                !appointmentReasonSubcategory
              }
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
