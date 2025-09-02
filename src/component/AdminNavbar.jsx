import React, { useState, useEffect } from 'react'; // 1. Add useState and useEffect
import { Link } from 'react-router-dom';
import axios from 'axios'; // 2. Import axios
import '../styleComponents/AdminNavbar.css';
import { FaSun, FaMoon, FaEye } from 'react-icons/fa'; // 3. Import the eye icon
const API_URL = import.meta.env.VITE_API_URL;
const AdminNavbar = ({ username, onLogout, theme, toggleTheme }) => {
  // 4. Add state to store the visitor count
  const [visitorCount, setVisitorCount] = useState(0);

  // 5. Add useEffect to fetch the count when the component loads
  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/visits`);
        setVisitorCount(response.data.count);
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
      }
    };
    fetchVisitorCount();
  }, []); // The empty array [] ensures this runs only once

  const handleLogoutClick = () => {
    onLogout();
    // navigate('/'); This logic is better handled in App.jsx
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-brand">
        <Link to="/admin/dashboard">Admin Panel</Link>
      </div>
      <div className="admin-navbar-links">
        <span className="navbar-username">Welcome, {username}</span>
        
        {/* The onClick now directly calls the prop */}
        <button onClick={onLogout} className="logout-button">Logout</button>
        
        {/* --- 6. ADD THE VISITOR COUNTER HERE --- */}
        <div className="visitor-counter">
          <FaEye />
          <span>{visitorCount}</span>
        </div>

        <button onClick={toggleTheme} className="theme-toggle-button">
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;

