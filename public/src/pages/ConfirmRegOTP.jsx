import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmRegOTP } from "../utils/APIRoutes";

const ConfirmRegOTP = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({ phone: "", OneTimePassword: "" });
    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
      };
    
      const validateForm = () => {
        const { phone, OneTimePassword } = values;
        if (phone === "") {
          toast.error("phone and OneTimePassword is required.", toastOptions);
          return false;
        } else if (OneTimePassword === "") {
          toast.error("phone and OneTimePassword is required.", toastOptions);
          return false;
        }
        return true;
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            debugger
          const { phone, OneTimePassword } = values;
          const res = await axios.post(confirmRegOTP, {
            phone,
            OneTimePassword,
          });
          console.log(res)
          debugger
          if (!res.data.success) {
            toast.error(res.data.error, toastOptions);
          }else
          if (res.data.success) {
            toast.error(res.data.message, toastOptions);
            localStorage.setItem(
              process.env.REACT_APP_LOCALHOST_KEY,
              JSON.stringify(res.data.user)
            );
    
            // navigate("/Input");
            navigate("/");
          }
        }
      };
  return (
    <div>
       <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="text"
            placeholder="OneTimePassword"
            name="OneTimePassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Submit</button>
          <span>
            Don't recived OTP ? <Link to="/register">Resend OTP.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </div>
  )
}

export default ConfirmRegOTP
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