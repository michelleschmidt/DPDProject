import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../App.css"; // Import your custom CSS file
import { Doctor } from "./Types";

// Define interfaces for user location and map props
interface UserLocation {
  latitude: number;
  longitude: number;
}

interface MapProps {
  radius: number;
  doctors?: Doctor[];
  setUserLocation: React.Dispatch<React.SetStateAction<UserLocation | null>>;
}

// Define the Map component
const MapComponent: React.FC<MapProps> = ({
  radius,
  doctors,
  setUserLocation,
}) => {
  const [userLocationState, setUserLocationState] =
    useState<UserLocation | null>(null);

  // Fetch user location using geolocation API
  useEffect(() => {
    console.log("Attempting to retrieve user location...");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("User location retrieved successfully:", position.coords);
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocationState(location);
          setUserLocation(location);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported.");
    }
  }, [setUserLocation]);

  // Render nothing while waiting for user location
  if (userLocationState === null) {
    return null;
  }

  return (
    <div className="map-container">
      <MapContainer
        center={[userLocationState.latitude, userLocationState.longitude]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={1}
        />
        {/* Render doctors' markers on the map */}
        {doctors?.map(
          (doctor) =>
            doctor.location && (
              <Marker
                key={doctor.id}
                position={[doctor.location.latitude, doctor.location.longitude]}
                icon={L.icon({
                  iconUrl: "https://via.placeholder.com/32", // Use a placeholder icon for doctors
                  iconSize: [32, 32], // Adjust icon size as needed
                  iconAnchor: [16, 32], // Adjust icon anchor as needed
                  popupAnchor: [0, -32], // Adjust popup anchor as needed
                })}
              >
                <Popup>
                  <b>
                    {doctor.title} {doctor.first_name} {doctor.last_name}
                  </b>
                  <br />
                  {doctor.specialization.area_of_specialization}
                  <br />
                  {doctor.languages
                    .map((lang) => lang.language_name)
                    .join(", ")}
                </Popup>
              </Marker>
            )
        )}
        {/* Marker for user's current location */}
        <Marker
          position={[userLocationState.latitude, userLocationState.longitude]}
          icon={L.icon({
            iconUrl: "https://via.placeholder.com/32/blue", // Use a distinct icon for user location
            iconSize: [32, 32], // Adjust icon size as needed
            iconAnchor: [16, 32], // Adjust icon anchor as needed
            popupAnchor: [0, -32], // Adjust popup anchor as needed
          })}
        >
          <Popup>Your location</Popup>
        </Marker>
        {/* Circle representing search radius around user's location */}
        <Circle
          center={[userLocationState.latitude, userLocationState.longitude]}
          radius={radius}
          fillColor="blue"
          fillOpacity={0.1}
        />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
