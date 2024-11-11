import React from 'react';
import { FaBars, FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const TopNavbar = ({ toggleSidebar }) => {
    return (
        <div className="w-full flex items-center justify-between bg-lightWhite p-4 shadow">
            <div className="flex items-center w-full max-w-xl">
                <button onClick={toggleSidebar} className="mr-4 p-2 text-2xl focus:outline-none">
                    <FaBars />
                </button>
            </div>
            <div className="flex items-center gap-2">
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
                <FaUserCircle size={35} className="cursor-pointer" />
            </div>
        </div>
    );
};

export default TopNavbar;
