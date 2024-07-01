import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import GenericForm from "../forms/GenericForm";
import "./Cards.css";
import { DoctorData } from "../Types";
import { alldoctors, standardappointmentInfo } from "../../assets/FakeData";

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
  const [selectedAppointmentIndex, setSelectedAppointmentIndex] = useState(0);
  const [newAppointmentDateTime, setNewAppointmentDateTime] = useState("");

  const handleCardClick = (doctor: DoctorData) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleDelete = () => {
    console.log("Appointment deleted");
    // Simulate appointment deletion
    standardappointmentInfo.splice(selectedAppointmentIndex, 1);
    setSelectedAppointmentIndex(0);
    setShowModal(false);
  };

  const handleReschedule = () => {
    console.log("Appointment rescheduled");
    // Simulate appointment rescheduling
    const newDateTime = newAppointmentDateTime.split("T");
    standardappointmentInfo[selectedAppointmentIndex].date = newDateTime[0];
    standardappointmentInfo[selectedAppointmentIndex].time = newDateTime[1];
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
                      <p>
                        Date:{" "}
                        {standardappointmentInfo[selectedAppointmentIndex].date}
                      </p>
                      <p>
                        Time:{" "}
                        {standardappointmentInfo[selectedAppointmentIndex].time}
                      </p>
                      <p>
                        Reason:{" "}
                        {
                          standardappointmentInfo[selectedAppointmentIndex]
                            .reason
                        }
                      </p>
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
          <h4>Appointment Information:</h4>
          <p>Doctor: {selectedDoctor?.name}</p>
          <p>Date: {standardappointmentInfo[selectedAppointmentIndex].date}</p>
          <p>Time: {standardappointmentInfo[selectedAppointmentIndex].time}</p>
          <p>
            Reason: {standardappointmentInfo[selectedAppointmentIndex].reason}
          </p>
          <p>
            Description:{" "}
            {standardappointmentInfo[selectedAppointmentIndex].details ||
              "No description provided"}
          </p>
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
            onSubmit={handleReschedule}
            buttonText="Reschedule"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AppointmentList;
