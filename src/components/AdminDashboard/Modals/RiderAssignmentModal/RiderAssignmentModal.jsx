import React, { useEffect, useState } from 'react';
import { db } from '../../../../utils/firebase';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

const RiderAssignmentModal = ({ orderId, onClose, onSubmit }) => {
    const [riders, setRiders] = useState([]);
    const [selectedRiderId, setSelectedRiderId] = useState('');
    const [selectedRiderName, setSelectedRiderName] = useState('');

    // Fetch available riders from the database
    const fetchAvailableRiders = async () => {
        try {
            const q = query(collection(db, "users"), where("userType", "==", "rider"));
            const snapshot = await getDocs(q);
            const riderList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setRiders(riderList);
        } catch (error) {
            console.error("Error fetching riders:", error);
        }
    };

    useEffect(() => {
        fetchAvailableRiders();
    }, []);

    // Handle rider selection
    const handleRiderChange = (e) => {
        const riderId = e.target.value;
        const selectedRider = riders.find((rider) => rider.id === riderId);
        const riderName = `${selectedRider.firstName} ${selectedRider.lastName}`;
        setSelectedRiderId(riderId);
        setSelectedRiderName(riderName);
    };

    // Assign rider to the order
    const handleAssignRider = async () => {
        try {
            await updateDoc(doc(db, "orders", orderId), {
                riderId: selectedRiderId,
                riderName: selectedRiderName,
                status: 'Accepted',
            });
            alert("Rider assigned and order accepted!");
            onSubmit();
            onClose();
        } catch (error) {
            console.error("Error assigning rider:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Assign Rider</h2>
                <select
                    value={selectedRiderId}
                    onChange={handleRiderChange}
                    className="border p-2 w-full mb-4"
                >
                    <option value="" disabled>Select a rider</option>
                    {riders.map((rider) => (
                        <option key={rider.id} value={rider.id}>
                            {rider.firstName} {rider.lastName}
                        </option>
                    ))}
                </select>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAssignRider}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Assign Rider
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RiderAssignmentModal;
