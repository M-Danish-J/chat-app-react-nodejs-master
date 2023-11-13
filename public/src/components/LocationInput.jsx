import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const LocationInput = ({ userToken }) => {
  const navigate = useNavigate();  // Use useNavigate hook
  const [locationValues, setLocationValues] = useState({
    latitude: "",
    longitude: "",
    categoryId: "",
  });

  const handleLocationChange = (event) => {
    setLocationValues({
      ...locationValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleLocationSubmit = async (event) => {
    event.preventDefault();

    if (!locationValues.latitude || !locationValues.longitude || !locationValues.categoryId) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Assuming successful submission
      // Save the location data in local storage
      localStorage.setItem("locationData", JSON.stringify(locationValues));

      // Navigate to the default "/" route
      navigate("/");
    } catch (error) {
      console.error("Error saving location data:", error);
      alert("An error occurred while saving location data. Please try again later.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <form onSubmit={handleLocationSubmit}>
        <h2 style={{ color: "black" }}>Enter Location Data</h2>
        <input
          type="text"
          placeholder="Latitude"
          name="latitude"
          onChange={handleLocationChange}
          style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
        />
        <input
          type="text"
          placeholder="Longitude"
          name="longitude"
          onChange={handleLocationChange}
          style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
        />
        <input
          type="text"
          placeholder="Category ID"
          name="categoryId"
          onChange={handleLocationChange}
          style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
        />
        <button
          type="submit"
          style={{ backgroundColor: "#4e0eff", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer" }}
        >
          Submit Location
        </button>
      </form>
    </div>
  );
};

export default LocationInput;
