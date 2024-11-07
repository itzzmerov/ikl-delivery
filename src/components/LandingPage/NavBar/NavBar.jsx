import React, { useState } from 'react';
import logo from '../../../images/logo.png';

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#61AD4E] text-white p-4 flex justify-between items-center">
            <img src={logo} alt="Logo" className="w-12 h-12" />
            <div className="hidden md:flex space-x-6">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
                <a href="#login">Login</a>
            </div>
            <button
                className="md:hidden focus:outline-none text-2xl"
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰
            </button>
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-[#181818] md:hidden flex flex-col items-center space-y-4 py-4">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
                <a href="#login">Login</a>
                </div>
            )}
        </nav>
    );
};

export default NavBar;