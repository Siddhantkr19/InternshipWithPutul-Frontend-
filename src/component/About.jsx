import React from 'react';
import { Element } from 'react-scroll'; // 1. Import Element
import '../styleComponents/About.css';
// import profileImage from '../assets/profile-placeholder.png';
import profileImage from '../assets/Putulphoto.jpg';
const About = () => {
  return (
    // 2. Wrap the section in an Element with a unique name
    <Element name="about" className="element">
      <section className="about-container">
        <div className="about-image-container">
          <img 
            src={profileImage} 
            alt="Our mission" 
            className="about-image" 
          />
        </div>
        <div className="about-text-container">
          <h2 className="about-title">About</h2>
          <div className="about-content">
            <p>
             Welcome! I'm Putul Kumari, a tech professional at Tech Mahindra. 
            </p>
            <p>
            I know that navigating the path to a successful tech career can be challenging, which is why I created this platform. My mission is to provide you with curated information on top-tier internships that build real-world skills and open doors. Let's find your next opportunity together.
            </p>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default About;
