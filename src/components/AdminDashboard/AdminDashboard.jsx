import React, { useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import TopNavbar from './TopNavbar/TopNavbar'
import { Dashboard } from '@mui/icons-material'

const AdminDashboard = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="flex">
            <Sidebar isCollapsed={isSidebarCollapsed} />
            <div className="flex-1 flex flex-col">
                <TopNavbar toggleSidebar={toggleSidebar} />
                <Dashboard />
            </div>
        </div>
    )
}

export default AdminDashboard;
