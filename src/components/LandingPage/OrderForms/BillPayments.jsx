import React, { useState } from 'react';
import { db } from '../../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';

const OrderForm = ({ onClose, serviceName }) => {

    const { currentUser } = useAuth();

    const [formData, setFormData] = useState({
        service: 'Bill Payments', 
        status: 'Pending',
        senderFirstName: '',
        senderLastName: '',
        senderPhone: '',
        senderAddressHouse: '',
        senderAddressStreet: '',
        senderAddressBarangay: '',
        senderAddressCity: '',
        senderAddressRegion: '',
        senderAddressZIP: '',
        receiverFirstName: '',
        receiverLastName: '',
        receiverPhone: '',
        receiverAddressHouse: '',
        receiverAddressStreet: '',
        receiverAddressBarangay: '',
        receiverAddressCity: '',
        receiverAddressRegion: '',
        receiverAddressZIP: '',
        amount: '',
    });

    const [showPopup, setShowPopup] = useState(false);

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
            const orderData = {
                ...formData,
                userId: currentUser.uid,
                createdAt: new Date().toISOString(),
            };

            const result = await addDoc(collection(db, 'orders'), orderData);
            console.log('Order created with ID:', result.id);

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
        <div className='flex justify-center min-h-screen w-full rounded-full'>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[50px] w-full text-darkBlack">
            <h1 className="text-2xl font-bold text-center mb-6">Bill Payments</h1>

                <div className="mb-2">
                    <h2 className="font-semibold mb-2">Sender Information:</h2>
                    <div className="grid lg:grid-cols-2 gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="border p-2 w-full rounded"
                            required
                            name='senderFirstName'
                            value={formData.senderFirstName}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="border p-2 w-full rounded"
                            required
                            name='senderLastName'
                            value={formData.senderLastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="border p-2 w-full rounded mb-4"
                        required
                        name='senderPhone'
                        value={formData.senderPhone}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-2">
                    <h2 className="font-semibold mb-2">Receiver Information:</h2>
                    <div className="grid lg:grid-cols-2 gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="border p-2 w-full rounded"
                            required
                            name='receiverFirstName'
                            value={formData.receiverFirstName}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="border p-2 w-full rounded"
                            required
                            name='receiverLastName'
                            value={formData.receiverLastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="border p-2 w-full rounded mb-4"
                        required
                        name='receiverPhone'
                        value={formData.receiverPhone}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Amount:</h2>
                    <input
                        type="text"
                        placeholder="e.g. 500"
                        className="border p-2 w-full rounded"
                        required
                        name='amount'
                        value={formData.amount}
                        onChange={handleInputChange}
                    />
                </div>

                <button
                    className="bg-darkBlack text-lightWhite py-2 w-full rounded"
                    type='submit'
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

export default OrderForm;
