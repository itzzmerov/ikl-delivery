import React from 'react';
import logo from '../../../images/logo.png';

const NavBar = () => {
    return (
        <nav className="bg-[#61AD4E] p-4 flex justify-between items-center">
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
                <h1 className="text-white font-bold text-xl">IPAMALIHOG KAY LOLO</h1>
            </div>
            <div className="flex space-x-4">
                <a href="#home" className="text-white">Home</a>
                <a href="#about" className="text-white">About</a>
                <a href="#services" className="text-white">Services</a>
                <a href="#contact" className="text-white">Contact</a>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded">Login</button>
        </nav>
    );
};

export default NavBar;