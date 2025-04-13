import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/firebase';
import { collection, addDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';

const PeraPadala = ({ onClose }) => {
    const { currentUser } = useAuth();
    const [showPopup, setShowPopup] = useState(false);
    const [basePrice, setBasePrice] = useState(0);

    const [formData, setFormData] = useState({
        service: 'Pera Padala',
        status: 'Pending',
        customerFirstName: '',
        customerLastName: '',
        customerPhone: '',
        senderAddress: '',
        receiverFirstName: '',
        receiverLastName: '',
        receiverPhone: '',
        receiverAddress: '',
        amount: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (!currentUser) return;

            try {
                const userDoc = doc(db, 'users', currentUser.uid);
                const userSnapshot = await getDoc(userDoc);

                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    setFormData((prev) => ({
                        ...prev,
                        customerFirstName: userData.firstName || '',
                        customerLastName: userData.lastName || '',
                        address: `${userData.house || ''}, ${userData.street || ''}, ${userData.barangay || ''}, ${userData.city || ''}, ${userData.region || ''}, ${userData.zip || ''}`,
                        phoneNumber: userData.phoneNumber || '',
                    }));
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchBasePrice = async () => {
            try {
                const servicesQuery = query(
                    collection(db, 'services'),
                    where('name', '==', 'Bill Payments')
                );
                const querySnapshot = await getDocs(servicesQuery);

                if (!querySnapshot.empty) {
                    const serviceData = querySnapshot.docs[0].data();
                    setBasePrice(serviceData.basePrice);
                }
            } catch (error) {
                console.error('Error fetching base price:', error);
            }
        };


        fetchUserData();
        fetchBasePrice();
    }, [currentUser]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            console.error('User not logged in');
            return;
        }

        try {
            const orderData = {
                ...formData,
                userId: currentUser.uid,
                createdAt: new Date().toISOString(),
                basePrice,
            };

            await addDoc(collection(db, 'orders'), orderData);

            const notificationMessage = `${formData.customerFirstName} ${formData.customerLastName} has placed a new ${formData.service} order.`;
                await addDoc(collection(db, 'notifications'), {
                    message: notificationMessage,
                    timestamp: new Date(),
                    status: "unread",
            });

            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
                onClose();
            }, 3000);
        } catch (error) {
            console.error('Error adding order:', error.message);
        }
    };

    return (
        <div className='flex justify-center h-auto w-full rounded-full'>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[50px] w-full text-darkBlack">
                <h1 className="text-2xl font-bold text-center mb-6">Pera Padala</h1>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Sender Information:</h2>
                    <div className="grid lg:grid-cols-2 gap-2 mb-2">
                        <div>
                            <label htmlFor="customerFirstName" className="block mb-1">First Name:</label>
                            <input
                                type="text"
                                id="customerFirstName"
                                className="border p-2 w-full rounded"
                                name="customerFirstName"
                                value={formData.customerFirstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="customerLastName" className="block mb-1">Last Name:</label>
                            <input
                                type="text"
                                id="customerLastName"
                                className="border p-2 w-full rounded"
                                name="customerLastName"
                                value={formData.customerLastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="customerPhone" className="block mb-1">Phone Number:</label>
                        <input
                            type="text"
                            id="customerPhone"
                            className="border p-2 w-full rounded"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Sender Address:</h2>
                    <input
                        type="text"
                        id="senderAddress"
                        className="border p-2 w-full rounded"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Receiver Information:</h2>
                    <div className="grid lg:grid-cols-2 gap-2 mb-2">
                        <div>
                            <label htmlFor="receiverFirstName" className="block mb-1">First Name:</label>
                            <input
                                type="text"
                                id="receiverFirstName"
                                className="border p-2 w-full rounded"
                                name="receiverFirstName"
                                value={formData.receiverFirstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="receiverLastName" className="block mb-1">Last Name:</label>
                            <input
                                type="text"
                                id="receiverLastName"
                                className="border p-2 w-full rounded"
                                name="receiverLastName"
                                value={formData.receiverLastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="receiverPhone" className="block mb-1">Phone Number:</label>
                        <input
                            type="text"
                            id="receiverPhone"
                            className="border p-2 w-full rounded"
                            name="receiverPhone"
                            value={formData.receiverPhone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <h2 className=" mb-2">Receiver Address:</h2>
                    <input
                        type="text"
                        id="receiverAddress"
                        className="border p-2 w-full rounded"
                        name="receiverAddress"
                        value={formData.receiverAddress}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="amount" className="block mb-2">Amount (PHP):</label>
                    <input
                        type="number"
                        id="amount"
                        className="border p-2 w-full rounded"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {basePrice !== null && (
                    <div className="mt-4 text-right">
                        <p className="text-lg font-semibold py-4">
                            Delivery Fee: <span className="text-darkGreen">₱{basePrice}</span>
                        </p>
                    </div>
                )}

                <button
                    className="bg-darkBlack text-lightWhite py-2 w-full rounded"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Send Order
                </button>

                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-darkGreen text-white py-3 px-6 rounded-lg shadow-md">
                            <p>Added Order Successfully! Just wait for the confirmation. Thank you!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PeraPadala;
