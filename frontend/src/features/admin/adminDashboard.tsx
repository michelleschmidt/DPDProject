import React, { useState, useEffect, useRef } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Title,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/Axios";
import PageLayout from "../../components/layout/PageLayout";
import "chartjs-adapter-date-fns";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Title
);

const Dashboard: React.FC = () => {
  // State variables
  const [doctorLanguageData, setDoctorLanguageData] = useState<any>(null);
  const [patientLanguageData, setPatientLanguageData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Navigation hook
  const navigate = useNavigate();

  // Reference for the appointment chart
  const appointmentChartRef = useRef<ChartJS<"bar", number[], string>>(null);

  // Date variables for filtering
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  const sevenDaysFromNow = new Date(today);

  sevenDaysAgo.setDate(today.getDate() - 7);
  sevenDaysFromNow.setDate(today.getDate() + 7);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();

    // Clean up the chart on component unmount
    return () => {
      if (appointmentChartRef.current) {
        appointmentChartRef.current.destroy();
      }
    };
  }, []);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      setLoading(true);
      const [
        doctorResponse,
        patientResponse,
        usersResponse,
        appointmentsResponse,
      ] = await Promise.all([
        axiosInstance.get("/api/search/doctors-count"),
        axiosInstance.get("/api/search/users-count"),
        axiosInstance.get("/api/users/all-users"),
        axiosInstance.get("/api/appointments/"),
      ]);

      setDoctorLanguageData(prepareChartData(doctorResponse.data));
      setPatientLanguageData(prepareChartData(patientResponse.data));
      setUserData(processUserData(usersResponse.data));
      setAppointmentData(processAppointmentData(appointmentsResponse.data));
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        `Failed to fetch data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to prepare chart data
  const prepareChartData = (data: any[]) => {
    const filteredData = data.filter(
      (item) => item.doctorCount > 0 || item.userCount > 0
    );
    const labels = filteredData.map((item) => item.language);
    const counts = filteredData.map(
      (item) => item.doctorCount || item.userCount
    );

    return {
      labels: labels,
      datasets: [
        {
          data: counts,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    };
  };

  // Function to process user data
  const processUserData = (users: any[]) => {
    const totalUsers = users.length;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newUsers = users.filter((user) => {
      const createdDate = new Date(user.createdAt);
      return !isNaN(createdDate.getTime()) && createdDate >= sevenDaysAgo;
    }).length;
    return { totalUsers, newUsers };
  };

  // Function to process appointment data
  const processAppointmentData = (appointments: any[]) => {
    const totalAppointments = appointments.length;
    const completedAppointments = appointments.filter(
      (apt) => apt.completed === true
    ).length;
    const pendingAppointments = appointments.filter(
      (apt) => apt.completed === false
    ).length;
    const appointmentsByDay: { [key: string]: number } = {};

    const today = new Date();
    const sevenDaysAgo = new Date(today);
    const sevenDaysFromNow = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    sevenDaysFromNow.setDate(today.getDate() + 7);

    appointments.forEach((apt) => {
      const date = new Date(apt.date);
      if (
        !isNaN(date.getTime()) &&
        date >= sevenDaysAgo &&
        date <= sevenDaysFromNow
      ) {
        const dateString = date.toISOString().split("T")[0];
        appointmentsByDay[dateString] =
          (appointmentsByDay[dateString] || 0) + 1;
      }
    });

    const sortedDates = Object.keys(appointmentsByDay).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
    const appointmentCounts = sortedDates.map(
      (date) => appointmentsByDay[date]
    );

    return {
      totalAppointments,
      completedAppointments,
      pendingAppointments,
      appointmentsByDay,
      sortedDates,
      appointmentCounts,
    };
  };

  // Handle click on doctor chart
  const handleDoctorChartClick = (event: any, elements: any) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedLanguage = doctorLanguageData.labels[clickedIndex];
      navigate(`/doctors?language=${clickedLanguage}`);
    }
  };

  // Handle click on patient chart
  const handlePatientChartClick = (event: any, elements: any) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedLanguage = patientLanguageData.labels[clickedIndex];
      navigate(`/patients?language=${clickedLanguage}`);
    }
  };

  // Display loading or error messages
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageLayout text={"Dashboard"}>
      <div className="grid grid-cols-2 gap-8 p-4">
        {/* Total Users */}
        <div className="p-6 bg-white shadow-custom rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Total Users
          </h2>
          <p className="text-center text-3xl font-bold">
            {userData?.totalUsers}
          </p>
        </div>
        {/* New Users (Last 7 Days) */}
        <div className="p-6 bg-white shadow-custom rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-center">
            New Users (Last 7 Days)
          </h2>
          <p className="text-center text-3xl font-bold">{userData?.newUsers}</p>
        </div>
        {/* Doctors by Language */}
        <div className="p-6 bg-white shadow-custom rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Doctors by Language
          </h2>
          {doctorLanguageData && (
            <div className="h-64">
              <Pie
                data={doctorLanguageData}
                options={{
                  maintainAspectRatio: false,
                  onClick: handleDoctorChartClick,
                  plugins: {
                    legend: {
                      position: "right",
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
        {/* Patients by Language */}
        <div className="p-6 bg-white shadow-custom rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Patients by Language
          </h2>
          {patientLanguageData && (
            <div className="h-64">
              <Pie
                data={patientLanguageData}
                options={{
                  maintainAspectRatio: false,
                  onClick: handlePatientChartClick,
                  plugins: {
                    legend: {
                      position: "right",
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
        {/* Total Appointments */}
        <div className="p-6 bg-white shadow-custom rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Total Appointments
          </h2>
          <p className="text-center text-3xl font-bold">
            {appointmentData?.totalAppointments}
          </p>
        </div>
        {/* Appointments by Day */}
        <div className="p-6 bg-white shadow-custom rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Appointments by Day
          </h2>
          <div className="h-64">
            <Bar
              ref={appointmentChartRef}
              data={{
                labels: appointmentData?.sortedDates,
                datasets: [
                  {
                    label: "Appointments",
                    data: appointmentData?.appointmentCounts,
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    type: "time",
                    time: {
                      unit: "day",
                      displayFormats: {
                        day: "yyyy-MM-dd",
                      },
                    },
                    title: {
                      display: true,
                      text: "Date",
                    },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                    title: {
                      display: true,
                      text: "Number of Appointments",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        {/* Appointment Status */}
        <div className="col-span-2 p-6 bg-white shadow-custom rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Appointment Status
          </h2>
          <div className="h-64">
            <Pie
              data={{
                labels: ["Completed", "Pending"],
                datasets: [
                  {
                    data: [
                      appointmentData?.completedAppointments,
                      appointmentData?.pendingAppointments,
                    ],
                    backgroundColor: ["#36A2EB", "#FFCE56"],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "right" },
                },
              }}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
