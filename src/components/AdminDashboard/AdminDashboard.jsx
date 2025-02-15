import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import TopNavbar from './TopNavbar/TopNavbar';
import Dashboard from './Dashboard/Dashboard';
import Analytics from './Analytics/Analytics';
import Services from './ServicesManagement/Services';
import Reviews from './Reviews/Reviews';
import Customers from './CustomerManagement/Customers';
import Riders from './RidersManagement/Riders';
import UpdateOrder from './UpdateForms/UpdateOrder/UpdateOrder';
import AddNewOrder from './AddForms/AddNewOrder/AddNewOrder'
import AddNewService from './AddForms/AddNewService/AddNewService';
import UpdateService from './UpdateForms/UpdateService/UpdateService';
import AddNewCustomer from './AddForms/AddNewCustomer/AddNewCustomer';
import UpdateCustomer from './UpdateForms/UpdateCustomer/UpdateCustomer';
import AddNewRider from './AddForms/AddNewRider/AddNewRider';
import UpdateRider from './UpdateForms/UpdateRider/UpdateRider';
import AddReview from './AddForms/AddReviews/AddReview';

import PendingOrders from './OrderList/PendingOrders';
import AcceptedOrders from './OrderList/AcceptedOrders';
import RejectedOrders from './OrderList/RejectedOrders';
import CancelledOrders from './OrderList/CancelledOrders';
import CompletedOrders from './OrderList/CompletedOrders';
import RiderHistory from './RidersManagement/RidersHistory';
import Reports from './Reports/Reports';
import Admins from './AdminManagement/Admins';
import UpdateAdmins from './UpdateForms/UpdateAdmins/UpdateAdmins';

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
                        <Route path="services" element={<Services />} />
                        <Route path="reviews" element={<Reviews />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="admins" element={<Admins />} />
                        <Route path="riders" element={<Riders />} />
                        <Route path="riders-history" element={<RiderHistory />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="reports" element={<Reports />} />

                        {/* Link for Orders */}
                        <Route path="orders/pending-orders" element={<PendingOrders />} />
                        <Route path="orders/accepted-orders" element={<AcceptedOrders />} />
                        <Route path="orders/rejected-orders" element={<RejectedOrders />} />
                        <Route path="orders/cancelled-orders" element={<CancelledOrders />} />
                        <Route path="orders/completed-orders" element={<CompletedOrders />} />

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
                        <Route path="admins/:id/update-admin" element={<UpdateAdmins />} />
                        <Route path="riders/:id/update-rider" element={<UpdateRider />} />

                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
