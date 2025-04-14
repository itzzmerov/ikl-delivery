import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/firebase';
import { collection, addDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';

const SpecialDelivery = ({ onClose }) => {
    const { currentUser } = useAuth();
    const [showPopup, setShowPopup] = useState(false);
    const [basePrice, setBasePrice] = useState(0);

    const [formData, setFormData] = useState({
        service: 'Special Delivery',
        status: 'Pending',
        customerFirstName: '',
        customerLastName: '',
        phoneNumber: '',
        description: '',
        specialInstructions: '',
        estimatedCost: '',
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
            const deliveryData = {
                ...formData,
                userId: currentUser.uid,
                createdAt: new Date().toISOString(),
                basePrice,
            };

            const result = await addDoc(collection(db, 'orders'), deliveryData);
            console.log('Special Delivery request created with ID:', result.id);

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
            console.error('Error adding Special Delivery request:', error.message);
        }
    };

    return (
        <div className='flex justify-center h-auto w-full rounded-full'>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[50px] w-full text-darkBlack">
                <h1 className="text-2xl font-bold text-center mb-6">Special Delivery</h1>

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
                    <div className="mb-2">
                        <label htmlFor="customerAddress" className="block mb-1">Address:</label>
                        <input
                            type="text"
                            id="customerAddress"
                            className="border p-2 w-full rounded"
                            required
                            name='address'
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Delivery Details:</h2>
                    <div className="mb-2">
                        <label htmlFor="description" className="block mb-1">Description:</label>
                        <textarea
                            id="description"
                            placeholder="Describe the special delivery request"
                            className="border p-2 w-full rounded"
                            required
                            name='description'
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="specialInstructions" className="block mb-1">Special Instructions:</label>
                        <textarea
                            id="specialInstructions"
                            placeholder="Any special instructions for the delivery?"
                            className="border p-2 w-full rounded"
                            required
                            name='specialInstructions'
                            value={formData.specialInstructions}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="estimatedCost" className="block mb-1">Estimated Cost:</label>
                        <input
                            type="number"
                            id="estimatedCost"
                            placeholder="e.g., 500"
                            className="border p-2 w-full rounded"
                            required
                            name='estimatedCost'
                            value={formData.estimatedCost}
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
                    Submit Delivery Request
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

export default SpecialDelivery;
