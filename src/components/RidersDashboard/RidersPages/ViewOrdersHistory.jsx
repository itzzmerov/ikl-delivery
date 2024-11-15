import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/firebase';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const ViewOrderHistory = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [serviceFilter, setServiceFilter] = useState("All");

    const fetchOrders = async () => {
        try {
            if (!currentUser) {
                console.log("User is not authenticated");
                return;
            }
    
            const response = await getDocs(collection(db, "orders"));
            const orderList = response.docs
                .map((doc) => ({ id: doc.id, ...doc.data() }))
                .filter((order) => order.riderId === currentUser.uid);
            setOrders(orderList);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleFilterChange = (e) => {
        setServiceFilter(e.target.value);
    };

    const getTableColumns = () => {
        switch (serviceFilter) {
            case 'Food Delivery':
                return [
                    { name: 'Status', key: 'status' },
                    { name: 'Customer Name', key: 'customerName' },
                    { name: 'Phone Number', key: 'phoneNumber' },
                    { name: 'Store Preference', key: 'storePreference' },
                    { name: 'Item/s to buy', key: 'itemsToBuy' },
                    { name: 'Estimated Price', key: 'estimatedPrice' },
                    { name: 'Special Instructions', key: 'specialInstructions' }
                ];
            case 'Special Delivery':
                return [
                    { name: 'Status', key: 'status' },
                    { name: 'Customer Name', key: 'customerName' },
                    { name: 'Phone Number', key: 'phoneNumber' },
                    { name: 'Description', key: 'description' },
                    { name: 'Special Instructions', key: 'specialInstructions' },
                    { name: 'Estimated Cost', key: 'estimatedCost' }
                ];
            case 'Parcel Pickup':
                return [
                    { name: 'Status', key: 'status' },
                    { name: 'Customer Name', key: 'customerName' },
                    { name: 'Phone Number', key: 'phoneNumber' },
                    { name: 'Parcel Details', key: 'parcelDetails' },
                    { name: 'Pickup Location', key: 'pickupLocation' },
                    { name: 'Estimated Weight', key: 'estimatedWeight' }
                ];
            case 'Pamalengke':
                return [
                    { name: 'Status', key: 'status' },
                    { name: 'Customer Name', key: 'customerName' },
                    { name: 'Phone Number', key: 'phoneNumber' },
                    { name: 'List of Items', key: 'listOfItems' },
                    { name: 'Store Preference', key: 'storePreference' },
                    { name: 'Estimated Price', key: 'estimatedPrice' },
                    { name: 'Special Instructions', key: 'specialInstructions' }
                ];
            case 'Hatid Sundo':
                return [
                    { name: 'Status', key: 'status' },
                    { name: 'Customer Name', key: 'customerName' },
                    { name: 'Phone Number', key: 'phoneNumber' },
                    { name: 'Pickup Location', key: 'pickupLocation' },
                    { name: 'Dropoff Location', key: 'dropoffLocation' },
                    { name: 'Pickup Time', key: 'pickupTime' },
                    { name: 'Special Requests', key: 'specialRequests' }
                ];
            case 'Bill Payment':
                return [
                    { name: 'Status', key: 'status' },
                    { name: 'Customer Name', key: 'customerName' },
                    { name: 'Phone Number', key: 'phoneNumber' },
                    { name: 'Email Address', key: 'emailAddress' },
                    { name: 'Bill Type', key: 'billType' },
                    { name: 'Account Number', key: 'accountNumber' },
                    { name: 'Amount', key: 'amount' },
                    { name: 'Bill Date', key: 'billDate' },
                    { name: 'Due Date', key: 'dueDate' }
                ];
            case 'Pera Padala':
                return [
                    { name: 'Status', key: 'status' },
                    { name: 'Sender Name', key: 'senderName' },
                    { name: 'Sender Phone', key: 'customerPhone' },
                    { name: 'Sender Address', key: 'senderAddress' },
                    { name: 'Receiver Name', key: 'receiverName' },
                    { name: 'Receiver Phone', key: 'receiverPhone' },
                    { name: 'Receiver Address', key: 'receiverAddress' },
                    { name: 'Amount', key: 'amount' }
                ];
            default:
                return [
                    { name: 'Status', key: 'status' },
                    { name: 'Services', key: 'service' },
                ];
        }
    };

    return (
        <div className="p-8 flex-1">
            <div className='flex justify-between items-center mb-2'>
                <h1 className="text-2xl font-semibold mb-4">Accepted Orders</h1>
                <div className="flex gap-2">
                    <select
                        value={serviceFilter}
                        onChange={handleFilterChange}
                        className="p-2 border border-gray-300 rounded"
                    >
                        <option value="All">All Services</option>
                        <option value="Food Delivery">Food Delivery</option>
                        <option value="Special Delivery">Special Delivery</option>
                        <option value="Parcel Pickup">Parcel Pickup</option>
                        <option value="Pamalengke">Pamalengke</option>
                        <option value="Hatid Sundo">Hatid Sundo</option>
                        <option value="Bill Payment">Bill Payment</option>
                        <option value="Pera Padala">Pera Padala</option>
                    </select>
                </div>
            </div>

            <div className="min-w-full h-96 overflow-x-auto overflow-y-auto">
                <table className="min-w-full bg-lightWhite border border-gray-200">
                    <thead className="bg-gray-800 text-lightWhite sticky top-0">
                        <tr className="text-left">
                            {getTableColumns().map(({ name }, index) => (
                                <th key={index} className="py-2 px-4 border-b">{name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={getTableColumns().length + 1} className="py-4 text-center">
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            orders
                                .filter(order => order.status === 'Completed')
                                .filter(order => serviceFilter === 'All' || order.service === serviceFilter)
                                .map((order) => (
                                    <tr key={order.id} className="text-left">
                                        {getTableColumns().map(({ key }, index) => (
                                            <td key={index} className="py-2 px-4 border-b">
                                                {key === 'customerName' && order.customerFirstName && order.customerLastName
                                                    ? `${order.customerFirstName} ${order.customerLastName}`
                                                    : key === 'senderName' && order.customerFirstName && order.customerLastName
                                                        ? `${order.customerFirstName} ${order.customerLastName}`
                                                        : key === 'receiverName' && order.receiverFirstName && order.receiverLastName
                                                            ? `${order.receiverFirstName} ${order.receiverLastName}`
                                                            : order[key] !== undefined ? order[key] : 'N/A'}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewOrderHistory;
