import React, { useEffect, useState } from 'react';
import { db } from '../../../utils/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const OrdersPage = ({ onClose }) => {
    const { currentUser } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null); // To hold the selected order's details
    const [showModal, setShowModal] = useState(false); // To toggle modal visibility

    const fetchOrders = async () => {
        if (!currentUser) return;

        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('userId', '==', currentUser.uid), where('status', '==', 'Pending'));

        try {
            const querySnapshot = await getDocs(q);
            const fetchedOrders = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            const sortedOrders = fetchedOrders.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB - dateA;
            });

            setOrders(sortedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [currentUser]);

    const handleCancelOrder = async (orderId) => {
        try {
            const orderDocRef = doc(db, 'orders', orderId);
            await updateDoc(orderDocRef, { status: 'Cancelled' });

            setPopupMessage('Order successfully cancelled!');
            setShowPopup(true);

            await fetchOrders();

            setTimeout(() => setShowPopup(false), 2000);
        } catch (error) {
            console.error('Error cancelling order:', error);
            setPopupMessage('Failed to cancel the order.');
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
        }
    };

    const handleViewOrder = (order) => {
        const transformedOrder = {
            Status: order.status || 'N/A',
            Service: order.service || 'N/A',
            'Customer Name': `${order.customerFirstName || 'N/A'} ${order.customerLastName || 'N/A'}`,
            'Phone Number': `${order.phoneNumber || 'N/A'}`,
            'Address': `${order.address || order.customerAddress || order.pickupLocation || 'N/A'}`,
            ...Object.fromEntries(
                Object.entries(order).filter(
                    ([key]) => !['id', 'userId', 'createdAt', 'customerFirstName', 'customerLastName', 'customerPhone', 'customerAddress', 'address', 'phoneNumber', 'senderAddress', 'status', 'service', 'itemsToBuy'].includes(key)
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
        console.log(transformedOrder)
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setShowModal(false);
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
                <h2 className="text-lg font-bold mb-4">Pending Orders</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : orders.length > 0 ? (
                    <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr className="bg-darkGreen text-lightWhite uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Service</th>
                                    <th className="py-3 px-6 text-left">Order Date</th>
                                    <th className="py-3 px-6 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-darkBlack text-sm">
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left">{order.service}</td>
                                        <td className="py-3 px-6 text-left">
                                            {order.createdAt
                                                ? new Date(order.createdAt).toLocaleString()
                                                : 'N/A'}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <button
                                                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 mr-2"
                                                onClick={() => handleViewOrder(order)}
                                            >
                                                View
                                            </button>
                                            <button
                                                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                                onClick={() => handleCancelOrder(order.id)}
                                            >
                                                Cancel Order
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No pending orders found.</p>
                )}
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-md">
                        <p>{popupMessage}</p>
                    </div>
                </div>
            )}

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
    );
};

export default OrdersPage;
