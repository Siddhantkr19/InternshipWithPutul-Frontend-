import React, { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

const Toast = ({ message, type = 'success', onClose }) => {
  // Auto-hide after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';

  return (
    <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl border-l-4 transition-all transform animate-fade-in-up ${
      isSuccess ? 'bg-white border-green-500 text-gray-800' : 'bg-white border-red-500 text-gray-800'
    }`}>
      {isSuccess ? (
        <FaCheckCircle className="text-green-500 text-xl" />
      ) : (
        <FaExclamationCircle className="text-red-500 text-xl" />
      )}
      
      <div>
        <h4 className="font-bold text-sm">{isSuccess ? 'Success' : 'Error'}</h4>
        <p className="text-sm text-gray-600">{message}</p>
      </div>

      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-4">
        <FaTimes />
      </button>
    </div>
  );
};

export default Toast;