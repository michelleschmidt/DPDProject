import React, { useState } from "react";
import { Doctor } from "../Types";

interface DoctorTableProps {
  doctors: Doctor[];
  onEdit: (doctor: Doctor) => void;
  onDelete: (doctor: Doctor) => void;
  DEFAULT_AVATAR: string;
}

const DoctorTable: React.FC<DoctorTableProps> = ({
  doctors,
  onEdit,
  onDelete,
  DEFAULT_AVATAR,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = DEFAULT_AVATAR;
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const searchLower = searchTerm.toLowerCase();
    const fullName =
      `${doctor.title} ${doctor.first_name} ${doctor.last_name}`.toLowerCase();
    const specialization =
      doctor.specialization?.area_of_specialization.toLowerCase() || "";
    const languages =
      doctor.languages
        ?.map((lang) => lang.language_name.toLowerCase())
        .join(" ") || "";

    return (
      fullName.includes(searchLower) ||
      specialization.includes(searchLower) ||
      languages.includes(searchLower)
    );
  });

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, specialization, or language"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <table className="w-full">
        <thead>
          <tr className="font-medium">
            <th className="text-left w-[21%]">Doctor</th>
            <th className="text-left w-[21%]">Specialization</th>
            <th className="text-left w-[14%]">Languages</th>
            <th className="text-left w-[26%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doctor, index) => (
            <tr key={doctor.id || index} className="border-b border-blue-200">
              <td className="py-2 flex items-center gap-4">
                <img
                  src={doctor.profileImage || DEFAULT_AVATAR}
                  onError={handleImageError}
                  className="rounded-full w-9 h-9 object-cover"
                  alt={`${doctor.title} ${doctor.first_name} ${doctor.last_name}`}
                />
                <span>
                  {`${doctor.title} ${doctor.first_name || ""} ${
                    doctor.last_name || ""
                  }`}
                </span>
              </td>
              <td>
                {doctor.specialization
                  ? doctor.specialization.area_of_specialization
                  : ""}
              </td>
              <td>
                {doctor.languages
                  ? doctor.languages
                      .map((lang) => lang.language_name)
                      .join(", ")
                  : ""}
              </td>
              <td>
                <button
                  onClick={() => onEdit(doctor)}
                  className="mr-2 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(doctor)}
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
  );
};

export default DoctorTable;
