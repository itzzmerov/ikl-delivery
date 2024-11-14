import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import TopNavbar from './TopNavbar/TopNavbar';

const RiderDashboard = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar isCollapsed={isSidebarCollapsed} />
            <div className="flex-1 flex flex-col">
                <TopNavbar toggleSidebar={toggleSidebar} />

                <div className="flex-1 h-full overflow-y-auto p-4 bg-darkWhite">
                    <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="services" element={<Services />} />

                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default RiderDashboard
