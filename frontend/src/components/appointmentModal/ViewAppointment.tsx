import React, { useState, useEffect, useCallback } from "react";
import { Appointment, Doctor } from "../Types";
import axiosInstance from "../../axios/Axios";

interface ViewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment;
}

const ViewAppointmentModal: React.FC<ViewAppointmentModalProps> = ({
  onClose,
  appointment,
}) => {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white p-8 rounded-lg max-w-6xl w-full m-4">
        <h2 className="text-3xl font-bold mb-6">View Appointment</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Appointment Details */}
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
            <strong className="text-gray-700">Date:</strong>{" "}
            {new Date(appointment.appointmentDate).toLocaleDateString()}
          </p>
          <p>
            <strong className="text-gray-700">Time:</strong>{" "}
            {new Date(appointment.appointmentDate).toLocaleTimeString()}
          </p>
          <p>
            <strong className="text-gray-700">Reason:</strong>{" "}
            {appointment.appointmentReason
              ? `${appointment.appointmentReason.reason || "N/A"} - ${
                  appointment.appointmentReason.notes || "N/A"
                }`
              : "No reason specified"}
          </p>
          <p>
            <strong className="text-gray-700">Translation Booked:</strong>{" "}
            {appointment.bookTranslation ? "Yes" : "No"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointmentModal;
