import React, { useState } from 'react';
import { FaBars, FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../../../utils/firebase';
import { useNavigate } from 'react-router-dom';

const TopNavbar = ({ toggleSidebar }) => {
    const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(false);
    const navigate = useNavigate();

    const handleAccountClick = () => {
        setIsAccountMenuVisible(!isAccountMenuVisible);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Logout error: ", error);
        }
    };

    return (
        <div className="w-full flex items-center justify-between bg-lightWhite p-4 shadow">
            <div className="flex items-center w-full max-w-xl">
                <button onClick={toggleSidebar} className="mr-4 p-2 text-2xl focus:outline-none">
                    <FaBars />
                </button>
            </div>
            <div className="flex items-center gap-2 px-3">
                <div className='flex flex-row'>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full py-2 px-4 rounded-l-md border focus:outline-none"
                    />
                    <button className="p-2 bg-white rounded-r-md border border-r-0">
                        <FaSearch size={20} />
                    </button>
                </div>
                
                <FaBell size={30} className="cursor-pointer" />

                <div className="relative">
                    <FaUserCircle 
                        size={35} 
                        className="cursor-pointer" 
                        onClick={handleAccountClick} 
                    />
                    {isAccountMenuVisible && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border">
                            <ul className="text-sm text-gray-700">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Account Info</li>
                                <li 
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopNavbar;
