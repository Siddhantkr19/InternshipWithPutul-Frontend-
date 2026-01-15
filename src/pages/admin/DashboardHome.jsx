import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { FaBriefcase, FaUsers, FaEnvelope, FaLaptopCode } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import apiAdmin from '../../services/apiAdmin';

const DashboardHome = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    internships: 0,
    jobs: 0,
    users: 0,
    messages: 0
  });

  // Fetch Real Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [intRes, jobRes, userRes, msgRes] = await Promise.all([
          apiAdmin.get('/api/internships'),
          apiAdmin.get('/api/jobs'),
          apiAdmin.get('/api/management/users'),
          apiAdmin.get('/api/management/messages')
        ]);

        setStats({
          internships: Array.isArray(intRes.data) ? intRes.data.length : 0,
          jobs: Array.isArray(jobRes.data) ? jobRes.data.length : 0,
          users: Array.isArray(userRes.data) ? userRes.data.length : 0,
          messages: Array.isArray(msgRes.data) ? msgRes.data.length : 0
        });
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      }
    };
    fetchData();
  }, []);

  // Dummy Chart Data (You can replace this later if you have historical data)
  const chartData = [
    { name: 'Mon', visits: 4000, applications: 2400 },
    { name: 'Tue', visits: 3000, applications: 1398 },
    { name: 'Wed', visits: 2000, applications: 9800 },
    { name: 'Thu', visits: 2780, applications: 3908 },
    { name: 'Fri', visits: 1890, applications: 4800 },
    { name: 'Sat', visits: 2390, applications: 3800 },
    { name: 'Sun', visits: 3490, applications: 4300 },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50/50 min-h-full">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500">Real-time data from your platform.</p>
        </div>
        <div className="flex gap-3">
           {/* Add buttons here if needed */}
        </div>
      </div>

      {/* Stats Cards Row (REAL DATA) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Internships" value={stats.internships} icon={<FaLaptopCode />} color="bg-blue-500" />
        <StatCard title="Active Jobs" value={stats.jobs} icon={<FaBriefcase />} color="bg-orange-500" />
        <StatCard title="Total Users" value={stats.users} icon={<FaUsers />} color="bg-purple-500" />
        <StatCard title="Messages" value={stats.messages} icon={<FaEnvelope />} color="bg-pink-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Traffic Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <Area type="monotone" dataKey="visits" stroke="#8884d8" fillOpacity={1} fill="url(#colorVisits)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
           <div>
             <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
             <div className="space-y-3">
               
               {/* Fixed: Added onClick to navigate */}
               <button 
                 onClick={() => navigate('/admin/dashboard/internships')}
                 className="w-full text-left p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors flex items-center gap-3 cursor-pointer"
               >
                 <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><FaLaptopCode /></div>
                 <div>
                   <p className="font-bold text-gray-700">Post Internship</p>
                   <p className="text-xs text-gray-500">Create a new listing</p>
                 </div>
               </button>

               {/* Fixed: Added onClick to navigate */}
               <button 
                 onClick={() => navigate('/admin/dashboard/jobs')}
                 className="w-full text-left p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors flex items-center gap-3 cursor-pointer"
               >
                 <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><FaBriefcase /></div>
                 <div>
                   <p className="font-bold text-gray-700">Post Job</p>
                   <p className="text-xs text-gray-500">Full-time role</p>
                 </div>
               </button>

             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

// Helper Component
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
    </div>
    <div className={`p-4 rounded-xl text-white text-xl ${color}`}>
      {icon}
    </div>
  </div>
);

export default DashboardHome;