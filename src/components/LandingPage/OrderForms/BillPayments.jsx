import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/firebase';
import { collection, addDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';

const BillPayments = ({ onClose }) => {
    const { currentUser } = useAuth();
    const [showPopup, setShowPopup] = useState(false);
    const [basePrice, setBasePrice] = useState(0);

    const [formData, setFormData] = useState({
        service: 'Bill Payment',
        status: 'Pending',
        customerFirstName: '',
        customerLastName: '',
        customerAddress: '',
        phoneNumber: '',
        emailAddress: '',
        billType: '',
        accountNumber: '',
        amount: '',
        billDate: '',
        dueDate: '',
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
                        emailAddress: userData.email || '',
                        customerAddress: `${userData.house || ''}, ${userData.street || ''}, ${userData.barangay || ''}, ${userData.city || ''}, ${userData.region || ''}, ${userData.zip || ''}`
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
            const paymentData = {
                ...formData,
                userId: currentUser.uid,
                createdAt: new Date().toISOString(),
                basePrice,
            };

            const result = await addDoc(collection(db, 'orders'), paymentData);
            console.log('Bill Payment created with ID:', result.id);

            const notificationMessage = `${formData.customerFirstName} ${formData.customerLastName} has placed a new ${formData.service} order.`;
            await addDoc(collection(db, 'notifications'), {
                message: notificationMessage,
                timestamp: new Date(),
                status: "unread",
            });

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
        <div className="flex justify-center items-center h-auto w-full rounded-full">
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
                                name="customerFirstName"
                                value={formData.customerFirstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="customerLastName" className="block mb-1">Last Name:</label>
                            <input
                                type="text"
                                id="customerLastName"
                                className="border p-2 w-full rounded"
                                name="customerLastName"
                                value={formData.customerLastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="phoneNumber" className="block mb-1">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            className="border p-2 w-full rounded"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="customerAddress" className="block mb-1">Customer Address:</label>
                        <input
                            type="text"
                            id="customerAddress"
                            className="border p-2 w-full rounded"
                            required
                            name='customerAddress'
                            value={formData.customerAddress}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="emailAddress" className="block mb-1">Email Address:</label>
                        <input
                            type="email"
                            id="emailAddress"
                            className="border p-2 w-full rounded"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleInputChange}
                            required
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
                            className="border p-2 w-full rounded"
                            name="billType"
                            value={formData.billType}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="accountNumber" className="block mb-1">Account Number:</label>
                        <input
                            type="text"
                            id="accountNumber"
                            className="border p-2 w-full rounded"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleInputChange}
                            required
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
                            className="border p-2 w-full rounded"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="billDate" className="block mb-1">Bill Date:</label>
                        <input
                            type="date"
                            id="billDate"
                            className="border p-2 w-full rounded"
                            name="billDate"
                            value={formData.billDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="dueDate" className="block mb-1">Due Date:</label>
                        <input
                            type="date"
                            id="dueDate"
                            className="border p-2 w-full rounded"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleInputChange}
                            required
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
                    type="submit"
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
