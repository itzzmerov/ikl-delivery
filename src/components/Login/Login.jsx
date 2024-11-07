import React, { useState } from 'react'
import Logo from '../../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
            const response = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            console.log("Login successful: ", response);
            navigate("/")
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#F9F9F9] md:bg-[#D6D6D6]">
            <div className="flex flex-col items-center bg-[#F9F9F9] p-8 rounded-[50px] md:shadow-lg w-full sm:max-w-md lg:max-w-lg">

                <Link to="/">
                    <img src={Logo} alt="Logo of Ipamalihog Kay Lolo" className="mb-4 w-32 h-32" />
                </Link>

                <h2 className="text-3xl font-Montserrat font-semibold mb-6">LOGIN</h2>
                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3 border border-gray-400 mb-4 rounded-xl focus:outline-none focus:border-[#181818]"
                    name='email'
                    required
                    onChange={handleInputChange}
                    value={formData.email}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border border-gray-400 mb-4 rounded-xl focus:outline-none focus:border-[#181818]"
                    name='password'
                    required
                    onChange={handleInputChange}
                    value={formData.password}
                />

                <button className="bg-[#181818] hover:bg-[#383838] text-white py-2 w-[50%] font-Montserrat rounded-full" onClick={handleSubmit}>
                    LOGIN
                </button>

                <p className="mt-4 text-sm">
                    Don't have an account? <Link to="/register" className="text-blue-500">Sign up here</Link>
                </p>
            </div>
        </div>
    )
}

export default Login