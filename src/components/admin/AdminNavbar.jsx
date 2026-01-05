import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSun, FaMoon, FaEye } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

const AdminNavbar = ({ username, onLogout, theme, toggleTheme }) => {
  const [visitorCount, setVisitorCount] = useState(0);

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

  return (
    <nav className="sticky top-0 z-50 w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center">
        <Link to="/admin/dashboard" className="text-xl font-bold text-primary tracking-tight">
          Admin <span className="text-gray-800">Panel</span>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        {/* Visitor Counter */}
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-gray-600 text-sm">
          <FaEye className="text-primary" />
          <span className="font-semibold">{visitorCount}</span>
        </div>

        <span className="hidden md:block text-sm font-medium text-gray-600">
          Welcome, <span className="text-gray-900 font-bold">{username || "Admin"}</span>
        </span>
        
        <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>

        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        <button 
          onClick={onLogout} 
          className="px-4 py-2 bg-red-50 text-red-600 text-sm font-bold rounded-lg hover:bg-red-100 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;