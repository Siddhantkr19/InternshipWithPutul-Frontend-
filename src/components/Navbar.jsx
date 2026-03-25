import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // ✅ Import Auth Context

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { user, logout } = useAuth(); // ✅ Get user state and logout function

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">IWP</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
          <Link to="/internships" className="text-gray-700 hover:text-blue-600 font-medium">Internships</Link>
          <Link to="/jobs" className="text-gray-700 hover:text-blue-600 font-medium">Jobs</Link>

          {/* ✅ CONDITIONAL RENDERING: Logged In vs Logged Out */}
          {user ? (
            <div className="relative group cursor-pointer flex items-center gap-2">
              <FaUserCircle className="text-3xl text-blue-600" />
              <span className="font-semibold text-gray-700">{user.email.split('@')[0]}</span>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl rounded-lg hidden group-hover:block border border-gray-100 overflow-hidden transition-all">
                {/* Show Dashboard link if they are an Admin */}
                {(user.role === 'ADMIN' || user.role === 'ROLE_ADMIN') && (
                  <Link to="/admin/dashboard" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b">
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={logout} 
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden">
          <button onClick={() => setNavOpen(!navOpen)} className="text-gray-700 text-2xl focus:outline-none">
            {navOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {navOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-3 shadow-inner">
          <Link to="/" onClick={() => setNavOpen(false)} className="block text-gray-700 hover:text-blue-600 font-medium py-2">Home</Link>
          <Link to="/internships" onClick={() => setNavOpen(false)} className="block text-gray-700 hover:text-blue-600 font-medium py-2">Internships</Link>
          <Link to="/jobs" onClick={() => setNavOpen(false)} className="block text-gray-700 hover:text-blue-600 font-medium py-2">Jobs</Link>
          
          {user ? (
             <div className="pt-4 border-t border-gray-100">
               <div className="flex items-center gap-2 mb-4 text-gray-700 font-semibold">
                  <FaUserCircle className="text-2xl text-blue-600" />
                  {user.email}
               </div>
               {(user.role === 'ADMIN' || user.role === 'ROLE_ADMIN') && (
                  <Link to="/admin/dashboard" className="block text-gray-700 py-2">Admin Dashboard</Link>
               )}
               <button onClick={() => { logout(); setNavOpen(false); }} className="w-full text-left py-2 text-red-600 font-medium flex items-center gap-2">
                 <FaSignOutAlt /> Logout
               </button>
             </div>
          ) : (
             <Link to="/login" onClick={() => setNavOpen(false)} className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg mt-4">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;