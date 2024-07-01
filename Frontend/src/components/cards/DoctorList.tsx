import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import GenericForm from "../forms/GenericForm";
import "./Cards.css";
import { DoctorDatawithImage } from "../Types";
import AppointmentBookingForm from "../forms/AppointmentReBookingFrom";

interface Props {
  doctors: DoctorDatawithImage[];
  onSelectDoctor: (doctor: DoctorDatawithImage) => void;
  heading: string;
  modalType: string;
  ausrichtung: "appointment-card" | "doctor-card";
}

const DoctorList: React.FC<Props> = ({
  doctors,
  onSelectDoctor,
  heading,
  ausrichtung,
  modalType,
}) => {
  const [showModalDashboard, setShowModalDashboard] = useState(false);
  const [showModalFind, setShowModalFind] = useState(false);
  const [selectedDoctor, setSelectedDoctor] =
    useState<DoctorDatawithImage | null>(null);
  const [newAppointmentDateTime, setNewAppointmentDateTime] = useState("");

  const handleCardClick = (doctor: DoctorDatawithImage) => {
    setSelectedDoctor(doctor);
    if (modalType === "dashboard") {
      setShowModalDashboard(true);
    } else if (modalType === "DocFind") {
      setShowModalFind(true);
    }
  };

  const handleFormSubmit = (formData: any) => {
    const newAppointmentDateTime = formData.appointment;
    console.log("Form submitted:", formData);

    // Simulate adding a new appointment
    const newAppointment = {
      reason: "New appointment",
      date: newAppointmentDateTime.split("T")[0],
      time: newAppointmentDateTime.split("T")[1],
      details: "", // Ensure details property is included
    };

    // Here you would typically add the new appointment to your data structure
    // For demonstration, let's just log it
    console.log("New Appointment:", newAppointment);

    setNewAppointmentDateTime(newAppointmentDateTime);

    // Close the modal after submitting
    setShowModalFind(false);
  };

  return (
    <div className="list">
      <h2>{heading}</h2>
      <div className="cards-container">
        <div className="cards">
          {doctors.map((doctor) => (
            <div key={doctor.id} className={ausrichtung}>
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
      <Modal
        show={showModalDashboard}
        onHide={() => setShowModalDashboard(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Make a new Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AppointmentBookingForm />
        </Modal.Body>
      </Modal>

      <Modal show={showModalFind} onHide={() => setShowModalFind(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Make an Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GenericForm
            fields={[
              {
                name: "appointment",
                type: "date",
                label: "Appointment",
                showTimeSelect: true,
              },
              {
                name: "phone",
                type: "checkbox",
                label: "Do you need live translation?",
              },
            ]}
            onSubmit={handleFormSubmit}
            buttonText={"Book"}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DoctorList;
