import React, { useState } from 'react';
import { db } from '../../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';

const Pamalengke = ({ onClose }) => {
    const { currentUser } = useAuth();

    const [formData, setFormData] = useState({
        service: 'Pamalengke', // Preset service type as "Pamalengke"
        status: 'Pending',
        customerFirstName: '',
        customerLastName: '',
        phoneNumber: '',
        listOfItems: '',
        storePreference: '',
        estimatedPrice: '',
        specialInstructions: '',
    });

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
            const pamalengkeData = {
                ...formData,
                userId: currentUser.uid, // Add userId field
                createdAt: new Date().toISOString(), // Add timestamp
            };

            const result = await addDoc(collection(db, 'orders'), pamalengkeData);
            console.log('Pamalengke request created with ID:', result.id);
            onClose();
        } catch (error) {
            console.error('Error adding Pamalengke request:', error.message);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen w-full rounded-full'>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[50px] w-full text-darkBlack">
                <h1 className="text-2xl font-bold text-center mb-6">Pamalengke</h1>

                {/* Customer Information */}
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

                {/* Shopping Details */}
                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Shopping Details:</h2>
                    <div className="mb-2">
                        <label htmlFor="listOfItems" className="block mb-1">List of Items:</label>
                        <textarea
                            id="listOfItems"
                            placeholder="e.g., 2kg rice, 1 dozen eggs"
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
                            placeholder="e.g., Supermarket, Local Market"
                            className="border p-2 w-full rounded"
                            name='storePreference'
                            value={formData.storePreference}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {/* Price and Special Instructions */}
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

                {/* Submit Button */}
                <button
                    className="bg-darkBlack text-lightWhite py-2 w-full rounded"
                    type='submit'
                    onClick={handleSubmit}
                >
                    Submit Request
                </button>
            </div>
        </div>
    );
};

export default Pamalengke;
