import React, { useState } from 'react';
import axios from 'axios';

// Receives isLoggedIn and onLoginSuccess as props

const AppContent = ({ isLoggedIn, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
      // Call the function passed down from App.jsx
      onLoginSuccess(response.data.token);
    } catch (error) {
      setMessage('Login failed!');
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          {/* Your login form JSX */}
          <h2>Login</h2>
           <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
          {message && <p>{message}</p>}
        </form>
      ) : (
        <div>
          <h1>Welcome to the Dashboard</h1>
          <p>You are logged in.</p>
        </div>
      )}
    </div>
  );
};

export default AppContent;