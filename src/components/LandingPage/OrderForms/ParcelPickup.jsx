import React, { useState, useEffect } from 'react';
import { db } from '../../../utils/firebase';
import { collection, addDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';

const ParcelPickup = ({ onClose }) => {
    const { currentUser } = useAuth();
    const [showPopup, setShowPopup] = useState(false);
    const [basePrice, setBasePrice] = useState(0);

    const [formData, setFormData] = useState({
        service: 'Parcel Pickup',
        status: 'Pending',
        customerFirstName: '',
        customerLastName: '',
        phoneNumber: '',
        parcelDetails: '',
        pickupLocation: '',
        dropoffLocation: '',
        estimatedWeight: '',
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
            const parcelData = {
                ...formData,
                userId: currentUser.uid,
                createdAt: new Date().toISOString(),
                basePrice,
            };

            const result = await addDoc(collection(db, 'orders'), parcelData);
            console.log('Parcel Pickup request created with ID:', result.id);

            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
                onClose();
            }, 3000);
        } catch (error) {
            console.error('Error adding Parcel Pickup request:', error.message);
        }
    };

    return (
        <div className='flex justify-center h-auto w-full rounded-full'>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[50px] w-full text-darkBlack">
                <h1 className="text-2xl font-bold text-center mb-6">Parcel Pickup</h1>

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
                    <h2 className="font-semibold mb-2">Parcel Details:</h2>
                    <div className="mb-2">
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
                    <div className="mb-2">
                        <label htmlFor="dropoffLocation" className="block mb-1">Drop Off Location:</label>
                        <input
                            type="text"
                            id="dropoffLocation"
                            className="border p-2 w-full rounded"
                            required
                            name='dropoffLocation'
                            value={formData.dropoffLocation}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">Weight Information (kg):</h2>
                    <div className="mb-2">
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
                    Submit Pickup Request
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

export default ParcelPickup;
