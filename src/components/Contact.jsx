import React, { useState } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post(`${API_URL}/api/contact`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div id="contact" className="w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-widest uppercase mb-2">Contact</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">Get In Touch</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Contact Info Card */}
          <div className="w-full md:w-1/3 bg-primary text-white p-8 rounded-2xl shadow-lg flex flex-col justify-between">
            <div>
              <h4 className="text-2xl font-bold mb-6">Let's Chat</h4>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Have a question about an internship? Want to collaborate? Drop me a message and I'll get back to you as soon as possible.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-xl opacity-80" />
                  <span>internshipwithputul@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-xl opacity-80" />
                  <span>India</span>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <FaPaperPlane className="text-2xl" />
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="w-full md:w-2/3 bg-white p-8 md:p-10 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Your Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="John Doe" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Your Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="john@example.com" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Message</label>
                <textarea 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  placeholder="How can I help you?" 
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-all transform hover:-translate-y-1"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="text-green-600 text-center font-medium animate-pulse">
                  Thank you! Your message has been sent.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-center font-medium">
                  Oops! Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;