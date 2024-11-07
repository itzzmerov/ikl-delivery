import React from 'react';
import downloadImg from '../../../images/download-img.png';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import DownloadIcon from '@mui/icons-material/Download';

const ContactUs = () => (
    <section className="bg-[#181818] text-white -center md:text-left flex items-center justify-center" id="contact">
        <div className='p-8 text flex flex-col md:flex-row items-center justify-center w-[85%] my-16'>
            <div className="space-y-4 w-[50%] p-8 flex flex-col gap-2">
                <h2 className="text-[48px] font-Montserrat font-bold">CONTACT US</h2>
                <p className="text-[24px] font-Montserrat flex items-center gap-3 ml-6"><PhoneAndroidIcon /> +63 912 3456 789</p>
                <p className="text-[24px] font-Montserrat flex items-center gap-3 ml-6"><PhoneIcon /> (087) 811 0077</p>
                <p className="text-[24px] font-Montserrat flex items-center gap-3 ml-6"><FacebookOutlinedIcon /> @IpamalihogKayLolo</p>
                <p className="text-[24px] font-Montserrat flex items-center gap-3 ml-6"><FmdGoodIcon /> Mati City, Davao Oriental</p>
            </div>
            <div className="mt-4 md:ml-6 w-[40%] flex flex-col justify-center items-center gap-2 p-10">
                <img src={downloadImg} alt="Download App" className="w-[200px] h-[200px]" />
                <p className='text-center text-[22px] font-Montserrat'>Download our Mobile App</p>
                <p className='text-center text-[14px]'>Efficient and dependable delivery solutions for every need in Mati City, Davao Oriental.</p>
                <button className="bg-[#61AD4E] hover:bg-[#226710] text-white text-[16px] font-Montserrat px-4 py-3 rounded-full mt-2"><DownloadIcon /> Download from Play Store</button>
            </div>
        </div>

    </section>
);

export default ContactUs;