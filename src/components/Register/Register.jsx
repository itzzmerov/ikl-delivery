import React, { useState } from 'react'
import Logo from '../../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        userType: 'admin',
        userAddressHouse: '',
        userAddressStreet: '',
        userAddressBarangay: '',
        userAddressCity: '',
        userAddressRegion: '',
        userAddressZIP: '',
        // profileImage: '',
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
        try {
            // Create user with email and password in Firebase Authentication
            const response = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const userId = response.user.uid;

            // Create user document in Firestore
            await setDoc(doc(db, 'users', userId), {
                firstName: formData.firstName,
                middleName: formData.middleName,
                lastName: formData.lastName,
                username: formData.username,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                userType: formData.userType,
                address: {
                    house: formData.userAddressHouse,
                    street: formData.userAddressStreet,
                    barangay: formData.userAddressBarangay,
                    city: formData.userAddressCity,
                    region: formData.userAddressRegion,
                    zip: formData.userAddressZIP,
                },
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            console.log('Signup and Firestore document creation successful.');
            navigate('/login');
        } catch (error) {
            console.error('Error during registration:', error.message);
        }
    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-lightWhite md:bg-darkWhite">
            <div className="flex flex-col items-center bg-lightWhite p-8 rounded-[50px] md:shadow-lg w-full sm:max-w-md lg:max-w-lg">
                <Link to="/">
                    <img src={Logo} alt="Logo of Ipamalihog Kay Lolo" className="mb-4 w-32 h-32" />
                </Link>
                <h2 className="text-3xl font-Montserrat font-semibold mb-4">REGISTER</h2>

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
                    type="email"
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

                <button type="submit" className="bg-darkBlack hover:bg-lightBlack text-lightWhite py-2 w-[30%] rounded-full" onClick={handleSubmit}>
                    REGISTER
                </button>

                <p className="mt-4 text-sm">
                    Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
                </p>
            </div>
        </div>
    )
}

export default Register