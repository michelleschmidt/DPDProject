import React from "react";
import { Card, Button } from "react-bootstrap";

interface DoctorData {
  distance: number;
  id: number;
  name: string;
  specialty: string;
  address: string;
  language: string;
  image: string;
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

interface Props {
  doctors: DoctorData[];
  userLocation: UserLocation;
  onSelectDoctor: (doctor: DoctorData) => void;
}

const DoctorList: React.FC<Props> = ({ doctors, onSelectDoctor }) => {
  const [hoveredDoctorId, setHoveredDoctorId] = React.useState<number | null>(
    null
  );

  const handleMouseEnter = (doctorId: number) => {
    setHoveredDoctorId(doctorId);
  };

  const handleMouseLeave = () => {
    setHoveredDoctorId(null);
  };

  const handleCardClick = (doctor: DoctorData) => {
    onSelectDoctor(doctor);
  };

  const getEarliestAppointment = (doctor: DoctorData) => {
    // Logic to get the earliest available appointment for the doctor
    return "Earliest available: [Date]";
  };

  return (
    <div className="doctor-list">
      <h2>Ärzte in der Nähe</h2>
      <div className="doctor-cards">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            onClick={() => handleCardClick(doctor)}
            className="doctor-card"
          >
            <Card
              border={hoveredDoctorId === doctor.id ? "primary" : "default"}
              onMouseEnter={() => handleMouseEnter(doctor.id)}
              onMouseLeave={handleMouseLeave}
            >
              <Card.Body>
                <div className="doctor-info">
                  <div className="doctor-image">
                    <img src={doctor.image} alt={doctor.name} />
                  </div>
                  <div className="doctor-details">
                    <h3>{doctor.name}</h3>
                    <p>{doctor.specialty}</p>
                    <p>{doctor.address}</p>
                    <p>Distanz: {doctor.distance.toFixed(2)} km</p>
                  </div>
                </div>
                <div className="doctor-appointment">
                  <p>{getEarliestAppointment(doctor)}</p>
                  <Button variant="primary" className="appointment-button">
                    Termin buchen
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
