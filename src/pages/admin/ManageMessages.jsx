import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  
  const api = axios.create({
    baseURL: `${API_URL}/api/management`,
    headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
  });

  const fetchMessages = async () => {
    try {
      const response = await api.get('/messages');
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(`/messages/${id}`);
        fetchMessages();
      } catch (error) {
        console.error('Failed to delete message', error);
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Messages & Queries</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold w-1/4">From</th>
                <th className="p-4 font-semibold w-1/4">Email</th>
                <th className="p-4 font-semibold w-1/3">Message</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {messages.map(msg => (
                <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-800 font-medium">{msg.name}</td>
                  <td className="p-4 text-blue-600">{msg.email}</td>
                  <td className="p-4 text-gray-600 text-sm leading-relaxed">{msg.message}</td>
                  <td className="p-4 text-right space-x-2 whitespace-nowrap">
                    <a 
                      href={`mailto:${msg.email}`} 
                      className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium text-sm transition-colors inline-block"
                    >
                      Reply
                    </a>
                    <button 
                      onClick={() => handleDelete(msg.id)}
                      className="px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 font-medium text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">No messages found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageMessages;