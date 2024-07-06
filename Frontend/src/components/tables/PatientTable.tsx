import React from "react";
import { Patient } from "../Types";

interface PatientTableProps {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
}

const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="font-medium">
          <th className="text-left w-[21%]">Name</th>
          <th className="text-left w-[21%]">Email</th>
          <th className="text-left w-[21%]">Language</th>
          <th className="text-left w-[30%]">Actions</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.id} className="border-b border-blue-200">
            <td className="py-2">
              {patient.first_name} {patient.last_name}
            </td>
            <td>{patient.email}</td>
            <td>
              {patient.languages
                .map((lang: { language_name: string }) => lang.language_name)
                .join(", ")}
            </td>
            <td>
              <button
                onClick={() => onEdit(patient)}
                className="mr-2 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(patient)}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-100"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PatientTable;
