import React, { useEffect, useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import axiosInstance from "../../Axios";
import { useAuth } from "../../components/auth/AuthContext";
import "../../Web.css";

interface Patient {
  id: string;
  name: string;
  email: string;
  condition: string;
  doctor: string;
}

const ManagePatients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, userData, checkAuth, logout } = useAuth();

  useEffect(() => {
    if (isAuthenticated && userData) {
      fetchPatients();
    }
  }, [isAuthenticated, userData]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/api/users", {
        params: { type: "patient" },
      });
      setPatients(response.data);
    } catch (error: any) {
      console.error("Error fetching patients:", error);
      setError("Failed to fetch patients. Please try again later.");

      if (error.response?.status === 401) {
        const isAuth = await checkAuth();
        if (!isAuth) {
          logout();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleAppointment = (patient: Patient) => {
    // Implement schedule appointment functionality
    console.log("Schedule appointment for:", patient);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <PageLayout text="Manage Users">
      <div className="w-full gap-8 flex justify-center py-10">
        <div className="w-[90%] flex flex-col gap-8">
          <div className="p-6 bg-blue-50 gap-3 flex flex-col rounded-xl shadow-custom">
            <h1 className="text-2xl text-blue-600 font-medium">Patients</h1>
            <div className="flex flex-col gap-5">
              <div className="flex flex-row items-center justify-between">
                <span className="w-[18%] font-medium">Name</span>
                <span className="w-[22%] font-medium">Email</span>
                <span className="w-[18%] font-medium">Condition</span>
                <span className="w-[22%] px-3 font-medium">
                  Doctor Assigned
                </span>
                <span className="w-[24%] font-medium">
                  Schedule appointment
                </span>
              </div>

              {patients.map((patient, index) => (
                <div
                  key={index}
                  className="flex flex-row pb-2 items-center border-b border-blue-200 justify-between"
                >
                  <span className="w-[18%] text-gray-500">{patient.name}</span>
                  <span className="w-[22%] text-gray-500">{patient.email}</span>
                  <span className="w-[18%] text-gray-500">
                    {patient.condition}
                  </span>
                  <span className="w-[20%] text-gray-500">
                    {patient.doctor}
                  </span>
                  <div className="w-[24%]">
                    <div
                      className="w-48 text-white bg-blue-500 px-3 py-1 rounded-xl hover:cursor-pointer"
                      onClick={() => handleScheduleAppointment(patient)}
                    >
                      Schedule appointment
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ManagePatients;
