import React, { useState } from 'react';
import Logo from '../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Register = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('success');
    const [idFile, setIdFile] = useState(null);

    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        userType: 'customer',
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

    const handleIdUpload = (e) => {
        setIdFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idFile) {
            setPopupMessage('Please upload a valid ID before registering.');
            setPopupType('error');
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
            return;
        }

        try {
            const response = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const userId = response.user.uid;

            // Upload ID image to Firebase Storage
            const idStorageRef = ref(storage, `id_uploads/${userId}.jpg`);
            await uploadBytes(idStorageRef, idFile);
            const idUrl = await getDownloadURL(idStorageRef);

            // Create user document
            await setDoc(doc(db, 'users', userId), {
                ...formData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                isVerified: false, // important for restricting usage
            });

            // Create verification entry
            await setDoc(doc(db, 'id_verifications', userId), {
                userId,
                fullName: `${formData.firstName} ${formData.middleName} ${formData.lastName}`,
                email: formData.email,
                uploadedIdUrl: idUrl,
                status: 'pending',
                submittedAt: serverTimestamp(),
            });

            setPopupMessage('Account created successfully! Waiting for admin verification.');
            setPopupType('success');
            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
                navigate('/login');
            }, 2000);

        } catch (error) {
            console.error('Error during registration:', error.message);
            if (error.code === 'auth/email-already-in-use') {
                setPopupMessage('Email is already in use. Please use another one!');
            } else {
                setPopupMessage('An error occurred. Please try again.');
            }
            setPopupType('error');
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-lightWhite md:bg-darkWhite">
            <div className="flex flex-col items-center bg-lightWhite p-8 rounded-[50px] md:shadow-lg w-full sm:max-w-md lg:max-w-lg my-10">
                <Link to="/">
                    <img src={Logo} alt="Logo of Ipamalihog Kay Lolo" className="mb-4 w-32 h-32" />
                </Link>
                <h2 className="text-3xl font-Montserrat font-semibold mb-4">REGISTER</h2>

                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                    <div className="w-full flex mb-2">
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

                    <div className="w-full flex mb-2">
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

                    <div className="w-full flex mb-2">
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
                        type="text"
                        placeholder="Phone Number"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="phoneNumber"
                        required
                        onChange={handleInputChange}
                        value={formData.phoneNumber}
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
                        type="password"
                        placeholder="Password"
                        className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                        name="password"
                        required
                        onChange={handleInputChange}
                        value={formData.password}
                    />

                    <div className="w-full mb-4">
                        <label className="block mb-1 font-medium">Upload Valid ID (Image Only):</label>
                        <input type="file" accept="image/*" onChange={handleIdUpload} required className="w-full border border-gray-400 rounded-xl p-2" />
                    </div>

                    <button
                        type="submit"
                        className="bg-darkBlack hover:bg-lightBlack text-lightWhite py-2 w-[30%] rounded-full"
                    >
                        REGISTER
                    </button>
                </form>

                <p className="mt-4 text-sm">
                    Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
                </p>

                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div
                            className={`py-3 px-6 rounded-lg shadow-md ${popupType === 'success' ? 'bg-green-600' : 'bg-red-600'
                                } text-white`}
                        >
                            <p>{popupMessage}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
