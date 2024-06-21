import React, { useState } from "react";
import { Card, Modal, Button, Form } from "react-bootstrap";
import AppointmentBookingForm from "../forms/AppointmentBookingForm";

interface ListItem {
  id: number;
  name: string;
}

export interface DoctorDatawithImage extends ListItem {
  specialty: string;
  address: string;
  language: string;
  distance: number;
  image: string;
  latitude: number;
  longitude: number;
}

interface Props {
  doctors: DoctorDatawithImage[];
  onSelectDoctor: (doctor: DoctorDatawithImage) => void;
  heading: string;
  modalType: string;
}

const DoctorList: React.FC<Props> = ({
  doctors,
  onSelectDoctor,
  heading,
  modalType,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] =
    useState<DoctorDatawithImage | null>(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [nextSteps, setNextSteps] = useState("");
  const [newAppointmentDate, setNewAppointmentDate] = useState("");
  const [newAppointmentTime, setNewAppointmentTime] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectReason, setShowRejectReason] = useState(false);

  const appointmentInfo = [
    { reason: "heart failure", date: "2024-06-15", time: "10:00 AM" },
    { reason: "checkup", date: "2024-06-16", time: "11:30 AM" },
    { reason: "child", date: "2024-06-17", time: "02:00 PM" },
  ];

  const handleCardClick = (doctor: DoctorDatawithImage) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    setShowModal(false);
  };

  const handleReject = () => {
    if (rejectReason) {
      console.log("Appointment rejected with reason:", rejectReason);
      setShowModal(false);
      setShowRejectReason(false);
    } else {
      setShowRejectReason(true);
    }
  };

  const handleApprove = () => {
    console.log("Appointment approved");
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
    <div className="doctor-list">
      <h2>{heading}</h2>
      <div className="appointment-cards-container">
        <div className="appointment-cards">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="appointment-card">
              <Card onClick={() => handleCardClick(doctor)}>
                <Card.Body>
                  <div className="doctor-info">
                    <div className="appointment-info">
                      <h3>{doctor.name}</h3>
                      <img src={doctor.image} alt={`Image of ${doctor.name}`} />
                    </div>
                    <div className="doctor-details">
                      <h4>{doctor.specialty}</h4>
                      <p>{doctor.address}</p>
                      <p>Language: {doctor.language}</p>{" "}
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
          <Modal.Title>Make a new Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AppointmentBookingForm />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DoctorList;
