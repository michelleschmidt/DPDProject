import React, { useEffect, useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import axiosInstance from "../../Axios";
import { useAuth } from "../../components/auth/AuthContext";
import "../../Web.css";
import DeleteConfirmationModal from "../../components/patientModal/DeleteConfirmationModal";
import EditPatientModal from "../../components/patientModal/EditModal";
import AddPatientModal from "../../components/patientModal/AddModal";
import PatientTable from "../../components/tables/PatientTable";
import { Patient } from "../../components/Types";

const ManagePatients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, checkAuth, logout } = useAuth();
  const DEFAULT_AVATAR = ""; // Set a default avatar URL if you have one

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/api/users/patients");
      setPatients(response.data);
    } catch (error: any) {
      console.error("Error fetching Patients:", error);
      setError("Failed to fetch Patients. Please try again.");
      if (error.response && error.response.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPatients();
    }
  }, [isAuthenticated]);

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleDelete = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDeleteModalOpen(true);
  };

  const handleAddPatient = () => {
    setIsAddModalOpen(true);
  };

  const refreshPatientList = () => {
    fetchPatients();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    refreshPatientList(); // Refresh the list when the modal is closed
  };

  const confirmDelete = async () => {
    // Implement delete logic here
    if (selectedPatient) {
      try {
        await axiosInstance.delete(`/api/users/patients/${selectedPatient.id}`);
        refreshPatientList();
      } catch (error) {
        console.error("Error deleting patient:", error);
      } finally {
        setIsDeleteModalOpen(false);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <PageLayout text="Manage Patients">
      <div className="flex min-h-screen pb-20 justify-center w-full">
        <div className="flex flex-col gap-10 w-[86%] py-10">
          <div className="p-6 w-full flex-flex-col gap-8 h-full bg-white shadow-custom rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl text-blue-600 font-semibold">Patients</h1>
              <button
                onClick={handleAddPatient}
                className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition duration-300"
              >
                Add Patient
              </button>
            </div>
            <PatientTable
              patients={patients}
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
        patientName={
          selectedPatient
            ? `${selectedPatient.first_name} ${selectedPatient.last_name}`
            : ""
        }
        title="patient"
      />

      {isEditModalOpen && selectedPatient && (
        <EditPatientModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          patientId={selectedPatient.id.toString()}
          onUpdateSuccess={refreshPatientList}
        />
      )}

      <AddPatientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onUpdateSuccess={refreshPatientList}
      />
    </PageLayout>
  );
};

export default ManagePatients;
