import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import TopNavbar from './TopNavbar/TopNavbar';
import Dashboard from './Dashboard/Dashboard';
import Analytics from './Analytics/Analytics';
import OrderList from './OrderList/OrderList';
import Services from './ServicesManagement/Services';
import Reviews from './Reviews/Reviews';
import Customers from './CustomerManagement/Customers';
import Riders from './RidersManagement/Riders';

const AdminDashboard = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar remains fixed */}
            <Sidebar isCollapsed={isSidebarCollapsed} />
            <div className="flex-1 flex flex-col">
                {/* Top Navbar remains fixed */}
                <TopNavbar toggleSidebar={toggleSidebar} />

                {/* Scrollable content area */}
                <div className="flex-1 h-full overflow-y-auto p-4 bg-darkWhite">
                    <Routes>
                        <Route path="/" element={<Navigate to="dashboard" />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="orderlist" element={<OrderList />} />
                        <Route path="services" element={<Services />} />
                        <Route path="reviews" element={<Reviews />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="riders" element={<Riders />} />
                        <Route path="analytics" element={<Analytics />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
