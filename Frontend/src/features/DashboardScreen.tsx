import React from "react";
import DoctorList from "../components/cards/DoctorList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Button from "../components/Button";
import AppointmentBookingForm from "../components/forms/AppointmentBookingForm";
import AppointmentList from "../components/cards/AppointmentList";

interface DoctorData {
  distance: number;
  id: number;
  name: string;
  specialty: string;
  address: string;
  language: string;
  image: string;
}

const Dashboard: React.FC = () => {
  const doctors: DoctorData[] = [
    {
      distance: 5.2,
      id: 1,
      name: "Dr. John Doe",
      specialty: "Cardiologist",
      address: "123 Heart St, Medical City",
      language: "English",
      image: "doctor_image_url",
    },
    {
      distance: 3.4,
      id: 2,
      name: "Dr. Jane Smith",
      specialty: "Dermatologist",
      address: "456 Skin Ave, Health Town",
      language: "Spanish",
      image: "doctor_image_url",
    },
    // Add more doctor data as needed
  ];

  const handleSelectDoctor = (doctor: DoctorData) => {};

  return (
    <>
      <Header />
      <div className="docfind-container">
        <div className="docfind-content">
          <div className="doctor-list-container">
            <AppointmentList
              doctors={doctors}
              onSelectDoctor={handleSelectDoctor}
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
              modalType="doctors"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
