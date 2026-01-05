import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <FaExclamationTriangle className="text-6xl text-orange-500 mb-6" />
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Oops! The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link to="/">
        <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;