import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../utils/firebase';

const GoogleProfileForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { firstName, lastName, email, uid } = location.state;

    const [formData, setFormData] = useState({
        firstName: firstName || '',
        middleName: '',
        lastName: lastName || '',
        username: '',
        phoneNumber: '',
        house: '',
        street: '',
        barangay: '',
        city: '',
        region: '',
        zip: '',
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
        try {
            const userRef = doc(db, 'users', uid);

            await updateDoc(userRef, {
                ...formData,
                updatedAt: serverTimestamp(),
            });

            navigate('/');
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full"
            >
                <h2 className="text-2xl font-semibold mb-4">Complete Your Profile</h2>
                <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full rounded"
                    disabled
                />
                <input
                    type="text"
                    placeholder="Middle Name"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full rounded"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full rounded"
                    disabled
                />
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full rounded"
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full rounded"
                />
                <input
                    type="text"
                    placeholder="House No."
                    name="house"
                    value={formData.house}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full rounded"
                />
                <input
                    type="text"
                    placeholder="Street"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full rounded"
                />
                <input
                    type="text"
                    placeholder="Barangay"
                    name="barangay"
                    value={formData.barangay}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full rounded"
                />
                <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full rounded"
                />
                <input
                    type="text"
                    placeholder="Region"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full rounded"
                />
                <input
                    type="text"
                    placeholder="ZIP Code"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default GoogleProfileForm;
