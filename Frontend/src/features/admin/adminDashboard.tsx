import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios";
import PageLayout from "../../components/layout/PageLayout";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [doctorLanguageData, setDoctorLanguageData] = useState<any>(null);
  const [patientLanguageData, setPatientLanguageData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctorData();
    fetchPatientData();
  }, []);

  const fetchDoctorData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/search/doctors-count");
      console.log("Fetched DoctorCount:", response.data);
      setDoctorLanguageData(prepareChartData(response.data));
    } catch (error) {
      console.error("Error fetching doctor count:", error);
      setError("Failed to fetch doctor count. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/search/users-count");
      console.log("Fetched PatientCount:", response.data);
      setPatientLanguageData(prepareChartData(response.data));
    } catch (error) {
      console.error("Error fetching patient count:", error);
      setError("Failed to fetch patient count. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

  const handleDoctorChartClick = (event: any, elements: any) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedLanguage = doctorLanguageData.labels[clickedIndex];
      navigate(`/doctors?language=${clickedLanguage}`);
    }
  };

  const handlePatientChartClick = (event: any, elements: any) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedLanguage = doctorLanguageData.labels[clickedIndex];
      navigate(`/patients?language=${clickedLanguage}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageLayout text={"Dashboard"}>
      <div className="flex flex-row justify-center items-stretch gap-8 p-4">
        <div className="w-1/2 p-6 bg-white shadow-custom rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Doctors by Language
          </h2>
          {doctorLanguageData && (
            <div className="h-96">
              <Pie
                data={doctorLanguageData}
                options={{
                  maintainAspectRatio: false,
                  onClick: handleDoctorChartClick,
                  plugins: {
                    legend: {
                      position: "right" as const,
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
        <div className="w-1/2 p-6 bg-white shadow-custom rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Patients by Language
          </h2>
          {patientLanguageData && (
            <div className="h-96">
              <Pie
                data={patientLanguageData}
                options={{
                  maintainAspectRatio: false,
                  onClick: handlePatientChartClick,
                  plugins: {
                    legend: {
                      position: "right" as const,
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
