import React, { useState } from 'react';
import { db, auth } from '../../../../utils/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const AddNewRider = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

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

        const RiderData = {
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            userType: formData.userType,
            status: formData.status,
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
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), RiderData);

            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
                navigate('/admin/riders');
            }, 2000);

        } catch (error) {
            console.error('Error adding rider:', error.message);
        }
    };

    return (
        <div className='flex flex-col items-center w-full p-8'>
            <div className='flex justify-start items-center w-full'>
                <h1 className="text-2xl font-semibold mb-4">
                    <span onClick={() => navigate('/admin/riders')} className='cursor-pointer text-blue-900 hover:text-blue-600'>
                        Riders
                    </span>
                    <ArrowForwardIosIcon /> Add New Rider
                </h1>
            </div>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[25px] w-full text-darkBlack">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">RIDER LIST</h1>
                    <button
                        className="text-darkBlack hover:text-red-600"
                        onClick={() => navigate('/admin/riders')}
                    >
                        <AiOutlineClose size={24} />
                    </button>
                </div>

                <div className="mb-2">
                    <h3>Personal Information:</h3>
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
                    <h3>Address Information:</h3>
                    <input type="text" placeholder="House No." className="border border-gray-400 p-2 mb-4 w-full rounded-xl" name="house" required onChange={handleInputChange} value={formData.house} />
                    <input type="text" placeholder="Street" className="border border-gray-400 p-2 mb-4 w-full rounded-xl" name="street" required onChange={handleInputChange} value={formData.street} />
                    <input type="text" placeholder="Barangay" className="border border-gray-400 p-2 mb-4 w-full rounded-xl" name="barangay" required onChange={handleInputChange} value={formData.barangay} />
                    <input type="text" placeholder="City" className="border border-gray-400 p-2 mb-4 w-full rounded-xl" name="city" required onChange={handleInputChange} value={formData.city} />
                    <input type="text" placeholder="Region" className="border border-gray-400 p-2 mb-4 w-full rounded-xl" name="region" required onChange={handleInputChange} value={formData.region} />
                    <input type="text" placeholder="ZIP Code" className="border border-gray-400 p-2 mb-4 w-full rounded-xl" name="zip" required onChange={handleInputChange} value={formData.zip} />
                    <h3>Account Information:</h3>
                    <input type="text" placeholder="Username" className="border border-gray-400 p-2 mb-4 w-full rounded-xl" name="username" required onChange={handleInputChange} value={formData.username} />
                    <input type="text" placeholder="Phone Number" className="border border-gray-400 p-2 mb-4 w-full rounded-xl" name="phoneNumber" required onChange={handleInputChange} value={formData.phoneNumber} />
                    <input type="email" placeholder="Email" className="border border-gray-400 p-2 mb-4 w-full rounded-xl" name="email" required onChange={handleInputChange} value={formData.email} />
                    <input type="password" placeholder="Password" className="border border-gray-400 p-2 mb-4 w-full rounded-xl" name="password" required onChange={handleInputChange} value={formData.password} />
                </div>

                <button className="bg-darkBlack hover:bg-lightBlack text-lightWhite py-2 w-full rounded" type="submit" onClick={handleSubmit}>
                    Add Rider
                </button>

                {showPopup && (
                    <div className="fixed inset-0 flex items-start justify-center mt-5 z-50">
                        <div className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-md">
                            <p>Successfully created new rider!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddNewRider;
