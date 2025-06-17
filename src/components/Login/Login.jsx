import React, { useState } from 'react';
import Logo from '../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../../utils/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [welcomeMessage, setWelcomeMessage] = useState('');

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
            const response = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const userId = response.user.uid;

            const userDoc = await getDoc(doc(db, 'users', userId));

            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log('User data:', userData);

                // Check approval status for customer
                if (userData.userType === 'customer') {
                    if (userData.rejected === true) {
                        alert(`Your registration of account is rejected by the admin. This is a note by the admin: ${userData.rejectionMessage || 'No reason provided.'}`);
                        return;
                    }

                    if (userData.isApproved === false) {
                        alert('Your account is not yet approved by the admin. Please wait for approval.');
                        return;
                    }
                }

                setWelcomeMessage(
                    `Welcome back, ${userData.firstName || 'User'}! You are logged in as ${userData.userType || 'a user'
                    }.`
                );

                if (userData.userType === 'admin') {
                    setTimeout(() => navigate('/admin'), 3000);
                } else if (userData.userType === 'rider') {
                    setTimeout(() => navigate('/riders'), 3000);
                } else {
                    setTimeout(() => navigate('/'), 3000);
                }
            } else {
                console.error('No user data found');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const [firstName, lastName] = user.displayName.split(' ');

            const userRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                navigate('/');
            } else {
                await setDoc(userRef, {
                    email: user.email,
                    firstName,
                    lastName,
                    createdAt: serverTimestamp(),
                });

                navigate('/complete-profile', {
                    state: { firstName, lastName, email: user.email, uid: user.uid },
                });
            }

        } catch (error) {
            console.error('Error during Google login:', error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-lightWhite md:bg-darkWhite">
            <div className="flex flex-col items-center bg-lightWhite p-8 rounded-[50px] md:shadow-lg w-full sm:max-w-md lg:max-w-lg">
                <Link to="/">
                    <img src={Logo} alt="Logo of Ipamalihog Kay Lolo" className="mb-4 w-32 h-32" />
                </Link>

                <h2 className="text-3xl font-Montserrat font-semibold mb-6">LOGIN</h2>

                {welcomeMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
                        {welcomeMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center">
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full p-3 border border-gray-400 mb-4 rounded-xl focus:outline-none focus:border-darkBlack"
                        name="email"
                        required
                        onChange={handleInputChange}
                        value={formData.email}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border border-gray-400 mb-4 rounded-xl focus:outline-none focus:border-darkBlack"
                        name="password"
                        required
                        onChange={handleInputChange}
                        value={formData.password}
                    />

                    <button
                        type="submit"
                        className="bg-darkBlack hover:bg-lightBlack text-lightWhite py-2 w-[50%] font-Montserrat rounded-full"
                    >
                        LOGIN
                    </button>
                </form>

                <button
                    onClick={handleGoogleLogin}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-4 rounded-full"
                >
                    Sign in with Google
                </button>

                <p className="mt-4 text-sm">
                    Don't have an account? <Link to="/register" className="text-blue-500">Sign up here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
