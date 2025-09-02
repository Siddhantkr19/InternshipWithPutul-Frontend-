import React from 'react';

const InternshipCard = ({ internship }) => {
  return (
    <div className="internship-card">
      <h2>{internship.role}</h2>
      <p><strong>Company Name:</strong>{internship.companyName}</p>
      <p><strong>Location:</strong> {internship.location}</p>
      <p><strong>Stipend:</strong> {internship.stipend}</p>
      <p><strong>Duration:</strong> {internship.duration}</p>
      <p><strong>Eligibility:</strong> {internship.eligibility}</p>
      <p><strong>Apply By:</strong> {internship.lastDateToApply}</p>
      <a href={internship.applyLink} target="_blank" rel="noopener noreferrer" className="apply-button">
        Apply Now
      </a>
    </div>
  );
};

export default InternshipCard;