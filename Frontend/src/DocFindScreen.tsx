import React, { useState } from "react";
import Map from "./components/Map";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DoctorList from "./components/DoctorList";
import { Range } from "react-range";

interface DoctorData {
  id: number;
  name: string;
  specialty: string;
  address: string;
  language: string;
  image: string;
  longitude: number;
  latitude: number;
  distance: number;
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

function DocFind() {
  const [radius, setRadius] = useState<number>(2.5); // Default radius is 2.5 km
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  const handleSliderChange = (values: number[]) => {
    setRadius(values[0]);
  };

  // Function to calculate the distance between two coordinates using the Haversine formula
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return Number(distance.toFixed(3));
  };

  const doctors: DoctorData[] = [
    {
      id: 1,
      name: "Dr. Jane Doe",
      specialty: "General Practitioner",
      address: "123 Main St, Anytown, USA",
      language: "English",
      image:
        "https://www.shutterstock.com/image-photo/profile-photo-attractive-family-doc-600nw-1724693776.jpg",
      latitude: 48.106,
      longitude: 11.58,
      distance: userLocation
        ? calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            48.106,
            11.58
          )
        : 0,
    },
    {
      id: 2,
      name: "Dr. John Doe",
      specialty: "Cardiologist",
      address: "456 Elm St, Anytown, USA",
      language: "Spanish",
      image:
        "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
      latitude: 48.136,
      longitude: 11.576,
      distance: userLocation
        ? calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            48.136,
            11.576
          )
        : 0,
    },
    {
      id: 3,
      name: "Dr. Mary Smith",
      specialty: "Pediatrician",
      address: "789 Oak St, Anytown, USA",
      language: "French",
      image:
        "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
      latitude: 48.106,
      longitude: 11.6,
      distance: userLocation
        ? calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            48.106,
            11.6
          )
        : 0,
    },
  ];

  return (
    <div className="docfind-container">
      <Header />
      <div className="docfind-content">
        <div className="doctor-list">
          {userLocation && (
            <DoctorList
              doctors={doctors}
              userLocation={userLocation}
              onSelectDoctor={(doctor) => {
                console.log("Selected doctor:", doctor);
              }}
            />
          )}
        </div>
        <div style={{ flex: "3rem" }}>
          <div className="map-container">
            <Map
              doctors={doctors}
              radius={radius * 1000}
              setUserLocation={setUserLocation}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "1rem",
              padding: "0.5rem",
              backgroundColor: "#f5f5f5",
              border: "1px solid #ddd",
            }}
          >
            <label htmlFor="radius" style={{ marginRight: "1rem" }}>
              Search Radius:
            </label>
            <Range
              step={0.5}
              min={1.5}
              max={20}
              values={[radius]}
              onChange={handleSliderChange}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    height: "4px",
                    width: "100%",
                    display: "flex",
                    backgroundColor: "#ccc",
                    borderRadius: "4px",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    height: "16px",
                    width: "16px",
                    borderRadius: "8px",
                    backgroundColor: "#3a84dc",
                    border: "2px solid white",
                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                  }}
                />
              )}
            />
            <span>{radius.toFixed(1)} km</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DocFind;
