import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if token exists in Local Storage
  const token = localStorage.getItem('jwtToken');

  // If token exists, allow access to child routes (Outlet)
  // If no token, redirect to /login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;