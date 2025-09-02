import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styleComponents/ManageMessage.css'; 
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
    <div className="management-container">
      <h1>Messages & Queries</h1>
      {/* --- This is the new grid layout structure --- */}
      <div className="message-grid-container">
        {/* Grid Header */}
        <div className="message-grid-header">
          <div>From</div>
          <div>Email</div>
          <div>Message</div>
          <div>Actions</div>
        </div>
        {/* Grid Body */}
        {messages.map(msg => (
          <div key={msg.id} className="message-grid-row">
            <div className="message-cell">{msg.name}</div>
            <div className="message-cell">{msg.email}</div>
            <div className="message-cell message-content">{msg.message}</div>
            <div className="message-cell message-actions">
              <a href={`mailto:${msg.email}`} className="reply-btn">Reply</a>
              <button onClick={() => handleDelete(msg.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMessages;