import React, { useState } from "react";
import PatientList from "../../components/cards/PatientList"; // Import PatientList component
import Footer from "../../components/Footer";
import Header from "../../components/Header";

interface DoctorData {
  distance: number;
  id: number;
  name: string;
  specialty: string;
  address: string;
}

interface AppointmentData {
  doctorId: number;
  date: string;
  time: string;
  reason: string;
  summary: string;
  nextTasks: string;
  newAppointment: string;
}

interface PhonePatientData {
  patientId: number;
  name: string;
  insurance: string;
  appointmentReason: string;
  language: string;
  appointmentNeeds: string;
}

const PhoneDashboard: React.FC = () => {
  const patients: PhonePatientData[] = [
    {
      patientId: 1,
      name: "John Doe",
      insurance: "Blue Cross Blue Shield",
      appointmentReason: "Check-up",
      language: "English",
      appointmentNeeds: "Blood work",
    },
    {
      patientId: 2,
      name: "Jane Smith",
      insurance: "Aetna",
      appointmentReason: "Follow-up",
      language: "Spanish",
      appointmentNeeds: "Medication adjustment",
    },
    // Add more patient data as needed
  ];

  const [appointments, setAppointments] = useState<AppointmentData[]>([
    {
      doctorId: 1,
      date: "2023-03-01",
      time: "10:00 AM",
      reason: "Check-up",
      summary: "Patient needs blood work",
      nextTasks: "Schedule follow-up appointment",
      newAppointment: "2023-04-01",
    },
    {
      doctorId: 2,
      date: "2023-03-05",
      time: "2:00 PM",
      reason: "Follow-up",
      summary: "Patient needs medication adjustment",
      nextTasks: "Monitor patient's progress",
      newAppointment: "2023-05-01",
    },
    // Add more appointment data as needed
  ]);

  const [languageFilter, setLanguageFilter] = useState<string>("");
  const [reasonFilter, setReasonFilter] = useState<string>("");

  const filteredPatients = patients.filter((patient) => {
    if (languageFilter && patient.language !== languageFilter) return false;
    if (reasonFilter && patient.appointmentReason !== reasonFilter)
      return false;
    return true;
  });

  return (
    <>
      <Header />
      <div className="patient-list-container">
        <div className="filter-container">
          <label>Language:</label>
          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            {/* Add more language options as needed */}
          </select>
          <label>Reason:</label>
          <select
            value={reasonFilter}
            onChange={(e) => setReasonFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Check-up">Check-up</option>
            <option value="Follow-up">Follow-up</option>
            {/* Add more reason options as needed */}
          </select>
        </div>
        <PatientList
          patients={filteredPatients.map((patient) => ({
            id: patient.patientId,
            name: patient.name,
            insurance: patient.insurance,
            reason: patient.appointmentReason,
            language: patient.language,
            appointmentNeeds: patient.appointmentNeeds,
          }))}
          heading="Patients Needing New Appointments"
          modalType="newAppointment"
        />
      </div>
      <div className="appointment-list-container">
        <PatientList
          patients={appointments.map((appointment) => ({
            id: appointment.doctorId,
            name: getDoctorNameById(appointment.doctorId),
            insurance: "",
            reason: appointment.reason,
            language: "",
            appointmentNeeds: appointment.summary,
          }))}
          heading="Your Appointments"
          modalType="viewAppointment"
        />
      </div>
      <Footer isFixed={false} />
    </>
  );
};

const getDoctorNameById = (doctorId: number): string => {
  const doctors: DoctorData[] = [
    {
      id: 1,
      name: "Dr. Smith",
      specialty: "General Practice",
      address: "123 Main St",
      distance: 0,
    },
    {
      id: 2,
      name: "Dr. Johnson",
      specialty: "Cardiology",
      address: "456 Elm St",
      distance: 0,
    },
  ];
  const doctor = doctors.find((doctor) => doctor.id === doctorId);
  return doctor ? doctor.name : "Unknown Doctor";
};

export default PhoneDashboard;
