import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InternshipForm from '../component/InternshipForm.jsx';
import '../styleComponents/Manageinternship.css'; // Use the new stylesheet
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
        fetchInternships(); // Refresh list
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
      fetchInternships(); // Refresh list
      setIsFormVisible(false);
      setEditingInternship(null);
    } catch (error) {
      console.error('Failed to save internship', error);
    }
  };

  const handleEditClick = (internship) => {
    setEditingInternship(internship);
    setIsFormVisible(true);
  };
  
  const handleAddNewClick = () => {
    setEditingInternship(null);
    setIsFormVisible(true);
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setEditingInternship(null);
  };

  return (
    <div className="management-container">
      <h1>Manage Internships</h1>
      {!isFormVisible ? (
         <button onClick={handleAddNewClick} className="add-new-btn">Add New Internship</button>
      ) : (
        <InternshipForm 
            onSubmit={handleFormSubmit} 
            initialData={editingInternship || {}}
            onCancel={handleCancelForm}
        />
      )}
      
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {internships.map(internship => (
            <tr key={internship.id}>
              {/* --- ADD data-label ATTRIBUTES --- */}
              <td data-label="Company">{internship.companyName}</td>
              <td data-label="Role">{internship.role}</td>
              <td data-label="Location">{internship.location}</td>
              <td data-label="Actions">
                <button onClick={() => handleEditClick(internship)}>Edit</button>
                <button onClick={() => handleDelete(internship.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageInternships;