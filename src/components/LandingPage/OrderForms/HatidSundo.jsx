import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/firebase';
import { collection, addDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';

const HatidSundo = ({ onClose }) => {
    const { currentUser } = useAuth();
    const [showPopup, setShowPopup] = useState(false);
    const [basePrice, setBasePrice] = useState(0);

    const [formData, setFormData] = useState({
        service: 'Hatid Sundo',
        status: 'Pending',
        customerFirstName: '',
        customerLastName: '',
        phoneNumber: '',
        pickupLocation: '',
        dropoffLocation: '',
        pickupTime: '',
        specialRequests: '',
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
                    where('name', '==', 'Hatid Sundo')
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
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            console.error('User not logged in');
            return;
        }

        try {
            const hatidSundoData = {
                ...formData,
                userId: currentUser.uid,
                createdAt: new Date().toISOString(),
                basePrice,
            };

            const result = await addDoc(collection(db, 'orders'), hatidSundoData);
            console.log('Hatid Sundo request created with ID:', result.id);

            const notificationMessage = `${formData.customerFirstName} ${formData.customerLastName} has placed a new ${formData.service} order.`;
            await addDoc(collection(db, 'notifications'), {
                message: notificationMessage,
                timestamp: new Date(),
                isread_customer: "unread",
                isread_admin: "unread",
                isread_rider: "unread",
                userId: currentUser.uid,
            });

            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
                onClose();
            }, 3000);
        } catch (error) {
            console.error('Error adding Hatid Sundo request:', error.message);
        }
    };

    return (
        <div className='flex justify-center h-auto w-full rounded-full'>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[50px] w-full text-darkBlack">
                <h1 className="text-2xl font-bold text-center mb-6">Hatid Sundo</h1>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Customer Information:</h2>
                    <div className="grid lg:grid-cols-2 gap-2 mb-2">
                        <div>
                            <label htmlFor="customerFirstName" className="block mb-1">First Name:</label>
                            <input
                                type="text"
                                id="customerFirstName"
                                className="border p-2 w-full rounded"
                                required
                                name='customerFirstName'
                                value={formData.customerFirstName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="customerLastName" className="block mb-1">Last Name:</label>
                            <input
                                type="text"
                                id="customerLastName"
                                className="border p-2 w-full rounded"
                                required
                                name='customerLastName'
                                value={formData.customerLastName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="phoneNumber" className="block mb-1">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            className="border p-2 w-full rounded"
                            required
                            name='phoneNumber'
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Trip Information:</h2>
                    <div className="mb-2">
                        <label htmlFor="pickupLocation" className="block mb-1">Pickup Location:</label>
                        <input
                            type="text"
                            id="pickupLocation"
                            className="border p-2 w-full rounded"
                            required
                            name='pickupLocation'
                            value={formData.pickupLocation}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="dropoffLocation" className="block mb-1">Dropoff Location:</label>
                        <input
                            type="text"
                            id="dropoffLocation"
                            className="border p-2 w-full rounded"
                            required
                            name='dropoffLocation'
                            value={formData.dropoffLocation}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Additional Details:</h2>
                    <div className="mb-2">
                        <label htmlFor="pickupTime" className="block mb-1">Pickup Time:</label>
                        <input
                            type="time"
                            id="pickupTime"
                            className="border p-2 w-full rounded"
                            required
                            name='pickupTime'
                            value={formData.pickupTime}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="specialRequests" className="block mb-1">Special Requests:</label>
                        <textarea
                            id="specialRequests"
                            className="border p-2 w-full rounded"
                            name='specialRequests'
                            value={formData.specialRequests}
                            onChange={handleInputChange}
                        />
                    </div>
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
                    type='submit'
                    onClick={handleSubmit}
                >
                    Submit Request
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

export default HatidSundo;
