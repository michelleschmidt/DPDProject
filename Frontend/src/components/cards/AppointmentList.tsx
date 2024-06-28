import React, { useState } from "react";
import { Card, Modal, Button, Form } from "react-bootstrap";
import GenericForm from "../forms/GenericForm";
import "./Cards.css";

export interface DoctorData {
  distance: number;
  id: number;
  name: string;
  specialty: string;
  address: string;
  language: string;
}

interface Props {
  doctors: DoctorData[];
  onSelectAppointment: (doctor: DoctorData) => void;
  heading: string;
  modalType: string;
}

const AppointmentList: React.FC<Props> = ({
  doctors,
  onSelectAppointment,
  heading,
  modalType,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorData | null>(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [newAppointmentDate, setNewAppointmentDate] = useState("");
  const [newAppointmentTime, setNewAppointmentTime] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectReason, setShowRejectReason] = useState(false);

  const appointmentInfo = [
    { reason: "heart failure", date: "2024-06-15", time: "10:00 AM" },
    { reason: "checkup", date: "2024-06-16", time: "11:30 AM" },
    { reason: "child", date: "2024-06-17", time: "02:00 PM" },
  ];

  const handleCardClick = (doctor: DoctorData) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    setShowModal(false);
  };

  const handleDelete = () => {
    console.log("Appointment deleted");
    setShowModal(false);
  };

  const handleReschedule = () => {
    console.log("Appointment rescheduled");
    setShowModal(false);
  };

  return (
    <div className="list">
      <h2>{heading}</h2>
      <div className="cards-container">
        <div className="cards">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="appointment-card">
              <Card onClick={() => handleCardClick(doctor)}>
                <Card.Body>
                  <div className="doctor-info">
                    <div className="appointment-info">
                      <p>Date: {appointmentInfo[0].date}</p>
                      <p>Time: {appointmentInfo[0].time}</p>
                      <p>Reason: {appointmentInfo[0].reason}</p>
                    </div>
                    <div className="doctor-details">
                      <h3>{doctor.name}</h3>
                      <p>{doctor.specialty}</p>
                      <p>{doctor.address}</p>
                      <p>Distance: {doctor.distance.toFixed(2)} km</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>View Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Appointment Information:</h4>
          <p>Doctor: {selectedDoctor?.name}</p>
          <p>Date: {appointmentDate}</p>
          <p>Time: {appointmentTime}</p>
          <p>Reason: {appointmentInfo[0].reason}</p>
          <p>Description: {}</p>
          <div className="d-flex justify-content-around mt-3">
            <Button variant="danger" onClick={handleDelete}>
              Cancel Appointment
            </Button>
          </div>
          <GenericForm
            fields={[
              {
                name: "newAppointment",
                type: "date",
                label: "New Appointment",
                showTimeSelect: true,
              },
            ]}
            onSubmit={handleFormSubmit}
            buttonText="Reschedule"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AppointmentList;
