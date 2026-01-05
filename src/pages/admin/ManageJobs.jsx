import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Correct import path for the component
import InternshipForm from '../../components/InternshipForm'; 

const API_URL = import.meta.env.VITE_API_URL;

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
  });

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/jobs`);
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await api.delete(`/jobs/${id}`);
        fetchJobs(); 
      } catch (error) {
        console.error('Failed to delete job', error);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingJob) {
        await api.put(`/jobs/${editingJob.id}`, formData);
      } else {
        await api.post('/jobs', formData);
      }
      fetchJobs();
      setIsFormVisible(false);
      setEditingJob(null);
    } catch (error) {
      console.error('Failed to save job', error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Manage Full-Time Jobs</h1>
        {!isFormVisible && (
           <button 
             onClick={() => { setEditingJob(null); setIsFormVisible(true); }} 
             className="bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm"
           >
             + Add New Job
           </button>
        )}
      </div>

      {isFormVisible ? (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-700">{editingJob ? 'Edit Job' : 'Create New Job'}</h2>
          <InternshipForm 
              onSubmit={handleFormSubmit} 
              initialData={editingJob || {}}
              onCancel={() => { setIsFormVisible(false); setEditingJob(null); }}
          />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold">Company</th>
                  <th className="p-4 font-semibold">Role</th>
                  <th className="p-4 font-semibold">Location</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jobs.map(job => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-800 font-medium">{job.companyName}</td>
                    <td className="p-4 text-gray-600">{job.role}</td>
                    <td className="p-4 text-gray-600">{job.location}</td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => { setEditingJob(job); setIsFormVisible(true); }}
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium text-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(job.id)}
                        className="px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 font-medium text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {jobs.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500">No jobs found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;