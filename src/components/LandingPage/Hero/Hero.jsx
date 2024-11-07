import React from 'react';
import riderHero from '../../../images/rider-hero.svg';

const Hero = () => {
    return (
        <section className="bg-[#61AD4E] text-white p-8 text-center md:text-left flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 space-y-4">
                <h1 className="text-4xl font-bold">Fast & Reliable Deliveries at Your Doorstep</h1>
                <p>Experience quick, hassle-free delivery with our app. Whether it’s groceries, essentials, or your favorite meals, we’ve got you covered.</p>
                <button className="bg-black text-white px-6 py-2 rounded">Shop Now</button>
            </div>
            <img src={riderHero} alt="Delivery" className="w-full md:w-[35%] mt-6 md:mt-0" />
        </section>
    );
};

export default Hero;