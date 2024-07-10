import React, { useState, useEffect, useCallback } from "react";
import PageLayout from "../../components/layout/PageLayout";
import DoctorTable from "../../components/tables/DoctorTable";
import AddDoctorModal from "../../components/docModal/AddModal";
import axiosInstance from "../../axios/Axios";
import { Doctor } from "../../components/Types";

const ManageDoctors: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctors = useCallback(async (filterLanguage?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/api/users/", {
        params: { language: filterLanguage },
      });
      const mappedDoctors: Doctor[] = response.data.map((doctor: any) => ({
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
      setDoctors(mappedDoctors);
    } catch (error: any) {
      console.error("Error fetching doctors:", error);
      setError("Failed to fetch doctors. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleAddDoctor = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    fetchDoctors(); // Refresh the list after adding a new doctor
  };

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
              loading={loading}
              error={error}
              onRefresh={fetchDoctors}
            />
          </div>
        </div>
      </div>
      <AddDoctorModal isOpen={isAddModalOpen} onClose={handleAddModalClose} />
    </PageLayout>
  );
};

export default ManageDoctors;
