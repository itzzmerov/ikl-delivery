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

            // Show popup message
            setPopupMessage('Order successfully cancelled!');
            setShowPopup(true);

            // Refresh orders
            await fetchOrders();

            setTimeout(() => setShowPopup(false), 2000);
        } catch (error) {
            console.error('Error cancelling order:', error);
            setPopupMessage('Failed to cancel the order.');
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
        }
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
        </div>
    );
};

export default OrdersPage;
