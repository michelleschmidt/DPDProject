import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import GenericList from "./GenericList";
import "./Cards.css";

interface PatientData {
  id: number;
  name: string;
  insurance: string;
  reason: string;
  language: string;
  appointmentNeeds: string;
}

interface Props {
  patients: PatientData[];
  heading: string;
  modalType: string;
}

const PatientList: React.FC<Props> = ({ patients, heading, modalType }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(
    null
  );

  const handleCardClick = (patient: PatientData) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle appointment form submit
    console.log("Form submitted:", event);
    setShowModal(false);
  };

  return (
    <>
      <GenericList
        items={patients}
        heading={heading} // Use the provided heading prop
        onItemClick={handleCardClick}
      />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPatient && (
            <>
              <h4>{selectedPatient.name}</h4>
              <p>Insurance: {selectedPatient.insurance}</p>
              <p>Reason: {selectedPatient.reason}</p>
              <p>Language: {selectedPatient.language}</p>
              <p>Appointment Needs: {selectedPatient.appointmentNeeds}</p>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="appointmentDate">
                  <Form.Label>Appointment Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter appointment date"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Schedule Appointment
                </Button>
              </Form>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PatientList;
