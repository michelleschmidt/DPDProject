import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Map from "../../components/app/Map";
import Header from "../../components/app/Header";
import Footer from "../../components/app/Footer";
import { Range } from "react-range";
import DoctorList from "../../components/app/cards/DoctorList";
import { DoctorDatawithImage } from "../../components/Types";
import "./DocFind.css";

interface UserLocation {
  latitude: number;
  longitude: number;
}

function DocFind() {
  const [radius, setRadius] = useState<number>(2.5); // Default radius is 2.5 km
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [showModal, setShowModal] = useState(false);
  const history = useNavigate();
  const [selectedDoctor, setSelectedDoctor] =
    useState<DoctorDatawithImage | null>(null);

  const location = useLocation();
  const { formData } = location.state || {};

  const handleSliderChange = (values: number[]) => {
    setRadius(values[0]);
  };

  const handleCardClick = (doctor: DoctorDatawithImage) => {
    setSelectedDoctor(doctor);
  };

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

  const doctors: DoctorDatawithImage[] = [
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

  const filteredDoctors = doctors.filter((doctor) => {
    if (formData && formData.showPreferredLanguageDoctors) {
      return doctor.language === formData.preferredLanguage;
    }
    return true;
  });

  return (
    <div className="docfind-container">
      <Header />
      <div className="docfind-content">
        <div className="doctor-list-container">
          <DoctorList
            doctors={filteredDoctors}
            onSelectDoctor={(doctor) => {
              handleCardClick(doctor);
            }}
            heading="Available Doctors"
            modalType="DocFind"
            ausrichtung="doctor-card"
          />
        </div>
        <div className="map-slider-container">
          <div className="slider-container">
            <label htmlFor="radius" className="slider-label">
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
            <span className="slider-value">{radius.toFixed(1)} km</span>
          </div>
          <div className="map-container">
            <Map
              doctors={filteredDoctors}
              radius={radius * 1000}
              setUserLocation={setUserLocation}
            />
          </div>
        </div>
      </div>
      <Footer isFixed={true} />
    </div>
  );
}

export default DocFind;
