import React, { useEffect, useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import axiosInstance from "../../Axios";
import { useAuth } from "../../components/auth/AuthContext";
import "../../Web.css";
import DeleteConfirmationModal from "../../components/docModal/DeleteConfirmationModal";
import EditDoctorModal from "../../components/docModal/EditModal";
import AddDoctorModal from "../../components/docModal/AddModal";
import DoctorTable from "../../components/tables/DoctorTable";
import { Language, Doctor, Specialization } from "../../components/Types";

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

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/api/users");
      setDoctors(response.data);
    } catch (error: any) {
      console.error("Error fetching doctors:", error);
      setError("Failed to fetch doctors. Please try again.");
      if (error.response && error.response.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDoctors();
    }
  }, [isAuthenticated]);

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

  const refreshDoctorList = () => {
    fetchDoctors();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    refreshDoctorList(); // Refresh the list when the modal is closed
  };

  const confirmDelete = async () => {
    if (selectedDoctor) {
      try {
        await axiosInstance.delete(`/api/users/${selectedDoctor.userId}`);
        refreshDoctorList();
      } catch (error) {
        console.error("Error deleting patient:", error);
      } finally {
        setIsDeleteModalOpen(false);
      }
    }
    console.log("Deleting doctor:", selectedDoctor);
    setIsDeleteModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <PageLayout text="Manage Doctors">
      <div className="flex min-h-screen pb-20 justify-center w-full">
        <div className="flex flex-col gap-10 w-[86%] py-10">
          <div className="p-6 w-full flex-flex-col gap-8 h-full bg-white shadow-custom rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl text-blue-600 font-semibold">Doctors</h1>
              <button
                onClick={handleAddDoctor}
                className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition duration-300"
              >
                Add Doctor
              </button>
            </div>
            <DoctorTable
              doctors={doctors}
              onEdit={handleEdit}
              onDelete={handleDelete}
              DEFAULT_AVATAR={DEFAULT_AVATAR}
            />
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

      {isEditModalOpen && selectedDoctor && (
        <EditDoctorModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          doctor={selectedDoctor}
          onUpdateSuccess={refreshDoctorList} // Add this prop
        />
      )}

      <AddDoctorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </PageLayout>
  );
};

export default ManageDoctors;
