import React, { useEffect, useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import axiosInstance from "../../Axios";
import { useAuth } from "../../components/auth/AuthContext";
import "../../Web.css";

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  type: string;
  time: string;
}

const ManageAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, userData, checkAuth, logout } = useAuth();

  useEffect(() => {
    if (isAuthenticated && userData) {
      fetchAppointments();
    }
  }, [isAuthenticated, userData]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/api/appointments");
      setAppointments(response.data);
    } catch (error: any) {
      console.error("Error fetching appointments:", error);
      setError("Failed to fetch appointments. Please try again later.");

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

  const handleEdit = (appointment: Appointment) => {
    // Implement edit functionality
    console.log("Edit appointment:", appointment);
  };

  const handleDelete = (appointment: Appointment) => {
    // Implement delete functionality
    console.log("Delete appointment:", appointment);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <PageLayout text="Manage Appointments">
      <div className="w-full gap-8 flex justify-center py-10">
        <div className="w-[90%] flex flex-col gap-8">
          <div className="p-6 bg-blue-50 gap-3 flex flex-col rounded-xl shadow-custom">
            <h1 className="text-2xl text-blue-600 font-medium">Appointments</h1>
            <div className="flex flex-col gap-5">
              <div className="flex flex-row items-center justify-between">
                <span className="w-[18%] font-medium">Patient Name</span>
                <span className="w-[18%] font-medium">Doctor Name</span>
                <span className="w-[18%] font-medium">Type</span>
                <span className="w-[18%] font-medium">Time</span>
                <span className="w-[28%] font-medium">Actions</span>
              </div>

              {appointments.map((appointment, index) => (
                <div
                  key={index}
                  className="flex flex-row pb-2 items-center border-b border-blue-200 justify-between"
                >
                  <span className="w-[18%] text-gray-500">
                    {appointment.patientName}
                  </span>
                  <span className="w-[18%] text-gray-500">
                    {appointment.doctorName}
                  </span>
                  <span
                    className={`w-[18%] text-gray-500 ${
                      appointment.type === "EMERGENCY"
                        ? "text-red-500"
                        : appointment.type === "CONSULTANCY"
                        ? "text-green-500"
                        : "text-blue-500"
                    }`}
                  >
                    {appointment.type}
                  </span>
                  <span className="w-[18%] text-gray-500">
                    {appointment.time}
                  </span>
                  <div className="w-[28%] flex flex-row gap-4">
                    <div
                      className="hover:cursor-pointer w-20 h-10 rounded-lg flex items-center justify-center border border-blue-500 text-blue-500"
                      onClick={() => handleEdit(appointment)}
                    >
                      Edit
                    </div>
                    <div
                      className="hover:cursor-pointer w-20 h-10 rounded-lg flex items-center justify-center border border-red-500 text-red-500"
                      onClick={() => handleDelete(appointment)}
                    >
                      Delete
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

export default ManageAppointments;
