import React from 'react';
import OrderList from './PendingOrders';

const AcceptedOrders = () => {
    return <OrderList statusFilter="Processing" />;
};

export default AcceptedOrders;