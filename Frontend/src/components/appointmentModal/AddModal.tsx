import React, { useState, useEffect } from "react";
import { Appointment, Patient, Doctor, Availability } from "../Types";
import axiosInstance from "../../Axios";

interface AddAppointmentModalProps {
  isOpen: boolean;
  onSubmit: (appointment: Omit<Appointment, "id">) => void;
  onClose: () => void;
}

const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedAvailability, setSelectedAvailability] =
    useState<Availability | null>(null);
  const [appointmentReason, setAppointmentReason] = useState("");
  const [bookTranslation, setBookTranslation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ... (rest of your fetching functions remain the same)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPatient && selectedDoctor && selectedAvailability) {
      const newAppointment: Omit<Appointment, "id"> = {
        user: {
          first_name: selectedPatient.first_name,
          last_name: selectedPatient.last_name,
        },
        doctor: {
          first_name: selectedDoctor.first_name,
          last_name: selectedDoctor.last_name,
        },
        availability: {
          date: selectedAvailability.availability_date
            .toISOString()
            .split("T")[0],
          start_time: selectedAvailability.availability_date
            .toTimeString()
            .split(" ")[0],
        },
        appointment_reason: appointmentReason,
        book_translation: bookTranslation,
      };
      onSubmit(newAppointment);
      onClose(); // Close the modal after submission
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Add New Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ... (your form fields remain the same) */}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
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
