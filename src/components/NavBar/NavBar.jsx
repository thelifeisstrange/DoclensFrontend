import { useState, useRef, useEffect } from 'react';
import profilepic from '../../assets/Logo/drdo_round_logo.jpg'; // Corrected relative path
import './NavBar.css'; // CSS file is in the same folder

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="navbar-title">DocLens</span>
      </div>
      <div className="navbar-links">
        <div className="profile-container" ref={dropdownRef}>
          <img
            src={profilepic}
            alt="Profile"
            className="profile-img"
            onClick={toggleDropdown}
            style={{ cursor: 'pointer' }}
          />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item">Profile</button>
              <button className="dropdown-item">Settings</button>
              <button className="dropdown-item logout-button">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
