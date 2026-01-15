import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaExclamationCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // ✅ Use Context

const LoginPage = () => {
  const { login } = useAuth(); // Get login function
  const [formData, setFormData] = useState({ email: '', password: '' });
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

    try {
      // ✅ Use Context Login (Handles Token & User State)
      await login(formData.email, formData.password);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error("Login Error", err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-600 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in with your email</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center border border-red-200 flex items-center justify-center gap-2">
            <FaExclamationCircle /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL INPUT */}
          <div className="relative">
            <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email Address" 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
            />
          </div>

          {/* PASSWORD INPUT */}
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

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md disabled:opacity-70"
          >
            {loading ? 'Signing In...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
           <Link to="/signup" className="text-blue-600 font-bold hover:underline">
             Create an Account
           </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;