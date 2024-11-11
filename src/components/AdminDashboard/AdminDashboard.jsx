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
import UpdateOrder from './UpdateForms/UpdateOrder/UpdateOrder';
import AddNewOrder from './AddForms/AddNewOrder/AddNewOrder'
import AddNewService from './AddForms/ServicesForm/AddNewService';
import UpdateService from './UpdateForms/UpdateService/UpdateService';
import AddNewCustomer from './AddForms/AddNewCustomer/AddNewCustomer';
import UpdateCustomer from './UpdateForms/UpdateCustomer/UpdateCustomer';
import AddNewRider from './AddForms/AddNewRider/AddNewRider';
import UpdateRider from './UpdateForms/UpdateRider/UpdateRider';
import AddReview from './AddForms/AddReviews/AddReview';

const AdminDashboard = () => {
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
                        <Route path="/" element={<Navigate to="dashboard" />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="orderlist" element={<OrderList />} />
                        <Route path="services" element={<Services />} />
                        <Route path="reviews" element={<Reviews />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="riders" element={<Riders />} />
                        <Route path="analytics" element={<Analytics />} />

                        {/* Adding New Data Links */}
                        <Route path="order/new-order" element={<AddNewOrder />} />
                        <Route path="services/new-service" element={<AddNewService />} />
                        <Route path="customers/new-customer" element={<AddNewCustomer />} />
                        <Route path="riders/new-rider" element={<AddNewRider />} />
                        <Route path="reviews/new-review" element={<AddReview />} />

                        {/* Updating Data Links */}
                        <Route path="order/:id/update-order" element={<UpdateOrder />} />
                        <Route path="services/:id/update-services" element={<UpdateService />} />
                        <Route path="customers/:id/update-customer" element={<UpdateCustomer />} />
                        <Route path="riders/:id/update-rider" element={<UpdateRider />} />

                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
