import React, { useState, useEffect } from 'react'; // Make sure useEffect is imported

const InternshipForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    stipend: '',
    location: '',
    duration: '',
    eligibility: '',
    applyLink: '',
    lastDateToApply: '',
  });

  // --- ADD THIS useEffect HOOK ---
  // This hook syncs the form's state with the data passed in for editing.
  useEffect(() => {
    if (initialData.id) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* ... all your input fields remain the same ... */}
        <input name="companyName" value={formData.companyName || ''} onChange={handleChange} placeholder="Company Name" required />
        <input name="role" value={formData.role || ''} onChange={handleChange} placeholder="Role" required />
        <input name="stipend" value={formData.stipend || ''} onChange={handleChange} placeholder="Stipend" required />
        <input name="location" value={formData.location || ''} onChange={handleChange} placeholder="Location" required />
        <input name="duration" value={formData.duration || ''} onChange={handleChange} placeholder="Duration" required />
        <input name="eligibility" value={formData.eligibility || ''} onChange={handleChange} placeholder="Eligibility" required />
        <input name="applyLink" value={formData.applyLink || ''} onChange={handleChange} placeholder="Apply Link" required />
        <input type="date" name="lastDateToApply" value={formData.lastDateToApply || ''} onChange={handleChange} required />
        <div className="form-buttons">
          <button type="submit">{initialData.id ? 'Update' : 'Create'}</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default InternshipForm;