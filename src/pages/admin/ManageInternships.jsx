import React, { useState, useEffect } from 'react';
import InternshipForm from '../../components/InternshipForm'; 
import apiAdmin from '../../services/apiAdmin';
import Toast from '../../components/Toast'; // Import Toast
import { FaLaptopCode, FaSpinner } from 'react-icons/fa';

const ManageInternships = () => {
  const [internships, setInternships] = useState([]);
  const [editingInternship, setEditingInternship] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null); // Toast State

  const fetchInternships = async () => {
    setLoading(true);
    try {
      const response = await apiAdmin.get('/api/internships');
      setInternships(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch internships", error);
      setInternships([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this internship?')) {
      try {
        await apiAdmin.delete(`/api/internships/${id}`);
        fetchInternships();
        setToast({ message: 'Internship deleted successfully!', type: 'success' });
      } catch (error) {
        console.error('Failed to delete internship', error);
        setToast({ message: 'Failed to delete internship.', type: 'error' });
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingInternship) {
        await apiAdmin.put(`/api/internships/${editingInternship.id}`, formData);
        setToast({ message: 'Internship updated successfully!', type: 'success' });
      } else {
        await apiAdmin.post('/api/internships', formData);
        setToast({ message: 'Internship created successfully!', type: 'success' });
      }
      fetchInternships();
      setIsFormVisible(false);
      setEditingInternship(null);
    } catch (error) {
      console.error('Failed to save internship', error);
      setToast({ message: 'Failed to save internship.', type: 'error' });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <FaLaptopCode className="text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manage Internships</h1>
            <p className="text-gray-500 text-sm">Add or edit internship listings.</p>
          </div>
        </div>

        {!isFormVisible && (
           <button 
             onClick={() => { setEditingInternship(null); setIsFormVisible(true); }} 
             className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
           >
             + Add Internship
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
          {loading ? (
             <div className="p-10 flex justify-center items-center text-gray-500 gap-3">
               <FaSpinner className="animate-spin" /> Loading internships...
             </div>
          ) : (
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
                  {internships.map(intern => (
                    <tr key={intern.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-gray-800 font-medium">{intern.companyName}</td>
                      <td className="p-4 text-gray-600">{intern.role}</td>
                      <td className="p-4 text-gray-600">{intern.location}</td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <button 
                          onClick={() => { setEditingInternship(intern); setIsFormVisible(true); }}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium text-sm transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(intern.id)}
                          className="px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 font-medium text-sm transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {internships.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-gray-400 italic">No internships found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageInternships;