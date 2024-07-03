import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import Button from "../../Button";
import GenericForm from "../forms/GenericForm";
import "./Cards.css";
import { DoctorData } from "../../Types";
import { standardappointmentInfo } from "../../../assets/FakeData";

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

  const handleCardClick = (doctor: DoctorData, index: number) => {
    setSelectedDoctor(doctor);
    setSelectedAppointmentIndex(index);
    setShowModal(true);
  };

  const handleDelete = () => {
    console.log("Appointment deleted");
    standardappointmentInfo.splice(selectedAppointmentIndex, 1);
    setSelectedAppointmentIndex(0);
    setShowModal(false);
  };

  const handleReschedule = () => {
    console.log("Appointment rescheduled");
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
          {doctors.map((doctor, index) => (
            <div key={doctor.id} className="appointment-card">
              <Card onClick={() => handleCardClick(doctor, index)}>
                <Card.Body>
                  <div className="doctor-info">
                    <div className="appointment-info">
                      <p>Date: {standardappointmentInfo[index].date}</p>
                      <p>Time: {standardappointmentInfo[index].time}</p>
                      <p>Reason: {standardappointmentInfo[index].reason}</p>
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
          <div className="d-flex justify-content-around mt-3">
            <Button
              onClick={() => console.log("Call Interpreter")}
              color="warning"
              to="#"
            >
              <b>Call Interpreter</b>
            </Button>
          </div>
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
          <div className="centered-button">
            <GenericForm
              fields={[
                {
                  name: "newAppointment",
                  type: "date",
                  label: "",
                  showTimeSelect: true,
                },
              ]}
              onSubmit={handleReschedule}
              buttonText="Reschedule"
            />
          </div>
          <div className="d-flex justify-content-around mt-3">
            <Button onClick={handleDelete} color="danger" to="#">
              Cancel Appointment
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AppointmentList;
