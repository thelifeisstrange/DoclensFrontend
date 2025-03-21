import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import profilepic from "../../assets/Logo/drdo_round_logo.jpg";
import "./NavBar.css";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login", { replace: true });
  };

  const navigateToApplicationForm = () => {
    navigate("/");
  };

  const navigateToBatchProcessing = () => {
    navigate("/batchprocess");
  };

  const isApplicationFormActive = location.pathname === "/";
  const isBatchProcessingActive = location.pathname === "/batchprocess";

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="navbar-title">DocLens</span>
      </div>
      <div className="navbar-nav-center">
        <button
          className={`nav-button ${
            isApplicationFormActive ? "nav-button-active" : ""
          }`}
          onClick={navigateToApplicationForm}
        >
          Application Form
        </button>
        <button
          className={`nav-button ${
            isBatchProcessingActive ? "nav-button-active" : ""
          }`}
          onClick={navigateToBatchProcessing}
        >
          Batch Processing
        </button>
      </div>
      <div className="navbar-links">
        <div className="profile-container" ref={dropdownRef}>
          <img
            src={profilepic}
            alt="Profile"
            className="profile-img"
            onClick={toggleDropdown}
            style={{ cursor: "pointer" }}
          />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item">Profile</button>
              <button className="dropdown-item">Settings</button>
              <button
                className="dropdown-item logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
