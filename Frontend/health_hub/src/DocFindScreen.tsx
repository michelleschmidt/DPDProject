import React, { useState } from "react";
import Map from "./components/Map";
import Header from "./components/Header";
import Footer from "./components/Footer";

function DocFind() {
  const [radius, setRadius] = useState(2.5); // Default radius is 2.5 km

  const handleSliderChange = (event: { target: { value: string } }) => {
    setRadius(parseFloat(event.target.value)); // Parse value as float
  };

  return (
    <div>
      <Header />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Pass radius as prop to Map component */}
        <Map radius={radius * 1000}></Map>
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

        <input
          id="radius"
          type="range"
          min="1.5" // Minimum radius: 2.5 km
          max="20" // Maximum radius: 20 km
          step="0.5" // Increment by 0.5 km
          value={radius}
          onChange={handleSliderChange}
          style={{ marginRight: "1rem" }}
        />

        <span>{radius.toFixed(1)} km</span>
      </div>

      <Footer />
    </div>
  );
}

export default DocFind;
