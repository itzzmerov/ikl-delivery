import React, { useState } from 'react'
import { db } from '../../../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const AddNewService = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        created_at: '',
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

        const formDataWithDate = {
            ...formData,
            created_at: new Date().toISOString(), // ISO format date string
        };

        try {
            const result = await addDoc(collection(db, "services"), formDataWithDate)
            console.log(result);
            navigate('/admin/services')
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className='flex flex-col items-center w-full p-8'>
            <div className='flex justify-start items-center w-full'>
                <h1 className="text-2xl font-semibold mb-4"><span onClick={() => navigate('/admin/services')} className='cursor-pointer text-blue-900 hover:text-blue-600'>Services</span> <ArrowForwardIosIcon /> Add New Service</h1>
            </div>
            <div className="bg-lightWhite p-2 lg:p-8 rounded-[25px] w-full text-darkBlack">
                <div className="flex justify-between items-center mb-6">
                    <p></p>
                    <h1 className="text-2xl font-bold">IKL SERVICES</h1>
                    <button
                        className="text-darkBlack hover:text-red-600"
                        onClick={() => navigate('/admin/services')}
                    >
                        <AiOutlineClose size={24} />
                    </button>
                </div>

                <div className="mb-2">
                    <h3 className='mb-2'>Name:</h3>
                    <input
                        type="text"
                        placeholder="Service Name"
                        className="border p-2 w-full rounded mb-4"
                        required
                        name='name'
                        id='name'
                        value={formData.name}
                        onChange={handleInputChange}
                    />

                    <h3 className='mb-2'>Description:</h3>
                    <input
                        type="text"
                        placeholder="Description"
                        className="border p-2 w-full rounded mb-4"
                        required
                        name='description'
                        id='description'
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>

                <button
                    className="bg-darkBlack hover:bg-lightBlack text-lightWhite py-2 w-full rounded"
                    type='submit'
                    onClick={handleSubmit}
                >
                    Add Service
                </button>

            </div>
        </div>
    )
}

export default AddNewService