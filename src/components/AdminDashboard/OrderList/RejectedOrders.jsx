import React from 'react';
import OrderList from './PendingOrders';

const RejectedOrders = () => {
    return <OrderList statusFilter="Rejected" />;
};

export default RejectedOrders;