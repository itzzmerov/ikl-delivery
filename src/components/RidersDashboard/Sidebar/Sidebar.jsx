import React from 'react';
import { FaList, FaStar } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../../images/logo.png';

const Sidebar = ({ isCollapsed }) => {

    return (
        <div className={`h-screen bg-black text-lightWhite flex flex-col py-6 px-5 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="flex justify-center mb-4">
                <img
                    src={logo}
                    alt="Logo"
                    className={`transition-all duration-300 ${isCollapsed ? 'w-10 h-10' : 'w-20 h-20'}`}
                />
            </div>

            <nav className="space-y-4 w-full mt-4">
                <NavLink
                    to="/riders/orders"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 
                        ${isCollapsed ? 'justify-center ' : ''}${isActive ? 'bg-gray-700' : ''}`}
                >
                    <FaList size={23} className="text-lightWhite min-w-[23px]" />
                    {!isCollapsed && <span className="ml-3">Orders</span>}
                </NavLink>

                <NavLink
                    to="/riders/orders-history"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 
                        ${isCollapsed ? 'justify-center ' : ''}${isActive ? 'bg-gray-700' : ''}`}
                >
                    <FaStar size={23} className="text-lightWhite min-w-[23px]" />
                    {!isCollapsed && <span className="ml-3">View Orders History</span>}
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
