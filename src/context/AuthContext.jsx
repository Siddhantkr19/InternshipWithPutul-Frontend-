import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Run: npm install jwt-decode
import axios from 'axios';

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Check for existing login on refresh
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // We now expect 'sub' to be the EMAIL because of the backend fix above
        setUser({ 
          email: decoded.sub, 
          role: decoded.role,
          token: token 
        });
      } catch (e) {
        console.error("Invalid token", e);
        localStorage.removeItem('jwtToken');
      }
    }
    setLoading(false);
  }, []);

  // 2. Login Function
  const login = async (email, password) => {
    // Note: Backend DTO expects "username" field, so we map email -> username
    const response = await axios.post(`${API_URL}/api/auth/login`, { 
      username: email, 
      password 
    });
    
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    
    const decoded = jwtDecode(token);
    setUser({ 
      email: decoded.sub, 
      role: decoded.role,
      token: token 
    });
    
    return true;
  };

  // 3. Logout Function
  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);