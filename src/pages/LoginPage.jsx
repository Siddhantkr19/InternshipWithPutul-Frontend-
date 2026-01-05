import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock, FaUser, FaGoogle } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // --- TEMPORARY BYPASS FOR DEVELOPMENT ---
    // This allows you to enter the Admin Dashboard without a real backend API yet.
    // Uncomment the API call below when your backend is ready.
    
    setTimeout(() => {
        // 1. Set a dummy token to satisfy ProtectedRoute
        localStorage.setItem('jwtToken', 'dummy-dev-token-12345'); 
        localStorage.setItem('username', formData.username || 'Admin User');
        
        // 2. Redirect to Dashboard
        setLoading(false);
        navigate('/admin/dashboard');
    }, 1000); // Fake 1s delay to simulate loading

    /* // REAL API CALL (Uncomment later)
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, formData);
      localStorage.setItem('jwtToken', response.data.token);
      localStorage.setItem('username', formData.username);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error("Login Failed", err);
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
    */
  };

  const handleGoogleLogin = () => {
      alert("Google Login API will be integrated later!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-600 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to access your dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input */}
          <div className="relative">
            <FaUser className="absolute top-4 left-4 text-gray-400" />
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Username or Email" 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="relative">
                <FaLock className="absolute top-4 left-4 text-gray-400" />
                <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password" 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                />
            </div>
            {/* Forgot Password Link */}
            <div className="text-right mt-2">
      <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
    Forgot Password?
</Link>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-md disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Login'}
          </button>
        </form>

        <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Google Login Button */}
        <button 
            onClick={handleGoogleLogin}
            className="w-full py-3 border border-gray-300 bg-white text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
            <FaGoogle className="text-red-500" />
            Sign in with Google
        </button>

        <div className="mt-6 text-center">
           <span className="text-gray-500">Don't have an account? </span>
           <Link to="/signup" className="text-blue-600 font-bold hover:underline">
             Sign up
           </Link>
        </div>
        
        <div className="mt-4 text-center">
           <a href="/" className="text-sm text-gray-400 hover:text-gray-600">
             &larr; Back to Home
           </a>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;