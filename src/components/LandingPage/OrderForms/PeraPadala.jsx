import React, { useState } from 'react';
import { db } from '../../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';

const PeraPadala = ({ onClose }) => {
    const { currentUser } = useAuth();

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
            };
    
            await addDoc(collection(db, 'orders'), orderData);
            onClose();
        } catch (error) {
            console.error('Error adding order:', error.message);
        }
    };

    return (
        <div className='flex justify-center min-h-screen w-full rounded-full'>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[50px] w-full text-darkBlack">
                <h1 className="text-2xl font-bold text-center mb-6">Pera Padala</h1>

                {/* Sender Information */}
                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Sender Information:</h2>
                    <div className="grid lg:grid-cols-2 gap-2 mb-2">
                        <div>
                            <label htmlFor="senderFirstName" className="block mb-1">First Name:</label>
                            <input
                                type="text"
                                id="senderFirstName"
                                className="border p-2 w-full rounded"
                                name="senderFirstName"
                                value={formData.senderFirstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="senderLastName" className="block mb-1">Last Name:</label>
                            <input
                                type="text"
                                id="senderLastName"
                                className="border p-2 w-full rounded"
                                name="senderLastName"
                                value={formData.senderLastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="senderPhone" className="block mb-1">Phone Number:</label>
                        <input
                            type="text"
                            id="senderPhone"
                            className="border p-2 w-full rounded"
                            name="senderPhone"
                            value={formData.senderPhone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                {/* Sender Address */}
                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Sender Address:</h2>
                    <input
                        type="text"
                        id="senderAddress"
                        className="border p-2 w-full rounded"
                        name="senderAddress"
                        value={formData.senderAddress}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Receiver Information */}
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

                {/* Receiver Address */}
                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Receiver Address:</h2>
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

                {/* Amount */}
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

                {/* Submit Button */}
                <button
                    className="bg-darkBlack text-lightWhite py-2 w-full rounded"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Send Order
                </button>
            </div>
        </div>
    );
};

export default PeraPadala;
