import React from 'react';
import downloadImg from '../../../images/download-img.png';

const ContactUs = () => (
    <section className="bg-[#181818] text-white p-8 text-center md:text-left flex flex-col md:flex-row items-center" id="contact">
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">CONTACT US</h2>
            <p>📞 +63 912 3456 789</p>
            <p>☎️ (087) 811 0077</p>
            <p>📍 Mati City, Davao Oriental</p>
        </div>
        <div className="mt-4 md:ml-6">
            <img src={downloadImg} alt="Download App" className="w-24 h-24" />
            <button className="bg-green-500 text-white px-4 py-2 rounded mt-2">Download from Play Store</button>
        </div>
    </section>
);

export default ContactUs;