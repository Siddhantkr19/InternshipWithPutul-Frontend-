import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import InternshipCard from '../components/InternshipCard';
// 1. Import Dummy Data
import { DUMMY_INTERNSHIPS, DUMMY_JOBS } from '../data/dummyData';

const API_URL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [latestInternships, setLatestInternships] = useState([]);
  const [latestJobs, setLatestJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try fetching from API
        const intRes = await axios.get(`${API_URL}/api/internships`);
        const jobRes = await axios.get(`${API_URL}/api/jobs`); 
        
        // If API has data, use it. Otherwise use Dummy Data.
        // We slice(0, 3) to show only the Top 3 "Latest" items
        const liveInternships = Array.isArray(intRes.data) && intRes.data.length > 0 
          ? intRes.data 
          : DUMMY_INTERNSHIPS;
          
        const liveJobs = Array.isArray(jobRes.data) && jobRes.data.length > 0 
          ? jobRes.data 
          : DUMMY_JOBS;

        setLatestInternships(liveInternships.slice(0, 3));
        setLatestJobs(liveJobs.slice(0, 3));

      } catch (error) {
        console.warn("API failed, using dummy data", error);
        // Fallback on error
        setLatestInternships(DUMMY_INTERNSHIPS.slice(0, 3));
        setLatestJobs(DUMMY_JOBS.slice(0, 3));
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <Hero />
      
      {/* Latest Internships Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Latest Internships</h2>
            <p className="text-gray-600">Recent opportunities added</p>
          </div>
          <Link to="/internships" className="text-primary font-bold hover:underline">View All &rarr;</Link>
        </div>
        
        {/* Simple Grid Animation for "Rotation" feel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
          {latestInternships.map(item => (
            <InternshipCard key={item.id} data={item} type="internship" />
          ))}
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto bg-gray-50 rounded-3xl mb-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Freshers Jobs</h2>
            <p className="text-gray-600">Start your full-time career</p>
          </div>
          <Link to="/jobs" className="text-orange-500 font-bold hover:underline">View All &rarr;</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
          {latestJobs.map(item => (
            <InternshipCard key={item.id} data={item} type="job" />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;