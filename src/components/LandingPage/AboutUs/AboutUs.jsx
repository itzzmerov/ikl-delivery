import React from 'react';
import logo from '../../../images/logo.png';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const AboutUs = () => {
    return (
        <section className="bg-white p-8 md:text-left flex flex-col md:flex-row justify-center items-center" id="about">
            <div className='flex flex-col md:flex-row justify-center items-center w-[90%] mt-16'>
                <img src={logo} alt="About Logo" className="w-[40%] mb-4 md:mb-0 md:mr-6" />
                <div className='w-[50%] flex flex-col gap-5'>
                    <h2 className="text-[32px] font-bold font-Montserrat">ABOUT US</h2>
                    <h2 className="text-[72px] leading-[85px] font-bold font-Montserrat">IPAMALIHOG KAY LOLO</h2>
                    <p className='text-[17px]'>We are a trusted delivery service provider based in Mati City, Davao Oriental. We specialize in bringing essentials and goods right to your doorstep with a focus on convenience, reliability, and community care.</p>
                    <button className="mt-4 border-[#181818] border-[3px] hover:bg-[#181818] hover:text-white w-[40%] px-6 py-2 rounded-full font-Montserrat text-[18px] font-semibold  flex items-center justify-center gap-1"><MenuBookIcon /> Learn More</button>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;