import React, { useState } from 'react';
import axios from 'axios';
import { Element } from 'react-scroll'; // --- ADD THIS IMPORT ---
import '../styleComponents/contact.css';
const API_URL = import.meta.env.VITE_API_URL;
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/contact`, formData);
      setResponseMsg('Thank you! Your message has been sent.');
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (error) {
      setResponseMsg('Sorry, something went wrong. Please try again.');
    }
  };

  return (
    <Element name="contact" className="element">
      <div className="contact-page-container">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form-inner">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" required rows="6"></textarea>
          <button type="submit">Send Message</button>
        </form>
        {responseMsg && <p>{responseMsg}</p>}
      </div>
    </Element>
  );
};
export default Contact;