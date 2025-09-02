import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InternshipCard from './InternshipCard.jsx';
import '../styleComponents/Internships.css';
import { Element } from 'react-scroll';
const API_URL = import.meta.env.VITE_API_URL;
const Internships = ({ title = "Latest Internships" }) => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        // Check for a token in local storage
        const token = localStorage.getItem('jwtToken');
        
        // Create a config object for Axios
        const config = {};

        // If a token exists, add it to the Authorization header
        if (token) {
          config.headers = {
            'Authorization': `Bearer ${token}`
          };
        }

        // Make the single API request using the config object
        const response = await axios.get(`${API_URL}/api/internships`, config);
        
        setInternships(response.data);
      } catch (error) {
        console.error("Failed to fetch internships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  if (loading) {
     return <div className="loading-message">Loading internships please wait...</div>;
  }
   if (internships.length === 0) {
    return (
      <Element name="internships" className="element">
        <section className="internships-section">
          <h2 className="section-title">{title}</h2>
          <p className="no-internships-message">
            No current internships available. Please check back later!
          </p>
        </section>
      </Element>
    );
  }
  return (
     <Element name="internships" className="element">
    <section className="internships-section">
      <h2 className="section-title">{title}</h2>
      <div className="internships-container">
        {internships.map(internship => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>
    </section>
    </Element>
  );
};

export default Internships;