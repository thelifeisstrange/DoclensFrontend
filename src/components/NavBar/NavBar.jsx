import logo from '../../assets/Logo/drdo_round_logo.jpg'; // Corrected relative path
import './NavBar.css'; // CSS file is in the same folder

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="navbar-title">DocLens</div>
      </div>
      <div className="navbar-links">
        <button className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default NavBar;