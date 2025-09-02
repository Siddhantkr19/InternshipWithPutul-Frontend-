import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('jwtToken');

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    // Check if the user has the ADMIN role
    if (decodedToken.role !== 'ADMIN') {
      // If not an admin, redirect to homepage
      return <Navigate to="/" />;
    }
  } catch (error) {
    // If token is invalid, redirect to login
    return <Navigate to="/login" />;
  }

  // If token is valid and user is an admin, show the page content
  return children;
};

export default ProtectedRoute;