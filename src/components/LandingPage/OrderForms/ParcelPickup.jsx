import React, { useState } from 'react';
import { db } from '../../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';

const ParcelPickup = ({ onClose }) => {
    const { currentUser } = useAuth();

    const [formData, setFormData] = useState({
        service: 'Parcel Pickup', 
        status: 'Pending',
        customerFirstName: '',
        customerLastName: '',
        phoneNumber: '',
        parcelDetails: '',
        pickupLocation: '',
        estimatedWeight: '',
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
            const parcelData = {
                ...formData,
                userId: currentUser.uid, 
                createdAt: new Date().toISOString(),
            };

            const result = await addDoc(collection(db, 'orders'), parcelData);
            console.log('Parcel Pickup request created with ID:', result.id);
            onClose();
        } catch (error) {
            console.error('Error adding Parcel Pickup request:', error.message);
        }
    };

    return (
        <div className='flex justify-centermin-h-screen w-full rounded-full'>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[50px] w-full text-darkBlack">
                <h1 className="text-2xl font-bold text-center mb-6">Parcel Pickup</h1>

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

                {/* Parcel Details */}
                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Parcel Details:</h2>
                    <div className="mb-2">
                        <label htmlFor="parcelDetails" className="block mb-1">Parcel Details:</label>
                        <textarea
                            id="parcelDetails"
                            placeholder="e.g., documents, clothing, etc."
                            className="border p-2 w-full rounded"
                            required
                            name='parcelDetails'
                            value={formData.parcelDetails}
                            onChange={handleInputChange}
                        />
                    </div>
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
                </div>

                {/* Weight Details */}
                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Weight Information:</h2>
                    <div className="mb-2">
                        <label htmlFor="estimatedWeight" className="block mb-1">Estimated Weight (kg):</label>
                        <input
                            type="number"
                            id="estimatedWeight"
                            placeholder="e.g., 2.5 kg"
                            className="border p-2 w-full rounded"
                            required
                            name='estimatedWeight'
                            value={formData.estimatedWeight}
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
                    Submit Pickup Request
                </button>
            </div>
        </div>
    );
};

export default ParcelPickup;