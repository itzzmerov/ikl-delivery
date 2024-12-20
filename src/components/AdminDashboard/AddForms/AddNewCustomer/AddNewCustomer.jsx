import React, { useState } from 'react'
import { auth, db } from '../../../../utils/firebase';
import { collection, addDoc, serverTimestamp, setDoc, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const AddNewCustomer = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        userType: 'customer',
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        house: '',
        street: '',
        barangay: '',
        city: '',
        region: '',
        zip: '',
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        const customerData = {
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            userType: formData.userType,
            username: formData.username,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            house: formData.house,
            street: formData.street,
            barangay: formData.barangay,
            city: formData.city,
            region: formData.region,
            zip: formData.zip,
            createdAt: serverTimestamp(),
        };

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const userId = userCredential.user.uid;

            await setDoc(doc(db, 'users', userId), {
                ...customerData,
                password: '',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            console.log('Customer added successfully to Firestore and Firebase Auth');

            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
                navigate('/admin/customers');
            }, 2000);
        } catch (error) {
            console.error('Error adding customer:', error.message);
        }
    };

    return (
        <div className='flex flex-col items-center w-full p-8'>
            <div className='flex justify-start items-center w-full'>
                <h1 className="text-2xl font-semibold mb-4"><span onClick={() => navigate('/admin/customers')} className='cursor-pointer text-blue-900 hover:text-blue-600'>Customers</span> <ArrowForwardIosIcon /> Add New Customer</h1>
            </div>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[25px] w-full text-darkBlack">
                <div className="flex justify-between items-center mb-6">
                    <p></p>
                    <h1 className="text-2xl font-bold">CUSTOMER LIST</h1>
                    <button
                        className="text-darkBlack hover:text-red-600"
                        onClick={() => navigate('/admin/customers')}
                    >
                        <AiOutlineClose size={24} />
                    </button>
                </div>

                <div className="mb-2">
                    <div className='w-full flex mb-2'>
                        <h3>Personal Information:</h3>
                    </div>
                    <input
                        type="text"
                        placeholder="First Name"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="firstName"
                        required
                        onChange={handleInputChange}
                        value={formData.firstName}
                    />
                    <input
                        type="text"
                        placeholder="Middle Name"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="middleName"
                        required
                        onChange={handleInputChange}
                        value={formData.middleName}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="lastName"
                        required
                        onChange={handleInputChange}
                        value={formData.lastName}
                    />

                    <div className='w-full flex mb-2'>
                        <h3>Address Information:</h3>
                    </div>
                    <input
                        type="text"
                        placeholder="House No."
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="house"
                        required
                        onChange={handleInputChange}
                        value={formData.house}
                    />
                    <input
                        type="text"
                        placeholder="Street"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="street"
                        required
                        onChange={handleInputChange}
                        value={formData.street}
                    />
                    <input
                        type="text"
                        placeholder="Barangay"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="barangay"
                        required
                        onChange={handleInputChange}
                        value={formData.barangay}
                    />
                    <input
                        type="text"
                        placeholder="City"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="city"
                        required
                        onChange={handleInputChange}
                        value={formData.city}
                    />
                    <input
                        type="text"
                        placeholder="Region"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="region"
                        required
                        onChange={handleInputChange}
                        value={formData.region}
                    />
                    <input
                        type="text"
                        placeholder="ZIP Code"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="zip"
                        required
                        onChange={handleInputChange}
                        value={formData.zip}
                    />

                    <div className='w-full flex mb-2'>
                        <h3>Account Information:</h3>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="username"
                        required
                        onChange={handleInputChange}
                        value={formData.username}
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="email"
                        required
                        onChange={handleInputChange}
                        value={formData.email}
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="phoneNumber"
                        required
                        onChange={handleInputChange}
                        value={formData.phoneNumber}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="password"
                        required
                        onChange={handleInputChange}
                        value={formData.password}
                    />
                </div>

                <button
                    className="bg-darkBlack hover:bg-lightBlack text-lightWhite py-2 w-full rounded"
                    type='submit'
                    onClick={handleSubmit}
                >
                    Add Customer
                </button>

                {showPopup && (
                    <div className="fixed inset-0 flex items-start justify-center mt-5 z-50">
                        <div className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-md">
                            <p>Successfully created an account!</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default AddNewCustomer
