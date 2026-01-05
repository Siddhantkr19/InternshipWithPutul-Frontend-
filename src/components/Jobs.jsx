import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InternshipCard from './InternshipCard';

const API_URL = import.meta.env.VITE_API_URL;

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/jobs`);
        
        // SAFETY CHECK: Ensure we got an array, not HTML or null
        if (Array.isArray(response.data)) {
          setJobs(response.data);
        } else {
          console.error("API Error: Expected array but got:", response.data);
          setJobs([]); // Fallback to empty list
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError("Failed to load jobs.");
        setJobs([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div id="jobs" className="w-full py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Freshers <span className="text-orange-500">Jobs</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Full-time opportunities to launch your career.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : error ? (
           <div className="text-center py-4">
            <p className="text-red-500">{error}</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-xl">No job openings right now. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map(job => (
              <InternshipCard key={job.id} data={job} type="job" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;