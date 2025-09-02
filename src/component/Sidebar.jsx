import React from 'react';
import { Link } from 'react-router-dom';
import '../styleComponents/Sidebar.css'; // We'll create this


const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/dashboard/internships">Manage Internships</Link></li>
          <li><Link to="/admin/dashboard/messages">Messages & Queries</Link></li>
           <li><Link to="/admin/dashboard/users">Add User</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;