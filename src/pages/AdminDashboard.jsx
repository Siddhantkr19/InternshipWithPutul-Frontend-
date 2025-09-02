
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../component/Sidebar.jsx';
import AdminNavbar from '../component/AdminNavbar.jsx';
import '../styleComponents/AdminDashboard.css';

const AdminDashboard = ({ username, onLogout, theme, toggleTheme }) => {
  return (
    <div className="admin-layout">
      <AdminNavbar 
        username={username}
        onLogout={onLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div className="admin-main-content">
        <Sidebar />
        <main className="admin-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

