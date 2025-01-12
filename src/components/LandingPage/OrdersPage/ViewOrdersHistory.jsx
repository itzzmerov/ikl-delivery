import React, { useEffect, useState } from 'react';
import { db } from '../../../utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const ViewOrdersHistory = ({ onClose }) => {
    const { currentUser } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!currentUser) return;

            const ordersRef = collection(db, 'orders');
            const q = query(ordersRef, where('userId', '==', currentUser.uid));

            try {
                const querySnapshot = await getDocs(q);
                const fetchedOrders = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                const filteredOrders = fetchedOrders.filter(
                    (order) => order.status !== 'Pending'
                );

                const sortedOrders = filteredOrders.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA;
                });

                setOrders(sortedOrders);
            } catch (error) {
                console.error('Error fetching orders history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [currentUser]);

    // Handle the "View" button click
    const handleViewOrder = (order) => {
        const transformedOrder = {
            Status: order.status || 'N/A',
            Service: order.service || 'N/A',
            'Customer Name': `${order.customerFirstName || 'N/A'} ${order.customerLastName || 'N/A'}`,
            'Order Date': order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : 'N/A',
            ...Object.fromEntries(
                Object.entries(order).filter(
                    ([key]) => !['id', 'userId', 'riderId', 'createdAt', 'updatedAt', 'acceptedAt', 'customerFirstName', 'customerLastName', 'customerPhone', 'customerAddress', 'address', 'phoneNumber', 'senderAddress', 'status', 'service', 'itemsToBuy'].includes(key)
                )
            ),
        };

        if (order.basePrice !== undefined) {
            transformedOrder['Delivery Fee'] = order.basePrice;
            delete transformedOrder.basePrice;
        }

        if (order.receiverFirstName !== undefined) {
            transformedOrder['Receiver Name'] = `${order.receiverFirstName || 'N/A'} ${order.receiverLastName || 'N/A'}`;
            delete transformedOrder.receiverFirstName;
            delete transformedOrder.receiverLastName;
        }

        if (order.itemsToBuy && order.itemsToBuy.length > 0) {
            transformedOrder['Items to Buy'] = order.itemsToBuy;
        }

        setSelectedOrder(transformedOrder);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-full max-w-2xl bg-white text-darkBlack p-6 rounded-lg shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-gray-200 text-darkBlack rounded-full p-2"
                >
                    <CloseOutlinedIcon />
                </button>
                <h2 className="text-lg font-bold mb-4">Order History</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : orders.length > 0 ? (
                    <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr className="bg-darkGreen text-lightWhite uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Status</th>
                                    <th className="py-3 px-6 text-left">Service</th>
                                    <th className="py-3 px-6 text-left">Order Date</th>
                                    <th className="py-3 px-6 text-left">Rider Name</th>
                                    <th className="py-3 px-6 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-darkBlack text-sm">
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left">{order.status}</td>
                                        <td className="py-3 px-6 text-left">{order.service}</td>
                                        <td className="py-3 px-6 text-left">
                                            {order.createdAt
                                                ? new Date(order.createdAt).toLocaleString()
                                                : 'N/A'}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {order.riderName || 'Not Assigned'}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <button
                                                onClick={() => handleViewOrder(order)}
                                                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 mr-2"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No order history found.</p>
                )}

                {/* Modal for viewing order details */}
                {showModal && selectedOrder && (
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="relative w-full max-w-lg bg-white text-darkBlack p-6 rounded-lg shadow-lg">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 bg-gray-200 text-darkBlack rounded-full p-2"
                            >
                                <CloseOutlinedIcon />
                            </button>
                            <h2 className="text-lg font-bold mb-4">Order Details</h2>
                            <div className="text-sm">
                                {Object.entries(selectedOrder).map(([key, value]) => (
                                    <div key={key} className="mb-2">
                                        <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}: </strong>
                                        {key === 'Items to Buy' && Array.isArray(value) ? (
                                            <ul className="list-disc ml-5">
                                                {value.map((item, index) => (
                                                    <li key={index}>
                                                        {item.name} - {item.quantity} x ₱{item.price}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>{String(value)}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewOrdersHistory;
