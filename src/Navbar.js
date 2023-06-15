import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Navbar.css'; // Import the CSS file for Navbar styles

const Navbar = ({ isAuthenticated, logoutUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/" className="navbar-link">Dashboard</Link>
        </li>
        {isAuthenticated ? (
          <li>
            <button onClick={handleLogout} className="navbar-link">Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" className="navbar-link">Login</Link>
            </li>
            <li>
              <Link to="/register" className="navbar-link">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
