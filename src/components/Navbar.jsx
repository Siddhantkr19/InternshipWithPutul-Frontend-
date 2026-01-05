import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaCode } from 'react-icons/fa';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation(); 

  const toggleNav = () => setNav(!nav);

  const links = [
    { id: 1, path: '/', text: 'Home' },
    { id: 2, path: '/internships', text: 'Internships' },
    { id: 3, path: '/jobs', text: 'Jobs' },
    { id: 4, path: '/about', text: 'About' },
    { id: 5, path: '/contact', text: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600";

  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-white/90 backdrop-blur-md z-50 shadow-sm border-b border-gray-100">
      <div className="flex justify-between items-center w-full h-full max-w-7xl mx-auto px-4 md:px-8">
        
        <Link to="/" className="flex items-center gap-2">
          <FaCode className="text-3xl text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Internship<span className="text-blue-600">WithPutul</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center">
          {links.map(({ id, path, text }) => (
            <li key={id}>
              <Link to={path} className={`${isActive(path)} font-medium transition-colors duration-200`}>
                {text}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <button className="px-5 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:-translate-y-0.5">
              Signup
            </button>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div onClick={toggleNav} className="cursor-pointer pr-4 z-10 text-gray-600 md:hidden">
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        {/* Mobile Dropdown */}
        {nav && (
          <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-white text-gray-800 md:hidden z-40">
            {links.map(({ id, path, text }) => (
              <li key={id} className="px-4 cursor-pointer capitalize py-4 text-2xl">
                <Link onClick={() => setNav(false)} to={path}>{text}</Link>
              </li>
            ))}
            <li className="mt-8 flex flex-col gap-4 w-full px-12">
               <Link to="/login" onClick={() => setNav(false)}>
                 <button className="w-full py-3 border border-blue-600 text-blue-600 font-bold rounded-lg text-xl">Login</button>
               </Link>
               <Link to="/signup" onClick={() => setNav(false)}>
                 <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg text-xl shadow-lg">Signup</button>
               </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;