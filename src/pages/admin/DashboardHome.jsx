import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { FaBriefcase, FaUsers, FaEnvelope, FaLaptopCode } from 'react-icons/fa';

// Dummy Data for the Graph (replace with API later)
const data = [
  { name: 'Mon', visits: 4000, applications: 2400 },
  { name: 'Tue', visits: 3000, applications: 1398 },
  { name: 'Wed', visits: 2000, applications: 9800 },
  { name: 'Thu', visits: 2780, applications: 3908 },
  { name: 'Fri', visits: 1890, applications: 4800 },
  { name: 'Sat', visits: 2390, applications: 3800 },
  { name: 'Sun', visits: 3490, applications: 4300 },
];

const StatCard = ({ title, value, icon, color, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
      <span className={`text-xs font-bold ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend > 0 ? '+' : ''}{trend}% from last week
      </span>
    </div>
    <div className={`p-4 rounded-xl text-white text-xl ${color}`}>
      {icon}
    </div>
  </div>
);

const DashboardHome = () => {
  return (
    <div className="p-6 space-y-8 bg-gray-50/50 min-h-full">
      
      {/* 1. Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50">
            Download Report
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90">
            + Add New Post
          </button>
        </div>
      </div>

      {/* 2. Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Internships" 
          value="124" 
          icon={<FaLaptopCode />} 
          color="bg-blue-500" 
          trend={12} 
        />
        <StatCard 
          title="Active Jobs" 
          value="45" 
          icon={<FaBriefcase />} 
          color="bg-orange-500" 
          trend={-5} 
        />
        <StatCard 
          title="Total Users" 
          value="1,294" 
          icon={<FaUsers />} 
          color="bg-purple-500" 
          trend={8} 
        />
        <StatCard 
          title="Unread Messages" 
          value="8" 
          icon={<FaEnvelope />} 
          color="bg-pink-500" 
          trend={2} 
        />
      </div>

      {/* 3. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart: Traffic Trends */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Traffic & Applications</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <Area type="monotone" dataKey="visits" stroke="#8884d8" fillOpacity={1} fill="url(#colorVisits)" />
                <Area type="monotone" dataKey="applications" stroke="#82ca9d" fillOpacity={1} fill="url(#colorApps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Panel: Quick Actions / Status */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
           <div>
             <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
             <div className="space-y-3">
               <button className="w-full text-left p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors flex items-center gap-3">
                 <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><FaLaptopCode /></div>
                 <div>
                   <p className="font-bold text-gray-700">Post Internship</p>
                   <p className="text-xs text-gray-500">Create a new listing</p>
                 </div>
               </button>
               <button className="w-full text-left p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors flex items-center gap-3">
                 <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><FaBriefcase /></div>
                 <div>
                   <p className="font-bold text-gray-700">Post Job</p>
                   <p className="text-xs text-gray-500">Full-time role</p>
                 </div>
               </button>
             </div>
           </div>

           <div className="mt-8 bg-gray-900 rounded-2xl p-6 text-white relative overflow-hidden">
             <div className="relative z-10">
               <p className="text-gray-400 text-sm mb-1">Server Status</p>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                 <h3 className="text-xl font-bold">System Online</h3>
               </div>
               <p className="text-xs text-gray-500 mt-2">Latency: 24ms</p>
             </div>
             {/* Decorative circle */}
             <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full"></div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;