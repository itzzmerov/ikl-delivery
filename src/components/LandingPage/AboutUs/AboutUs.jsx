import React from 'react';
import logo from '../../../images/logo.png';

const AboutUs = () => {
    return (
        <section className="bg-white p-8 text-center md:text-left flex flex-col md:flex-row justify-center items-center" id="about">
            <img src={logo} alt="About Logo" className="w-[30%] mb-4 md:mb-0 md:mr-6" />
            <div>
                <h2 className="text-2xl font-bold">IPAMALIHOG KAY LOLO</h2>
                <p>We are a trusted delivery service provider based in Mati City, Davao Oriental. Our focus is on convenience, reliability, and community care.</p>
                <button className="mt-4 border border-black px-6 py-2 rounded">Learn More</button>
            </div>
        </section>
    );
};

export default AboutUs;