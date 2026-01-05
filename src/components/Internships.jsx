import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InternshipCard from './InternshipCard';

const API_URL = import.meta.env.VITE_API_URL;

const Internships = () => {
  // Initialize as an empty array to prevent crashes
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/internships`);
        
        // SAFETY CHECK: Ensure the response data is actually an array
        if (Array.isArray(response.data)) {
          setInternships(response.data);
        } else {
          console.error("API Error: Expected an array but got:", response.data);
          setInternships([]); // Fallback to empty array
        }
      } catch (err) {
        console.error("Failed to fetch internships:", err);
        setError("Failed to load internships.");
        setInternships([]); // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  return (
    <div id="internships" className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Latest Internships
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kickstart your career with these hand-picked opportunities.
          </p>
        </div>

        {/* Content Logic */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
           <div className="text-center py-10 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : internships.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-xl">No current internships available. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internships.map(internship => (
              <InternshipCard key={internship.id} data={internship} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Internships;