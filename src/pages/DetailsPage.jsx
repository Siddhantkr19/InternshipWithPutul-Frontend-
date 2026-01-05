import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaBuilding, FaMoneyBillWave, FaClock, FaBell, FaUserPlus } from 'react-icons/fa';
// Import Dummy Data
import { DUMMY_INTERNSHIPS, DUMMY_JOBS } from '../data/dummyData';

const API_URL = import.meta.env.VITE_API_URL;

const DetailsPage = () => {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- FORCE GUEST MODE (For Testing UI) ---
  const isLoggedIn = false; 

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const endpoint = type === 'job' ? 'jobs' : 'internships';
        const response = await axios.get(`${API_URL}/api/${endpoint}`);
        
        let foundItem = Array.isArray(response.data) 
          ? response.data.find(item => item.id.toString() === id)
          : null;

        if (!foundItem) {
          const dummySource = type === 'job' ? DUMMY_JOBS : DUMMY_INTERNSHIPS;
          foundItem = dummySource.find(item => item.id.toString() === id);
        }
          
        setData(foundItem);
      } catch (error) {
        // Fallback to dummy data if API fails
        const dummySource = type === 'job' ? DUMMY_JOBS : DUMMY_INTERNSHIPS;
        const foundItem = dummySource.find(item => item.id.toString() === id);
        setData(foundItem);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [type, id]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading details...</div>;
  if (!data) return <div className="h-screen flex items-center justify-center">Opportunity not found.</div>;

  const isJob = type === 'job';

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header Banner */}
        <div className={`p-8 text-white ${isJob ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'}`}>
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{data.role}</h1>
          <p className="text-xl opacity-90">{data.companyName}</p>
        </div>

        {/* Main Content */}
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Job Details */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Overview</h3>
              <ul className="space-y-3">
                <li className="flex justify-between"><span className="text-gray-600">Role:</span><span className="font-medium">{data.role}</span></li>
                <li className="flex justify-between"><span className="text-gray-600">Location:</span><span className="font-medium">{data.location}</span></li>
                <li className="flex justify-between"><span className="text-gray-600">Duration:</span><span className="font-medium">{data.duration || 'Full Time'}</span></li>
                <li className="flex justify-between"><span className="text-gray-600">Pay:</span><span className="font-medium text-green-600">{isJob ? data.salary : data.stipend}</span></li>
              </ul>
            </div>

            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <h3 className="text-2xl font-bold text-gray-900">Description</h3>
              <p>{data.description || "Exciting opportunity for freshers to kickstart their career with a leading organization."}</p>

              <h3 className="text-xl font-bold text-gray-900 mt-6">Eligibility</h3>
              <p>{data.eligibility}</p>
            </div>

            <div className="mt-8">
              <a href={data.applyLink} target="_blank" rel="noopener noreferrer" className={`block w-full text-center py-4 rounded-lg text-white font-bold text-lg shadow-lg transform hover:-translate-y-1 transition-all ${isJob ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                Apply Here &rarr;
              </a>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="md:col-span-1">
             <div className="sticky top-24 space-y-6">
                
                {/* 1. Summary Box */}
                <div className="p-6 border rounded-xl shadow-sm bg-white">
                   <h4 className="font-bold text-gray-900 mb-4">Summary</h4>
                   <div className="space-y-4 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FaBuilding /></div>
                        <div><p className="text-gray-500 text-xs">Company</p><p className="font-semibold">{data.companyName}</p></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg"><FaMoneyBillWave /></div>
                        <div><p className="text-gray-500 text-xs">{isJob ? 'Package' : 'Stipend'}</p><p className="font-semibold">{isJob ? data.salary : data.stipend}</p></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-50 text-red-600 rounded-lg"><FaClock /></div>
                        <div><p className="text-gray-500 text-xs">Apply By</p><p className="font-semibold">{data.lastDateToApply}</p></div>
                      </div>
                   </div>
                </div>

                {/* 2. NOTIFICATION ALERT (The Blue Circle Area) */}
                {!isLoggedIn && (
                  <div className="p-6 rounded-xl shadow-md bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 text-center relative overflow-hidden">
                    {/* Decorative Circle Background */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>

                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-blue-600 text-xl">
                        <FaBell className="animate-swing" />
                      </div>
                      
                      <h4 className="font-bold text-gray-800 mb-2">Never Miss an Update!</h4>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        Get instant email alerts for new {isJob ? 'jobs' : 'internships'} matching your skills.
                      </p>
                      
                      <button 
                        onClick={() => navigate('/signup')}
                        className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2 text-sm"
                      >
                        <FaUserPlus /> Enable Alerts
                      </button>
                      
                      <p className="text-xs text-gray-400 mt-2">Free for students & freshers</p>
                    </div>
                  </div>
                )}

             </div>
          </div>

        </div>
      </div>
      
      {/* Simple CSS animation for the bell icon */}
      <style>{`
        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-10deg); }
          60% { transform: rotate(5deg); }
          80% { transform: rotate(-5deg); }
        }
        .animate-swing {
          animation: swing 2s infinite ease-in-out;
          transform-origin: top center;
        }
      `}</style>
    </div>
  );
};

export default DetailsPage;