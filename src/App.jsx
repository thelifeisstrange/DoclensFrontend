import React from 'react';
import ApplicationForm from './components/ApplicationForm';
import './styles/main.css';
import './styles/animations.css';
import { BrowserRouter, Routes, Route } from "react-router"
import LoginPage from './components/AuthPages/LoginPage';
import SignupPage from './components/AuthPages/SignupPage';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className='app' >
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<ApplicationForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;