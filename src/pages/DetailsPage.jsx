import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'; // ✅ Consolidated imports
import { FaArrowLeft, FaBell, FaUserPlus, FaCheckCircle } from 'react-icons/fa';
import apiAdmin from '../services/apiAdmin'; 
import apiPublic from '../services/apiPublic'; 
import { DUMMY_INTERNSHIPS, DUMMY_JOBS } from '../data/dummyData';
import Toast from '../components/Toast'; 
import { useAuth } from '../context/AuthContext'; 

const DetailsPage = () => {
  const { user } = useAuth(); 
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [toast, setToast] = useState(null); 
  
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get the current page location

  const isJob = type === 'job';

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const endpoint = isJob ? 'jobs' : 'internships';
        const response = await apiPublic.get(`/api/${endpoint}`);
        
        let foundItem = Array.isArray(response.data) 
          ? response.data.find(item => item.id.toString() === id)
          : null;

        if (!foundItem) {
          const dummySource = isJob ? DUMMY_JOBS : DUMMY_INTERNSHIPS;
          foundItem = dummySource.find(item => item.id.toString() === id);
        }
        setData(foundItem);
      } catch (error) {
        const dummySource = isJob ? DUMMY_JOBS : DUMMY_INTERNSHIPS;
        setData(dummySource.find(item => item.id.toString() === id));
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [type, id, isJob]);

  // ✅ NEW: Apply Button click handler
  const handleApplyClick = (e) => {
    if (!user) {
      e.preventDefault(); // Stop the link from opening in a new tab
      // User is not logged in! Send them to Login, but remember THIS page.
      navigate('/login', { state: { from: location } });
    }
    // If they ARE logged in, we do nothing and let the <a> tag open normally.
  };

  // --- Smart Alert Handler ---
  const handleEnableAlerts = async () => {
    if (!user) {
      // ✅ Also remember location if they click "Enable Alerts" before logging in
      navigate(`/login`, { state: { from: location } }); 
      return;
    }

    setSubscribing(true);
    try {
      await apiAdmin.put('/user/preferences', { 
        [isJob ? 'notifyForJobs' : 'notifyForInternships']: true 
      });

      setIsSubscribed(true);
      setToast({ message: `Success! Alerts enabled for ${isJob ? 'Jobs' : 'Internships'}.`, type: 'success' });
      
    } catch (error) {
      console.error("Failed to subscribe", error);
      setToast({ message: "Failed to enable alerts. Please try again.", type: 'error' });
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!data) return <div className="h-screen flex items-center justify-center">Opportunity not found.</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Banner */}
        <div className={`p-8 text-white ${isJob ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'}`}>
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{data.role}</h1>
          <p className="text-xl opacity-90">{data.companyName}</p>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
             <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Overview</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between"><span className="text-gray-600">Location:</span><span className="font-medium">{data.location}</span></li>
                  <li className="flex justify-between"><span className="text-gray-600">Pay:</span><span className="font-medium text-green-600">{isJob ? data.salary : data.stipend}</span></li>
                  <li className="flex justify-between"><span className="text-gray-600">Last Date:</span><span className="font-medium text-red-500">{data.lastDateToApply}</span></li>
                </ul>
             </div>
             
             <div className="prose text-gray-700">
               <h3 className="text-xl font-bold">Description</h3>
               <p>{data.description || "Exciting opportunity for freshers."}</p>
               <h3 className="text-xl font-bold mt-4">Eligibility</h3>
               <p>{data.eligibility}</p>
             </div>

             {/* ✅ CONNECTED TO handleApplyClick */}
             <a 
               href={data.applyLink || data.postUrl} 
               target="_blank" 
               rel="noopener noreferrer" 
               onClick={handleApplyClick}
               className={`block w-full text-center py-4 rounded-lg text-white font-bold text-lg shadow-lg transition hover:opacity-90 ${isJob ? 'bg-orange-600' : 'bg-blue-600'}`}
             >
               Apply Now &rarr;
             </a>
          </div>

          <div className="md:col-span-1">
             <div className="sticky top-24 space-y-6">
                <div className="p-6 rounded-xl shadow-md bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 text-center relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-blue-600 text-xl">
                      {isSubscribed ? <FaCheckCircle className="text-green-500" /> : <FaBell className="animate-swing" />}
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">
                      {isSubscribed ? "Alerts Enabled!" : "Never Miss an Update!"}
                    </h4>
                    {!isSubscribed && (
                      <p className="text-sm text-gray-600 mb-4">
                        Get instant emails for new {isJob ? 'jobs' : 'internships'}.
                      </p>
                    )}
                    <button 
                      onClick={handleEnableAlerts}
                      disabled={subscribing || isSubscribed}
                      className={`w-full py-2.5 font-bold rounded-lg transition-all shadow-md flex items-center justify-center gap-2 text-sm ${
                        isSubscribed ? 'bg-green-500 text-white cursor-default' : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {subscribing ? 'Processing...' : isSubscribed ? 'Subscribed' : <><FaUserPlus /> Enable Alerts</>}
                    </button>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes swing { 0%,100%{transform:rotate(0deg);} 20%{transform:rotate(15deg);} 40%{transform:rotate(-10deg);} 60%{transform:rotate(5deg);} 80%{transform:rotate(-5deg);} }
        .animate-swing { animation: swing 2s infinite ease-in-out; transform-origin: top center; }
      `}</style>
    </div>
  );
};

export default DetailsPage;