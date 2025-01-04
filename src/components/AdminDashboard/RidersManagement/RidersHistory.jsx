import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

const RiderHistory = () => {
    const [riderHistory, setRiderHistory] = useState([]);
    const [riderFilter, setRiderFilter] = useState("All");

    // Fetch all orders with status "Completed"
    const fetchRiderHistory = async () => {
        const response = await getDocs(collection(db, "orders"));
        const completedOrders = response.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(order => order.status === "Completed");
        setRiderHistory(completedOrders);
    };

    useEffect(() => {
        fetchRiderHistory();
    }, []);

    // Define table columns
    const tableColumns = [
        { name: "Rider Name", key: "riderName" },
        { name: "Service", key: "service" },
        { name: "Delivery Fee", key: "basePrice" },
        { name: "Customer Name", key: "customerName" },
        { name: "Customer Phone Number", key: "phoneNumber" }
    ];

    // Filter data based on rider name
    const filteredHistory =
        riderFilter === "All"
            ? riderHistory
            : riderHistory.filter(order => order.riderName === riderFilter);

    return (
        <div className="p-8 flex-1">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Rider History</h1>
                <select
                    value={riderFilter}
                    onChange={(e) => setRiderFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="All">All Riders</option>
                    {[...new Set(riderHistory.map(order => order.riderName))].map((rider, index) => (
                        <option key={index} value={rider}>
                            {rider}
                        </option>
                    ))}
                </select>
            </div>

            <div className="min-w-full h-96 overflow-x-auto overflow-y-auto">
                <table className="min-w-full bg-lightWhite border border-gray-200">
                    <thead className="bg-gray-800 text-lightWhite sticky top-0">
                        <tr>
                            {tableColumns.map((col, index) => (
                                <th key={index} className="py-2 px-4 border-b">
                                    {col.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHistory.length === 0 ? (
                            <tr>
                                <td colSpan={tableColumns.length} className="py-4 text-center">
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            filteredHistory.map(order => (
                                <tr key={order.id} className="text-left">
                                    {tableColumns.map((col, index) => (
                                        <td key={index} className="py-2 px-4 border-b">
                                            {col.key === "customerName"
                                                ? `${order.customerFirstName || "N/A"} ${order.customerLastName || ""
                                                }`
                                                : order[col.key] || "N/A"}
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

export default RiderHistory;