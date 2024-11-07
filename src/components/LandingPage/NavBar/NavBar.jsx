import React, { useState } from 'react';
import logo from '../../../images/logo.png';

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#61AD4E] text-white py-4 px-10 flex justify-between items-center">
            <img src={logo} alt="Logo" className="w-24 h-24" />
            <div className="hidden md:flex space-x-6 text-[18px]">
                <a className="hover:text-black" href="#home">Home</a>
                <a className="hover:text-black" href="#about">About</a>
                <a className="hover:text-black" href="#services">Services</a>
                <a className="hover:text-black" href="#contact">Contact</a>
                <a className="hover:text-black" href="#login">Login</a>
            </div>
            <button
                className="md:hidden focus:outline-none text-2xl"
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰
            </button>
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-[#181818] md:hidden flex flex-col items-center space-y-4 py-4">
                    <a className="hover:text-[#61AD4E]" href="#home">Home</a>
                    <a className="hover:text-[#61AD4E]" href="#about">About</a>
                    <a className="hover:text-[#61AD4E]" href="#services">Services</a>
                    <a className="hover:text-[#61AD4E]" href="#contact">Contact</a>
                    <a className="hover:text-[#61AD4E]" href="#login">Login</a>
                </div>
            )}
        </nav>
    );
};

export default NavBar;