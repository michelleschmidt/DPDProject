import React from "react";
import { Card } from "react-bootstrap";
import "./Cards.css";

interface ListItem {
  id: number;
  name: string;
  specialty?: string;
  address?: string;
  language?: string;
  distance?: number;
}

interface Props<T extends ListItem> {
  items: T[];
  heading: string;
  onItemClick: (item: T) => void;
}

const GenericList = <T extends ListItem>({
  items,
  heading,
  onItemClick,
}: Props<T>) => {
  return (
    <div className="generic-list">
      <h2>{heading}</h2>
      <div className="generic-cards-container">
        <div className="generic-cards">
          {items.map((item) => (
            <div key={item.id} className="generic-card">
              <Card onClick={() => onItemClick(item)}>
                <Card.Body>
                  <div className="generic-info">
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
