import React from 'react';
import riderHero from '../../../images/rider-hero.svg';

const Hero = () => {
    return (
        <section className="bg-[#61AD4E] text-white pb-52 p-8 text-center md:text-left flex flex-col md:flex-row justify-center items-center">
            <div className="md:w-1/2 space-y-4 flex flex-col gap-5">
                <h1 className="text-[64px] font-bold text-black leading-[80px]">Fast & Reliable Deliveries at Your Doorstep</h1>
                <p className='leading-[30px]'>Experience quick, hassle-free delivery with our app. Whether it's groceries, essentials, or your favorite meals, we've got you covered—delivered straight to you in no time. Download the app and start enjoying seamless delivery today!</p>
                <button className="bg-black text-white px-6 py-2 w-[200px] rounded-full">Shop Now</button>
            </div>
            <img src={riderHero} alt="Delivery" className="w-full md:w-[35%] mt-6 md:mt-0" />
        </section>
    );
};

export default Hero;