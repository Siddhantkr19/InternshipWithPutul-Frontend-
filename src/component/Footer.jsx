import React from 'react';
// 1. Import the icons you need from the library
import { FaTelegram, FaYoutube, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../styleComponents/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* 2. Add a new div for the social links */}
      <div className="footer-social-links">
        <a href="https://t.me/+dVKrUSiASsAyODc1" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
          <FaTelegram />
        </a>
        <a href="https://youtube.com/@internshipwithputul?si=Vb7kLuBcyO8_mItX" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <FaYoutube />
        </a>
        <a href="https://www.instagram.com/internship_with_putul?igsh=aGxjbGE2YXM2bW52" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://www.linkedin.com/in/putul-kumari-9332261a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
        <a href="mailto:internshipwithputul@gmail.com" aria-label="Email">
          <FaEnvelope />
        </a>
      </div>
      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} InternshipWithPutul. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;