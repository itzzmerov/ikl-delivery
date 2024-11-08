import React from 'react';
import logo from '../../../images/logo.png';

const Footer = () => (
    <footer className="bg-white p-8">
        <div className="w-[85%] mx-auto flex flex-col md:flex-row md:justify-between gap-8 text-center md:text-left p-2">
            {/* Logo and Title Section */}
            <div className="flex flex-col items-center space-y-2">
                <img src={logo} alt="Logo" className="w-48 h-48" />
                <h2 className="text-[26px] font-bold font-Montserrat text-center">IPAMALIHOG <br />KAY LOLO</h2>
            </div>

            {/* Services and About Section */}
            <div className="flex flex-col md:flex-row gap-12">
                <div>
                    <h3 className="font-semibold font-Montserrat mb-3">Services</h3>
                    <ul className="space-y-2">
                        <li><a href="#food-delivery" className="hover:text-[#226710]">Food Delivery</a></li>
                        <li><a href="#pera-padala" className="hover:text-[#226710]">Pera Padala</a></li>
                        <li><a href="#pamalengke" className="hover:text-[#226710]">Pamalengke</a></li>
                        <li><a href="#bill-payments" className="hover:text-[#226710]">Bill Payments</a></li>
                        <li><a href="#hatid-sundo" className="hover:text-[#226710]">Hatid Sundo</a></li>
                        <li><a href="#parcel-pickup" className="hover:text-[#226710]">Parcel Pick-up</a></li>
                        <li><a href="#special-deliveries" className="hover:text-[#226710]">Special Deliveries</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold font-Montserrat mb-3">About IKL</h3>
                    <ul className="space-y-2">
                        <li><a href="#about" className="hover:text-[#226710]">About IKL</a></li>
                        <li><a href="#history" className="hover:text-[#226710]">History</a></li>
                        <li><a href="#contact" className="hover:text-[#226710]">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold font-Montserrat mb-3">Support</h3>
                    <ul className="space-y-2">
                        <li><a href="#help" className="hover:text-[#226710]">Help</a></li>
                        <li><a href="#faqs" className="hover:text-[#226710]">FAQs</a></li>
                        <li><a href="#terms" className="hover:text-[#226710]">Terms & Conditions</a></li>
                        <li><a href="#privacy" className="hover:text-[#226710]">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>

        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
            <p>© Ipamalihog Kay Lolo 2024. All Rights Reserved</p>
        </div>
    </footer>
);

export default Footer;
