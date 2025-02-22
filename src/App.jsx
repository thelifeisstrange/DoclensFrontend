import React from "react";
import ApplicationForm from "./components/ApplicationForm";
import "./styles/main.css";
import "./styles/animations.css";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./components/AuthPages/LoginPage";
import SignupPage from "./components/AuthPages/SignupPage";
import NavBar from "./components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./Dashboards/AdminDashboard";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ApplicationForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
