import React, { useState } from 'react';
import Logo from '../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
            const response = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const userId = response.user.uid;

            const userDoc = await getDoc(doc(db, 'users', userId));

            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log('User data:', userData);

                if (userData.userType === 'admin') {
                    navigate('/admin');
                } else if (userData.userType === 'rider') {
                    navigate('/rider');
                } else {
                    navigate('/');
                }
            } else {
                console.error('No user data found');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-lightWhite md:bg-darkWhite">
            <div className="flex flex-col items-center bg-lightWhite p-8 rounded-[50px] md:shadow-lg w-full sm:max-w-md lg:max-w-lg">
                <Link to="/">
                    <img src={Logo} alt="Logo of Ipamalihog Kay Lolo" className="mb-4 w-32 h-32" />
                </Link>

                <h2 className="text-3xl font-Montserrat font-semibold mb-6">LOGIN</h2>

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

                <p className="mt-4 text-sm">
                    Don't have an account? <Link to="/register" className="text-blue-500">Sign up here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
