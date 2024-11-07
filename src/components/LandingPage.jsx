import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OrderForm from './OrderForm/OrderForm';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import NavBar from './LandingPage/NavBar/NavBar';
import HeroSection from './LandingPage/Hero/Hero';
import FeaturedServices from './LandingPage/FeaturedServices/FeaturedServices';
import AboutSection from './LandingPage/AboutUs/AboutUs';


const LandingPage = () => {

    const navigate = useNavigate();

    const [isOrderFormVisible, setIsOrderFormVisible] = useState(false);

    // Function to open and close the order form
    const openOrderForm = () => {
        setIsOrderFormVisible(true);
    };

    const closeOrderForm = () => {
        setIsOrderFormVisible(false);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth)
            navigate("/login")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>

            <NavBar />
            <HeroSection />
            <FeaturedServices />
            <AboutSection />

            <Link to="/register/">Go to Signup</Link> <br />
            <Link to="/login">Go to Login</Link>

            <div className="flex flex-col items-start justify-center m-4 gap-2">
                <button
                    onClick={openOrderForm}
                    className="bg-[#181818] text-white py-2 px-4 rounded"
                >
                    Add Order
                </button>

                <button
                    onClick={handleLogout}
                    className="bg-[#181818] text-white py-2 px-4 rounded"
                >
                    Logout
                </button>

                {isOrderFormVisible && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-2xl bg-white p-6 rounded-lg overflow-y-auto h-[90vh]">
                            {/* Close Button */}
                            <button
                                onClick={closeOrderForm}
                                className="absolute top-2 right-2 bg-gray-200 rounded-full p-2"
                            >
                                <CloseOutlinedIcon />
                            </button>
                            {/* Order Form */}
                            <OrderForm onClose={closeOrderForm} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LandingPage;