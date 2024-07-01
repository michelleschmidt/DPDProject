import React from "react";
import DoctorList from "../../components/cards/DoctorList";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import AppointmentList from "../../components/cards/AppointmentList"; // Import DoctorData type
import { useAuth } from "../../components/auth/AuthContext";
import { DoctorData, DoctorDatawithImage } from "../../components/Types";

import { mydoctors } from "../../assets/FakeData"; // Import doctors data from FakeData.tsx

const Dashboard: React.FC = () => {
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
              doctors={mydoctors}
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
              doctors={mydoctors}
              onSelectDoctor={handleSelectDoctor}
              heading="Your Doctors"
              modalType="dashboard"
              ausrichtung={"appointment-card"}
            />
          </div>
        </div>
      </div>
      <Footer isFixed={true} />
    </>
  );
};

export default Dashboard;
