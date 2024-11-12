import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../../utils/firebase';
import { AiOutlineClose } from 'react-icons/ai';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const UpdateRider = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        userType: 'rider',
        status: '',
        username: '',
        email: '',
        phoneNumber: '',
        userAddressHouse: '',
        userAddressStreet: '',
        userAddressBarangay: '',
        userAddressCity: '',
        userAddressRegion: '',
        userAddressZIP: '',
    });

    const fetchRider = async () => {
        try {
            const response = await getDoc(doc(db, "users", id));
            if (response.exists()) {
                const riderData = response.data();
                
                const { address } = riderData;

                setFormData({
                    firstName: riderData.firstName || '',
                    middleName: riderData.middleName || '',
                    lastName: riderData.lastName || '',
                    username: riderData.username || '',
                    email: riderData.email || '',
                    phoneNumber: riderData.phoneNumber || '',
                    userType: riderData.userType || 'rider',
                    status: riderData.status || '',
                    userAddressHouse: address ? address.house : '',
                    userAddressStreet: address ? address.street : '',
                    userAddressBarangay: address ? address.barangay : '',
                    userAddressCity: address ? address.city : '',
                    userAddressRegion: address ? address.region : '',
                    userAddressZIP: address ? address.zip : '',
                });
            } else {
                console.log("No such document found!");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchRider();
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
            house: formData.userAddressHouse,
            street: formData.userAddressStreet,
            barangay: formData.userAddressBarangay,
            city: formData.userAddressCity,
            region: formData.userAddressRegion,
            zip: formData.userAddressZIP,
        };

        try {
            const updatedData = {
                ...formData,
                address: updatedAddress, 
                updatedAt: serverTimestamp(), 
            };

            await updateDoc(doc(db, "users", id), updatedData);

            console.log("Customer data updated successfully.");
            navigate("/admin/riders");
        } catch (error) {
            console.error("Error updating customer data:", error.message);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center min-h-screen w-full rounded-full p-8'>
            <div className='flex justify-start items-center w-full'>
                <h1 className="text-2xl font-semibold mb-4">
                    <span onClick={() => navigate('/admin/riders')} className='cursor-pointer text-blue-900 hover:text-blue-600'>
                        Riders
                    </span> 
                    <ArrowForwardIosIcon /> Update Rider
                </h1>
            </div>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[50px] w-full">
                <div className="flex justify-between items-center mb-6">
                    <p></p>
                    <h1 className="text-2xl font-bold">UPDATE RIDER INFORMATION</h1>
                    <button
                        className="text-darkBlack hover:text-red-600"
                        onClick={() => navigate('/admin/riders')}
                    >
                        <AiOutlineClose size={24} />
                    </button>
                </div>

                <div className="mb-4">
                <select
                        id="status"
                        name="status"
                        className="border border-gray-400 p-2 mb-4 w-[20%] rounded-xl"
                        value={formData.status}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>Select Status</option>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                    </select>
                    
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
                </div>

                <button
                    className="bg-darkBlack hover:bg-lightBlack text-lightWhite py-2 w-full rounded"
                    type='submit'
                    onClick={handleSubmit}
                >
                    Update Rider
                </button>

            </div>
        </div>
    );
};

export default UpdateRider;
