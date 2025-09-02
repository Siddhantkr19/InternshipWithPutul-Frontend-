import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styleComponents/ManageUsers.css'; // Reuse the same CSS
const API_URL = import.meta.env.VITE_API_URL;
const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: '', password: '', role: 'USER' });
  const [message, setMessage] = useState('');
  
  const api = axios.create({
    baseURL: `${API_URL}/api/management`,
    headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
  });

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', formData);
      setMessage(`User '${formData.username}' created successfully!`);
      setFormData({ username: '', password: '', role: 'USER' }); // Reset form
      fetchUsers(); // Refresh user list
    } catch (error) {
      setMessage('Failed to create user. Username might already exist.');
      console.error('Failed to create user', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${id}`);
        fetchUsers(); // Refresh list
      } catch (error) {
        console.error('Failed to delete user', error);
      }
    }
  };

  return (
    <div className="management-container">
      <h1>Add / Manage Users</h1>
      
      {/* --- Add User Form --- */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <div className="form-buttons">
            <button type="submit">Add New User</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>

      {/* --- Existing Users Table --- */}
      <h2>Existing Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td data-label="ID">{user.id}</td>
              <td data-label="Username">{user.username}</td>
              <td data-label="Role">{user.role}</td>
              <td data-label="Actions">
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;