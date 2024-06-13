import React from "react";
import { Card } from "react-bootstrap";

export interface DoctorData {
  id: number;
  name: string;
  specialty: string;
  address: string;
  language: string;
  distance: number;
  image: string;
  latitude: number;
  longitude: number;
}

interface Props {
  doctors: DoctorData[];
  onSelectDoctor: (doctor: DoctorData) => void;
  heading: string;
}

const DoctorList: React.FC<Props> = ({ doctors, onSelectDoctor, heading }) => {
  const handleCardClick = (doctor: DoctorData) => {
    onSelectDoctor(doctor);
  };

  return (
    <div className="doctor-list">
      <h2>{heading}</h2>
      <div className="doctor-cards-container">
        <div className="doctor-cards">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <Card onClick={() => handleCardClick(doctor)}>
                <Card.Body>
                  <div className="doctor-details">
                    <h3>{doctor.name}</h3>
                    <p>{doctor.specialty}</p>
                    <p>{doctor.address}</p>
                    <p>Languages: {doctor.language}</p>
                    <p>Distance: {doctor.distance.toFixed(2)} km</p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
