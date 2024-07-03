import React, { useState, useEffect } from "react";
import axiosInstance from "../../Axios";
import "../../App.css";
import AdminHeader from "../../components/website/layout/adminHeader";
import GenericTable from "../../components/Table";
import { Interaction, Patient, Doctor } from "../../components/Types";
import PageLayout from "../../components/website/layout/PageLayout";

const ManagePatients: React.FC = () => {
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

  const columns: string[] = [
    "Patient Name",
    "Doctor Name",
    "Language",
    "Status",
    "Translation",
  ];

  return (
    <div className="container">
      <div className="AdminHeader">
        <PageLayout children={undefined} text={"Manage Appointments"} />
      </div>
      <div className="manage-interactions">
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
        <GenericTable
          columns={columns}
          data={filteredInteractions}
          handleDelete={handleDelete}
          handleEdit={function (id: number): void {
            throw new Error("Function not implemented.");
          }}
          add={"Appointments"}
        />
      </div>
    </div>
  );
};

export default ManagePatients;
