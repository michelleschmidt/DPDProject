import React, { useEffect, useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import axiosInstance from "../../axios/Axios";
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const fetchDoctors = async (languageFilter?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/api/users/", {
        params: { language: languageFilter },
      });
      console.log("Raw fetch", response.data);
      const mappedDoctor: Doctor[] = response.data.map((doctor: any) => ({
        userId: doctor.id,
        first_name: doctor.first_name,
        last_name: doctor.last_name,
        email: doctor.email,
        languages: doctor.languages.map((lang: any) => ({
          id: lang.id,
          language_name: lang.language_name,
        })),
        title: doctor.title,
        specialization: {
          area_of_specialization:
            doctor.specialization?.area_of_specialization || "Not specified",
        },
        phone_number: doctor.phone_number,
        date_of_birth: new Date(doctor.date_of_birth),
        insurance: doctor.insurance_type,
      }));
      setDoctors(mappedDoctor);
      console.log("Mapped Data", mappedDoctor);
      if (response.data && Array.isArray(response.data)) {
        setDoctors(response.data);
        console.log("set doctor", response.data);
      } else {
        throw new Error("Unexpected response format or no data");
      }
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
    const params = new URLSearchParams(location.search);
    const language = params.get("language") || undefined;
    fetchDoctors(language);
  }, []);

  const handleEdit = (doctor: Doctor) => {
    console.log("Editing doctor:", doctor);
    setSelectedDoctor(doctor);
    console.log("Selected User", selectedDoctor);
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

      {isEditModalOpen &&
        selectedDoctor &&
        (console.log("From Manage Doctor", selectedDoctor.userId),
        (
          <EditDoctorModal
            isOpen={isEditModalOpen}
            onClose={handleEditModalClose}
            doctorId={selectedDoctor.id || 0} //contains the userId
            onUpdateSuccess={refreshDoctorList} // Add this prop
          />
        ))}

      <AddDoctorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </PageLayout>
  );
};

export default ManageDoctors;
