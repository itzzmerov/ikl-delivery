import React from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const TopNavbar = () => {
    return (
        <div className="w-full flex items-center justify-between bg-gray-100 p-4 shadow">
            <div className="flex items-center w-full max-w-xl">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full py-2 px-4 rounded-lg border focus:outline-none"
                />
                <button className="ml-2 p-2">
                    <FaSearch />
                </button>
            </div>
            <div className="flex items-center space-x-4">
                <FaBell className="text-2xl cursor-pointer" />
                <FaUserCircle className="text-2xl cursor-pointer" />
            </div>
        </div>
    );
};

export default TopNavbar;