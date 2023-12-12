import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const LocationInput = ({ userToken }) => {
  const navigate = useNavigate();
  const [locationValues, setLocationValues] = useState({
    sourceLatitude: "",
    sourceLongitude: "",
    destinationLatitude: "",
    destinationLongitude: "",
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
debugger
    if (
      !locationValues.sourceLatitude ||
      !locationValues.sourceLongitude ||
      !locationValues.destinationLatitude ||
      !locationValues.destinationLongitude ||
      !locationValues.categoryId
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5001/availableDrivers?sourceLat=${locationValues.sourceLatitude}&sourceLong=${locationValues.sourceLongitude}&destinationLat=${locationValues.destinationLatitude}&destinationLong=${locationValues.destinationLongitude}&categoryId=${locationValues.categoryId}`);
      console.log(response);
    // Extract the relevant data from the response
    const responseData = response.data.formattedAvailableDrivers;

    // Pass only the necessary data in the state
    navigate('/', { state: responseData });
    } catch (error) {
      console.log( error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <form onSubmit={handleLocationSubmit}>
        <h2 style={{ color: "black" }}>Enter Location Data</h2>
        <input
          type="text"
          placeholder="Source Latitude"
          name="sourceLatitude"
          onChange={handleLocationChange}
          style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
        />
        <input
          type="text"
          placeholder="Source Longitude"
          name="sourceLongitude"
          onChange={handleLocationChange}
          style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
        />
        <input
          type="text"
          placeholder="Destination Latitude"
          name="destinationLatitude"
          onChange={handleLocationChange}
          style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
        />
        <input
          type="text"
          placeholder="Destination Longitude"
          name="destinationLongitude"
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
