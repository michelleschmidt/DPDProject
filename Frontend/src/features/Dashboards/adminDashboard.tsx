import React from "react";
import DoctorList, {
  DoctorDatawithImage,
} from "../../components/cards/DoctorList";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import AppointmentList, {
  DoctorData,
} from "../../components/cards/AppointmentList"; // Import DoctorData type
import { useAuth } from "../../components/auth/AuthContext";

const adminDashboard: React.FC = () => {
  const doctors: DoctorDatawithImage[] = [
    {
      distance: 5.2,
      id: 1,
      name: "Dr. John Doe",
      specialty: "Cardiologist",
      address: "123 Heart St, Medical City",
      language: "English",
      image: "doctor_image_url",
      latitude: 0,
      longitude: 0,
    },
    {
      distance: 3.4,
      id: 2,
      name: "Dr. Jane Smith",
      specialty: "Dermatologist",
      address: "456 Skin Ave, Health Town",
      language: "Spanish",
      image: "doctor_image_url",
      latitude: 0,
      longitude: 0,
    },
    // Add more doctor data as needed
  ];

  console.log("Login successful:", useAuth());

  const handleSelectDoctor = (doctor: DoctorDatawithImage) => {};

  function handleSelectAppointment(doctor: DoctorData): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Header />
      <div className="docfind-container">
        <div className="docfind-content">
          <div className="doctor-list-container">
            <AppointmentList
              doctors={doctors}
              onSelectAppointment={handleSelectAppointment}
              heading="Upcoming Appointments"
              modalType="upcomingAppointment"
            />
          </div>
        </div>
      </div>
      <div className="docfind-container">
        <div className="docfind-content">
          <div className="doctor-list-container">
            <DoctorList
              doctors={doctors}
              onSelectDoctor={handleSelectDoctor}
              heading="Your Doctors"
              modalType="dashboard"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default adminDashboard;
