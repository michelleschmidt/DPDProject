import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import GenericList from "./GenericList";

interface PatientData {
  id: number;
  name: string;
  insurance: string;
  reason: string;
  language: string;
  appointmentNeeds: string;
}

const PatientList: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(
    null
  );

  const patients: PatientData[] = [
    {
      id: 1,
      name: "John Doe",
      insurance: "Health Insurance A",
      reason: "Check-up",
      language: "English",
      appointmentNeeds: "Routine check-up and evaluation",
    },
    {
      id: 2,
      name: "Jane Smith",
      insurance: "Health Insurance B",
      reason: "Diagnostic appointment",
      language: "Spanish",
      appointmentNeeds: "Detailed examination and tests",
    },
    {
      id: 3,
      name: "Emily Brown",
      insurance: "Health Insurance C",
      reason: "Follow-up",
      language: "French",
      appointmentNeeds: "Review of treatment progress",
    },
  ];

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
        heading="Patients List"
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
