import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InternshipCard from '../components/InternshipCard';
import { DUMMY_INTERNSHIPS } from '../data/dummyData';
import { FaSearch } from 'react-icons/fa'; // Import Icon

const API_URL = import.meta.env.VITE_API_URL;

const InternshipListing = () => {
  const [internships, setInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // 1. Search State
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/api/internships`)
      .then(res => {
        const data = Array.isArray(res.data) && res.data.length > 0 ? res.data : DUMMY_INTERNSHIPS;
        setInternships(data);
      })
      .catch(() => setInternships(DUMMY_INTERNSHIPS))
      .finally(() => setLoading(false));
  }, []);

  // 2. Filter Logic
  const filteredInternships = internships.filter(item => 
    item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
           <h1 className="text-4xl font-bold text-blue-600 mb-2">All Internships</h1>
           <p className="text-gray-600 mb-8">Browse all available internship opportunities</p>
           
           {/* 3. Search Bar UI */}
           <div className="max-w-xl mx-auto relative">
             <FaSearch className="absolute top-4 left-4 text-gray-400" />
             <input 
               type="text"
               placeholder="Search by role, company, or location..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition-all"
             />
           </div>
        </div>
        
        {loading ? (
           <p className="text-center text-gray-500">Loading internships...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 4. Map the FILTERED list, not the full list */}
            {filteredInternships.length > 0 ? (
              filteredInternships.map(item => (
                <InternshipCard key={item.id} data={item} type="internship" />
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500 py-10">
                No internships found matching "{searchTerm}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipListing;