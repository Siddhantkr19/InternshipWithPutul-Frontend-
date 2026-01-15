import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useSearchParams } from 'react-router-dom'; // Added useSearchParams
import { FaUserPlus, FaUser, FaLock, FaEnvelope, FaBell } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

const SignupPage = () => {
  const [searchParams] = useSearchParams();
  const alertType = searchParams.get('alert'); // e.g. "JOB" or "INTERNSHIP"

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'USER', // Default to USER
    notifyForJobs: false,
    notifyForInternships: false
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Auto-select preference based on URL (Smart Intent)
  useEffect(() => {
    if (alertType === 'JOB') {
      setFormData(prev => ({ ...prev, notifyForJobs: true }));
    } else if (alertType === 'INTERNSHIP') {
      setFormData(prev => ({ ...prev, notifyForInternships: true }));
    }
  }, [alertType]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(`${API_URL}/api/auth/signup`, formData);
      alert('Account created! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error("Signup Failed", err);
      setError('Signup failed. Username or email might already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-primary mb-2">Create Account</h1>
          <p className="text-gray-500">Join to get personalized job alerts.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="relative">
            <FaUser className="absolute top-4 left-4 text-gray-400" />
            <input 
              type="text" name="username" value={formData.username} onChange={handleChange}
              required placeholder="Username" 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange}
              required placeholder="Email Address" 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-4 left-4 text-gray-400" />
            <input 
              type="password" name="password" value={formData.password} onChange={handleChange}
              required placeholder="Password" 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* CHECKBOXES - Notification Preferences */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2 text-blue-800 font-semibold">
              <FaBell /> Email Preferences
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="notifyForJobs"
                  checked={formData.notifyForJobs}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                />
                <span className="text-gray-700 text-sm">Notify me for <b>Jobs</b></span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="notifyForInternships"
                  checked={formData.notifyForInternships}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                />
                <span className="text-gray-700 text-sm">Notify me for <b>Internships</b></span>
              </label>
            </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? 'Creating...' : <><FaUserPlus /> Create Account</>}
          </button>
        </form>

        <div className="mt-6 text-center">
           <Link to="/login" className="text-sm text-gray-500 hover:text-primary transition-colors">
             Already have an account? <span className="font-bold">Log in</span>
           </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;