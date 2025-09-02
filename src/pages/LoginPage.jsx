import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styleComponents/login.css';
const API_URL = import.meta.env.VITE_API_URL;
const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
      onLoginSuccess(response.data.token);
      navigate('/admin/dashboard'); 
    } catch (error) {
      setMessage('Login failed!');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-wrapper">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <input 
              id="username"
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              autoComplete="username" 
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input 
              id="password"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              autoComplete="current-password" 
            />
          </div>
          <button type="submit">Login</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;