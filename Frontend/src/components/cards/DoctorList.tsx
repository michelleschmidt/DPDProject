import React, { useState } from "react";
import { Card, Modal, Button, Form } from "react-bootstrap";
import AppointmentBookingForm from "../forms/AppointmentBookingForm";
import GenericForm from "../forms/GenericForm";
import "./Cards.css";

//MAKE THE STYLING DIFFERNT AS ENDPOINT

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
  const [showModalDashboard, setShowModalDashboard] = useState(false);
  const [showModalFind, setShowModalFind] = useState(false);
  const [selectedDoctor, setSelectedDoctor] =
    useState<DoctorDatawithImage | null>(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [newAppointmentDate, setNewAppointmentDate] = useState("");
  const [newAppointmentTime, setNewAppointmentTime] = useState("");

  const appointmentInfo = [
    { reason: "heart failure", date: "2024-06-15", time: "10:00 AM" },
    { reason: "checkup", date: "2024-06-16", time: "11:30 AM" },
    { reason: "child", date: "2024-06-17", time: "02:00 PM" },
  ];

  const handleCardClick = (doctor: DoctorDatawithImage) => {
    setSelectedDoctor(doctor);
    if (modalType === "dashboard") {
      setShowModalDashboard(true);
    } else if (modalType === "DocFind") {
      setShowModalFind(true);
    }
  };

  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    setShowModalDashboard(false);
    setShowModalFind(false);
  };

  return (
    <div className="list">
      <h2>{heading}</h2>
      <div className="cards-container">
        <div className="cards">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
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
            onSubmit={function (formData: any): void {
              throw new Error("Function not implemented.");
            }}
            buttonText={"Book"}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DoctorList;
