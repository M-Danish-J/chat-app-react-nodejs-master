import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Input from "./components/Input";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmRegOTP from "./pages/ConfirmRegOTP";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/confirmRegOTP" element={<ConfirmRegOTP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/input" element={<Input />} />
        <Route path="/" element={<Chat />} />
       
      </Routes>
    </BrowserRouter>
  );
}
