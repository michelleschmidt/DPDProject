import React, { useState, useEffect } from "react";
import axiosInstance from "../../Axios";
import "../../Web.css";
import { Interaction, Patient, Doctor } from "../../components/Types";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import PageLayout from "../../components/layout/PageLayout";

// Register chart.js components
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const AdminDashboard: React.FC = () => {
  // State variables
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [interactionRes, patientRes, doctorRes] = await Promise.all([
          axiosInstance.get<Interaction[]>("/api/interactions"),
          axiosInstance.get<Patient[]>("/api/patients"),
          axiosInstance.get<Doctor[]>("/api/doctors"),
        ]);

        const interactionsData = interactionRes.data;
        const patientsData = patientRes.data;
        const doctorsData = doctorRes.data;

        // Update interactions with patient and doctor names
        const updatedInteractions = interactionsData.map((interaction) => {
          const patient = patientsData.find(
            (p) => p.id === interaction.patientId
          );
          const doctor = doctorsData.find((d) => d.id === interaction.doctorId);
          return {
            ...interaction,
            patientName: patient?.name || "Unknown",
            doctorName: doctor?.name || "Unknown",
          };
        });

        setInteractions(updatedInteractions);
        setPatients(patientsData);
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle delete interaction
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

  // Handle language change
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value);
  };

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
    <PageLayout text={"Dashboard"}>
      <div className="h-[96vh] flex flex-row">
        <div className="w-[70%] py-10 px-14 gap-6 flex flex-col">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold text-blue-500">
              Welcome Dr. Mary!
            </h1>
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
      </div>
    </PageLayout>
  );
};

export default AdminDashboard;
