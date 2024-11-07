import React from 'react';
import logo from '../../../images/logo.png';

const Footer = () => (
    <footer className="bg-white p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Logo and Name */}
            <div className="flex flex-col items-center md:items-start space-y-2">
                <img src={logo} alt="Logo" className="w-24 h-24 mr-11" />
                <h2 className="text-xl font-bold">IPAMALIHOG KAY LOLO</h2>
            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold">Services</h3>
                    <ul className="space-y-2">
                        <li><a href="#food-delivery" className="hover:underline">Food Delivery</a></li>
                        <li><a href="#pera-padala" className="hover:underline">Pera Padala</a></li>
                        <li><a href="#pamalengke" className="hover:underline">Pamalengke</a></li>
                        <li><a href="#bill-payments" className="hover:underline">Bill Payments</a></li>
                        <li><a href="#hatid-sundo" className="hover:underline">Hatid Sundo</a></li>
                        <li><a href="#parcel-pickup" className="hover:underline">Parcel Pick-up</a></li>
                        <li><a href="#special-deliveries" className="hover:underline">Special Deliveries</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">About IKL</h3>
                    <ul className="space-y-2">
                        <li><a href="#about" className="hover:underline">About IKL</a></li>
                        <li><a href="#history" className="hover:underline">History</a></li>
                        <li><a href="#contact" className="hover:underline">Contact Us</a></li>
                    </ul>
                </div>
            </div>

            {/* Support Links */}
            <div>
                <h3 className="font-semibold">Support</h3>
                <ul className="space-y-2">
                    <li><a href="#help" className="hover:underline">Help</a></li>
                    <li><a href="#faqs" className="hover:underline">FAQs</a></li>
                    <li><a href="#terms" className="hover:underline">Terms & Conditions</a></li>
                    <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
                </ul>
            </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
            <p>© Ipamalihog Kay Lolo 2024. All Rights Reserved</p>
        </div>
    </footer>
);

export default Footer;