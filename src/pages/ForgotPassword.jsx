import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setMessage('');

    try {
      // API call to backend (will implement this in Java later)
      await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
      setStatus('success');
      setMessage(`If an account exists for ${email}, we have sent a reset link.`);
    } catch (error) {
      console.error("Forgot Password Error", error);
      // Even on error, it is safer to show a success message to prevent email enumeration
      setStatus('success');
      setMessage(`If an account exists for ${email}, we have sent a reset link.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaEnvelope className="text-2xl text-blue-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800 mb-2">Forgot Password?</h1>
          <p className="text-gray-500 text-sm">
            No worries! Enter your email and we will send you reset instructions.
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center">
             <div className="bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 mb-6">
                {message}
             </div>
             <p className="text-sm text-gray-500 mb-6">
               Please check your email inbox and spam folder.
             </p>
             <Link to="/login">
               <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all">
                 Return to Login
               </button>
             </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email" 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'sending'}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-md flex items-center justify-center gap-2"
            >
              {status === 'sending' ? 'Sending...' : <><FaPaperPlane /> Send Reset Link</>}
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
           <Link to="/login" className="text-sm text-gray-500 hover:text-gray-800 flex items-center justify-center gap-2 transition-colors">
             <FaArrowLeft size={12} /> Back to Login
           </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;