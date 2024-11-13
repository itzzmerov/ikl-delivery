import React, { useState, useEffect, useRef } from 'react';
import { FaHome, FaList, FaConciergeBell, FaStar, FaChartBar, FaUser } from 'react-icons/fa';
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { NavLink, useLocation } from 'react-router-dom';
import { MdExpandMore } from "react-icons/md";
import logo from '../../../images/logo.png';

const Sidebar = ({ isCollapsed }) => {
    const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);
    const location = useLocation();
    const dropdownRef = useRef(null);

    const toggleOrderDropdown = () => {
        setIsOrderDropdownOpen((prevState) => !prevState);
    };

    // Close dropdown when clicking outside of it
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOrderDropdownOpen(false);
        }
    };

    useEffect(() => {
        // Add click event listener
        document.addEventListener('click', handleClickOutside);
        return () => {
            // Clean up the event listener
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Prevent dropdown from closing when selecting from the dropdown links
    const handleDropdownClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={`h-screen bg-black text-lightWhite flex flex-col py-6 px-5 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            {/* Logo */}
            <div className="flex justify-center mb-4">
                <img
                    src={logo}
                    alt="Logo"
                    className={`transition-all duration-300 ${isCollapsed ? 'w-10 h-10' : 'w-20 h-20'}`}
                />
            </div>

            {/* Navigation Links */}
            <nav className="space-y-4 w-full mt-4">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 
                        ${isCollapsed ? 'justify-center ' : ''}${isActive ? 'bg-gray-700' : ''}`}
                >
                    <FaHome size={23} className="text-lightWhite min-w-[23px]" />
                    {!isCollapsed && <span className="ml-3">Dashboard</span>}
                </NavLink>

                {/* Order List Dropdown */}
                <div className={`relative ${isCollapsed ? 'justify-center' : ''}`} ref={dropdownRef}>
                    <button
                        onClick={toggleOrderDropdown}
                        className={`flex items-center w-full px-4 py-2 hover:bg-gray-700 ${isOrderDropdownOpen ? 'bg-gray-700' : ''}`}
                    >
                        <FaList size={23} className="text-lightWhite min-w-[23px]" />
                        {!isCollapsed && (
                            <>
                                <span className="ml-3">Order List</span>
                                <MdExpandMore size={20} className={`ml-auto transition-transform ${isOrderDropdownOpen ? 'rotate-180' : ''}`} />
                            </>
                        )}
                    </button>

                    {!isCollapsed && isOrderDropdownOpen && (
                        <div className="bg-gray-800 rounded shadow-lg mt-1" onClick={handleDropdownClick}>
                            <NavLink
                                to="/admin/orders/pending-orders"
                                className={({ isActive }) => `block px-6 py-2 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}
                            >
                                Pending Orders
                            </NavLink>
                            <NavLink
                                to="/admin/orders/accepted-orders"
                                className={({ isActive }) => `block px-6 py-2 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}
                            >
                                Accepted Orders
                            </NavLink>
                            <NavLink
                                to="/admin/orders/rejected-orders"
                                className={({ isActive }) => `block px-6 py-2 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}
                            >
                                Rejected Orders
                            </NavLink>
                            <NavLink
                                to="/admin/orders/cancelled-orders"
                                className={({ isActive }) => `block px-6 py-2 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}
                            >
                                Cancelled Orders
                            </NavLink>
                        </div>
                    )}
                </div>

                <NavLink
                    to="/admin/services"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 
                        ${isCollapsed ? 'justify-center' : ''}${isActive ? 'bg-gray-700' : ''}`}
                >
                    <FaConciergeBell size={23} className="text-lightWhite min-w-[23px]" />
                    {!isCollapsed && <span className="ml-3">Services</span>}
                </NavLink>

                <NavLink
                    to="/admin/reviews"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 
                        ${isCollapsed ? 'justify-center' : ''}${isActive ? 'bg-gray-700' : ''}`}
                >
                    <FaStar size={23} className="text-lightWhite min-w-[23px]" />
                    {!isCollapsed && <span className="ml-3">Reviews</span>}
                </NavLink>

                <NavLink
                    to="/admin/customers"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 
                        ${isCollapsed ? 'justify-center' : ''}${isActive ? 'bg-gray-700' : ''}`}
                >
                    <FaUser size={23} className="text-lightWhite min-w-[23px]" />
                    {!isCollapsed && <span className="ml-3">Customers</span>}
                </NavLink>

                <NavLink
                    to="/admin/riders"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 
                        ${isCollapsed ? 'justify-center' : ''}${isActive ? 'bg-gray-700' : ''}`}
                >
                    <GiFullMotorcycleHelmet size={23} className="text-lightWhite min-w-[23px]" />
                    {!isCollapsed && <span className="ml-3">Riders</span>}
                </NavLink>

                <NavLink
                    to="/admin/analytics"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 
                        ${isCollapsed ? 'justify-center' : ''}${isActive ? 'bg-gray-700' : ''}`}
                >
                    <FaChartBar size={23} className="text-lightWhite min-w-[23px]" />
                    {!isCollapsed && <span className="ml-3">Analytics</span>}
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
