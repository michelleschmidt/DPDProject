import React from "react";
import { Card } from "react-bootstrap";

interface ListItem {
  id: number;
  name: string;
  specialty?: string;
  address?: string;
  language?: string;
  distance?: number;
}

interface Props {
  items: ListItem[];
  heading: string;
  onItemClick: (item: ListItem) => void;
}

const GenericList: React.FC<Props> = ({ items, heading, onItemClick }) => {
  return (
    <div className="doctor-list">
      <h2>{heading}</h2>
      <div className="doctor-cards-container">
        <div className="doctor-cards">
          {items.map((item) => (
            <div key={item.id} className="doctor-card">
              <Card onClick={() => onItemClick(item)}>
                <Card.Body>
                  <div className="doctor-info">
                    <h3>{item.name}</h3>
                    {item.specialty && <p>Specialty: {item.specialty}</p>}
                    {item.address && <p>Address: {item.address}</p>}
                    {item.language && <p>Language: {item.language}</p>}
                    {item.distance && (
                      <p>Distance: {item.distance.toFixed(2)} km</p>
                    )}
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

export default GenericList;
