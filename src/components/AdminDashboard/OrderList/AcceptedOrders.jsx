import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/firebase';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RiderAssignmentModal from '../Modals/RiderAssignmentModal/RiderAssignmentModal';



const AcceptedOrders = () => {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [serviceFilter, setServiceFilter] = useState("All");

    const statusSteps = ['Accepted', 'Picked Up', 'On the Way', 'Completed'];

    const fetchOrders = async () => {
        const response = await getDocs(collection(db, "orders"));
        const orderList = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(orderList);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

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
    };

    const closeViewModal = () => {
        setSelectedOrder(null);
    };

    const openOrderForm = () => {
        navigate("/admin/order/new-order");
    };

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
                    { name: 'Total Price', key: 'totalPrice' },
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
            case 'Medicine':
                return [
                    { name: 'Status', key: 'status' },
                    { name: 'Customer Name', key: 'customerName' },
                    { name: 'Sender Address', key: 'address' },
                    { name: 'Phone Number', key: 'phoneNumber' },
                    { name: 'List of Items', key: 'listOfItems' },
                    { name: 'Store Preference', key: 'storePreference' },
                    { name: 'Estimated Price', key: 'estimatedPrice' },
                    { name: 'Special Instructions', key: 'specialInstructions' }
                ];
            default:
                return [
                    { name: 'Status', key: 'status' },
                    { name: 'Services', key: 'service' },
                    { name: 'Customer Name', key: 'customerName' },
                    { name: 'Phone Number', key: 'phoneNumber' },
                ];
        }
    };

    return (
        <div className="p-8 h-[89vh] flex-1">
            <div className='flex justify-between items-center mb-2'>
                <h1 className="text-2xl font-semibold mb-4">Order List</h1>
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
                        <option value="Medicine">Medicine</option>
                        <option value="Hatid Sundo">Hatid Sundo</option>
                        <option value="Bill Payment">Bill Payment</option>
                        <option value="Pera Padala">Pera Padala</option>
                    </select>
                    <button onClick={openOrderForm} className='bg-darkBlack p-2 text-lightWhite hover:bg-lightBlack'>
                        <AddIcon /> Add Order
                    </button>
                </div>
            </div>

            <div className="min-w-full h-[90%] overflow-x-auto overflow-y-auto">
                <table className="min-w-full bg-lightWhite border border-gray-200">
                    <thead className="bg-gray-800 text-lightWhite sticky top-0">
                        <tr className="text-left">
                            {getTableColumns().map(({ name }, index) => (
                                <th key={index} className="py-2 px-4 border-b">{name}</th>
                            ))}
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Actions</th>
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
                                                            : key === 'itemsToBuy' && serviceFilter === 'Food Delivery' ? (
                                                                <div>
                                                                    {order.itemsToBuy && order.itemsToBuy.length > 0 ? (
                                                                        order.itemsToBuy.map((item, index) => (
                                                                            <div key={index}>
                                                                                <p>{item.name} - {item.quantity} x ₱{item.price}</p>
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                        <p>No items selected</p>
                                                                    )}
                                                                </div>
                                                            ) : order[key] !== undefined ? order[key] : 'N/A'}
                                            </td>
                                        ))}
                                        <td className="py-2 px-4 border-b">
                                            <div className="flex items-center justify-between mb-4">
                                                {statusSteps.map((step, index) => (
                                                    <div key={index} className="flex flex-col items-center">
                                                        <div
                                                            className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${order.status === step
                                                                ? 'bg-green-500'
                                                                : index < statusSteps.indexOf(order.status)
                                                                    ? 'bg-green-300'
                                                                    : 'bg-gray-400'
                                                                }`}
                                                        >
                                                            {index + 1}
                                                        </div>
                                                        <p className="text-xs mt-1">{step}</p>
                                                    </div>

                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b flex gap-2">
                                            <button
                                                onClick={() => handleViewOrder(order)}
                                                className="text-blue-500 hover:bg-blue-500 hover:text-lightWhite border border-blue-500 rounded py-2 px-4"
                                            >
                                                View
                                            </button>

                                            {/* {showModal && (
                                                <RiderAssignmentModal
                                                    orderId={selectedOrderId}
                                                    onClose={() => setShowModal(false)}
                                                    onSubmit={fetchOrders}
                                                />
                                            )} */}

                                            {selectedOrder && (
                                                <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50">

                                                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                                                        <h2 className="text-xl font-semibold mb-4">Order Details</h2>

                                                        <div>
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
                                                        <div className="mt-4 flex justify-end">
                                                            <button onClick={closeViewModal} className="bg-gray-500 text-white p-2 rounded">Close</button>
                                                        </div>
                                                    </div>
                                                </div>
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

export default AcceptedOrders;
