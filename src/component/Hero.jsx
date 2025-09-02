import React from 'react';
import '../styleComponents/Hero.css'; // We will create this CSS file next
import profileImage from '../assets/profile-placeholder.png'; // We'll add a placeholder image
import { TypeAnimation } from 'react-type-animation';
const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-image-container">
        <img 
          src={profileImage} 
          alt="Developer portrait" 
          className="hero-image" 
        />
      </div>
      <div className="hero-text-container">
       {/* <h1 className="hero-title">
          Master Your Skills
        </h1> */}
    <TypeAnimation
          sequence={[
            // Pauses for 2 seconds
            'Master Your Skills , Find Your Perfect Role',
            2000, // Pauses for 2 seconds
            'Master Your Skills , Start Your Tech Career',
            2000,
             // Pauses for 2 seconds
            'Master Your Skills , Land Your Dream Internship',
            2000, // Pauses for 2 seconds
          ]}
          wrapper="h1" // Use an h1 tag for the text
          speed={50} // Typing speed
          className="hero-title" // Apply your existing CSS class
          repeat={Infinity} // Loop the animation infinitely
        />
        <p className="hero-subtitle">
          Stop just learning—start building. Gain the real-world experience that matters by connecting with exclusive internship opportunities in the tech industry.
        </p>
        <button className="hero-button">
          Explore Internships
        </button>
      </div>
    </section>
  );
};

export default Hero;