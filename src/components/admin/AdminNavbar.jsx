import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSun, FaMoon, FaEye, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'; // ✅ Import Context

const API_URL = import.meta.env.VITE_API_URL;

const AdminNavbar = ({ theme, toggleTheme }) => {
  const { user, logout } = useAuth(); // ✅ Get user & logout from Context
  const [visitorCount, setVisitorCount] = useState(0);
  const navigate = useNavigate();

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
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Extract a display name from email (e.g., "siddhant" from "siddhant@gmail.com")
  const displayName = user?.email ? user.email.split('@')[0] : "Admin";

  return (
    <nav className="sticky top-0 z-50 w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center">
        <Link to="/admin/dashboard" className="text-xl font-bold text-blue-600 tracking-tight flex items-center gap-2">
          ADMIN <span className="text-gray-800">PANEL</span>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        {/* Visitor Counter */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-gray-600 text-sm border border-gray-200">
          <FaEye className="text-blue-600" />
          <span className="font-semibold">{visitorCount} Visits</span>
        </div>

        <span className="hidden md:block text-sm font-medium text-gray-600">
          Welcome, <span className="text-gray-900 font-bold capitalize">{displayName}</span>
        </span>
        
        <div className="h-6 w-[1px] bg-gray-200 mx-2 hidden md:block"></div>

        {/* Theme Toggle (Optional, keeps functionality if you use it) */}
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 text-sm font-bold rounded-lg hover:bg-red-100 transition-colors"
        >
          <FaSignOutAlt />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;