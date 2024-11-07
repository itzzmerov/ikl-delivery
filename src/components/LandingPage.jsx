import React from 'react'
import NavBar from './LandingPage/NavBar/NavBar';
import HeroSection from './LandingPage/Hero/Hero';
import FeaturedServices from './LandingPage/FeaturedServices/FeaturedServices';
import AboutSection from './LandingPage/AboutUs/AboutUs';
import Services from './LandingPage/OurServices/Services';
import ContactUs from './LandingPage/ContactUs/ContactUs';
import Footer from './LandingPage/Footer/Footer';

const LandingPage = () => {
    return (
        <div className="pt-[96px] bg-[#61AD4E]">
            <NavBar />
            <HeroSection />
            <FeaturedServices />
            <AboutSection />
            <Services />
            <ContactUs />
            <Footer />
        </div>
    )
}

export default LandingPage;