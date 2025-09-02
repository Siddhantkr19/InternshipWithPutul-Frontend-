import React from 'react';
import { Link } from 'react-scroll'; // 1. Import Link from 'react-scroll'
import "../styleComponents/Navbar.css";
import { FaSun, FaMoon } from 'react-icons/fa';

// Note: isLoggedIn, username, and onLogout are removed for this simplified scrollable homepage
// We can add them back when connecting to the separate login page.
const Navbar = ({ theme, toggleTheme }) => {

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* This link scrolls to the top of the page */}
        <Link to="home" smooth={true} duration={500} offset={-70}>
          InternshipWithPutul
        </Link>
      </div>
      <div className="navbar-links">
        {/* 2. These are now scroll links */}
         <Link to="internships" smooth={true} duration={500} offset={-70} spy={true} activeClass="active">
          Latest Internship
        </Link>
        <Link to="about" smooth={true} duration={500} offset={-70} spy={true} activeClass="active">
          About
        </Link>
       
       <Link 
  to="contact"   smooth={true}  duration={500} offset={-70}   spy={true}   activeClass="active">
  Contact Me
</Link>
        
        {/* 3. The Login button is a regular link because it will go to a different page */}
        <a href="/login" className="login-button">Login</a>

         <button onClick={toggleTheme} className="theme-toggle-button">
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;