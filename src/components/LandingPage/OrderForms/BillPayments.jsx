import React, { useState } from 'react';
import { db } from '../../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';

const BillPayments = ({ onClose }) => {
    const { currentUser } = useAuth();

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
            onClose();
        } catch (error) {
            console.error('Error adding bill payment:', error.message);
        }
    };

    return (
        <div className='flex justify-center min-h-screen w-full rounded-full'>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[50px] w-full text-darkBlack">
                <h1 className="text-2xl font-bold text-center mb-6">Bill Payment</h1>

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
                    <div className="mb-4">
                        <label htmlFor="emailAddress" className="block mb-1">Email Address:</label>
                        <input
                            type="email"
                            id="emailAddress"
                            className="border p-2 w-full rounded"
                            required
                            name='emailAddress'
                            value={formData.emailAddress}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Bill Information:</h2>
                    <div className="mb-2">
                        <label htmlFor="billType" className="block mb-1">Bill Type:</label>
                        <input
                            type="text"
                            id="billType"
                            placeholder="e.g., Electricity, Water"
                            className="border p-2 w-full rounded"
                            required
                            name='billType'
                            value={formData.billType}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="accountNumber" className="block mb-1">Account Number:</label>
                        <input
                            type="text"
                            id="accountNumber"
                            className="border p-2 w-full rounded"
                            required
                            name='accountNumber'
                            value={formData.accountNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Payment Details:</h2>
                    <div className="mb-2">
                        <label htmlFor="amount" className="block mb-1">Amount:</label>
                        <input
                            type="number"
                            id="amount"
                            placeholder="e.g., 500"
                            className="border p-2 w-full rounded"
                            required
                            name='amount'
                            value={formData.amount}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="billDate" className="block mb-1">Bill Date:</label>
                        <input
                            type="date"
                            id="billDate"
                            className="border p-2 w-full rounded"
                            required
                            name='billDate'
                            value={formData.billDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dueDate" className="block mb-1">Due Date:</label>
                        <input
                            type="date"
                            id="dueDate"
                            className="border p-2 w-full rounded"
                            required
                            name='dueDate'
                            value={formData.dueDate}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <button
                    className="bg-darkBlack text-lightWhite py-2 w-full rounded"
                    type='submit'
                    onClick={handleSubmit}
                >
                    Submit Payment
                </button>
            </div>
        </div>
    );
};

export default BillPayments;
