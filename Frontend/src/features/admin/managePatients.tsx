import React, { useEffect, useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import axiosInstance from "../../axios/Axios";
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/api/users/patients");
      const mappedPatients: Patient[] = response.data.map((patient: any) => ({
        userId: patient.id,
        first_name: patient.first_name,
        last_name: patient.last_name,
        email: patient.email,
        role: patient.role,
        address: {
          street: patient.address.street,
          city: patient.address.city,
          state: patient.address.state,
          country: patient.address.country, // Assuming Germany as the country
          postcode: patient.address.postal_code,
        },
        languages: patient.languages.map((lang: any) => ({
          id: lang.id,
          language_name: lang.language_name,
        })),
        title: patient.title,
        phone_number: patient.phone_number,
        date_of_birth: new Date(patient.date_of_birth),
        insurance: patient.insurance_type,
      }));
      setPatients(mappedPatients);
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
        await axiosInstance.delete(`/api/users/${selectedPatient.userId}`);
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
          patientId={selectedPatient.userId}
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
