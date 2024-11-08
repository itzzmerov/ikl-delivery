import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import TopNavbar from './TopNavbar/TopNavbar'
import { Dashboard } from '@mui/icons-material'

const AdminDashboard = () => {
  return (
    <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopNavbar />
                <Dashboard />
            </div>
        </div>
  )
}

export default AdminDashboard;
