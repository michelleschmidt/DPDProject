import React, { useEffect, useState } from "react";
import { Doctor } from "../Types";
import DeleteConfirmationModal from "../docModal/DeleteConfirmationModal";
import EditDoctorModal from "../docModal/EditModal";
import axiosInstance from "../../axios/Axios";

interface DoctorTableProps {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
  onRefresh: (filterLanguage?: string) => void;
}

const DoctorTable: React.FC<DoctorTableProps> = ({
  doctors,
  loading,
  error,
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleEdit = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  useEffect(() => {
    if (selectedDoctor) {
      setIsEditModalOpen(true);
    }
  }, [selectedDoctor]);

  const handleDelete = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedDoctor) {
      try {
        await axiosInstance.delete(`/api/users/${selectedDoctor.userId}`);
        onRefresh(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting doctor:", error);
        // Handle error (you might want to pass this up to the parent component)
      } finally {
        setIsDeleteModalOpen(false);
      }
    }
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    onRefresh(); // Refresh the list when the modal is closed
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const searchLower = searchTerm.toLowerCase();
    const fullName = `${doctor.title || ""} ${doctor.first_name || ""} ${
      doctor.last_name || ""
    }`.toLowerCase();
    const specialization =
      doctor.specialization?.area_of_specialization?.toLowerCase() || "";
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

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
          {filteredDoctors.map((doctor) => (
            <tr key={doctor.userId} className="border-b border-blue-200">
              <td>
                {`${doctor.title || ""} ${doctor.first_name || ""} ${
                  doctor.last_name || ""
                }`}
              </td>
              <td>{doctor.specialization?.area_of_specialization || ""}</td>
              <td>
                {doctor.languages
                  ?.map((lang) => lang.language_name)
                  .join(", ") || ""}
              </td>
              <td>
                <button
                  onClick={() => handleEdit(doctor)}
                  className="mr-2 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(doctor)}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-100"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        doctorName={
          selectedDoctor
            ? `${selectedDoctor.first_name} ${selectedDoctor.last_name}`
            : ""
        }
      />
      {isEditModalOpen && selectedDoctor && (
        <EditDoctorModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          doctorId={selectedDoctor.userId}
          onUpdateSuccess={onRefresh}
        />
      )}
    </div>
  );
};

export default React.memo(DoctorTable);
