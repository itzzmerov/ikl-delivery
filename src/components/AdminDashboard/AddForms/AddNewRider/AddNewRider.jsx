import React, { useState } from 'react'
import { db } from '../../../../utils/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const AddNewRider = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        userType: 'rider',
        status: 'Available',
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        userAddressHouse: '',
        userAddressStreet: '',
        userAddressBarangay: '',
        userAddressCity: '',
        userAddressRegion: '',
        userAddressZIP: '',
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
        console.log(formData)

        const address = {
            house: formData.userAddressHouse,
            street: formData.userAddressStreet,
            barangay: formData.userAddressBarangay,
            city: formData.userAddressCity,
            region: formData.userAddressRegion,
            zip: formData.userAddressZIP,
        };

        const RiderData = {
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            userType: formData.userType,
            status: formData.status,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            createdAt: serverTimestamp(),
            address: address, 
        };

        try {
            const result = await addDoc(collection(db, "users"), RiderData)
            console.log(result);
            navigate('/admin/riders')
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
        <div className='flex flex-col items-center w-full p-8'>
            <div className='flex justify-start items-center w-full'>
                <h1 className="text-2xl font-semibold mb-4"><span onClick={() => navigate('/admin/riders')} className='cursor-pointer text-blue-900 hover:text-blue-600'>Riders</span> <ArrowForwardIosIcon /> Add New Rider</h1>
            </div>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[25px] w-full text-darkBlack">
                <div className="flex justify-between items-center mb-6">
                    <p></p>
                    <h1 className="text-2xl font-bold">RIDER LIST</h1>
                    <button
                        className="text-darkBlack hover:text-red-600"
                        onClick={() => navigate('/admin/riders')}
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
                        name="userAddressHouse"
                        required
                        onChange={handleInputChange}
                        value={formData.userAddressHouse}
                    />
                    <input
                        type="text"
                        placeholder="Street"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="userAddressStreet"
                        required
                        onChange={handleInputChange}
                        value={formData.userAddressStreet}
                    />
                    <input
                        type="text"
                        placeholder="Barangay"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="userAddressBarangay"
                        required
                        onChange={handleInputChange}
                        value={formData.userAddressBarangay}
                    />
                    <input
                        type="text"
                        placeholder="City"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="userAddressCity"
                        required
                        onChange={handleInputChange}
                        value={formData.userAddressCity}
                    />
                    <input
                        type="text"
                        placeholder="Region"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="userAddressRegion"
                        required
                        onChange={handleInputChange}
                        value={formData.userAddressRegion}
                    />
                    <input
                        type="text"
                        placeholder="ZIP Code"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="userAddressZIP"
                        required
                        onChange={handleInputChange}
                        value={formData.userAddressZIP}
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
                    Add Rider
                </button>

            </div>
        </div>
    )
}

export default AddNewRider
