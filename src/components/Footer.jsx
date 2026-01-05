import React from 'react';
import { Link } from 'react-router-dom';
import { FaTelegram, FaYoutube, FaInstagram, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between gap-8">
        
        {/* Brand */}
        <div>
            <div className="flex items-center gap-2 mb-4">
            <FaCode className="text-2xl text-primary" />
            <span className="text-xl font-bold tracking-tight">
                Internship<span className="text-primary">WithPutul</span>
            </span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
                Your daily source for the best internships and freshers' jobs.
            </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
            <h3 className="font-bold text-white mb-2">Quick Links</h3>
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link to="/internships" className="text-gray-400 hover:text-white transition-colors">Internships</Link>
            <Link to="/jobs" className="text-gray-400 hover:text-white transition-colors">Jobs</Link>
            <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Social Links */}
        <div>
            <h3 className="font-bold text-white mb-4">Connect With Me</h3>
            <div className="flex gap-6">
            <a href="https://t.me/+dVKrUSiASsAyODc1" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-colors text-xl"><FaTelegram /></a>
            <a href="https://youtube.com/@internshipwithputul" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-red-500 transition-colors text-xl"><FaYoutube /></a>
            <a href="https://instagram.com/internship_with_putul" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors text-xl"><FaInstagram /></a>
            <a href="https://linkedin.com/in/putul-kumari" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors text-xl"><FaLinkedin /></a>
            <a href="mailto:internshipwithputul@gmail.com" className="text-gray-400 hover:text-white transition-colors text-xl"><FaEnvelope /></a>
            </div>
        </div>

      </div>
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-800 pt-6">
          &copy; {currentYear} InternshipWithPutul. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;