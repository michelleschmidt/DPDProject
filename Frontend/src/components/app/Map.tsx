import React, { useEffect, useState } from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../App.css";
import { DoctorDatawithImage } from "../Types";

interface UserLocation {
  latitude: number;
  longitude: number;
}

interface MapProps {
  radius: number;
  doctors?: DoctorDatawithImage[];
  setUserLocation: React.Dispatch<React.SetStateAction<UserLocation | null>>;
}

const Map: React.FC<MapProps> = ({ radius, doctors, setUserLocation }) => {
  const [userLocationState, setUserLocationState] =
    useState<UserLocation | null>(null);

  // Fetch user location using geolocation API
  useEffect(() => {
    console.log("Attempting to retrieve user location...");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("User location retrieved successfully:", position.coords);
          setUserLocationState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          if (setUserLocation) {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          }
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
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={1}
        />
        {/* Render doctors' markers on the map */}
        {doctors?.map((doctor) => (
          <Marker
            key={doctor.id}
            position={[doctor.latitude, doctor.longitude]}
            icon={L.icon({
              iconUrl: doctor.image, // Use the doctor's image URL for the icon
              iconSize: [32, 32], // Adjust icon size as needed
              iconAnchor: [16, 32], // Adjust icon anchor as needed
              popupAnchor: [0, -32], // Adjust popup anchor as needed
            })}
          >
            <Popup>
              <b>{doctor.name}</b> <br></br> {doctor.specialty}
              <br></br> {doctor.language}
            </Popup>
          </Marker>
        ))}
        {/* Marker for user's current location */}
        <Marker
          position={[userLocationState.latitude, userLocationState.longitude]}
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

export default Map;
