import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts & Guards
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute'; 

// Public Pages
import HomePage from './pages/HomePage';
import InternshipListing from './pages/InternshipListing';
import JobListing from './pages/JobListing';
import DetailsPage from './pages/DetailsPage';
import About from './components/About';
import Contact from './components/Contact';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'; 
import ForgotPassword from './pages/ForgotPassword';


// Admin Components
import AdminDashboard from './pages/admin/AdminDashboard'; 
import DashboardHome from './pages/admin/DashboardHome';
import ManageInternships from './pages/admin/ManageInternships';
import ManageJobs from './pages/admin/ManageJobs';
import ManageUsers from './pages/admin/ManageUsers';
import ManageMessages from './pages/admin/ManageMessages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<><Navbar /><div className="pt-20"><HomePage /><Footer /></div></>} />
        <Route path="/internships" element={<><Navbar /><div className="pt-20"><InternshipListing /><Footer /></div></>} />
        <Route path="/jobs" element={<><Navbar /><div className="pt-20"><JobListing /><Footer /></div></>} />
        <Route path="/details/:type/:id" element={<><Navbar /><div className="pt-20"><DetailsPage /><Footer /></div></>} />
        <Route path="/about" element={<><Navbar /><div className="pt-20"><About /><Footer /></div></>} />
        <Route path="/contact" element={<><Navbar /><div className="pt-20"><Contact /><Footer /></div></>} />

        {/* AUTH ROUTES */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="*" element={<NotFound />} />

        {/* ================= ADMIN ROUTES (PROTECTED) ================= */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />}>
             <Route path="dashboard" element={<DashboardHome />} />
             <Route path="dashboard/internships" element={<ManageInternships />} />
             <Route path="dashboard/jobs" element={<ManageJobs />} />
             <Route path="dashboard/users" element={<ManageUsers />} />
             <Route path="dashboard/messages" element={<ManageMessages />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;