import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';

const InternshipCard = ({ data, type = 'internship' }) => {
  const isJob = type === 'job';
  const moneyLabel = isJob ? data.salary : data.stipend;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full group">
      <div className={`h-2 w-full ${isJob ? 'bg-orange-500' : 'bg-primary'}`}></div>
      
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-primary transition-colors">
          {data.role}
        </h3>
        <p className="text-sm font-semibold text-gray-500 mb-4">{data.companyName}</p>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-400"/> {data.location}
          </div>
          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-green-500"/> {moneyLabel || 'Not Disclosed'}
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-400"/> {data.duration || 'Full Time'}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        {/* LINK TO THE DETAILS PAGE */}
        <Link 
          to={`/details/${type}/${data.id}`}
          className={`block w-full text-center py-2 rounded-lg font-bold text-white transition-all ${isJob ? 'bg-orange-500 hover:bg-orange-600' : 'bg-primary hover:bg-primary-hover'}`}
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default InternshipCard;