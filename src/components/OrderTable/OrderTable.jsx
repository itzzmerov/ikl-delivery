import React, { useState, useEffect } from 'react'
import { db } from '../../utils/firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const OrderTable = () => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const response = await getDocs(collection(db, "orders"));
        const orderList = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(orderList);
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    const handleUpdateOrder = (id) => {
        navigate(`/order/${id}/update-order`)
    }

    const handleDeleteOrder = async (id) => {
        try {
            await deleteDoc(doc(db, 'orders', id))
            fetchOrders()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <div className="mt-8 overflow-x-auto">
                <div className="w-[1200px] min-w-full lg:w-full lg:min-w-max">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-800 text-white">
                            <tr className="text-left">
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
                                    <td>No data Found</td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className="text-left">
                                        <td className="py-2 px-4 border-b">{order.senderFirstName} {order.senderLastName}</td>
                                        <td className="py-2 px-4 border-b">{order.senderPhone}</td>
                                        <td className="py-2 px-4 border-b">{order.senderAddressHouse} {order.senderAddressStreet} {order.senderAddressBarangay} {order.senderAddressCity} {order.senderAddressRegion} {order.senderAddressZIP}</td>
                                        <td className="py-2 px-4 border-b">{order.receiverFirstName} {order.receiverLastName}</td>
                                        <td className="py-2 px-4 border-b">{order.receiverPhone}</td>
                                        <td className="py-2 px-4 border-b">{order.receiverAddressHouse} {order.receiverAddressStreet} {order.receiverAddressBarangay} {order.receiverAddressCity} {order.receiverAddressRegion} {order.receiverAddressZIP}</td>
                                        <td className="py-2 px-4 border-b">{order.amount}</td>
                                        <td className="py-2 px-4 border-b flex gap-2">
                                            <button
                                                onClick={() => handleUpdateOrder(order.id)}
                                                className="flex items-center gap-1 px-2 py-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
                                            >
                                                <EditIcon fontSize="small" />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteOrder(order.id)}
                                                className="flex items-center gap-1 px-2 py-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition"
                                            >
                                                <DeleteIcon fontSize="small" />
                                                <span>Delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))

                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OrderTable