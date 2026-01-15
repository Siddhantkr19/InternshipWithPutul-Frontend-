import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaChartPie, FaBriefcase, FaLaptopCode, FaUsers, FaEnvelope, FaSignOutAlt 
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'; // ✅ USE CONTEXT

const Sidebar = () => {
  const { logout } = useAuth(); // Get logout function

  const menuItems = [
    { path: '/admin/dashboard', name: 'Overview', icon: <FaChartPie /> },
    { path: '/admin/dashboard/internships', name: 'Internships', icon: <FaLaptopCode /> },
    { path: '/admin/dashboard/jobs', name: 'Jobs', icon: <FaBriefcase /> },
    { path: '/admin/dashboard/users', name: 'Users', icon: <FaUsers /> },
    { path: '/admin/dashboard/messages', name: 'Messages', icon: <FaEnvelope /> },
  ];

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0 z-10">
      
      {/* Header */}
      <div className="h-16 flex items-center justify-center border-b border-gray-100">
        <h1 className="text-2xl font-bold text-blue-600 tracking-wide">ADMIN<span className="text-gray-400">PANEL</span></h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={logout} // ✅ Calls context logout
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;