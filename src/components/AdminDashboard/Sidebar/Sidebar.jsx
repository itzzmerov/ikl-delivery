import React from 'react';
import { FaHome, FaList, FaConciergeBell, FaStar, FaUsers, FaMotorcycle, FaChartBar } from 'react-icons/fa';
import logo from '../../../images/logo.png';

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-darkBlack text-white flex flex-col items-center py-4">
            <img src={logo} alt="Logo" className="w-20 h-20 mb-4" />
            <h2 className="text-xl font-semibold mb-8">IKL Admin</h2>
            <nav className="space-y-4 w-full">
                <a href="#dashboard" className="flex items-center px-4 py-2 hover:bg-gray-700">
                    <FaHome className="mr-3" /> Dashboard
                </a>
                <a href="#orderlist" className="flex items-center px-4 py-2 hover:bg-gray-700">
                    <FaList className="mr-3" /> Order List
                </a>
                <a href="#services" className="flex items-center px-4 py-2 hover:bg-gray-700">
                    <FaConciergeBell className="mr-3" /> Services
                </a>
                <a href="#reviews" className="flex items-center px-4 py-2 hover:bg-gray-700">
                    <FaStar className="mr-3" /> Reviews
                </a>
                <a href="#customer" className="flex items-center px-4 py-2 hover:bg-gray-700">
                    <FaUsers className="mr-3" /> Customer
                </a>
                <a href="#riders" className="flex items-center px-4 py-2 hover:bg-gray-700">
                    <FaMotorcycle className="mr-3" /> Riders
                </a>
                <a href="#analytics" className="flex items-center px-4 py-2 hover:bg-gray-700">
                    <FaChartBar className="mr-3" /> Analytics
                </a>
            </nav>
        </div>
    );
};

export default Sidebar;
