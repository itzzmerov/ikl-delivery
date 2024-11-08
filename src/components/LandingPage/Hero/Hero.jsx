import React from 'react';
import riderHero from '../../../images/rider-hero.svg';

const Hero = () => {
    return (
        <section className="bg-lightGreen text-white pb-56 flex justify-center" id='home'>
            <div className='p-8 text-center md:text-left flex flex-col md:flex-row justify-center items-center gap-6 w-[85%] mt-12'>
                <div className="space-y-4 flex flex-col items-center md:items-start gap-5">
                    <h1 className="text-[48px] md:text-[64px] font-bold font-Montserrat text-darkBlack leading-[60px] md:leading-[80px]">Fast & Reliable Deliveries at Your Doorstep</h1>
                    <p className='leading-[30px] text-[18px]'>Experience quick, hassle-free delivery with our app. Whether it's groceries, essentials, or your favorite meals, we've got you covered—delivered straight to you in no time. Download the app and start enjoying seamless delivery today!</p>
                    <button className="bg-darkBlack hover:bg-lightBlack font-Montserrat text-lightWhite px-6 py-3 w-[200px] rounded-full">Shop Now</button>
                </div>
                <img src={riderHero} alt="Delivery" className="w-full md:w-[35%] mt-6 md:mt-0" />
            </div>

        </section>
    );
};

export default Hero;