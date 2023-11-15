import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAvailableDriversRoute } from "../utils/APIRoutes";

export default function Input() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ sourceLat: "", sourceLng: "", destinationLat: "", destinationLng: "", categoryId: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  // useEffect(() => {
  //     if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
  //         navigate("/");
  //     }
  // }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { lat, long, categoryId } = values;
    if (lat === "") {
      toast.error("lat and long is required.", toastOptions);
      return false;
    } else if (long === "") {
      toast.error("lat and long is required.", toastOptions);
      return false;
    } else if (categoryId === "") {
      toast.error("categoryId is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { lat, long, categoryId } = values;
      const urlWithParams = `${getAvailableDriversRoute}?passengerLat=${lat}&passengerLong=${long}&categoryId=${categoryId}`;

      try {
        const res = await axios.get(urlWithParams);
        // debugger;
        console.log("aaa");
        if (res.status === 500) {
          toast.error(res.data.error, toastOptions);
        }

        if (res.status === 200) {
          toast.error(res.data.message, toastOptions);
          localStorage.setItem(
            "AllDrivers",
            JSON.stringify(res.data)
          );
          navigate("/");
        }
      } catch (error) {
        // Handle error
        console.error("Error:", error);
      }
    }
  };


  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Inputs</h1>
          </div>
          <input
            type="text"
            placeholder="Passenger Lat"
            name="lat"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Passenger Long"
            name="long"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Category Id"
            name="categoryId"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Submit</button>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
