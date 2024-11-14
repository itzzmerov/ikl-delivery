import React, { useState } from 'react';
import { db } from '../../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';

const BillPayments = ({ onClose }) => {
    const { currentUser } = useAuth();
    const [showPopup, setShowPopup] = useState(false);

    const [formData, setFormData] = useState({
        service: 'Bill Payment',
        status: 'Pending',
        customerFirstName: '',
        customerLastName: '',
        phoneNumber: '',
        emailAddress: '',
        billType: '',
        accountNumber: '',
        amount: '',
        billDate: '',
        dueDate: '',
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
            const paymentData = {
                ...formData,
                userId: currentUser.uid,
                createdAt: new Date().toISOString(),
            };

            const result = await addDoc(collection(db, 'orders'), paymentData);
            console.log('Bill Payment created with ID:', result.id);

            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
                onClose();
            }, 3000);

        } catch (error) {
            console.error('Error adding bill payment:', error.message);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen w-full rounded-full'>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[50px] w-full text-darkBlack">
                <h1 className="text-2xl font-bold text-center mb-6">Bill Payment</h1>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Customer Information:</h2>
                    <div className="grid lg:grid-cols-2 gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="border p-2 w-full rounded"
                            required
                            name='customerFirstName'
                            value={formData.customerFirstName}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="border p-2 w-full rounded"
                            required
                            name='customerLastName'
                            value={formData.customerLastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="border p-2 w-full rounded mb-2"
                        required
                        name='phoneNumber'
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="border p-2 w-full rounded mb-4"
                        required
                        name='emailAddress'
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Bill Information:</h2>
                    <input
                        type="text"
                        placeholder="Bill Type (e.g., Electricity, Water)"
                        className="border p-2 w-full rounded mb-2"
                        required
                        name='billType'
                        value={formData.billType}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Account Number"
                        className="border p-2 w-full rounded mb-2"
                        required
                        name='accountNumber'
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Payment Details:</h2>
                    <input
                        type="number"
                        placeholder="Amount"
                        className="border p-2 w-full rounded mb-2"
                        required
                        name='amount'
                        value={formData.amount}
                        onChange={handleInputChange}
                    />
                    <input
                        type="date"
                        placeholder="Bill Date"
                        className="border p-2 w-full rounded mb-2"
                        required
                        name='billDate'
                        value={formData.billDate}
                        onChange={handleInputChange}
                    />
                    <input
                        type="date"
                        placeholder="Due Date"
                        className="border p-2 w-full rounded mb-4"
                        required
                        name='dueDate'
                        value={formData.dueDate}
                        onChange={handleInputChange}
                    />
                </div>

                <button
                    className="bg-darkBlack text-lightWhite py-2 w-full rounded"
                    type='submit'
                    onClick={handleSubmit}
                >
                    Submit Payment
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

export default BillPayments;
