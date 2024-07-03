import React, { useState, useEffect } from "react";
import axiosInstance from "../../Axios";
import "../../App.css";
import AdminHeader from "../../components/website/layout/adminHeader";
import { Interaction, Patient, Doctor } from "../../components/Types";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const AdminDashboard: React.FC = () => {
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

  // Helper function to get date 7 days ago
  const getDateSevenDaysAgo = () => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
  };

  // Helper function to get date 7 days in the future
  const getDateSevenDaysAhead = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  };

  // Calculate appointments in the last 7 days
  const appointmentsLastWeek = interactions.filter(
    (interaction) =>
      new Date(interaction.date) >= getDateSevenDaysAgo() &&
      new Date(interaction.date) <= new Date()
  ).length;

  // Calculate appointments in the next 7 days
  const appointmentsNextWeek = interactions.filter(
    (interaction) =>
      new Date(interaction.date) > new Date() &&
      new Date(interaction.date) <= getDateSevenDaysAhead()
  ).length;

  // Calculate language distribution
  const languageDistribution = interactions.reduce((acc, interaction) => {
    acc[interaction.language] = (acc[interaction.language] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Prepare data for bar chart
  const barChartData = {
    labels: ["Last 7 Days", "Next 7 Days"],
    datasets: [
      {
        label: "Number of Appointments",
        data: [appointmentsLastWeek, appointmentsNextWeek],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  // Prepare data for pie chart
  const pieChartData = {
    labels: Object.keys(languageDistribution),
    datasets: [
      {
        data: Object.values(languageDistribution),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  return (
    <div className="container">
      <div className="AdminHeader">
        <AdminHeader />
      </div>
      <div className="manage-interactions">
        <div className="charts-container">
          <div className="chart">
            <h3>Appointments Last 7 Days vs Next 7 Days</h3>
            <Bar data={barChartData} />
          </div>
          <div className="chart">
            <h3>Language Distribution</h3>
            <Pie data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
