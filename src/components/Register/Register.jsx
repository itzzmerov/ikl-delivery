import React, { useState } from 'react'
import Logo from '../../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {

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
            const response = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            console.log("Signup successful: ", response);
            navigate("/login")
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

                <h2 className="text-3xl font-Montserrat font-semibold mb-4">REGISTER</h2>

                {/* <div className="flex w-full gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="border border-gray-400 p-2 w-full rounded-xl"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="border border-gray-400 p-2 w-full rounded-xl"
                    />
                </div>
                <input
                    type="text"
                    placeholder="Username"
                    className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                /> */}
                <input
                    type="email"
                    placeholder="Email Address"
                    className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                    name='email'
                    required
                    onChange={handleInputChange}
                    value={formData.email}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-400 p-2 mb-4 w-full rounded-xl"
                    name='password'
                    required
                    onChange={handleInputChange}
                    value={formData.password}
                />
                {/* <input
                    type="password"
                    placeholder="Re-enter Password"
                    className="border border-gray-400 p-2 mb-6 w-full rounded-xl"
                /> */}

                <button type='submit' className="bg-[#181818] hover:bg-[#383838] text-white py-2 w-[30%] rounded-full" onClick={handleSubmit}>
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