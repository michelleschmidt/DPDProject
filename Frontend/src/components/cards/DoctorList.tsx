import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import "./Cards.css";
import { DoctorDatawithImage } from "../Types";
import AppointmentReBookingForm from "../forms/AppointmentReBookingFrom";
import GenericForm from "../forms/GenericForm";
import { Navigate, useNavigate } from "react-router";

interface Props {
  doctors: DoctorDatawithImage[];
  onSelectDoctor: (doctor: DoctorDatawithImage) => void;
  heading: string;
  modalType: "dashboard" | "DocFind";
  ausrichtung: "appointment-card" | "doctor-card";
}

const DoctorList: React.FC<Props> = ({
  doctors,
  onSelectDoctor,
  heading,
  ausrichtung,
  modalType,
}) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] =
    useState<DoctorDatawithImage | null>(null);

  const handleCardClick = (doctor: DoctorDatawithImage) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
    onSelectDoctor(doctor);
  };

  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    setShowModal(false);
    navigate("/dashboard");
  };

  const renderModalContent = () => {
    if (modalType === "DocFind") {
      return (
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
              type: "phone",
              label: "I need translation assistance",
              isRequired: false,
            },
          ]}
          onSubmit={handleFormSubmit}
          buttonText="Book"
        />
      );
    } else if (modalType === "dashboard") {
      return <AppointmentReBookingForm />;
    }
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
                      <p>Language: {doctor.language}</p>
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
          <Modal.Title>
            {modalType === "DocFind"
              ? "Make a new Appointment"
              : "Make an Appointment"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderModalContent()}</Modal.Body>
      </Modal>
    </div>
  );
};

export default DoctorList;
