import React from 'react';
import { FaBars, FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const TopNavbar = ({ toggleSidebar }) => {
    return (
        <div className="w-full flex items-center justify-between bg-gray-100 p-4 shadow">
            <div className="flex items-center w-full max-w-xl">
                <button onClick={toggleSidebar} className="mr-4 p-2 text-2xl focus:outline-none">
                    <FaBars />
                </button>
            </div>
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full py-2 px-4 rounded-lg border focus:outline-none"
                />
                <button className="ml-2 p-2">
                    <FaSearch />
                </button>
                <FaBell className="text-2xl cursor-pointer" />
                <FaUserCircle className="text-2xl cursor-pointer" />
            </div>
        </div>
    );
};

export default TopNavbar;
