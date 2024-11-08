import React, { useState, useEffect } from 'react';
import logo from '../../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../utils/firebase';

const NavBar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 bg-[#61AD4E] text-white transition-all duration-300 ${scrolled ? 'py-2 shadow-lg' : 'py-4 shadow-none'}`}>
            <div className="px-14 flex justify-between items-center transition-all duration-300">
                <img src={logo} alt="Logo" className={`transition-all duration-300 ${scrolled ? 'w-16 h-16' : 'w-24 h-24'}`} />
                <div className="hidden md:flex items-center gap-5 space-x-6 text-[18px]">
                    <a href="#top" className="hover:text-black">Home</a>
                    <a href="#about" className="hover:text-black">About</a>
                    <a href="#services" className="hover:text-black">Services</a>
                    <a href="#contact" className="hover:text-black">Contact</a>
                    <Link to="/login" className="bg-black hover:bg-[#383838] text-white px-10 py-2 rounded-full">Login</Link>
                    <button className="bg-black hover:bg-[#383838] text-white px-10 py-2 rounded-full" onClick={handleLogout}>Logout</button>
                </div>
                <button
                    className="md:hidden focus:outline-none text-[50px] md:text-2xl"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
            </div>
            {isOpen && (
                <div className="absolute top-[7.5rem] left-0 w-full bg-[#181818] md:hidden flex flex-col items-center space-y-4 py-4 gap-2">
                    <a className="hover:text-[#61AD4E]" href="#home">Home</a>
                    <a className="hover:text-[#61AD4E]" href="#about">About</a>
                    <a className="hover:text-[#61AD4E]" href="#services">Services</a>
                    <a className="hover:text-[#61AD4E]" href="#contact">Contact</a>
                    <Link to="/login" className="hover:text-[#61AD4E]">Login</Link>
                    <button className="hover:text-[#61AD4E]" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
