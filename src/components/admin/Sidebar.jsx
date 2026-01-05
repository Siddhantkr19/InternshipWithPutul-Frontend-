import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBriefcase, FaUsers, FaEnvelope, FaBuilding } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-full shadow-xl transition-all duration-300">
      
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-center border-b border-slate-800">
        <h2 className="text-xl font-bold tracking-wider">
          Admin<span className="text-blue-500">Panel</span>
        </h2>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        <NavItem to="/admin/dashboard" icon={<FaHome />} label="Overview" end />
        <NavItem to="/admin/dashboard/internships" icon={<FaBuilding />} label="Internships" />
        <NavItem to="/admin/dashboard/jobs" icon={<FaBriefcase />} label="Jobs" />
        <NavItem to="/admin/dashboard/users" icon={<FaUsers />} label="Users" />
        <NavItem to="/admin/dashboard/messages" icon={<FaEnvelope />} label="Messages" />
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-800 text-center">
        <p className="text-xs text-slate-500">v2.0.0 Pro Dashboard</p>
      </div>
    </aside>
  );
};

// Helper Component for cleaner code
const NavItem = ({ to, icon, label, end }) => (
  <NavLink 
    to={to} 
    end={end}
    className={({ isActive }) => 
      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
        isActive 
          ? "bg-blue-600 text-white shadow-lg translate-x-1" 
          : "text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1"
      }`
    }
  >
    <span className="text-xl">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;