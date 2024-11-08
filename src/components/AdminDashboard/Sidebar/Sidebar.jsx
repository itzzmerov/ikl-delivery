import React from 'react';
import { FaHome, FaList, FaConciergeBell, FaStar, FaChartBar, FaUser } from 'react-icons/fa';
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import logo from '../../../images/logo.png';

const Sidebar = ({ isCollapsed }) => {
    return (
        <div className={`h-screen bg-black text-lightWhite flex flex-col py-6 px-5 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="flex justify-center mb-4">
                <img src={logo} alt="Logo" className={`transition-all duration-300 ${isCollapsed ? 'w-10 h-10' : 'w-20 h-20'}`} />
            </div>
            <nav className="space-y-4 w-full mt-4">
                <a href="#dashboard" className={`flex items-center px-4 py-2 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''}`}>
                    <FaHome size={23} className="mr-3" /> {!isCollapsed && 'Dashboard'}
                </a>
                <a href="#orderlist" className={`flex items-center px-4 py-2 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''}`}>
                    <FaList size={23} className="mr-3" /> {!isCollapsed && 'Order List'}
                </a>
                <a href="#services" className={`flex items-center px-4 py-2 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''}`}>
                    <FaConciergeBell size={23} className="mr-3" /> {!isCollapsed && 'Services'}
                </a>
                <a href="#reviews" className={`flex items-center px-4 py-2 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''}`}>
                    <FaStar size={23} className="mr-3" /> {!isCollapsed && 'Reviews'}
                </a>
                <a href="#customer" className={`flex items-center px-4 py-2 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''}`}>
                    <FaUser size={23} className="mr-3" /> {!isCollapsed && 'Customer'}
                </a>
                <a href="#riders" className={`flex items-center px-4 py-2 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''}`}>
                    <GiFullMotorcycleHelmet size={23} className="mr-3" /> {!isCollapsed && 'Riders'}
                </a>
                <a href="#analytics" className={`flex items-center px-4 py-2 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''}`}>
                    <FaChartBar size={23} className="mr-3" /> {!isCollapsed && 'Analytics'}
                </a>
            </nav>
        </div>
    );
};

export default Sidebar;
