import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../../utils/firebase';
import { AiOutlineClose } from 'react-icons/ai';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const UpdateCustomer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        userType: 'customer',
        username: '',
        email: '',
        phoneNumber: '',
        street: '',
        house: '',
        barangay: '',
        city: '',
        region: '',
        zip: '',
    });

    const fetchCustomer = async () => {
        try {
            const response = await getDoc(doc(db, "users", id));
            if (response.exists()) {
                const customerData = response.data();

                setFormData({
                    firstName: customerData.firstName || '',
                    middleName: customerData.middleName || '',
                    lastName: customerData.lastName || '',
                    username: customerData.username || '',
                    email: customerData.email || '',
                    phoneNumber: customerData.phoneNumber || '',
                    userType: customerData.userType || 'customer',
                    house: customerData.house,
                    street: customerData.street,
                    barangay: customerData.barangay,
                    city: customerData.city,
                    region: customerData.region,
                    zip: customerData.zip,
                });
            } else {
                console.log("No such document found!");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchCustomer();
        // eslint-disable-next-line
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        const updatedAddress = {
            house: formData.house,
            street: formData.street,
            barangay: formData.barangay,
            city: formData.city,
            region: formData.region,
            zip: formData.zip,
        };

        try {
            const updatedData = {
                ...formData,
                address: updatedAddress,
                updatedAt: serverTimestamp(),
            };

            await updateDoc(doc(db, "users", id), updatedData);

            console.log("Customer data updated successfully.");
            navigate("/admin/customers");
        } catch (error) {
            console.error("Error updating customer data:", error.message);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center min-h-screen w-full rounded-full p-8'>
            <div className='flex justify-start items-center w-full'>
                <h1 className="text-2xl font-semibold mb-4">
                    <span onClick={() => navigate('/admin/customers')} className='cursor-pointer text-blue-900 hover:text-blue-600'>
                        Customers
                    </span>
                    <ArrowForwardIosIcon /> Update Customer
                </h1>
            </div>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[50px] w-full">
                <div className="flex justify-between items-center mb-6">
                    <p></p>
                    <h1 className="text-2xl font-bold">UPDATE CUSTOMER INFORMATION</h1>
                    <button
                        className="text-darkBlack hover:text-red-600"
                        onClick={() => navigate('/admin/customers')}
                    >
                        <AiOutlineClose size={24} />
                    </button>
                </div>

                <div className="mb-4">
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
                </div>

                <button
                    className="bg-darkBlack hover:bg-lightBlack text-lightWhite py-2 w-full rounded"
                    type='submit'
                    onClick={handleSubmit}
                >
                    Update Customer
                </button>

            </div>
        </div>
    );
};

export default UpdateCustomer;
