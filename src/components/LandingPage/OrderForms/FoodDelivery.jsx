import React, { useState } from 'react';
import { db } from '../../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';

const FoodDelivery = ({ onClose }) => {
    const { currentUser } = useAuth();
    const [showPopup, setShowPopup] = useState(false);

    const [formData, setFormData] = useState({
        service: 'Food Delivery', 
        status: 'Pending',
        customerFirstName: '',
        customerLastName: '',
        phoneNumber: '',
        storePreference: '',
        itemsToBuy: '',
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
            const deliveryData = {
                ...formData,
                userId: currentUser.uid, 
                createdAt: new Date().toISOString(),
            };
    
            const result = await addDoc(collection(db, 'orders'), deliveryData);
            console.log('Food Delivery request created with ID:', result.id);
    
            setShowPopup(true);
    
            setTimeout(() => {
                setShowPopup(false);
                onClose();
            }, 3000);
    
        } catch (error) {
            console.error('Error adding Food Delivery request:', error.message);
        }
    };

    return (
        <div className='flex justify-center min-h-screen w-full rounded-full'>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[50px] w-full text-darkBlack">
                <h1 className="text-2xl font-bold text-center mb-6">Food Delivery</h1>

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
                    <h2 className="font-semibold mb-2">Food Delivery Details:</h2>
                    <div className="mb-2">
                        <label htmlFor="storePreference" className="block mb-1">Store Preference:</label>
                        <input
                            type="text"
                            id="storePreference"
                            className="border p-2 w-full rounded"
                            required
                            name='storePreference'
                            value={formData.storePreference}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="itemsToBuy" className="block mb-1">Items to Buy:</label>
                        <textarea
                            id="itemsToBuy"
                            placeholder="e.g., Burger, Fries, Chicken Meal, etc."
                            className="border p-2 w-full rounded"
                            required
                            name='itemsToBuy'
                            value={formData.itemsToBuy}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="estimatedPrice" className="block mb-1">Estimated Price:</label>
                        <input
                            type="number"
                            id="estimatedPrice"
                            className="border p-2 w-full rounded"
                            required
                            name='estimatedPrice'
                            value={formData.estimatedPrice}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="specialInstructions" className="block mb-1">Special Instructions:</label>
                        <textarea
                            id="specialInstructions"
                            className="border p-2 w-full rounded"
                            required
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

export default FoodDelivery;
