import React from 'react';
// You can use the same image or a different one for the About section
import profileImage from '../assets/Putulphoto.jpg'; 

const About = () => {
  return (
    <div id="about" className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-16">
        
        {/* Image Side */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="absolute top-4 left-4 w-full h-full border-4 border-primary rounded-2xl z-0"></div>
            <img 
              src={profileImage} 
              alt="Putul Kumari" 
              className="relative z-10 w-full max-w-md rounded-2xl shadow-xl" 
            />
          </div>
        </div>

        {/* Text Side */}
        <div className="w-full md:w-1/2">
          <h2 className="text-primary font-bold tracking-widest uppercase mb-2">About Me</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Bridging the Gap Between <br />
            <span className="text-primary">Talent & Opportunity</span>
          </h3>
          
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>
              Welcome! I'm <span className="font-bold text-gray-800">Putul Kumari</span>, a tech professional at Tech Mahindra.
            </p>
            <p>
              I know that navigating the path to a successful tech career can be challenging. That is exactly why I created this platform. My mission is simple: to provide you with curated, top-tier internships and job openings that build real-world skills.
            </p>
            <p>
              Whether you are a student looking for your first break or a fresh graduate seeking a full-time role, let's find your next opportunity together.
            </p>
          </div>

          <div className="mt-8 flex gap-8">
            <div>
              <h4 className="text-4xl font-bold text-primary">500+</h4>
              <p className="text-gray-500 text-sm">Opportunities Posted</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-primary">1k+</h4>
              <p className="text-gray-500 text-sm">Community Members</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
