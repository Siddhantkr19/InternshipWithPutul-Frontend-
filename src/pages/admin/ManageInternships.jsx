import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InternshipForm from '../../components/InternshipForm'; 

const API_URL = import.meta.env.VITE_API_URL;

const ManageInternships = () => {
  const [internships, setInternships] = useState([]);
  const [editingInternship, setEditingInternship] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
  });

  const fetchInternships = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/internships`);
      setInternships(response.data);
    } catch (error) {
      console.error("Failed to fetch internships", error);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this internship?')) {
      try {
        await api.delete(`/internships/${id}`);
        fetchInternships(); 
      } catch (error) {
        console.error('Failed to delete internship', error);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingInternship) {
        await api.put(`/internships/${editingInternship.id}`, formData);
      } else {
        await api.post('/internships', formData);
      }
      fetchInternships();
      setIsFormVisible(false);
      setEditingInternship(null);
    } catch (error) {
      console.error('Failed to save internship', error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Manage Internships</h1>
        {!isFormVisible && (
           <button 
             onClick={() => { setEditingInternship(null); setIsFormVisible(true); }} 
             className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
           >
             + Add New Internship
           </button>
        )}
      </div>

      {isFormVisible ? (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-700">{editingInternship ? 'Edit Internship' : 'Create New Internship'}</h2>
          <InternshipForm 
              onSubmit={handleFormSubmit} 
              initialData={editingInternship || {}}
              onCancel={() => { setIsFormVisible(false); setEditingInternship(null); }}
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
                {internships.map(internship => (
                  <tr key={internship.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-800 font-medium">{internship.companyName}</td>
                    <td className="p-4 text-gray-600">{internship.role}</td>
                    <td className="p-4 text-gray-600">{internship.location}</td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => { setEditingInternship(internship); setIsFormVisible(true); }}
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium text-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(internship.id)}
                        className="px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 font-medium text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {internships.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500">No internships found.</td>
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

export default ManageInternships;