import React, { useState, useEffect, useRef } from 'react';
import { FaHome, FaList, FaConciergeBell, FaStar, FaChartBar, FaUser } from 'react-icons/fa';
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { HiDocumentReport } from "react-icons/hi";
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

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOrderDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleDropdownClick = (e) => {
        e.stopPropagation();
    };

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
                    to="/admin/dashboard"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 
                        ${isCollapsed ? 'justify-center ' : ''}${isActive ? 'bg-gray-700' : ''}`}
                >
                    <FaHome size={23} className="text-lightWhite min-w-[23px]" />
                    {!isCollapsed && <span className="ml-3">Dashboard</span>}
                </NavLink>

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
                            <NavLink
                                to="/admin/orders/completed-orders"
                                className={({ isActive }) => `block px-6 py-2 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}
                            >
                                Completed Orders
                            </NavLink>
                        </div>
                    )}
                </div>

                <NavLink
                    to="/admin/riders-history"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 
                        ${isCollapsed ? 'justify-center' : ''}${isActive ? 'bg-gray-700' : ''}`}
                >
                    <GiFullMotorcycleHelmet size={23} className="text-lightWhite min-w-[23px]" />
                    {!isCollapsed && <span className="ml-3">Rider's History</span>}
                </NavLink>

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
                    to="/admin/admins"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 
                        ${isCollapsed ? 'justify-center' : ''}${isActive ? 'bg-gray-700' : ''}`}
                >
                    <FaUser size={23} className="text-lightWhite min-w-[23px]" />
                    {!isCollapsed && <span className="ml-3">Admins</span>}
                </NavLink>

                <NavLink
                    to="/admin/reports"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 
                        ${isCollapsed ? 'justify-center' : ''}${isActive ? 'bg-gray-700' : ''}`}
                >
                    <HiDocumentReport size={23} className="text-lightWhite min-w-[23px]" />
                    {!isCollapsed && <span className="ml-3">Reports</span>}
                </NavLink>

                {/* <NavLink
                    to="/admin/analytics"
                    className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-gray-700 
                        ${isCollapsed ? 'justify-center' : ''}${isActive ? 'bg-gray-700' : ''}`}
                >
                    <FaChartBar size={23} className="text-lightWhite min-w-[23px]" />
                    {!isCollapsed && <span className="ml-3">Analytics</span>}
                </NavLink> */}
            </nav>
        </div>
    );
};

export default Sidebar;
