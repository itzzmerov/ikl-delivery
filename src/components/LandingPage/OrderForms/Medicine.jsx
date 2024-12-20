import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';

const Medicine = ({ onClose }) => {
    const { currentUser } = useAuth();
    const [showPopup, setShowPopup] = useState(false);

    const [formData, setFormData] = useState({
        service: 'Medicine',
        status: 'Pending',
        customerFirstName: '',
        customerLastName: '',
        phoneNumber: '',
        listOfItems: '',
        storePreference: '',
        estimatedPrice: '',
        specialInstructions: '',
        address: '',
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

        fetchUserData();
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
            const medicineData = {
                ...formData,
                userId: currentUser.uid,
                createdAt: new Date().toISOString(),
            };

            const result = await addDoc(collection(db, 'orders'), medicineData);
            console.log('Medicine request created with ID:', result.id);

            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
                onClose();
            }, 3000);
        } catch (error) {
            console.error('Error adding Medicine request:', error.message);
        }
    };

    return (
        <div className='flex justify-center h-auto w-full rounded-full'>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[50px] w-full text-darkBlack">
                <h1 className="text-2xl font-bold text-center mb-6">Medicine</h1>

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
                        <label htmlFor="address" className="block mb-1">Address:</label>
                        <textarea
                            id="address"
                            className="border p-2 w-full rounded"
                            required
                            name='address'
                            value={formData.address}
                            onChange={handleInputChange}
                        />
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
                    <h2 className="font-semibold mb-2">Shopping Details:</h2>
                    <div className="mb-2">
                        <label htmlFor="listOfItems" className="block mb-1">List of Items:</label>
                        <textarea
                            id="listOfItems"
                            placeholder="e.g., 2 Biogesic, 1 Bioflu"
                            className="border p-2 w-full rounded"
                            required
                            name='listOfItems'
                            value={formData.listOfItems}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="storePreference" className="block mb-1">Store Preference:</label>
                        <input
                            type="text"
                            id="storePreference"
                            placeholder="e.g., Mercury Drug, Southstar"
                            className="border p-2 w-full rounded"
                            name='storePreference'
                            value={formData.storePreference}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Additional Details:</h2>
                    <div className="mb-2">
                        <label htmlFor="estimatedPrice" className="block mb-1">Estimated Price:</label>
                        <input
                            type="number"
                            id="estimatedPrice"
                            placeholder="e.g., 1000"
                            className="border p-2 w-full rounded"
                            required
                            name='estimatedPrice'
                            value={formData.estimatedPrice}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="specialInstructions" className="block mb-1">Special Instructions:</label>
                        <textarea
                            id="specialInstructions"
                            placeholder="Any specific instructions for the shopper"
                            className="border p-2 w-full rounded"
                            name='specialInstructions'
                            value={formData.specialInstructions}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <button
                    className="bg-darkBlack text-lightWhite py-2 w-full rounded"
                    type='submit'
                    onClick={handleSubmit}
                >
                    Submit
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

export default Medicine;
