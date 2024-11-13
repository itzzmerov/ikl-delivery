import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/firebase';
import { collection, /*deleteDoc,*/ doc, getDocs, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RiderAssignmentModal from '../Modals/RiderAssignmentModal/RiderAssignmentModal';

const OrderList = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const fetchOrders = async () => {
        const response = await getDocs(collection(db, "orders"));
        const orderList = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(orderList);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // const handleUpdateOrder = (id) => {
    //     navigate(`/admin/order/${id}/update-order`);
    // };

    // const handleDeleteOrder = async (id) => {
    //     try {
    //         await deleteDoc(doc(db, 'orders', id));
    //         fetchOrders();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const handleAcceptOrder = (orderId) => {
        setSelectedOrderId(orderId);
        setShowModal(true); // Open the modal to assign a rider
    };

    const handleRejectOrder = async (orderId) => {
        try {
            await updateDoc(doc(db, "orders", orderId), {
                status: 'Rejected'
            });
            alert("Order rejected successfully");
            fetchOrders(); // Refresh the order list
        } catch (error) {
            console.error("Error rejecting order:", error);
        }
    };

    const openOrderForm = () => {
        navigate("/admin/order/new-order")
    }

    return (
        <div className="p-8 flex-1">
            <div className='flex justify-between items-center mb-2'>
                <h1 className="text-2xl font-semibold mb-4">Order List</h1>
                <button onClick={openOrderForm} className='bg-darkBlack p-2 text-lightWhite hover:bg-lightBlack'><AddIcon /> Add Order</button>
            </div>

            {/* Scrollable container */}
            <div className="min-w-full h-96 overflow-x-auto overflow-y-auto">
                <table className="min-w-full bg-lightWhite border border-gray-200">
                    <thead className="bg-gray-800 text-lightWhite sticky top-0">
                        <tr className="text-left">
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Services</th>
                            <th className="py-2 px-4 border-b">Sender Name</th>
                            <th className="py-2 px-4 border-b">Sender Phone</th>
                            <th className="py-2 px-4 border-b">Sender Address</th>
                            <th className="py-2 px-4 border-b">Receiver Name</th>
                            <th className="py-2 px-4 border-b">Receiver Phone</th>
                            <th className="py-2 px-4 border-b">Receiver Address</th>
                            <th className="py-2 px-4 border-b">Amount</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="py-4 text-center">
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="text-left">
                                    <td className="py-2 px-4 border-b">{order.status}</td>
                                    <td className="py-2 px-4 border-b">{order.service}</td>
                                    <td className="py-2 px-4 border-b">{order.senderFirstName} {order.senderLastName}</td>
                                    <td className="py-2 px-4 border-b">{order.senderPhone}</td>
                                    <td className="py-2 px-4 border-b">{order.senderAddressHouse} {order.senderAddressStreet} {order.senderAddressBarangay} {order.senderAddressCity} {order.senderAddressRegion} {order.senderAddressZIP}</td>
                                    <td className="py-2 px-4 border-b">{order.receiverFirstName} {order.receiverLastName}</td>
                                    <td className="py-2 px-4 border-b">{order.receiverPhone}</td>
                                    <td className="py-2 px-4 border-b">{order.receiverAddressHouse} {order.receiverAddressStreet} {order.receiverAddressBarangay} {order.receiverAddressCity} {order.receiverAddressRegion} {order.receiverAddressZIP}</td>
                                    <td className="py-2 px-4 border-b">{order.amount}</td>
                                    <td className="py-2 px-4 border-b flex gap-2">
                                        <button
                                            onClick={() => handleAcceptOrder(order.id)}
                                            className="flex items-center gap-1 px-2 py-1 text-green-500 border border-green-500 rounded hover:bg-green-500 hover:text-lightWhite transition"
                                        >
                                            <span>Accept</span>
                                        </button>
                                        <button
                                            onClick={() => handleRejectOrder(order.id)}
                                            className="flex items-center gap-1 px-2 py-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-lightWhite transition"
                                        >
                                            <span>Reject</span>
                                        </button>
                                        {showModal && (
                                            <RiderAssignmentModal
                                                orderId={selectedOrderId}
                                                onClose={() => setShowModal(false)}
                                                onSubmit={fetchOrders} // Refresh orders after submission
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
