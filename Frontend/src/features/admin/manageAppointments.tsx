import React, { useState, useEffect } from "react";
import axiosInstance from "../../Axios";
import "../../App.css";
import Sidebar from "../../components/adminHeader";

interface Patient {
  id: number;
  name: string;
  language: string;
}

interface Doctor {
  id: number;
  name: string;
}

interface Interaction {
  id: number;
  patientId: number;
  doctorId: number;
  language: string;
  status: string;
  translation: string;
  patientName?: string;
  doctorName?: string;
}

const ManageAppointments: React.FC = () => {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [interactionRes, patientRes, doctorRes] = await Promise.all([
          axiosInstance.get<Interaction[]>("/api/interactions"),
          axiosInstance.get<Patient[]>("/api/patients"),
          axiosInstance.get<Doctor[]>("/api/doctors"),
        ]);

        const interactions = interactionRes.data;
        const patients = patientRes.data;
        const doctors = doctorRes.data;

        interactions.forEach((interaction) => {
          const patient = patients.find((p) => p.id === interaction.patientId);
          const doctor = doctors.find((d) => d.id === interaction.doctorId);
          interaction.patientName = patient?.name || "Unknown";
          interaction.doctorName = doctor?.name || "Unknown";
        });

        setInteractions(interactions);
        setPatients(patients);
        setDoctors(doctors);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/interactions/${id}`);
      setInteractions(
        interactions.filter((interaction) => interaction.id !== id)
      );
    } catch (error) {
      console.error("Error deleting interaction:", error);
    }
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value);
  };

  const filteredInteractions =
    selectedLanguage === "all"
      ? interactions
      : interactions.filter(
          (interaction) =>
            interaction.language.toLowerCase() ===
            selectedLanguage.toLowerCase()
        );

  return (
    <div className="container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="manage-interactions">
        <h2>Manage Interactions</h2>
        <div className="filter-container">
          <label htmlFor="language-filter">Filter by Language:</label>
          <select
            id="language-filter"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="all">All</option>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
          <button className="add-appointment-button">Add Appointment</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Language</th>
              <th>Status</th>
              <th>Live Translation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInteractions.map((interaction) => (
              <tr key={interaction.id}>
                <td>{interaction.patientName}</td>
                <td>{interaction.doctorName}</td>
                <td>{interaction.language}</td>
                <td>{interaction.status}</td>
                <td>{interaction.translation}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => handleDelete(interaction.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAppointments;
