import React from 'react';
import Hero from '../component/Hero.jsx';
import About from '../component/About.jsx';
import Internships from '../component/Internships.jsx';
import ContactPage from '../component/Contact.jsx';
import Footer from '../component/Footer.jsx';

const HomePage = () => {
  return (
    <>
      <Hero />
       <Internships />
      <About />
      <ContactPage/>
     <Footer/>
      
    </>
  );
};

export default HomePage;
