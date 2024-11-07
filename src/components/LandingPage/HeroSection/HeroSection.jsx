import React from 'react';
import heroImage from '../../../images/rider-hero.svg';

const HeroSection = () => {
    return (
        <section className="bg-[#61AD4E] p-8 flex flex-col md:flex-row justify-between items-center text-white">
            <div className="max-w-lg">
                <h2 className="text-3xl font-bold">Fast & Reliable Deliveries at Your Doorstep</h2>
                <p className="mt-4">
                    Experience quick, hassle-free delivery with our app. Whether it’s groceries, essentials, or your favorite meals, we’ve got you covered.
                </p>
                <button className="mt-6 bg-black px-6 py-2 rounded">Shop Now!</button>
            </div>
            <img src={heroImage} alt="Hero Rider" className="h-64 mt-8 md:mt-0" />
        </section>
    );
};

export default HeroSection;