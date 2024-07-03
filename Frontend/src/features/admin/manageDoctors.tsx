import React, { useEffect, useState } from "react";
import axiosInstance from "../../Axios";
import { useAuth } from "../../components/auth/AuthContext";
import { Doctor } from "../../components/Types";
import GenericTable from "../../components/Table";
import AdminHeader from "../../components/website/layout/adminHeader";

const ManageDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, userData, logout, checkAuth } = useAuth();

  useEffect(() => {
    if (isAuthenticated && userData) {
      fetchDoctors();
    }
  }, [isAuthenticated, userData]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/api/users", {
        params: { type: "doctor" },
      });
      setDoctors(response.data);
    } catch (error: any) {
      console.error("Error fetching doctors:", error);
      setError("Failed to fetch doctors. Please try again later.");

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

  const handleEdit = (doctor: Doctor) => {
    // Implement edit functionality
    console.log("Edit doctor:", doctor);
  };

  const handleDelete = (doctor: Doctor) => {
    // Implement delete functionality
    console.log("Delete doctor:", doctor);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <div className="container">
        <div className="AdminHeader">
          <AdminHeader />
        </div>
        <div className="manage-interactions">
          <div className="filter-container">
            <label htmlFor="language-filter">Filter by Language:</label>
            <select id="language-filter" value={"doc"}>
              <option value="all">All</option>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
            </select>
            <button className="add-appointment-button">Add Appointment</button>
          </div>

          <h2>Manage Doctors</h2>
          {doctors.length > 0 ? (
            <GenericTable
              data={doctors}
              columns={["first_name", "last_name", "email", "role"]}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <p>No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageDoctors;
