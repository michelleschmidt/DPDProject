import React, { useEffect, useState } from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);

  useEffect(() => {
    console.log("Attempting to retrieve user location...");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("User location retrieved successfully:", position.coords);
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported.");
    }
  }, []);

  if (userLocation === null) {
    return null; // Render nothing while waiting for user location
  }

  return (
    <MapContainer
      center={userLocation} // Use userLocation directly
      zoom={13}
      style={{ height: "400px", width: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Additional map layers or components can be added here */};
      <Marker position={userLocation}>
        {/* Popup that shows user's location */}
        <Popup>
          Your location <br /> Lat: {userLocation[0]}, Lng: {userLocation[1]}
        </Popup>
      </Marker>
      {/* Circle representing a radius around the user's location */}
      <Circle
        center={userLocation}
        radius={2500}
        fillColor="blue"
        fillOpacity={0.1}
      />
    </MapContainer>
  );
};

export default Map;
