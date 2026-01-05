import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import { FaArrowRight } from 'react-icons/fa';
import profileImage from '../assets/Putulphoto.jpg'; // Ensure this matches your file name exactly

const Hero = () => {
  return (
    <div id="home" className="w-full min-h-screen bg-gray-50 flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
          <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-4 uppercase tracking-wider">
            Build Your Future
          </h2>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Master Your Skills, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              <TypeAnimation
                sequence={[
                  'Find Perfect Roles',
                  2000,
                  'Start Tech Career',
                  2000,
                  'Land Internships',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
            Stop just learning—start building. Gain the real-world experience that matters by connecting with exclusive internship opportunities in the tech industry.
          </p>

          <Link 
            to="internships" 
            smooth={true} 
            duration={500} 
            offset={-80}
            className="group relative px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center gap-3"
          >
            Explore Internships
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Image Content */}
        <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
          <div className="relative">
            {/* Decorative Blue Blur Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-30 animate-pulse"></div>
            
            <img 
              src={profileImage} 
              alt="Putul Kumari" 
              className="relative w-64 h-64 md:w-96 md:h-96 rounded-full object-cover border-4 border-white shadow-2xl" 
            />
            
            {/* Floating Badge (Optional) */}
            <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-bounce-slow">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-sm font-bold text-gray-700">Open to Work</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;