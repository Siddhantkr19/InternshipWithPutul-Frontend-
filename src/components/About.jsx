import React from 'react';
// Ensure the image exists at this path
import profileImage from '../assets/Putulphoto.jpg'; 

const About = () => {
  return (
    <div id="about" className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-16">
        
        {/* Image Side - CHANGED TO CIRCLE */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative">
            {/* Optional: Subtle blue glow behind the circle */}
            <div className="absolute -inset-3 bg-blue-100 rounded-full blur-xl opacity-50"></div>
            
            <img 
              src={profileImage} 
              alt="Putul Kumari" 
              className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-blue-600 shadow-2xl" 
            />
          </div>
        </div>

        {/* Text Side */}
        <div className="w-full md:w-1/2">
          <h2 className="text-blue-600 font-bold tracking-widest uppercase mb-2 text-sm">About Me</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            Bridging the Gap Between <br />
            <span className="text-blue-600">Talent & Opportunity</span>
          </h3>
          
          <div className="text-gray-600 leading-relaxed space-y-4 text-lg">
            <p>
              Welcome! I'm <span className="font-bold text-gray-800">Putul Kumari</span>, a tech professional at <span className="font-semibold text-blue-800">Tech Mahindra</span>.
            </p>
            <p>
              I know that navigating the path to a successful tech career can be challenging. That is exactly why I created this platform. My mission is simple: to provide you with curated, top-tier internships and job openings that build real-world skills.
            </p>
            <p>
              Whether you are a student looking for your first break or a fresh graduate seeking a full-time role, let's find your next opportunity together.
            </p>
          </div>

          {/* Stats Row */}
          <div className="mt-10 flex gap-12 border-t border-gray-100 pt-8">
            <div>
              <h4 className="text-4xl font-bold text-blue-600">500+</h4>
              <p className="text-gray-500 text-sm font-medium mt-1">Opportunities Posted</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-blue-600">1k+</h4>
              <p className="text-gray-500 text-sm font-medium mt-1">Community Members</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;