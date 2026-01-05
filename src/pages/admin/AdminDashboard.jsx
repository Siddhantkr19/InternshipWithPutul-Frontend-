import React from 'react';
import { Outlet } from 'react-router-dom';

// UPDATED IMPORTS: Point to the new 'components/admin' folder
import Sidebar from '../../components/admin/Sidebar';       
import AdminNavbar from '../../components/admin/AdminNavbar'; 

const AdminDashboard = ({ username, onLogout, theme, toggleTheme }) => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* Sidebar (Fixed Left) */}
      <Sidebar /> 

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Top Navbar */}
        <AdminNavbar 
          username={username || "Admin"} 
          onLogout={onLogout} 
          theme={theme}
          toggleTheme={toggleTheme}
        />
        
        {/* Main Content Area */}
        <main className="w-full flex-grow p-6">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;