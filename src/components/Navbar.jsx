import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // ✅ USE CONTEXT

const Navbar = () => {
  const { user, logout } = useAuth(); // Get user state
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <span className="bg-blue-600 text-white p-1 rounded-lg text-lg">IWP</span>
            <span>InternshipWithPutul</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
            <Link to="/internships" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Internships</Link>
            <Link to="/jobs" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Jobs</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</Link>

            {/* DYNAMIC AUTH BUTTONS */}
            {user ? (
              <div className="flex items-center gap-4 ml-4">
                {/* Show Admin Dashboard link if user is Admin */}
                {user.role === 'ADMIN' && (
                  <Link 
                    to="/admin/dashboard" 
                    className="text-blue-600 font-bold border border-blue-100 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout} 
                  className="text-red-500 hover:text-red-700 flex items-center gap-2 font-medium"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3 ml-4">
                <Link to="/login" className="px-5 py-2 text-blue-600 font-bold border border-blue-600 rounded-full hover:bg-blue-50 transition-all">
                  Login
                </Link>
                <Link to="/signup" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 shadow-md transition-all">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none text-2xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">Home</Link>
            <Link to="/internships" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">Internships</Link>
            <Link to="/jobs" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">Jobs</Link>
            
            <div className="border-t border-gray-100 my-2"></div>

            {user ? (
              <>
                {user.role === 'ADMIN' && (
                  <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-blue-600 font-bold">
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-3 text-red-500 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3 mt-4">
                <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-3 border border-blue-600 text-blue-600 rounded-lg font-bold">
                  Login
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-lg font-bold">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;