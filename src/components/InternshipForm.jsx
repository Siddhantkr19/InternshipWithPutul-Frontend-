import React, { useState, useEffect } from 'react';

const InternshipForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    stipend: '', // logic: acts as 'salary' for jobs
    location: '',
    duration: '',
    eligibility: '',
    applyLink: '',
    lastDateToApply: '',
  });

  useEffect(() => {
    if (initialData.id) {
      // Map initial data to form state
      // Note: If reusing for jobs, ensure backend fields map correctly (salary -> stipend in this form state if shared)
      setFormData({
          ...initialData,
          stipend: initialData.stipend || initialData.salary || '' // Handle both cases if sharing form
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // When submitting, if this is a Job, the backend expects 'salary', but form uses 'stipend'.
    // The parent component (ManageJobs) usually handles the API, but typically we just send the state.
    // If your backend for Jobs expects "salary", ensure ManageJobs maps it or the form handles it.
    // For now, assuming your backend accepts the payload as is or you adjusted the DTOs.
    onSubmit(formData);
  };

  const inputClass = "w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Company</label>
            <input name="companyName" value={formData.companyName || ''} onChange={handleChange} placeholder="Google, Amazon..." required className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Role</label>
            <input name="role" value={formData.role || ''} onChange={handleChange} placeholder="SDE-1, Intern..." required className={inputClass} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Pay / Stipend</label>
            <input name="stipend" value={formData.stipend || ''} onChange={handleChange} placeholder="₹50k/mo or ₹12 LPA" required className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Location</label>
            <input name="location" value={formData.location || ''} onChange={handleChange} placeholder="Bangalore, Remote..." required className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Duration</label>
            <input name="duration" value={formData.duration || ''} onChange={handleChange} placeholder="6 Months / Full Time" required className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Eligibility</label>
            <input name="eligibility" value={formData.eligibility || ''} onChange={handleChange} placeholder="B.Tech 2025, BCA..." required className={inputClass} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Apply Link</label>
          <input name="applyLink" value={formData.applyLink || ''} onChange={handleChange} placeholder="https://careers.company.com..." required className={inputClass} />
      </div>
      
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Last Date to Apply</label>
        
        {/* 🛑 UPDATED: Changed type="date" to type="text" to accept strings like "ASAP" */}
        <input 
            type="text" 
            name="lastDateToApply" 
            value={formData.lastDateToApply || ''} 
            onChange={handleChange} 
            placeholder="e.g. 31 Dec 2026 or ASAP" 
            required 
            className={inputClass} 
        />
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