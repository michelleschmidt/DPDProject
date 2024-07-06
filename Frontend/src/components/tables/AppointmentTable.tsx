import React from "react";
import { Appointment } from "../Types";

interface AppointmentTableProps {
  appointments: Appointment[];
  onEdit: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="p-6 w-full flex-flex-col gap-8 h-full bg-white shadow-custom rounded-2xl">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-blue-600 font-semibold"></h1>
        </div>
        <table className="w-full">
          <thead>
            <tr className="font-medium">
              <th className="text-left w-[20%]">Patient</th>
              <th className="text-left w-[20%]">Doctor</th>
              <th className="text-left w-[15%]">Date</th>
              <th className="text-left w-[15%]">Time</th>
              <th className="text-left w-[15%]">Reason</th>
              <th className="text-left w-[15%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b border-blue-200">
                <td className="py-2">
                  {appointment.user.first_name} {appointment.user.last_name}
                </td>
                <td>
                  {appointment.doctor.first_name} {appointment.doctor.last_name}
                </td>
                <td>{appointment.availability.date}</td>
                <td>{appointment.availability.start_time}</td>
                <td>{appointment.appointment_reason}</td>
                <td>
                  <button
                    onClick={() => onEdit(appointment)}
                    className="mr-2 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(appointment)}
                    className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-100"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;
