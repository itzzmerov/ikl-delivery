import React from 'react';
import logo from '../../../images/logo.png';

const AboutSection = () => {
    return (
        <section id="about" className="bg-white p-8 text-center">
            <img src={logo} alt="Company Logo" className="mx-auto h-24 w-24" />
            <h2 className="text-3xl font-bold mt-4">IPAMALIHOG KAY LOLO</h2>
            <p className="mt-4 max-w-xl mx-auto">
                We are a trusted delivery service provider based in Mati City, Davao Oriental. We specialize in bringing essentials and goods right to your doorstep with a focus on convenience, reliability, and community care.
            </p>
            <button className="mt-6 bg-gray-800 text-white px-6 py-2 rounded">Learn More</button>
        </section>
    );
};

export default AboutSection;