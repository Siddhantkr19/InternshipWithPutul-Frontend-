import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InternshipCard from '../components/InternshipCard';
import apiPublic from '../services/apiPublic';
// 1. Import Dummy Data and Icon
import { DUMMY_JOBS } from '../data/dummyData';
import { FaSearch } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // 2. Search State
  const [loading, setLoading] = useState(true);

useEffect(() => {
    // UPDATED: Use apiPublic.get() instead of axios.get()
    // No need for `${API_URL}` anymore, it's inside apiPublic
    apiPublic.get('/api/jobs') 
      .then(res => {
        const data = Array.isArray(res.data) && res.data.length > 0 ? res.data : DUMMY_JOBS;
        setJobs(data);
      })
      .catch(() => setJobs(DUMMY_JOBS))
      .finally(() => setLoading(false));
  }, []);
  
  // 3. Filter Logic (Matches Role, Company, or Location)
  const filteredJobs = jobs.filter(item => 
    item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
           <h1 className="text-4xl font-bold text-gray-900 mb-2">
             Freshers <span className="text-orange-500">Jobs</span>
           </h1>
           <p className="text-gray-600 mb-8">Browse all available full-time roles</p>

           {/* 4. Search Bar UI */}
           <div className="max-w-xl mx-auto relative">
             <FaSearch className="absolute top-4 left-4 text-gray-400" />
             <input 
               type="text"
               placeholder="Search by role, company, or location..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-sm transition-all"
             />
           </div>
        </div>
        
        {/* Grid Section */}
        {loading ? (
           <div className="flex justify-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
            {/* 5. Render Filtered List */}
            {filteredJobs.length > 0 ? (
              filteredJobs.map(item => (
                <InternshipCard key={item.id} data={item} type="job" />
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500 py-10">
                No jobs found matching "{searchTerm}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListing;