import React, { useState, useEffect } from 'react';
import logo from '../../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../utils/firebase';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../../hooks/useAuth';
import { FaCircleUser } from "react-icons/fa6";
import OrdersPage from '../OrdersPage/OrdersPage';
import ViewOrdersHistory from '../OrdersPage/ViewOrdersHistory';

const NavBar = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isOrdersPageVisible, setIsOrdersPageVisible] = useState(false);
    const [isOrdersHistoryVisible, setIsOrdersHistoryVisible] = useState(false);
    const [logoutMessage, setLogoutMessage] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setLogoutMessage(true);
            setDropdownOpen(false);
            
            setTimeout(() => {
                setLogoutMessage(false);
                navigate("/");
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    };

    const openOrdersPage = () => {
        setIsOrdersPageVisible(true);
        setIsOrdersHistoryVisible(false);
        setDropdownOpen(false);
    };

    const closeOrdersPage = () => {
        setIsOrdersPageVisible(false);
    };

    const openOrdersHistory = () => {
        setIsOrdersHistoryVisible(true);
        setIsOrdersPageVisible(false);
        setDropdownOpen(false);
    };

    const closeOrdersHistory = () => {
        setIsOrdersHistoryVisible(false);
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
        <nav className={`fixed top-0 left-0 w-full z-50 bg-lightGreen text-lightWhite transition-all duration-300 ${scrolled ? 'py-2 shadow-lg' : 'py-4 shadow-none'}`}>
            <div className="px-5 md:px-14 flex justify-between items-center transition-all duration-300">
                <img src={logo} alt="Logo" className={`transition-all duration-300 ${scrolled ? 'w-16 h-16' : 'w-24 h-24'}`} />
                <div className="hidden md:flex items-center gap-5 space-x-6 text-[18px]">
                    <a href="#top" className="hover:text-darkBlack">Home</a>
                    <a href="#about" className="hover:text-darkBlack">About</a>
                    <a href="#services" className="hover:text-darkBlack">Services</a>
                    <a href="#contact" className="hover:text-darkBlack">Contact</a>
                    {!currentUser ? (
                        <Link to="/login" className="bg-darkBlack hover:bg-lightBlack text-lightWhite px-10 py-2 rounded-full">Login</Link>
                    ) : (
                        <div className="relative">
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2">
                                <FaCircleUser className="w-8 h-8 rounded-full" />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-60 bg-white text-black rounded-lg shadow-lg">
                                    <div className="p-2">
                                        <p className="text-xs font-OpenSans">Logged in as:</p>
                                        <p className="text-sm font-semibold font-Montserrat">{currentUser.email}</p>
                                    </div>
                                    <button
                                        onClick={openOrdersPage}
                                        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-200"
                                    >
                                        View Orders
                                    </button>
                                    <button
                                        onClick={openOrdersHistory}
                                        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-200"
                                    >
                                        Orders History
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-sm text-left hover:bg-gray-200 rounded-b-lg font-Montserrat"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <MenuIcon sx={{ fontSize: 40 }} />
                </button>
            </div>

            {isOrdersPageVisible && <OrdersPage onClose={closeOrdersPage} />}
            {isOrdersHistoryVisible && <ViewOrdersHistory onClose={closeOrdersHistory} />}

            {logoutMessage && (
                <div className="fixed top-0 left-0 w-full flex justify-center z-50">
                    <div className="bg-lightWhite text-darkBlack py-3 px-6 rounded-b-lg shadow-md mt-4">
                        <p>Logout Successful. Thank you for using our website!</p>
                    </div>
                </div>
            )}

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div className="absolute top-[7.5rem] left-0 w-full bg-darkBlack md:hidden flex flex-col items-center space-y-4 py-4 gap-2">
                    <a className="hover:text-lightGreen" href="#home">Home</a>
                    <a className="hover:text-lightGreen" href="#about">About</a>
                    <a className="hover:text-lightGreen" href="#services">Services</a>
                    <a className="hover:text-lightGreen" href="#contact">Contact</a>
                    <Link to="/login" className="hover:text-lightGreen">Login</Link>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
