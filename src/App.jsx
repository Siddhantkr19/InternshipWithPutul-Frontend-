import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation , useNavigate} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Import all pages and components
import Navbar from './component/Navbar.jsx';
import ProtectedRoute from './component/ProtectedRoute.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import About from './component/About.jsx';
import ContactPage from './component/Contact.jsx';
import InternshipsPage from './pages/InternshipsPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Internships from './component/Internships.jsx';
import ManageInternships from './pages/ManageInternships.jsx';
import ManageMessages from './pages/ManageMessages.jsx';
import ManageUsers from './pages/ManageUsers.jsx'; 
import axios from 'axios';

// A component to handle the layout and global state
const API_URL = import.meta.env.VITE_API_URL;
const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [theme, setTheme] = useState('dark');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    document.body.className = theme;
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.sub);
        setIsLoggedIn(true);
      } catch (error) {
        // Handle invalid token by logging out
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
        setUsername(null);
         navigate('/');
      }
    } else {
        setIsLoggedIn(false);
        setUsername(null);
    }
  }, [theme, location]); 

   useEffect(() => {
    const incrementVisitCount = async () => {
      // 1. Check if the user has already been counted in this session
      const hasVisited = sessionStorage.getItem('hasVisited');

      // 2. Only run the API call if the flag is NOT set
      if (!hasVisited) {
        try {
          await axios.post(`${API_URL}/api/visits`);
          console.log("Visitor count incremented for this session.");
          
          // 3. Set the flag in sessionStorage so it doesn't run again on refresh
          sessionStorage.setItem('hasVisited', 'true');
        } catch (error) {
          console.error("Failed to increment visit count:", error);
        }
      }
    };
    
    incrementVisitCount();
  }, []);// Re-check login status on location change

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  
  const handleLoginSuccess = (token) => {
    localStorage.setItem('jwtToken', token);
    const decodedToken = jwtDecode(token);
    setUsername(decodedToken.sub);
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    setUsername(null);
  };

  // Determine if the main public navbar should be shown
  const showMainNavbar = location.pathname.startsWith('/admin/dashboard') === false;

  return (
    <div className="App">
      {showMainNavbar && (
        <Navbar 
          theme={theme} 
          toggleTheme={toggleTheme}
          isLoggedIn={isLoggedIn}
          username={username}
          onLogout={handleLogout}
        />
      )}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          
          {/* Protected & Nested Admin Routes */}
         <Route 
    path="/admin/dashboard" 
    element={
      <ProtectedRoute>
        <AdminDashboard 
          username={username}
          onLogout={handleLogout}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </ProtectedRoute>
    }
  >
    {/* This makes ManageInternships the default page for /admin/dashboard */}
     <Route index element={<Internships title="Dashboard: All Internships" />} />
    
    {/* This is for the sidebar link to /admin/dashboard/internships */}
    <Route path="internships" element={<ManageInternships />} /> 
    
    {/* This is for the sidebar link to /admin/dashboard/messages */}
    <Route path="messages" element={<ManageMessages />} />
     <Route path="users" element={<ManageUsers />} />
  </Route>
        </Routes>
      </main>
    </div>
  );
};

// The main App component just sets up the Router
function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;