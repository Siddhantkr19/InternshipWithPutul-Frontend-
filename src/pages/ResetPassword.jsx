import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import apiPublic from '../services/apiPublic'; 
import { FaLock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); 
  const navigate = useNavigate();

  // State for both password fields
  const [passwords, setPasswords] = useState({ 
    newPassword: '', 
    confirmPassword: '' 
  });
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // 1. Validation: Check if passwords match
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // 2. Validation: Check length (optional safety)
    if (passwords.newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      // 3. API Call
      await apiPublic.post('/auth/reset-password', { 
        token: token, 
        newPassword: passwords.newPassword 
      });

      setMessage('Password reset successful! Redirecting to login...');
      
      // Redirect after 2 seconds
      setTimeout(() => navigate('/login'), 2000);
      
    } catch (err) {
      console.error("Reset Error:", err);
      setError(err.response?.data?.message || 'Failed to reset password. The link may be expired.');
    } finally {
      setLoading(false);
    }
  };

  // If no token is found in the URL
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-red-100">
           <FaExclamationCircle className="mx-auto text-4xl text-red-500 mb-4" />
           <h2 className="text-xl font-bold text-gray-800">Invalid Link</h2>
           <p className="text-gray-600 mt-2">This password reset link is invalid or missing.</p>
           <button 
             onClick={() => navigate('/login')}
             className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
           >
             Go to Login
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaLock className="text-2xl text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-slate-500 mt-1">Enter your new secure password below.</p>
        </div>

        {/* Feedback Messages */}
        {message && (
          <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 flex items-center gap-3 border border-green-200">
            <FaCheckCircle className="flex-shrink-0" /> 
            <span className="text-sm font-medium">{message}</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-3 border border-red-200">
            <FaExclamationCircle className="flex-shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* New Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">New Password</label>
            <div className="relative">
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handleChange}
                required
                className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400 text-gray-800"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full pl-4 pr-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 outline-none transition-all placeholder-gray-400 text-gray-800 ${
                  passwords.confirmPassword && passwords.newPassword !== passwords.confirmPassword 
                    ? 'border-red-300 focus:ring-red-200' 
                    : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'
                }`}
                placeholder="••••••••"
              />
            </div>
            {passwords.confirmPassword && passwords.newPassword !== passwords.confirmPassword && (
               <p className="text-xs text-red-500 mt-1 ml-1">Passwords do not match</p>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              'Set New Password'
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default ResetPassword;