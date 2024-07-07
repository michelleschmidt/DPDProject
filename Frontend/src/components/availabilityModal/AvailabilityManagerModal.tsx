import React, { useState, useEffect } from "react";
import axiosInstance from "../../Axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DoctorAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorId: number;
}

interface Availability {
  id: number;
  doctor_id: number;
  availability_date: string;
  active: boolean;
}

const DoctorAvailabilityModal: React.FC<DoctorAvailabilityModalProps> = ({
  isOpen,
  onClose,
  doctorId,
}) => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [newDate, setNewDate] = useState<Date | null>(null);
  const [newTime, setNewTime] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchAvailabilities();
    }
  }, [isOpen, doctorId]);

  const fetchAvailabilities = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/availabilities/doctor/${doctorId}`
      );
      setAvailabilities(response.data);
      setError(null); // Clear any previous errors on successful fetch
    } catch (error) {
      console.error("Error fetching availabilities:", error);
      setError("Failed to fetch availabilities. Please try again.");
    }
  };

  const handleCreateAvailability = async () => {
    if (!newDate || !newTime) {
      setError("Please select both date and time.");
      return;
    }

    const dateTime = new Date(newDate);
    const [hours, minutes] = newTime.split(":");
    dateTime.setHours(parseInt(hours), parseInt(minutes));

    try {
      const response = await axiosInstance.post(
        "/api/availabilities/availability-create",
        {
          doctor_id: doctorId,
          availability_date: dateTime.toISOString(),
          active: true,
        }
      );

      if (response.status === 201 || response.status === 200) {
        console.log("Availability created successfully");
        fetchAvailabilities(); // Refresh the list of availabilities
        setNewDate(null);
        setNewTime("");
        setError(null); // Clear any previous errors on successful create
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating availability:", error);
      setError("Failed to create availability. Please try again.");
    }
  };

  const handleDeleteAvailability = async (availabilityId: number) => {
    try {
      await axiosInstance.delete(`/api/availabilities/${availabilityId}`);
      fetchAvailabilities();
    } catch (error) {
      console.error("Error deleting availability:", error);
      setError("Failed to delete availability. Please try again.");
    }
  };

  const handleToggleActive = async (availability: Availability) => {
    try {
      await axiosInstance.put(`/api/availabilities/${availability.id}`, {
        ...availability,
        active: !availability.active,
      });
      fetchAvailabilities();
    } catch (error) {
      console.error("Error updating availability:", error);
      setError("Failed to update availability. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-lg font-semibold mb-4">Manage Availabilities</h2>
        <div className="mb-4">
          <h3 className="text-md font-medium mb-2">Create New Availability</h3>
          <DatePicker
            selected={newDate}
            onChange={(date: Date) => setNewDate(date)}
            dateFormat="MMMM d, yyyy"
            className="mb-2 p-2 border rounded"
          />
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="mb-2 p-2 border rounded"
          />
          <button
            onClick={handleCreateAvailability}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create
          </button>
        </div>
        <div>
          <h3 className="text-md font-medium mb-2">Current Availabilities</h3>
          <ul className="max-h-60 overflow-y-auto">
            {availabilities.map((availability) => (
              <li
                key={availability.id}
                className="mb-2 flex justify-between items-center"
              >
                <span>
                  {new Date(availability.availability_date).toLocaleString()}
                </span>
                <span>{availability.active ? "Active" : "Inactive"}</span>
                <div>
                  {availability.active ? (
                    <button
                      onClick={() => handleDeleteAvailability(availability.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DoctorAvailabilityModal;
