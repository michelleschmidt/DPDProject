import React, { useEffect, useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import axiosInstance from "../../Axios";
import { useAuth } from "../../components/auth/AuthContext";
import "../../Web.css";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import EditDoctorModal from "../../components/EditModal";
import AddDoctorModal from "../../components/AddModal";

interface Language {
  language_name: string;
}

interface Specialization {
  area_of_specialization: string;
}

export interface Doctor {
  id: number;
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  specialization: Specialization;
  languages: Language[];
  profileImage?: string;
  // Add other fields as needed
}

const ManageDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, checkAuth, logout } = useAuth();
  const DEFAULT_AVATAR = ""; // Set a default avatar URL if you have one

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    console.log("useEffect running, isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      console.log("Attempting to fetch doctors");
      setLoading(true);
      axiosInstance
        .get("/api/users")
        .then((response) => {
          console.log("Doctors fetched successfully:", response.data);
          setDoctors(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching doctors:", error);
          setError("Failed to fetch doctors. Please try again.");
          setLoading(false);
          if (error.response && error.response.status === 401) {
            logout();
          }
        });
    }
  }, [isAuthenticated, logout]);

  const handleEdit = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsEditModalOpen(true);
  };

  const handleDelete = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDeleteModalOpen(true);
  };

  const handleAddDoctor = () => {
    setIsAddModalOpen(true);
  };

  const confirmDelete = () => {
    // Implement delete logic here
    console.log("Deleting doctor:", selectedDoctor);
    setIsDeleteModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = DEFAULT_AVATAR;
  };

  return (
    <PageLayout text="Manage Doctors">
      <div className="flex min-h-screen pb-20 justify-center w-full">
        <div className="flex flex-col gap-10 w-[86%] py-10">
          <div className="p-6 w-full flex-flex-col gap-8 h-full bg-white shadow-custom rounded-2xl">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl text-blue-600 font-semibold">
                  Doctors
                </h1>
                <button
                  onClick={handleAddDoctor}
                  className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition duration-300"
                >
                  Add Doctor
                </button>
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
                  {doctors.map((doctor, index) => (
                    <tr
                      key={doctor.id || index}
                      className="border-b border-blue-200"
                    >
                      <td className="py-2 flex items-center gap-4">
                        <img
                          src={doctor.profileImage || DEFAULT_AVATAR}
                          onError={handleImageError}
                          className="rounded-full w-9 h-9 object-cover"
                          alt={`${doctor.first_name} ${doctor.last_name}`}
                        />
                        <span>
                          {doctor.title} {doctor.first_name} {doctor.last_name}
                        </span>
                      </td>
                      <td>{doctor.specialization.area_of_specialization}</td>
                      <td>
                        {doctor.languages
                          .map((lang) => lang.language_name)
                          .join(", ")}
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
            </div>
          </div>
        </div>
      </div>
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

      <EditDoctorModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        doctor={selectedDoctor}
      />

      <AddDoctorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </PageLayout>
  );
};

export default ManageDoctors;
