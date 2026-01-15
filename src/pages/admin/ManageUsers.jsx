import React, { useState, useEffect } from 'react';
import apiAdmin from '../../services/apiAdmin';
import Toast from '../../components/Toast'; // Import Toast
import { FaUsers, FaTrash, FaSpinner, FaUserShield, FaUser } from 'react-icons/fa';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null); // Toast State

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await apiAdmin.get('/api/management/users');
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This cannot be undone.')) {
      try {
        await apiAdmin.delete(`/api/management/users/${id}`);
        fetchUsers();
        // ✅ Show Success Toast
        setToast({ message: 'User deleted successfully!', type: 'success' });
      } catch (error) {
        console.error('Failed to delete user', error);
        // ❌ Show Error Toast
        setToast({ message: 'Failed to delete user.', type: 'error' });
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
          <FaUsers className="text-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500 text-sm">View and manage registered accounts.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
           <div className="p-10 flex justify-center items-center text-gray-500 gap-3">
             <FaSpinner className="animate-spin" /> Loading users...
           </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold">Username</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Role</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-800 flex items-center gap-2">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs ${user.role === 'ADMIN' ? 'bg-indigo-500' : 'bg-gray-400'}`}>
                         {user.username.charAt(0).toUpperCase()}
                       </div>
                       {user.username}
                    </td>
                    <td className="p-4 text-gray-600">{user.email}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role === 'ADMIN' ? <FaUserShield /> : <FaUser />}
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete User"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-400 italic">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;