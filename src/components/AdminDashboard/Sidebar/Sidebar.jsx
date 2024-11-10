import React from 'react';
import { FaHome, FaList, FaConciergeBell, FaStar, FaChartBar, FaUser } from 'react-icons/fa';
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import logo from '../../../images/logo.png';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isCollapsed }) => {
    return (
        <div className={`h-screen bg-black text-lightWhite flex flex-col py-6 px-5 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="flex justify-center mb-4">
                <img src={logo} alt="Logo" className={`transition-all duration-300 ${isCollapsed ? 'w-10 h-10' : 'w-20 h-20'}`} />
            </div>
            <nav className="space-y-4 w-full mt-4">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''} ${isActive ? 'bg-gray-700' : ''}`}
                >
                    <FaHome className="mr-3" /> {!isCollapsed && 'Dashboard'}
                </NavLink>
                <NavLink
                    to="/admin/orderlist"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''} ${isActive ? 'bg-gray-700' : ''}`}
                >
                    <FaList className="mr-3" /> {!isCollapsed && 'Order List'}
                </NavLink>
                <NavLink
                    to="/admin/services"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''} ${isActive ? 'bg-gray-700' : ''}`}
                >
                    <FaConciergeBell className="mr-3" /> {!isCollapsed && 'Services'}
                </NavLink>
                <NavLink
                    to="/admin/reviews"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''} ${isActive ? 'bg-gray-700' : ''}`}
                >
                    <FaStar className="mr-3" /> {!isCollapsed && 'Reviews'}
                </NavLink>
                <NavLink
                    to="/admin/customers"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''} ${isActive ? 'bg-gray-700' : ''}`}
                >
                    <FaUser className="mr-3" /> {!isCollapsed && 'Customers'}
                </NavLink>
                <NavLink
                    to="/admin/riders"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''} ${isActive ? 'bg-gray-700' : ''}`}
                >
                    <GiFullMotorcycleHelmet className="mr-3" /> {!isCollapsed && 'Riders'}
                </NavLink>
                <NavLink
                    to="/admin/analytics"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''} ${isActive ? 'bg-gray-700' : ''}`}
                >
                    <FaChartBar className="mr-3" /> {!isCollapsed && 'Analytics'}
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
