import React, { useState, useEffect } from 'react';

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

  const inputClass = "w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="companyName" value={formData.companyName || ''} onChange={handleChange} placeholder="Company Name" required className={inputClass} />
        <input name="role" value={formData.role || ''} onChange={handleChange} placeholder="Role" required className={inputClass} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="stipend" value={formData.stipend || ''} onChange={handleChange} placeholder="Stipend / Salary" required className={inputClass} />
        <input name="location" value={formData.location || ''} onChange={handleChange} placeholder="Location" required className={inputClass} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="duration" value={formData.duration || ''} onChange={handleChange} placeholder="Duration" required className={inputClass} />
        <input name="eligibility" value={formData.eligibility || ''} onChange={handleChange} placeholder="Eligibility" required className={inputClass} />
      </div>

      <input name="applyLink" value={formData.applyLink || ''} onChange={handleChange} placeholder="Apply Link URL" required className={inputClass} />
      
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500 font-medium ml-1">Last Date to Apply</label>
        <input type="date" name="lastDateToApply" value={formData.lastDateToApply || ''} onChange={handleChange} required className={inputClass} />
      </div>

      <div className="flex gap-4 pt-4">
        <button 
          type="submit" 
          className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          {initialData.id ? 'Update Listing' : 'Create Listing'}
        </button>
        <button 
          type="button" 
          onClick={onCancel}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default InternshipForm;