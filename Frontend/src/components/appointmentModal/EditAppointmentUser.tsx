import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Appointment, Doctor, Availability } from "../../components/Types";
import axiosInstance from "../../Axios";

interface EditAppointmentUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedAppointment: Appointment) => void;
  appointment: Appointment;
}

const EditAppointmentUserModal: React.FC<EditAppointmentUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  appointment,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    appointment.appointmentDate ? new Date(appointment.appointmentDate) : null
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(
    appointment.appointmentDate
      ? new Date(appointment.appointmentDate).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : null
  );
  const [bookTranslation, setBookTranslation] = useState(
    appointment.bookTranslation
  );

  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctorAvailability = useCallback(async (doctorId: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(
        `/api/availabilities/doctor/${doctorId}`
      );
      if (Array.isArray(response.data)) {
        setAvailabilities(response.data);
      } else {
        console.error(
          "Unexpected response format for availabilities:",
          response.data
        );
        setError("Unexpected response format for availabilities");
      }
    } catch (error: any) {
      console.error("Error fetching availabilities:", error);
      setError(`Failed to fetch availabilities. ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctorAvailability(appointment.doctor.userId);
  }, [appointment.doctor.userId, fetchDoctorAvailability]);

  const getAvailableDates = () => {
    const dates = [
      ...new Set(availabilities.map((a) => a.availability_date.split("T")[0])),
    ];
    return dates.map((date) => new Date(date));
  };

  const getAvailableTimeSlots = (date: Date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error("Invalid date provided:", date);
      return [];
    }
    const dateString = date.toISOString().split("T")[0];
    return availabilities
      .filter((a) => {
        const availabilityDate = new Date(a.availability_date);
        return (
          availabilityDate instanceof Date &&
          !isNaN(availabilityDate.getTime()) &&
          availabilityDate.toISOString().startsWith(dateString)
        );
      })
      .map((a) =>
        new Date(a.availability_date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time");
      return;
    }

    const updatedAppointment: Appointment = {
      ...appointment,
      appointmentDate: new Date(
        `${selectedDate.toDateString()} ${selectedTime}`
      ).toISOString(),
      bookTranslation,
    };

    try {
      const response = await axiosInstance.put(
        `/api/appointments/${appointment.id}`,
        updatedAppointment
      );
      onSubmit(response.data);
    } catch (error: unknown) {
      console.error("Error updating appointment:", error);
      if (error instanceof Error) {
        alert(`Failed to update appointment. ${error.message}`);
      } else {
        alert("Failed to update appointment. Please try again.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white p-8 rounded-lg max-w-6xl w-full m-4">
        <h2 className="text-3xl font-bold mb-6">Edit Appointment</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Appointment Details */}
          <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Appointment Details</h3>
            <div className="space-y-3">
              <p>
                <strong className="text-gray-700">Doctor:</strong>{" "}
                {appointment.doctor.title} {appointment.doctor.first_name}{" "}
                {appointment.doctor.last_name}
              </p>
              <p>
                <strong className="text-gray-700">Specialization:</strong>{" "}
                {appointment.doctor.specialization.area_of_specialization}
              </p>
              <p>
                <strong className="text-gray-700">Address:</strong>{" "}
                {`${appointment.doctor.address.street}, ${appointment.doctor.address.postcode} ${appointment.doctor.address.city}, ${appointment.doctor.address.state}`}
              </p>

              <p>
                <strong className="text-gray-700">Reason:</strong>{" "}
                {appointment.appointmentReason
                  ? `${appointment.appointmentReason.reason || "N/A"} - ${
                      appointment.appointmentReason.notes || "N/A"
                    }`
                  : "No reason specified"}
              </p>
            </div>
          </div>

          {/* Edit Options */}
          <div className="w-full md:w-1/2 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Edit Options</h3>
            <div className="space-y-6">
              {/* Date selection */}
              <div>
                <label className="block mb-2 font-medium">
                  Select New Date:
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date) => {
                    setSelectedDate(date);
                    setSelectedTime(null);
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
                  <label className="block mb-2 font-medium">
                    Select New Time:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {getAvailableTimeSlots(selectedDate).map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() =>
                          setSelectedTime((prevTime) =>
                            prevTime === time ? null : time
                          )
                        }
                        className={`p-2 rounded ${
                          time === selectedTime
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

              {/* Book Translation */}
              <div className="bg-yellow-100 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bookTranslation}
                      onChange={(e) => setBookTranslation(e.target.checked)}
                      className="form-checkbox h-6 w-6 text-blue-600"
                    />
                    <span className="text-lg font-medium text-gray-700">
                      Book Translation
                    </span>
                  </label>
                  <div className="relative group">
                    <span className="text-gray-500 hover:text-gray-700 cursor-pointer">
                      ⓘ
                    </span>
                    <div className="absolute right-0 w-64 p-2 bg-white border rounded shadow-lg z-10 hidden group-hover:block">
                      Translation service is provided by a third party. Your
                      appointment details will be shared with them.
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Update Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAppointmentUserModal;
