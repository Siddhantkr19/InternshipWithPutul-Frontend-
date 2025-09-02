import React from 'react';
import Internships from '../component/Internships.jsx';

const DashboardHome = () => {
  return (
    <div>
      <h1>Welcome to the Admin Dashboard</h1>
      <p>Here is a view of all current internship postings.</p>
      <hr style={{ margin: '2rem 0' }} />

      {/* Pass a custom title */}
      <Internships title="Current Internship Postings" />
    </div>
  );
};

export default DashboardHome;