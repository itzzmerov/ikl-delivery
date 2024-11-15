import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import TopNavbar from './TopNavbar/TopNavbar';
import OrderList from './RidersPages/OrderList';
import ViewOrdersHistory from './RidersPages/ViewOrdersHistory';

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
                        <Route path="/" element={<Navigate to="orders" />} />
                        <Route path="orders" element={<OrderList />} />
                        <Route path="orders-history" element={<ViewOrdersHistory />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default RiderDashboard
